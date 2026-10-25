/**
 * Durable script-to-terminal bookkeeping for the restart prompt.
 *
 * Each palette launch records the script, its package and the Harness
 * terminal identity it received. The record is kept in this device's
 * localStorage so a page reload can still find the tab, while the Host
 * terminal identity makes recovery independent of any content binding.
 */

export const LAUNCHES_STORAGE_KEY = 'dsh.npm-scripts.launches.v1';
export const MAX_LAUNCHES = 200;

const LIMITS = {
  sessionId: 256,
  contentId: 512,
  tabId: 256,
  scriptName: 200,
  packageDir: 4096,
  title: 200,
};
const TERMINAL_ID = /^[\w-]{1,128}$/u;

function boundedString(value, limit) {
  return typeof value === 'string' && value.length > 0 && value.length <= limit ? value : undefined;
}

/**
 * Validate one stored launch record.
 * @param {unknown} value persisted candidate.
 * @returns {object | undefined} a normalized record, or undefined when unusable.
 */
export function normaliseLaunch(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const sessionId = boundedString(value.sessionId, LIMITS.sessionId);
  const contentId = boundedString(value.contentId, LIMITS.contentId);
  const tabId = boundedString(value.tabId, LIMITS.tabId);
  const scriptName = boundedString(value.scriptName, LIMITS.scriptName);
  const packageDir = boundedString(value.packageDir, LIMITS.packageDir);
  const title =
    typeof value.title === 'string' && value.title.length > 0
      ? value.title.slice(0, LIMITS.title)
      : scriptName;
  const terminalId =
    typeof value.terminalId === 'string' && TERMINAL_ID.test(value.terminalId)
      ? value.terminalId
      : undefined;
  const launchedAt =
    typeof value.launchedAt === 'number' && Number.isFinite(value.launchedAt) && value.launchedAt > 0
      ? value.launchedAt
      : undefined;
  if (!sessionId || !contentId || !tabId || !scriptName || !packageDir || !terminalId || !launchedAt) {
    return undefined;
  }
  return { sessionId, contentId, tabId, terminalId, scriptName, packageDir, title, launchedAt };
}

/**
 * Stable identity of the script in one Session and package.
 * @param {{ sessionId: string, packageDir: string, scriptName: string }} entry launch identity.
 * @returns {string} comparison key.
 */
export function launchKey(entry) {
  return JSON.stringify([entry.sessionId, entry.packageDir, entry.scriptName]);
}

/**
 * Keep valid records, newest first, with one record per script and package.
 * @param {unknown} value persisted launch list.
 * @returns {object[]} usable records.
 */
export function normaliseLaunches(value) {
  if (!Array.isArray(value)) return [];
  const records = [];
  for (const item of value) {
    const record = normaliseLaunch(item);
    if (record) records.push(record);
  }
  records.sort((left, right) => right.launchedAt - left.launchedAt);
  const seen = new Set();
  const unique = [];
  for (const record of records) {
    const key = launchKey(record);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(record);
    if (unique.length >= MAX_LAUNCHES) break;
  }
  return unique;
}

/**
 * Find the terminal recorded for one script.
 * @param {object[]} launches stored records.
 * @param {{ sessionId: string, packageDir: string, scriptName: string }} query script identity.
 * @returns {object | undefined} the matching record.
 */
export function findLaunch(launches, query) {
  if (!Array.isArray(launches)) return undefined;
  const key = launchKey(query);
  return launches.find((entry) => launchKey(entry) === key);
}

/**
 * Put a record first and replace any earlier terminal for the same script.
 * @param {object[]} launches stored records.
 * @param {unknown} value new record.
 * @returns {object[]} updated records, ready to persist.
 */
export function upsertLaunch(launches, value) {
  const record = normaliseLaunch(value);
  if (!record) return normaliseLaunches(launches);
  const key = launchKey(record);
  const rest = Array.isArray(launches)
    ? launches.filter((entry) => normaliseLaunch(entry) && launchKey(entry) !== key)
    : [];
  return normaliseLaunches([record, ...rest]);
}

/**
 * Drop the record for one script, if any.
 * @param {object[]} launches stored records.
 * @param {{ sessionId: string, packageDir: string, scriptName: string }} query script identity.
 * @returns {object[]} updated records, ready to persist.
 */
export function removeLaunch(launches, query) {
  if (!Array.isArray(launches)) return [];
  const key = launchKey(query);
  return normaliseLaunches(launches.filter((entry) => launchKey(entry) !== key));
}

/**
 * Read the device's launch records, tolerating missing or corrupt storage.
 * @param {Storage | undefined} storage localStorage-compatible storage.
 * @returns {object[]} usable records.
 */
export function readLaunches(storage) {
  if (!storage) return [];
  try {
    const raw = storage.getItem(LAUNCHES_STORAGE_KEY);
    return raw ? normaliseLaunches(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/**
 * Persist launch records without letting storage failures break the palette.
 * @param {Storage | undefined} storage localStorage-compatible storage.
 * @param {object[]} launches records to save.
 * @returns {void}
 */
export function writeLaunches(storage, launches) {
  if (!storage) return;
  try {
    storage.setItem(LAUNCHES_STORAGE_KEY, JSON.stringify(normaliseLaunches(launches)));
  } catch {
    // Quota or privacy restrictions leave the in-memory records usable for this page.
  }
}
