import assert from 'node:assert/strict';
import test from 'node:test';

import { normaliseScripts, parseManifest } from '../index.js';

test('normaliseScripts keeps string commands in manifest order', () => {
  assert.deepEqual(
    normaliseScripts({ dev: 'vite', build: 'vite build', broken: 42, '': 'echo' }),
    [
      { name: 'dev', command: 'vite' },
      { name: 'build', command: 'vite build' },
    ],
  );
});

test('normaliseScripts rejects non-objects', () => {
  assert.deepEqual(normaliseScripts(null), []);
  assert.deepEqual(normaliseScripts(['dev']), []);
});

test('parseManifest accepts a UTF-8 BOM', () => {
  assert.deepEqual(parseManifest('\uFEFF{"name":"demo","scripts":{"dev":"vite"}}').name, 'demo');
});

test('parseManifest reports an invalid document with a stable code', () => {
  assert.throws(
    () => parseManifest('{ nope'),
    (error) => error.code === 'invalid-package-json' && error.status === 422,
  );
});

test('parseManifest rejects a non-object root', () => {
  assert.throws(
    () => parseManifest('[]'),
    (error) => error.code === 'invalid-package-json',
  );
});
