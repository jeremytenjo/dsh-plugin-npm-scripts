import assert from 'node:assert/strict';
import test from 'node:test';

import { filterScripts, highlightParts } from '../src/filter.js';

const SCRIPTS = [
  { name: 'build', command: 'vite build' },
  { name: 'build:watch', command: 'vite build --watch' },
  { name: 'test', command: 'vitest run' },
  { name: 'release', command: 'npm run build && changeset publish' },
];

test('a blank query keeps manifest order and every script', () => {
  const result = filterScripts(SCRIPTS, '  ');
  assert.deepEqual(
    result.map((script) => script.name),
    ['build', 'build:watch', 'test', 'release'],
  );
  assert.deepEqual(result[0].match, { field: '', start: 0, length: 0 });
});

test('an exact name outranks a prefix, which outranks a substring', () => {
  const result = filterScripts(SCRIPTS, 'build');
  assert.deepEqual(
    result.map((script) => script.name),
    ['build', 'build:watch', 'release'],
  );
  assert.equal(result[0].match.field, 'name');
  assert.equal(result[0].match.start, 0);
  assert.equal(result[2].match.field, 'command');
});

test('a name match outranks a command-only match', () => {
  const result = filterScripts(SCRIPTS, 'changeset');
  assert.deepEqual(
    result.map((script) => script.name),
    ['release'],
  );
  assert.equal(result[0].match.field, 'command');
  assert.ok(result[0].match.start > 0);
});

test('filtering is case-insensitive and ignores surrounding whitespace', () => {
  const result = filterScripts(SCRIPTS, '  TEST  ');
  assert.deepEqual(
    result.map((script) => script.name),
    ['test'],
  );
});

test('no matches produces an empty list', () => {
  assert.deepEqual(filterScripts(SCRIPTS, 'deploy'), []);
});

test('highlightParts slices only the matching field', () => {
  const [script] = filterScripts(SCRIPTS, 'watch');
  assert.deepEqual(highlightParts(script.name, script.match, 'name'), {
    before: 'build:',
    hit: 'watch',
    after: '',
  });
  assert.deepEqual(highlightParts(script.command, script.match, 'command'), {
    before: 'vite build --watch',
    hit: '',
    after: '',
  });
});

test('filter tolerates a malformed script list', () => {
  assert.deepEqual(filterScripts(null, 'build'), []);
  assert.deepEqual(filterScripts([{ name: 'x', command: 'y' }], 'x')[0].match.length, 1);
});
