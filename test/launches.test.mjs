import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LAUNCHES_STORAGE_KEY,
  MAX_LAUNCHES,
  findLaunch,
  launchKey,
  normaliseLaunch,
  normaliseLaunches,
  readLaunches,
  removeLaunch,
  upsertLaunch,
  writeLaunches,
} from '../src/launches.js';

const LAUNCH = {
  sessionId: 'session-1',
  contentId: 'dsh-resource://terminal/one',
  tabId: 'tab-1',
  terminalId: 'terminal-1',
  scriptName: 'dev',
  packageDir: '/repo/apps/web',
  title: 'dev',
  launchedAt: 1_700_000_000_000,
};

function memoryStorage(initial) {
  const values = new Map(initial ? [[LAUNCHES_STORAGE_KEY, initial]] : []);
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

test('normaliseLaunch keeps a complete record', () => {
  assert.deepEqual(normaliseLaunch(LAUNCH), LAUNCH);
});

test('normaliseLaunch rejects incomplete or unsafe records', () => {
  assert.equal(normaliseLaunch(null), undefined);
  assert.equal(normaliseLaunch({ ...LAUNCH, terminalId: 'bad terminal' }), undefined);
  assert.equal(normaliseLaunch({ ...LAUNCH, scriptName: '' }), undefined);
  assert.equal(normaliseLaunch({ ...LAUNCH, launchedAt: Number.NaN }), undefined);
  assert.equal(normaliseLaunch({ ...LAUNCH, sessionId: 'x'.repeat(257) }), undefined);
});

test('a launch is identified by session, package and script', () => {
  assert.equal(launchKey(LAUNCH), launchKey({ ...LAUNCH, tabId: 'other', contentId: 'other' }));
  assert.notEqual(launchKey(LAUNCH), launchKey({ ...LAUNCH, scriptName: 'build' }));
  assert.notEqual(launchKey(LAUNCH), launchKey({ ...LAUNCH, packageDir: '/repo/apps/api' }));
});

test('upsertLaunch replaces an earlier terminal for the same script', () => {
  const older = { ...LAUNCH, launchedAt: LAUNCH.launchedAt - 1 };
  const newer = { ...LAUNCH, tabId: 'tab-2', terminalId: 'terminal-2', launchedAt: LAUNCH.launchedAt + 1 };
  const updated = upsertLaunch([older], newer);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].tabId, 'tab-2');
  assert.equal(updated[0].terminalId, 'terminal-2');
});

test('upsertLaunch keeps different scripts and packages separate', () => {
  const build = { ...LAUNCH, scriptName: 'build', launchedAt: LAUNCH.launchedAt + 1 };
  const api = { ...LAUNCH, packageDir: '/repo/apps/api', launchedAt: LAUNCH.launchedAt + 2 };
  const updated = upsertLaunch(upsertLaunch([], LAUNCH), build);
  assert.equal(updated.length, 2);
  const both = upsertLaunch(updated, api);
  assert.equal(both.length, 3);
  assert.deepEqual(
    both.map((entry) => `${entry.packageDir}:${entry.scriptName}`),
    ['/repo/apps/api:dev', '/repo/apps/web:build', '/repo/apps/web:dev'],
  );
});

test('normaliseLaunches drops duplicates, invalid records and caps the list', () => {
  const duplicate = { ...LAUNCH, launchedAt: LAUNCH.launchedAt - 100 };
  const records = normaliseLaunches([duplicate, LAUNCH, { nope: true }]);
  assert.equal(records.length, 1);
  assert.equal(records[0].launchedAt, LAUNCH.launchedAt);

  const many = Array.from({ length: MAX_LAUNCHES + 10 }, (_, index) => ({
    ...LAUNCH,
    terminalId: `terminal-${index}`,
    tabId: `tab-${index}`,
    scriptName: `script-${index}`,
    launchedAt: LAUNCH.launchedAt + index,
  }));
  assert.equal(normaliseLaunches(many).length, MAX_LAUNCHES);
  assert.equal(normaliseLaunches(many)[0].scriptName, `script-${MAX_LAUNCHES + 9}`);
});

test('findLaunch and removeLaunch use the exact script identity', () => {
  const build = { ...LAUNCH, scriptName: 'build' };
  const records = normaliseLaunches([LAUNCH, build]);
  assert.equal(findLaunch(records, LAUNCH).terminalId, 'terminal-1');
  assert.equal(findLaunch(records, { ...LAUNCH, scriptName: 'test' }), undefined);
  assert.deepEqual(
    removeLaunch(records, LAUNCH).map((entry) => entry.scriptName),
    ['build'],
  );
  assert.deepEqual(removeLaunch(records, { ...LAUNCH, scriptName: 'test' }).length, 2);
});

test('storage round-trips valid records and tolerates corruption', () => {
  const storage = memoryStorage();
  writeLaunches(storage, [LAUNCH]);
  assert.deepEqual(readLaunches(storage), [LAUNCH]);

  const corrupt = memoryStorage('{not json');
  assert.deepEqual(readLaunches(corrupt), []);
  assert.deepEqual(readLaunches(undefined), []);

  const throwing = {
    getItem: () => {
      throw new Error('unavailable');
    },
    setItem: () => {
      throw new Error('unavailable');
    },
  };
  assert.deepEqual(readLaunches(throwing), []);
  assert.doesNotThrow(() => writeLaunches(throwing, [LAUNCH]));
});
