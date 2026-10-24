/**
 * Filter and rank package scripts for the npm-scripts palette.
 *
 * Names win over commands, and a prefix beats a later substring. Equal scores
 * keep package.json order so the list never jumps while typing.
 */

/**
 * @typedef {{ name: string, command: string }} Script
 * @typedef {{ field: 'name' | 'command' | '', start: number, length: number }} Match
 * @typedef {Script & { match: Match }} FilteredScript
 */

/**
 * Filter scripts by a case-insensitive substring of the name or command.
 * @param {Script[]} scripts scripts in manifest order.
 * @param {string} query raw search text.
 * @returns {FilteredScript[]} matching scripts in ranked order.
 */
export function filterScripts(scripts, query) {
  const list = Array.isArray(scripts) ? scripts : [];
  const needle = String(query ?? '').trim().toLowerCase();
  if (needle.length === 0) {
    return list.map((script) => ({
      name: script.name,
      command: script.command,
      match: { field: '', start: 0, length: 0 },
    }));
  }

  const ranked = [];
  list.forEach((script, index) => {
    const name = String(script.name ?? '');
    const command = String(script.command ?? '');
    const lowerName = name.toLowerCase();
    const lowerCommand = command.toLowerCase();
    const nameAt = lowerName.indexOf(needle);
    const commandAt = lowerCommand.indexOf(needle);

    let score = -1;
    let field = '';
    let start = 0;
    if (lowerName === needle) {
      score = 0;
      field = 'name';
      start = 0;
    } else if (lowerName.startsWith(needle)) {
      score = 1;
      field = 'name';
      start = 0;
    } else if (nameAt !== -1) {
      score = 2;
      field = 'name';
      start = nameAt;
    } else if (commandAt !== -1) {
      score = 3;
      field = 'command';
      start = commandAt;
    }

    if (score === -1) return;
    ranked.push({ script, score, index, field, start });
  });

  ranked.sort((left, right) => left.score - right.score || left.index - right.index);
  return ranked.map(({ script, field, start }) => ({
    name: script.name,
    command: script.command,
    match: { field, start, length: needle.length },
  }));
}

/**
 * Split one string into pre/match/post segments for safe highlighting.
 * @param {string} text rendered text.
 * @param {Match} match match information.
 * @param {'name' | 'command'} field the field being rendered.
 * @returns {{ before: string, hit: string, after: string }} segments.
 */
export function highlightParts(text, match, field) {
  const value = String(text ?? '');
  if (!match || match.field !== field || match.length <= 0) {
    return { before: value, hit: '', after: '' };
  }
  const start = Math.max(0, Math.min(match.start, value.length));
  const end = Math.min(value.length, start + match.length);
  return {
    before: value.slice(0, start),
    hit: value.slice(start, end),
    after: value.slice(end),
  };
}
