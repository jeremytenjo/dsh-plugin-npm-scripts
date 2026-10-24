import assert from 'node:assert/strict';
import test from 'node:test';

import {
  bindingKeycaps,
  isAltOptionA,
  isOptionAFallbackEnabled,
  keyLabel,
} from '../src/shortcut.js';

test('keyLabel turns physical codes into compact labels', () => {
  assert.equal(keyLabel('KeyA'), 'A');
  assert.equal(keyLabel('Digit1'), '1');
  assert.equal(keyLabel('ArrowUp'), '↑');
  assert.equal(keyLabel('Space'), 'Space');
});

test('macOS bindings render modifiers in shortcut-service order', () => {
  assert.deepEqual(bindingKeycaps({ code: 'KeyA', modifiers: ['alt'] }, 'macos'), ['⌥', 'A']);
  assert.deepEqual(
    bindingKeycaps({ code: 'KeyY', modifiers: ['meta', 'alt', 'shift'] }, 'macos'),
    ['⌥', '⇧', '⌘', 'Y'],
  );
});

test('Windows bindings use word labels', () => {
  assert.deepEqual(
    bindingKeycaps({ code: 'KeyK', modifiers: ['control', 'shift'] }, 'windows'),
    ['Ctrl', 'Shift', 'K'],
  );
});

test('a missing binding renders no keycaps', () => {
  assert.deepEqual(bindingKeycaps(null, 'macos'), []);
});

test('isAltOptionA accepts only Option+A', () => {
  assert.equal(isAltOptionA({ code: 'KeyA', modifiers: ['alt'] }), true);
  assert.equal(isAltOptionA({ code: 'KeyA', modifiers: ['alt', 'shift'] }), false);
  assert.equal(isAltOptionA({ code: 'KeyB', modifiers: ['alt'] }), false);
  assert.equal(isAltOptionA(null), false);
});

test('the local fallback survives an untouched or explicitly Option+A row', () => {
  assert.equal(isOptionAFallbackEnabled(undefined), true);
  assert.equal(
    isOptionAFallbackEnabled({ modified: false, binding: null }),
    true,
  );
  assert.equal(
    isOptionAFallbackEnabled({ modified: true, binding: { code: 'KeyA', modifiers: ['alt'] } }),
    true,
  );
});

test('the local fallback turns off for another binding or an explicit clear', () => {
  assert.equal(
    isOptionAFallbackEnabled({
      modified: true,
      binding: { code: 'KeyY', modifiers: ['meta', 'alt', 'shift'] },
    }),
    false,
  );
  assert.equal(isOptionAFallbackEnabled({ modified: true, binding: null }), false);
});
