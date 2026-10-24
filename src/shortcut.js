/**
 * Pure helpers for the npm-scripts shortcut setting.
 *
 * The binding shape matches the Harness shortcut service: physical `code`
 * values plus normalized modifier names. Keeping these helpers out of the
 * React bundle makes the fallback rules and keycap formatting testable.
 */

export const MODIFIER_ORDER = ['control', 'alt', 'shift', 'meta'];

/**
 * Display symbols for one platform.
 * @param {'macos' | 'windows' | 'linux' | string} platform active platform.
 * @returns {Record<string, string>} modifier symbols.
 */
export function modifierLabels(platform) {
  return platform === 'macos'
    ? { control: '⌃', alt: '⌥', shift: '⇧', meta: '⌘' }
    : { control: 'Ctrl', alt: 'Alt', shift: 'Shift', meta: 'Meta' };
}

/**
 * Turn a physical KeyboardEvent code into a compact keycap label.
 * @param {string} code DOM code.
 * @returns {string} display label.
 */
export function keyLabel(code) {
  if (/^Key[A-Z]$/u.test(code)) return code.slice(3);
  if (/^Digit[0-9]$/u.test(code)) return code.slice(5);
  const arrows = { ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→' };
  return arrows[code] ?? code;
}

/**
 * Format a binding as ordered keycap labels.
 * @param {{ code: string, modifiers: string[] } | null | undefined} binding binding.
 * @param {string} platform active platform.
 * @returns {string[]} modifier and key labels.
 */
export function bindingKeycaps(binding, platform) {
  if (!binding) return [];
  const symbols = modifierLabels(platform);
  const keys = MODIFIER_ORDER.filter((modifier) => binding.modifiers.includes(modifier)).map(
    (modifier) => symbols[modifier],
  );
  keys.push(keyLabel(binding.code));
  return keys;
}

/**
 * Whether a binding is exactly Option+A / Alt+A.
 * @param {{ code: string, modifiers: string[] } | null | undefined} binding binding.
 * @returns {boolean} true for the local Web fallback.
 */
export function isAltOptionA(binding) {
  return (
    Boolean(binding) &&
    binding.code === 'KeyA' &&
    binding.modifiers.length === 1 &&
    binding.modifiers[0] === 'alt'
  );
}

/**
 * Whether the local Option+A listener should still run.
 *
 * Web builds cannot register an Alt-only binding through the shortcut
 * service, so an untouched or explicitly Option+A command keeps the local
 * listener. A different saved binding, or an explicitly cleared one, turns it
 * off so the configured shortcut owns the command.
 * @param {{ modified: boolean, binding: { code: string, modifiers: string[] } | null } | undefined} row catalog row.
 * @returns {boolean} true when Option+A should be handled locally.
 */
export function isOptionAFallbackEnabled(row) {
  if (!row || !row.modified) return true;
  return isAltOptionA(row.binding);
}
