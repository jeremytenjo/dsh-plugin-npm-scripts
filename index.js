/**
 * Host half of dsh-plugin-npm-scripts.
 *
 * The browser asks one loopback route to inspect the active Session's
 * repository, nearest package.json, package manager, and scripts. Every answer
 * is derived from the Session working directory; the browser never supplies a
 * filesystem path. The terminal itself is opened by the browser half through
 * the Harness right sidebar, so this route never runs project code.
 */

import { basename, dirname, isAbsolute, relative, sep } from 'node:path';

const ROUTE = '/__dsh/npm-scripts';
const MAX_BODY_BYTES = 64 * 1024;
const MAX_SCRIPTS = 1000;
const MAX_SCRIPT_NAME_CHARS = 200;
const MAX_SCRIPT_COMMAND_CHARS = 4000;
const MAX_GIT_OUTPUT_BYTES = 1024 * 1024;
const REQUEST_TIMEOUT_MS = 20_000;

const LOCKFILES = [
  ['pnpm', 'pnpm-lock.yaml'],
  ['yarn', 'yarn.lock'],
  ['bun', 'bun.lockb'],
  ['bun', 'bun.lock'],
  ['npm', 'package-lock.json'],
  ['npm', 'npm-shrinkwrap.json'],
];

export const inject = ['webServer', 'subprocess', 'sessions', 'workingDirectory', 'fs'];

class RequestError extends Error {
  /**
   * @param {number} status HTTP status.
   * @param {string} code stable client-facing error code.
   * @param {string} message diagnostic copy.
   */
  constructor(status, code, message) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.code = code;
  }
}

export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: ROUTE,
        handler: (req, res) => handleRequest(ctx, req, res),
      }),
    'npm-scripts: route',
  );
}

async function handleRequest(ctx, req, res) {
  const deadline = new AbortController();
  const timer = setTimeout(() => deadline.abort(new Error('timeout')), REQUEST_TIMEOUT_MS);
  try {
    if (req.method !== 'POST') {
      throw new RequestError(405, 'method-not-allowed', 'Only POST is supported.');
    }
    assertSameOrigin(ctx, req);
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      throw new RequestError(415, 'content-type', 'Content-Type must be application/json.');
    }

    const body = await readJsonBody(req);
    if (body.action !== 'list') {
      throw new RequestError(400, 'unknown-action', 'Unknown action.');
    }

    const { cwd } = await resolveSessionDirectory(ctx, body.sessionId, deadline.signal);
    const repo = await inspectRepository(ctx, cwd, deadline.signal);
    send(res, 200, { ok: true, repo });
  } catch (error) {
    if (res.writableEnded) return;
    const timedOut = deadline.signal.aborted;
    const status = error instanceof RequestError ? error.status : timedOut ? 504 : 500;
    const code =
      error instanceof RequestError ? error.code : timedOut ? 'timeout' : 'request-failed';
    if (!(error instanceof RequestError)) {
      console.error('[npm-scripts] could not inspect the repository', error);
    }
    send(res, status, {
      ok: false,
      code,
      error:
        error instanceof Error
          ? error.message
          : 'Could not read the scripts for this repository.',
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the Session's live working directory through the Harness services.
 * @param {any} ctx Host plugin context.
 * @param {unknown} sessionId raw request value.
 * @param {AbortSignal} signal request lifetime.
 * @returns {Promise<{ session: any, cwd: string }>} validated directory.
 */
async function resolveSessionDirectory(ctx, sessionId, signal) {
  if (typeof sessionId !== 'string' || sessionId.length === 0 || sessionId.length > 256) {
    throw new RequestError(400, 'session-required', 'A valid session id is required.');
  }
  const session = ctx.sessions.get(sessionId);
  if (!session) {
    throw new RequestError(
      404,
      'session-missing',
      'This session is no longer live. Reload the page and try again.',
    );
  }
  const cwd = ctx.workingDirectory.get(session);
  if (typeof cwd !== 'string' || !isAbsolute(cwd)) {
    throw new RequestError(409, 'no-working-directory', 'This session has no usable working directory.');
  }
  let target;
  try {
    target = await ctx.fs.resolve(cwd, { signal });
  } catch (error) {
    throw new RequestError(
      409,
      'directory-unavailable',
      `The session working directory cannot be opened: ${errorMessage(error)}`,
    );
  }
  const info = await ctx.fs.stat(target, signal);
  if (!info || info.type !== 'directory') {
    throw new RequestError(409, 'directory-unavailable', 'The session working directory no longer exists.');
  }
  return { session, cwd: targetPath(ctx, target) || cwd };
}

/**
 * Read the provider's canonical process path for a resolved target.
 * @param {any} ctx Host plugin context.
 * @param {any} target resolved filesystem target.
 * @returns {string} canonical path, or an empty string.
 */
function targetPath(ctx, target) {
  try {
    if (typeof ctx.fs.processPath === 'function') return ctx.fs.processPath(target);
  } catch {
    // Fall back to the display path when the provider has no host mapping.
  }
  if (typeof target === 'string') return target;
  return typeof target?.displayPath === 'string' ? target.displayPath : '';
}

/**
 * Locate the repository root, nearest package.json, package manager, and scripts.
 * @param {any} ctx Host plugin context.
 * @param {string} cwd Session working directory.
 * @param {AbortSignal} signal request lifetime.
 * @returns {Promise<object>} public repository description.
 */
async function inspectRepository(ctx, cwd, signal) {
  const cwdTarget = await safeResolve(ctx, cwd, cwd, signal);
  const canonicalCwd = (cwdTarget && targetPath(ctx, cwdTarget)) || cwd;
  const repository = await findRepositoryRoot(ctx, canonicalCwd, signal);
  const manifest = await findPackageManifest(ctx, canonicalCwd, repository.root, signal);
  if (!manifest) {
    throw new RequestError(
      404,
      'no-package-json',
      'No package.json was found between this folder and the repository root.',
    );
  }

  const parsed = parseManifest(await safeReadText(ctx, manifest.target, signal));
  const scripts = normaliseScripts(parsed.scripts);
  const manager = await detectPackageManager(ctx, manifest.dir, repository.root, parsed, signal);
  const relativePath = relative(repository.root, manifest.dir).split(sep).join('/');
  const packagePath =
    relativePath === ''
      ? '.'
      : relativePath.startsWith('..') || isAbsolute(relativePath)
        ? basename(manifest.dir)
        : relativePath;

  return {
    isRepo: repository.isRepo,
    root: repository.root,
    name: basename(repository.root) || 'repository',
    cwd: canonicalCwd,
    packageDir: manifest.dir,
    packagePath,
    packageName: typeof parsed.name === 'string' ? parsed.name.slice(0, 200) : '',
    manager,
    scripts,
    total: scripts.length,
  };
}

/**
 * Read the Git root, falling back to the Session directory outside Git.
 * @param {any} ctx Host plugin context.
 * @param {string} cwd Session working directory.
 * @param {AbortSignal} signal request lifetime.
 * @returns {Promise<{ root: string, isRepo: boolean }>} repository location.
 */
async function findRepositoryRoot(ctx, cwd, signal) {
  try {
    const result = await runCommand(ctx, 'git', ['rev-parse', '--show-toplevel'], cwd, signal);
    const root = result.stdout.trim();
    if (result.code === 0 && root && isAbsolute(root)) {
      const resolved = await safeResolve(ctx, root, cwd, signal);
      return { root: (resolved && targetPath(ctx, resolved)) || root, isRepo: true };
    }
  } catch (error) {
    if (signal.aborted) throw error;
    // Git may be unavailable; the session folder still has a package.json.
  }
  return { root: cwd, isRepo: false };
}

/**
 * Walk from the working directory to the repository root and pick the first package.json.
 * @param {any} ctx Host plugin context.
 * @param {string} cwd Session working directory.
 * @param {string} root Repository root.
 * @param {AbortSignal} signal request lifetime.
 * @returns {Promise<{ dir: string, target: any } | undefined>} manifest location.
 */
async function findPackageManifest(ctx, cwd, root, signal) {
  const chain = [];
  let dir = cwd;
  for (let depth = 0; depth < 128; depth += 1) {
    chain.push(dir);
    if (dir === root) break;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  if (!chain.includes(root)) chain.push(root);

  for (const candidate of chain) {
    const target = await safeResolve(ctx, 'package.json', candidate, signal);
    if (!target) continue;
    try {
      const info = await ctx.fs.stat(target, signal);
      if (info?.type === 'file') {
        return { dir: targetPath(ctx, target) ? dirname(targetPath(ctx, target)) : candidate, target };
      }
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  return undefined;
}

/**
 * Prefer packageManager, then the nearest lockfile, then npm.
 * @param {any} ctx Host plugin context.
 * @param {string} packageDir Directory holding package.json.
 * @param {string} root Repository root.
 * @param {object} manifest Parsed package.json.
 * @param {AbortSignal} signal request lifetime.
 * @returns {Promise<'npm' | 'pnpm' | 'yarn' | 'bun'>} package manager name.
 */
async function detectPackageManager(ctx, packageDir, root, manifest, signal) {
  if (typeof manifest.packageManager === 'string') {
    const declared = /^(npm|pnpm|yarn|bun)@/u.exec(manifest.packageManager);
    if (declared) return declared[1];
  }

  const directories = packageDir === root ? [packageDir] : [packageDir, root];
  for (const directory of directories) {
    for (const [manager, file] of LOCKFILES) {
      const target = await safeResolve(ctx, file, directory, signal);
      if (!target) continue;
      try {
        const info = await ctx.fs.stat(target, signal);
        if (info?.type === 'file') return manager;
      } catch (error) {
        if (signal.aborted) throw error;
      }
    }
  }
  return 'npm';
}

/**
 * Keep string script commands in manifest order and bound the payload.
 * @param {unknown} value package.json scripts value.
 * @returns {{ name: string, command: string }[]} displayable scripts.
 */
export function normaliseScripts(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  const scripts = [];
  for (const [name, command] of Object.entries(value)) {
    if (typeof name !== 'string' || typeof command !== 'string') continue;
    if (name.length === 0 || name.length > MAX_SCRIPT_NAME_CHARS) continue;
    if (command.length > MAX_SCRIPT_COMMAND_CHARS) continue;
    scripts.push({ name, command });
    if (scripts.length >= MAX_SCRIPTS) break;
  }
  return scripts;
}

/**
 * Parse package.json, tolerating a UTF-8 BOM.
 * @param {string} text file contents.
 * @returns {object} parsed manifest.
 */
export function parseManifest(text) {
  const source = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  let value;
  try {
    value = JSON.parse(source);
  } catch (error) {
    throw new RequestError(
      422,
      'invalid-package-json',
      `package.json could not be parsed: ${errorMessage(error)}`,
    );
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new RequestError(422, 'invalid-package-json', 'package.json must contain an object.');
  }
  return value;
}

async function safeReadText(ctx, target, signal) {
  try {
    const text = await ctx.fs.readText(target, signal);
    if (typeof text !== 'string') {
      throw new Error('package.json is not readable text');
    }
    return text;
  } catch (error) {
    if (signal.aborted) throw error;
    throw new RequestError(
      422,
      'unreadable-package-json',
      `package.json could not be read: ${errorMessage(error)}`,
    );
  }
}

async function safeResolve(ctx, path, cwd, signal) {
  try {
    return await ctx.fs.resolve(path, { cwd, signal });
  } catch (error) {
    if (signal.aborted) throw error;
    return undefined;
  }
}

async function runCommand(ctx, executable, args, cwd, signal) {
  const resolved = await ctx.subprocess.resolveExecutable(executable, undefined, signal);
  const handle = ctx.subprocess.spawn({
    argv: [resolved, ...args],
    cwd,
    stdio: {
      stdin: 'ignore',
      stdout: { maxBytes: MAX_GIT_OUTPUT_BYTES },
      stderr: { maxBytes: MAX_GIT_OUTPUT_BYTES },
    },
    graceMs: 5000,
    signal,
  });
  const outcome = await handle.done;
  return {
    code: outcome.exitCode,
    stdout: readCollected(handle.collected.stdout, MAX_GIT_OUTPUT_BYTES),
    stderr: readCollected(handle.collected.stderr, MAX_GIT_OUTPUT_BYTES),
  };
}

function readCollected(reader, limit) {
  if (!reader) return '';
  try {
    return reader.readFrom(0).text.slice(0, limit);
  } catch {
    return '';
  }
}

function assertSameOrigin(ctx, req) {
  const address = req.socket?.remoteAddress;
  if (address !== '127.0.0.1' && address !== '::1' && address !== '::ffff:127.0.0.1') {
    throw new RequestError(403, 'forbidden', 'This action is only available over loopback.');
  }
  let expected;
  try {
    expected = ctx.webServer.getOrigin();
  } catch {
    throw new RequestError(503, 'not-ready', 'The web server is not ready yet.');
  }
  const origin = req.headers.origin;
  if (origin && origin !== expected) {
    throw new RequestError(403, 'forbidden', 'This request came from a different origin.');
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    throw new RequestError(403, 'forbidden', 'Cross-site requests are not allowed.');
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let total = 0;
    const chunks = [];
    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
    req.on('data', (chunk) => {
      if (settled) return;
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        fail(new RequestError(413, 'body-too-large', 'Request body is too large.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (settled) return;
      settled = true;
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        const value = text ? JSON.parse(text) : {};
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          throw new Error('not an object');
        }
        resolve(value);
      } catch {
        reject(new RequestError(400, 'invalid-body', 'The request body is not valid JSON.'));
      }
    });
    req.on('error', (error) => fail(error));
  });
}

function send(res, status, payload) {
  if (res.writableEnded) return;
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}


export { inspectRepository };
