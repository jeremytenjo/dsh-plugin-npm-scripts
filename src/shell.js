/**
 * Build the command typed into the new terminal.
 *
 * Script names are quoted for the target shell instead of being trusted as
 * shell syntax. macOS and Linux use POSIX single quotes; Windows uses the
 * PowerShell single-quoted form because the Harness terminal defaults to
 * PowerShell there.
 */

export const PACKAGE_MANAGERS = new Set(['npm', 'pnpm', 'yarn', 'bun']);

/**
 * Quote one literal argument for the target shell.
 * @param {string} value plain text.
 * @param {'macos' | 'windows' | 'linux' | string} platform target platform.
 * @returns {string} safely quoted shell word.
 */
export function shellQuote(value, platform = 'macos') {
  const text = String(value ?? '');
  if (text.includes('\0')) throw new Error('A script value contains a NUL byte.');
  if (platform === 'windows') {
    return `'${text.replaceAll("'", "''")}'`;
  }
  return `'${text.replaceAll("'", "'\\''")}'`;
}

/**
 * Compose a `cd … && <manager> run <script>` command for a new terminal.
 * @param {object} input command context.
 * @param {string} input.manager detected package manager.
 * @param {string} input.scriptName package.json script key.
 * @param {string} [input.packageDir] directory holding package.json.
 * @param {string} [input.cwd] Session working directory.
 * @param {string} [input.platform] target platform.
 * @returns {string} command typed into the shell.
 */
export function buildRunCommand({ manager, scriptName, packageDir, cwd, platform = 'macos' }) {
  const executable = PACKAGE_MANAGERS.has(manager) ? manager : 'npm';
  const name = String(scriptName ?? '');
  if (name.length === 0) throw new Error('A script name is required.');

  const run = `${executable} run ${shellQuote(name, platform)}`;
  const directory = typeof packageDir === 'string' ? packageDir.replace(/[\\/]+$/u, '') : '';
  const session = typeof cwd === 'string' ? cwd.replace(/[\\/]+$/u, '') : '';
  if (!directory || !session || directory === session) return run;
  return `cd ${shellQuote(directory, platform)} && ${run}`;
}
