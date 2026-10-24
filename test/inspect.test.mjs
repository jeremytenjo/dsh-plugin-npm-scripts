import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, readFile, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

import { inspectRepository } from '../index.js';

function processPath(target) {
  return typeof target === 'string' ? target : target?.targetKey ?? target?.displayPath;
}

function fakeFs() {
  return {
    async resolve(path, { cwd } = {}) {
      const displayPath = resolve(cwd ?? process.cwd(), path);
      return { targetKey: await realpath(displayPath), displayPath };
    },
    async stat(target) {
      const info = await stat(processPath(target));
      return { type: info.isDirectory() ? 'directory' : info.isFile() ? 'file' : 'other' };
    },
    async readText(target) {
      return readFile(processPath(target), 'utf8');
    },
    processPath(target) {
      return typeof target === 'string' ? target : target?.targetKey ?? target?.displayPath;
    },
  };
}

function fakeSubprocess() {
  return {
    async resolveExecutable(name) {
      return name;
    },
    spawn({ argv, cwd }) {
      const [executable, ...args] = argv;
      const child = spawn(executable, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
      let stdout = '';
      let stderr = '';
      child.stdout.on('data', (chunk) => {
        stdout += chunk;
      });
      child.stderr.on('data', (chunk) => {
        stderr += chunk;
      });
      const done = new Promise((settle, fail) => {
        child.on('error', fail);
        child.on('close', (exitCode) => settle({ exitCode, signal: null }));
      });
      return {
        done,
        collected: {
          stdout: { readFrom: () => ({ text: stdout }) },
          stderr: { readFrom: () => ({ text: stderr }) },
        },
      };
    },
  };
}

function context(cwd) {
  return {
    fs: fakeFs(),
    subprocess: fakeSubprocess(),
    sessions: { get: (id) => (id === 'session-test' ? { id } : undefined) },
    workingDirectory: { get: () => cwd },
  };
}

async function withRepo(setup) {
  const root = await mkdtemp(join(tmpdir(), 'dsh-npm-scripts-'));
  try {
    await setup(root);
    return root;
  } catch (error) {
    await rm(root, { recursive: true, force: true });
    throw error;
  }
}

async function gitInit(directory) {
  await new Promise((settle, fail) => {
    const child = spawn('git', ['init', '-q'], { cwd: directory, stdio: 'ignore' });
    child.on('error', fail);
    child.on('close', (code) => (code === 0 ? settle() : fail(new Error(`git init exited ${code}`))));
  });
}

test('inspects a Git repository at its root', async () => {
  const root = await withRepo(async (directory) => {
    await writeFile(
      join(directory, 'package.json'),
      JSON.stringify({
        name: 'demo-app',
        packageManager: 'pnpm@9.15.0',
        scripts: { dev: 'vite', build: 'vite build', broken: 7 },
      }),
    );
    await gitInit(directory);
  });
  try {
    const repo = await inspectRepository(context(root), root, new AbortController().signal);
    assert.equal(repo.isRepo, true);
    assert.equal(repo.name, root.split('/').at(-1));
    assert.equal(repo.packageName, 'demo-app');
    assert.equal(repo.packagePath, '.');
    assert.equal(repo.manager, 'pnpm');
    assert.deepEqual(repo.scripts, [
      { name: 'dev', command: 'vite' },
      { name: 'build', command: 'vite build' },
    ]);
    assert.equal(repo.total, 2);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('uses the nearest package.json and the root lockfile in a monorepo', async () => {
  const root = await withRepo(async (directory) => {
    await writeFile(join(directory, 'package.json'), JSON.stringify({ name: 'monorepo', scripts: { root: 'echo root' } }));
    await writeFile(join(directory, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
    await mkdir(join(directory, 'apps', 'web'), { recursive: true });
    await writeFile(
      join(directory, 'apps', 'web', 'package.json'),
      JSON.stringify({ name: 'web', scripts: { dev: 'vite', build: 'vite build' } }),
    );
    await gitInit(directory);
  });
  try {
    const cwd = join(root, 'apps', 'web');
    const repo = await inspectRepository(context(cwd), cwd, new AbortController().signal);
    assert.equal(repo.packagePath, 'apps/web');
    assert.equal(repo.packageName, 'web');
    assert.equal(repo.manager, 'pnpm');
    assert.deepEqual(
      repo.scripts.map((script) => script.name),
      ['dev', 'build'],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('falls back to the session folder when Git is not a repository', async () => {
  const root = await withRepo(async (directory) => {
    await writeFile(join(directory, 'package.json'), JSON.stringify({ name: 'plain', scripts: { test: 'node --test' } }));
  });
  try {
    const repo = await inspectRepository(context(root), root, new AbortController().signal);
    assert.equal(repo.isRepo, false);
    assert.equal(repo.root, await realpath(root));
    assert.equal(repo.manager, 'npm');
    assert.deepEqual(repo.scripts, [{ name: 'test', command: 'node --test' }]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('reports a missing package.json with a stable code', async () => {
  const root = await withRepo(async () => {});
  try {
    await assert.rejects(
      () => inspectRepository(context(root), root, new AbortController().signal),
      (error) => error.code === 'no-package-json' && error.status === 404,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('reports an unreadable package.json with a stable code', async () => {
  const root = await withRepo(async (directory) => {
    await writeFile(join(directory, 'package.json'), '{ "scripts": ');
  });
  try {
    await assert.rejects(
      () => inspectRepository(context(root), root, new AbortController().signal),
      (error) => error.code === 'invalid-package-json' && error.status === 422,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
