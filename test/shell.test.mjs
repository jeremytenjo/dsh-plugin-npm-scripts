import assert from 'node:assert/strict';
import test from 'node:test';

import { buildRunCommand, shellQuote } from '../src/shell.js';

test('POSIX quoting wraps plain values in single quotes', () => {
  assert.equal(shellQuote('build', 'macos'), "'build'");
  assert.equal(shellQuote('test:unit', 'linux'), "'test:unit'");
});

test('POSIX quoting escapes embedded single quotes', () => {
  assert.equal(shellQuote("it's", 'macos'), "'it'\\''s'");
});

test('PowerShell quoting doubles embedded single quotes', () => {
  assert.equal(shellQuote("it's", 'windows'), "'it''s'");
});

test('a NUL byte is rejected', () => {
  assert.throws(() => shellQuote('bad\0name', 'macos'), /NUL/);
});

test('the command omits cd when the package is the session directory', () => {
  assert.equal(
    buildRunCommand({
      manager: 'pnpm',
      scriptName: 'dev',
      packageDir: '/repo/apps/web/',
      cwd: '/repo/apps/web',
      platform: 'macos',
    }),
    "pnpm run 'dev'",
  );
});

test('the command changes into the package directory when needed', () => {
  assert.equal(
    buildRunCommand({
      manager: 'npm',
      scriptName: 'build',
      packageDir: '/repo/packages/ui',
      cwd: '/repo',
      platform: 'macos',
    }),
    "cd '/repo/packages/ui' && npm run 'build'",
  );
});

test('an unknown manager falls back to npm', () => {
  assert.equal(
    buildRunCommand({ manager: 'pnpx', scriptName: 'lint', platform: 'linux' }),
    "npm run 'lint'",
  );
});

test('an empty script name is rejected', () => {
  assert.throws(() => buildRunCommand({ manager: 'npm', scriptName: '' }), /required/);
});
