/**
 * Browser half of dsh-plugin-npm-scripts.
 *
 * Option+A opens a command-palette modal for the active Session's nearest
 * package.json. The list is filtered locally, fully keyboard driven, and a
 * selection starts a new Harness terminal tab with the chosen script typed in.
 *
 * This file is the source; scripts/build-client.mjs bundles it into client.js.
 */

import * as React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { filterScripts, highlightParts } from './filter.js';
import { buildRunCommand } from './shell.js';

const h = React.createElement;
const NS = 'dshNpmScripts';
const ROUTE = '/__dsh/npm-scripts';
const MODAL_NAME = 'npm-scripts';
const TAB_TIMEOUT_MS = 6000;
const ATTACH_TIMEOUT_MS = 16000;
const PROMPT_DELAY_MS = 160;
const TOGGLE_GUARD_MS = 80;

const EN = {
  title: 'Run npm script',
  shortcutLabel: 'Run npm script',
  subtitle: '{repo} · {packagePath} · {manager}',
  subtitleRepoOnly: '{repo} · {manager}',
  searchPlaceholder: 'Search scripts…',
  searchLabel: 'Search scripts',
  scriptsLabel: 'Scripts',
  close: 'Close dialog',
  loading: 'Reading package.json…',
  empty: 'This package.json defines no scripts.',
  noMatches: 'No scripts match “{query}”.',
  errorTitle: 'Could not load scripts',
  terminalErrorTitle: 'Could not start the terminal',
  retry: 'Retry',
  runFailed: 'The terminal could not be started. {message}',
  starting: 'Starting “{name}”…',
  startingHint: 'Waiting for the new terminal…',
  enterToRun: 'Enter to run',
  navigate: 'Navigate',
  run: 'Run',
  esc: 'Close',
  countOne: '1 script',
  countMany: '{count} scripts',
  matchesOne: '1 match',
  matchesMany: '{count} matches',
  noSession: 'Open a session first.',
  sessionMissing: 'The active session is no longer available.',
  directoryMissing: 'The repository folder is no longer available.',
  noPackage: 'No package.json was found in this repository.',
  invalidManifest: 'package.json could not be read.',
  networkError: 'Could not reach the DeepSeek Harness host.',
  unreadable: 'The script list returned an unreadable response.',
  requestFailed: 'Could not read the scripts for this repository.',
  timedOut: 'Reading the repository timed out.',
  terminalUnavailable: 'The terminal panel is not available in this window.',
  terminalTimeout: 'The new terminal did not become ready in time.',
  filterResults: '{count} scripts match “{query}”.',
  filterResultOne: '1 script matches “{query}”.',
  allScripts: '{count} scripts available.',
  allScriptOne: '1 script available.',
  running: 'Running',
  script: 'script',
};

const ZH = {
  title: '运行 npm 脚本',
  shortcutLabel: '运行 npm 脚本',
  subtitle: '{repo} · {packagePath} · {manager}',
  subtitleRepoOnly: '{repo} · {manager}',
  searchPlaceholder: '搜索脚本…',
  searchLabel: '搜索脚本',
  scriptsLabel: '脚本',
  close: '关闭对话框',
  loading: '正在读取 package.json…',
  empty: '这个 package.json 没有定义脚本。',
  noMatches: '没有匹配“{query}”的脚本。',
  errorTitle: '无法加载脚本',
  terminalErrorTitle: '无法启动终端',
  retry: '重试',
  runFailed: '无法启动终端。{message}',
  starting: '正在启动“{name}”…',
  startingHint: '正在等待新终端…',
  enterToRun: '回车运行',
  navigate: '导航',
  run: '运行',
  esc: '关闭',
  countOne: '1 个脚本',
  countMany: '{count} 个脚本',
  matchesOne: '1 个匹配',
  matchesMany: '{count} 个匹配',
  noSession: '请先打开一个会话。',
  sessionMissing: '当前会话已不可用。',
  directoryMissing: '仓库文件夹已不可用。',
  noPackage: '在此仓库中找不到 package.json。',
  invalidManifest: '无法读取 package.json。',
  networkError: '无法连接到 DeepSeek Harness 主机。',
  unreadable: '脚本列表返回了无法解析的响应。',
  requestFailed: '无法读取此仓库的脚本。',
  timedOut: '读取仓库超时。',
  terminalUnavailable: '此窗口中没有可用的终端面板。',
  terminalTimeout: '新终端未能及时就绪。',
  filterResults: '{count} 个脚本匹配“{query}”。',
  filterResultOne: '1 个脚本匹配“{query}”。',
  allScripts: '共 {count} 个脚本。',
  allScriptOne: '共 1 个脚本。',
  running: '正在运行',
  script: '脚本',
};

const STYLES = `
.dsnpm-root {
  box-sizing: border-box;
}
.dsnpm-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: max(24px, 9vh) 16px 24px;
  background: rgba(9, 11, 15, 0.42);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  animation: dsnpm-fade 120ms ease-out;
}
.dsnpm-dialog {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: min(620px, calc(100vw - 32px));
  max-height: min(620px, calc(100vh - 56px));
  overflow: hidden;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1, #ffffff);
  color: var(--dsw-alias-label-primary, #16181d);
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.3),
    0 3px 10px rgba(0, 0, 0, 0.12);
  outline: none;
  animation: dsnpm-pop 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  font-family: inherit;
}
.dsnpm-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 17px 16px 0 18px;
}
.dsnpm-glyph {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-top: 1px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-brand-primary, #4d6bfe);
}
.dsnpm-glyph svg {
  width: 18px;
  height: 18px;
}
.dsnpm-heading {
  min-width: 0;
  flex: 1;
}
.dsnpm-title {
  margin: 0;
  color: var(--dsw-alias-label-primary, #16181d);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}
.dsnpm-subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  margin: 3px 0 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 11.5px;
  line-height: 1.4;
  white-space: nowrap;
}
.dsnpm-subtitleText {
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsnpm-manager {
  flex: none;
  margin-left: 1px;
  padding: 1px 6px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: 0.02em;
}
.dsnpm-close {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 1px 0 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease;
}
.dsnpm-close:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-primary, #16181d);
}
.dsnpm-close:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #4d6bfe);
  outline-offset: 1px;
}
.dsnpm-close:disabled {
  opacity: 0.45;
  cursor: default;
}
.dsnpm-close svg {
  width: 15px;
  height: 15px;
}
.dsnpm-searchWrap {
  position: relative;
  margin: 14px 18px 0;
  flex: none;
}
.dsnpm-searchIcon {
  position: absolute;
  top: 50%;
  left: 11px;
  width: 14px;
  height: 14px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  pointer-events: none;
  transform: translateY(-50%);
}
.dsnpm-search {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  margin: 0;
  padding: 0 12px 0 33px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-label-primary, #16181d);
  font: inherit;
  font-size: 13px;
  outline: none;
  transition: border-color 100ms ease, background 100ms ease;
}
.dsnpm-search::placeholder {
  color: var(--dsw-alias-label-tertiary, #8a8f98);
}
.dsnpm-search:focus {
  border-color: var(--dsw-alias-brand-primary, #4d6bfe);
  background: var(--dsw-alias-bg-layer-1, #ffffff);
}
.dsnpm-search:disabled {
  opacity: 0.6;
}
.dsnpm-listWrap {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 116px;
  overflow: hidden;
}
.dsnpm-list {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 8px 10px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}
.dsnpm-list::-webkit-scrollbar {
  width: 8px;
}
.dsnpm-list::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 8px;
  background: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  background-clip: content-box;
}
.dsnpm-row {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  margin: 0;
  padding: 7px 10px 7px 11px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  user-select: none;
}
.dsnpm-row + .dsnpm-row {
  margin-top: 1px;
}
.dsnpm-row:hover {
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
}
.dsnpm-row[data-active="true"] {
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary, #4d6bfe);
}
.dsnpm-rowBody {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  padding-top: 1px;
}
.dsnpm-rowName {
  overflow: hidden;
  color: var(--dsw-alias-label-primary, #16181d);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12.5px;
  font-weight: 550;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsnpm-rowCommand {
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsnpm-mark {
  background: transparent;
  color: var(--dsw-alias-brand-primary, #4d6bfe);
  font-weight: 700;
}
.dsnpm-enter {
  flex: none;
  align-self: center;
  min-width: 18px;
  color: var(--dsw-alias-brand-primary, #4d6bfe);
  font-size: 12px;
  opacity: 0;
  transform: translateX(-2px);
  transition: opacity 100ms ease, transform 100ms ease;
}
.dsnpm-row[data-active="true"] .dsnpm-enter {
  opacity: 1;
  transform: translateX(0);
}
.dsnpm-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 150px;
  padding: 26px 24px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 12.5px;
  line-height: 1.5;
  text-align: center;
}
.dsnpm-state strong {
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-weight: 600;
}
.dsnpm-stateGlyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-bottom: 1px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-label-tertiary, #8a8f98);
}
.dsnpm-stateGlyph svg {
  width: 17px;
  height: 17px;
}
.dsnpm-spinner {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.28));
  border-top-color: var(--dsw-alias-brand-primary, #4d6bfe);
  border-radius: 50%;
  animation: dsnpm-spin 700ms linear infinite;
}
.dsnpm-skeletons {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px 10px 8px;
}
.dsnpm-skeleton {
  height: 36px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  animation: dsnpm-pulse 1.2s ease-in-out infinite;
}
.dsnpm-alert {
  margin: 12px 18px 0;
  padding: 9px 11px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-state-error-primary, #d33b3b);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.dsnpm-alertTitle {
  display: block;
  margin-bottom: 2px;
  color: var(--dsw-alias-label-primary, #16181d);
  font-weight: 600;
}
.dsnpm-retry {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  margin-top: 8px;
  padding: 0 10px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-1, #ffffff);
  color: var(--dsw-alias-label-primary, #16181d);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
}
.dsnpm-retry:hover {
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
}
.dsnpm-retry:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #4d6bfe);
  outline-offset: 1px;
}
.dsnpm-footer {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 38px;
  padding: 7px 15px;
  border-top: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.2));
  background: var(--dsw-alias-bg-layer-1, #ffffff);
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 11px;
  line-height: 1.4;
}
.dsnpm-hints {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
}
.dsnpm-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.dsnpm-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 15px;
  height: 17px;
  padding: 0 4px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.26));
  border-radius: 4px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-family: inherit;
  font-size: 10px;
  line-height: 1;
}
.dsnpm-count {
  flex: none;
  font-variant-numeric: tabular-nums;
}
.dsnpm-running {
  display: flex;
  flex: none;
  align-items: center;
  gap: 7px;
  min-width: 0;
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-size: 11.5px;
}
.dsnpm-runningName {
  overflow: hidden;
  color: var(--dsw-alias-label-primary, #16181d);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsnpm-running .dsnpm-spinner {
  width: 13px;
  height: 13px;
}
.dsnpm-srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
}
.dsnpm-list[aria-busy="true"] {
  opacity: 0.55;
  pointer-events: none;
}
@keyframes dsnpm-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dsnpm-pop {
  from { opacity: 0; transform: translateY(-6px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes dsnpm-spin {
  to { transform: rotate(360deg); }
}
@keyframes dsnpm-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .dsnpm-overlay,
  .dsnpm-dialog,
  .dsnpm-skeleton,
  .dsnpm-spinner {
    animation: none;
  }
  .dsnpm-enter {
    transition: none;
  }
}
@media (max-width: 520px) {
  .dsnpm-overlay {
    padding: 12px;
    align-items: flex-start;
  }
  .dsnpm-dialog {
    width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
  }
  .dsnpm-head {
    padding: 14px 13px 0 14px;
  }
  .dsnpm-searchWrap {
    margin: 12px 14px 0;
  }
  .dsnpm-footer {
    padding: 7px 12px;
  }
  .dsnpm-hints .dsnpm-hintRun,
  .dsnpm-hints .dsnpm-hintNavigate {
    display: none;
  }
}
`;

/**
 * Read one translation with an English fallback.
 * @param {any} ctx client context.
 * @returns {(key: string, values?: Record<string, unknown>) => string} translator.
 */
function useTranslate(ctx) {
  const [, bump] = React.useReducer((value) => value + 1, 0);
  React.useEffect(() => ctx.locale.subscribe(bump), [ctx]);
  const bind = React.useMemo(() => ctx.locale.bind(NS), [ctx]);
  return React.useCallback(
    (key, values) => {
      let copy;
      try {
        copy = bind(key);
      } catch {
        copy = EN[key];
      }
      if (typeof copy !== 'string' || copy === key) copy = EN[key] ?? key;
      if (values) {
        for (const [name, value] of Object.entries(values)) {
          copy = copy.replaceAll(`{${name}}`, String(value));
        }
      }
      return copy;
    },
    [bind],
  );
}

function countLabel(t, count, one, many) {
  return t(count === 1 ? one : many, { count });
}

function activeSessionId(ctx) {
  if (ctx.layout.panelInfo.getSnapshot().activePanelId !== null) return undefined;
  const sessions = ctx.sessions.list.getSnapshot().byId;
  const row = Object.values(sessions).find((session) => (session.retainedBy?.mainView ?? 0) > 0);
  return typeof row?.id === 'string' ? row.id : undefined;
}

function hasForeignModal() {
  return Boolean(
    document.querySelector(
      '[role="dialog"][aria-modal="true"]:not([data-shortcut-modal="npm-scripts"]), [role="menu"]',
    ),
  );
}

/**
 * Own the palette lifecycle outside React so the shortcut service can open it.
 * @param {any} ctx client context.
 * @returns controller with stable subscribe/getState methods.
 */
function createController(ctx) {
  let state = {
    open: false,
    sessionId: undefined,
    phase: 'idle',
    repo: null,
    error: null,
    query: '',
    running: null,
  };
  let request;
  let requestId = 0;
  let launched = 0;
  let lastToggleAt = 0;
  const listeners = new Set();

  function set(patch) {
    state = { ...state, ...patch };
    for (const listener of listeners) listener();
  }

  function disconnect() {
    if (request) {
      request.abort();
      request = undefined;
    }
    requestId += 1;
  }

  const controller = {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getState() {
      return state;
    },
    open(sessionId) {
      if (typeof sessionId !== 'string' || sessionId.length === 0) return;
      if (state.open && state.sessionId === sessionId) return;
      disconnect();
      const id = requestId;
      const abort = new AbortController();
      request = abort;
      launched += 1;
      set({
        open: true,
        sessionId,
        phase: 'loading',
        repo: null,
        error: null,
        query: '',
        running: null,
      });
      void loadScripts(sessionId, abort.signal, id);
    },
    close() {
      if (!state.open && state.phase === 'idle') return;
      disconnect();
      set({ open: false, phase: 'idle', repo: null, error: null, query: '', running: null });
    },
    toggle(sessionId) {
      const now = Date.now();
      if (now - lastToggleAt < TOGGLE_GUARD_MS) return;
      lastToggleAt = now;
      if (state.running) return;
      if (state.open) controller.close();
      else controller.open(sessionId);
    },
    setQuery(query) {
      set({ query: String(query ?? '') });
    },
    retry() {
      const sessionId = state.sessionId;
      if (!sessionId) return;
      disconnect();
      const id = requestId;
      const abort = new AbortController();
      request = abort;
      set({ phase: 'loading', repo: null, error: null, query: '', running: null });
      void loadScripts(sessionId, abort.signal, id);
    },
    async run(script) {
      if (state.running || state.phase !== 'ready' || !state.repo || !state.sessionId) return;
      const repo = state.repo;
      const sessionId = state.sessionId;
      const token = launched + 1;
      launched = token;
      set({ running: { name: script.name }, error: null });
      try {
        const command = buildRunCommand({
          manager: repo.manager,
          scriptName: script.name,
          packageDir: repo.packageDir,
          cwd: repo.cwd,
          platform: ctx.shortcuts.platform,
        });
        await launchTerminal(ctx, sessionId, command, script.name);
        if (launched !== token) return;
        set({ open: false, phase: 'idle', repo: null, query: '', running: null });
      } catch (error) {
        if (launched !== token) return;
        set({
          running: null,
          error: { code: 'terminal-failed', message: error instanceof Error ? error.message : String(error) },
        });
      }
    },
  };

  async function loadScripts(sessionId, signal, id) {
    try {
      const repo = await requestScripts(sessionId, signal);
      if (signal.aborted || id !== requestId || !state.open) return;
      set({ phase: 'ready', repo, error: null });
    } catch (error) {
      if (signal.aborted || id !== requestId) return;
      set({
        phase: 'failed',
        repo: null,
        error: { code: error?.code || 'request-failed', message: error?.message || '' },
      });
    }
  }

  return controller;
}

async function requestScripts(sessionId, signal) {
  let response;
  try {
    response = await fetch(ROUTE, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'list', sessionId }),
      signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    const failure = new Error('network');
    failure.code = 'network';
    throw failure;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    const failure = new Error('unreadable');
    failure.code = 'unreadable';
    throw failure;
  }
  if (!response.ok || !data || data.ok !== true) {
    const failure = new Error(
      typeof data?.error === 'string' && data.error ? data.error : 'request-failed',
    );
    failure.code = typeof data?.code === 'string' ? data.code : 'request-failed';
    throw failure;
  }
  return readRepository(data.repo);
}

function readRepository(value) {
  const repo = value && typeof value === 'object' ? value : {};
  const scripts = Array.isArray(repo.scripts)
    ? repo.scripts
        .slice(0, 1000)
        .filter((script) => script && typeof script.name === 'string' && typeof script.command === 'string')
        .map((script) => ({ name: script.name.slice(0, 200), command: script.command.slice(0, 4000) }))
    : [];
  return {
    isRepo: Boolean(repo.isRepo),
    root: typeof repo.root === 'string' ? repo.root : '',
    name: typeof repo.name === 'string' ? repo.name : 'repository',
    cwd: typeof repo.cwd === 'string' ? repo.cwd : '',
    packageDir: typeof repo.packageDir === 'string' ? repo.packageDir : '',
    packagePath: typeof repo.packagePath === 'string' ? repo.packagePath : '.',
    packageName: typeof repo.packageName === 'string' ? repo.packageName : '',
    manager: ['npm', 'pnpm', 'yarn', 'bun'].includes(repo.manager) ? repo.manager : 'npm',
    scripts,
    total: Number.isInteger(repo.total) ? repo.total : scripts.length,
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForTerminalTab(ctx, sessionId, before) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let unsubscribe = () => {};
    const timer = setTimeout(() => finish(new Error('The new terminal tab did not appear.')), TAB_TIMEOUT_MS);
    function finish(error, tab) {
      if (settled) return;
      settled = true;
      unsubscribe();
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(tab);
    }
    function check() {
      if (settled) return;
      const tabs = ctx.sidebarRight.openTabs.getSnapshot();
      const tab = tabs.find(
        (entry) => entry.sessionId === sessionId && entry.kind === 'terminal' && !before.has(entry.tabId),
      );
      if (tab) finish(undefined, tab);
    }
    unsubscribe = ctx.sidebarRight.openTabs.subscribe(check);
    if (settled) unsubscribe();
    else check();
  });
}

function waitForWritable(view) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let unsubscribe = () => {};
    const timer = setTimeout(() => finish(new Error('The terminal did not become writable.')), ATTACH_TIMEOUT_MS);
    function finish(error) {
      if (settled) return;
      settled = true;
      unsubscribe();
      clearTimeout(timer);
      if (error) reject(error);
      else resolve();
    }
    function inspect() {
      if (settled) return;
      const snapshot = view.state.getSnapshot();
      if (snapshot.writable) {
        finish();
        return;
      }
      if (snapshot.phase === 'failed' || snapshot.phase === 'closed') {
        finish(
          new Error(
            snapshot.error instanceof Error
              ? snapshot.error.message
              : typeof snapshot.issue === 'string' && snapshot.issue
                ? snapshot.issue
                : 'The terminal stopped before it was ready.',
          ),
        );
      }
    }
    unsubscribe = view.state.subscribe(inspect);
    if (settled) unsubscribe();
    else inspect();
  });
}

/**
 * Open a terminal tab, wait for its shell, then type the command.
 * @param {any} ctx client context.
 * @param {string} sessionId active Session.
 * @param {string} command shell command.
 * @param {string} title terminal tab title.
 */
async function launchTerminal(ctx, sessionId, command, title) {
  if (!ctx.webTerminals || typeof ctx.webTerminals.view !== 'function') {
    throw new Error('terminal-unavailable');
  }
  if (!ctx.sidebarRight || typeof ctx.sidebarRight.openTab !== 'function') {
    throw new Error('terminal-unavailable');
  }

  const before = new Set(
    ctx.sidebarRight.openTabs
      .getSnapshot()
      .filter((tab) => tab.sessionId === sessionId && tab.kind === 'terminal')
      .map((tab) => tab.tabId),
  );

  try {
    ctx.sidebarRight.openTab('terminal');
  } catch (error) {
    throw new Error(
      error instanceof Error && error.message ? error.message : 'terminal-unavailable',
    );
  }

  const tab = await waitForTerminalTab(ctx, sessionId, before);
  if (!tab) throw new Error('terminal-timeout');

  const view = ctx.webTerminals.view(sessionId, tab.tabId, tab.contentId);
  if (!view) throw new Error('terminal-unavailable');

  try {
    await waitForWritable(view);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'terminal-timeout');
  }

  void view.rename(title).catch(() => {});
  await delay(PROMPT_DELAY_MS);
  view.write(`${command}\r`);
}

function errorCopy(t, error) {
  const code = error?.code || '';
  if (code === 'session-missing' || code === 'session-required') return t('sessionMissing');
  if (code === 'no-working-directory' || code === 'directory-unavailable') return t('directoryMissing');
  if (code === 'no-package-json') return t('noPackage');
  if (code === 'invalid-package-json' || code === 'unreadable-package-json') {
    return t('invalidManifest');
  }
  if (code === 'network') return t('networkError');
  if (code === 'unreadable') return t('unreadable');
  if (code === 'timeout') return t('timedOut');
  if (code === 'terminal-failed') {
    const message = error?.message && error.message !== 'terminal-unavailable' ? error.message : '';
    if (message.includes('terminal-unavailable')) return t('terminalUnavailable');
    if (message.includes('did not become') || message.includes('did not appear')) {
      return t('terminalTimeout');
    }
    return message || t('requestFailed');
  }
  if (code === 'terminal-unavailable') return t('terminalUnavailable');
  if (code === 'terminal-timeout') return t('terminalTimeout');
  return error?.message || t('requestFailed');
}

function RunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m7 8 4 4-4 4" />
      <path d="M13 16h4" />
      <rect x="3" y="4" width="18" height="16" rx="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M8 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M9 12h6M9 16h4M8 3v4h8V3" />
    </svg>
  );
}

function Highlight({ text, match, field }) {
  const parts = highlightParts(text, match, field);
  return (
    <>
      {parts.before}
      {parts.hit ? <mark className="dsnpm-mark">{parts.hit}</mark> : null}
      {parts.after}
    </>
  );
}

function ScriptRow({ script, index, active, running, onActivate, onRun }) {
  return (
    <div
      role="option"
      id={`dsnpm-option-${index}`}
      data-index={index}
      data-active={active ? 'true' : 'false'}
      aria-selected={active}
      className="dsnpm-row"
      onMouseEnter={onActivate}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        if (!running) onRun(script);
      }}
    >
      <span className="dsnpm-rowBody">
        <span className="dsnpm-rowName">
          <Highlight text={script.name} match={script.match} field="name" />
        </span>
        <span className="dsnpm-rowCommand">
          <Highlight text={script.command} match={script.match} field="command" />
        </span>
      </span>
      <span className="dsnpm-enter" aria-hidden="true">
        ↵
      </span>
    </div>
  );
}

function Dialog({ ctx, controller, state, t, dialogRef, searchRef, titleId, descriptionId, listId }) {
  const filtered = React.useMemo(
    () => filterScripts(state.repo?.scripts ?? [], state.query),
    [state.repo, state.query],
  );
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef(null);
  const running = Boolean(state.running);
  const ready = state.phase === 'ready';

  React.useEffect(() => {
    setActive(0);
  }, [state.query, state.repo]);

  React.useEffect(() => {
    if (filtered.length === 0) {
      if (active !== 0) setActive(0);
      return;
    }
    if (active > filtered.length - 1) setActive(filtered.length - 1);
  }, [active, filtered.length]);

  React.useEffect(() => {
    if (!listRef.current) return;
    const node = listRef.current.querySelector(`[data-index="${active}"]`);
    if (node && typeof node.scrollIntoView === 'function') {
      node.scrollIntoView({ block: 'nearest' });
    }
  }, [active]);

  const run = React.useCallback(
    (script) => {
      if (!script) return;
      void controller.run(script);
    },
    [controller],
  );

  function onKeyDown(event) {
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      if (!running) controller.close();
      return;
    }
    if (event.key === 'Tab') {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [
        ...dialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => node.getAttribute('aria-hidden') !== 'true');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (!ready || filtered.length === 0 || running) return;
    const target = event.target;
    const fromSearch =
      target === searchRef.current ||
      (target instanceof Node && listRef.current !== null && listRef.current.contains(target));
    if (!fromSearch) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => (value + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => (value - 1 + filtered.length) % filtered.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(filtered.length - 1);
    } else if (event.key === 'PageDown') {
      event.preventDefault();
      setActive((value) => Math.min(filtered.length - 1, value + 6));
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      setActive((value) => Math.max(0, value - 6));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(filtered[active]);
    }
  }

  const current = filtered[active];
  const activeId = ready && current ? `dsnpm-option-${active}` : undefined;
  const repo = state.repo;
  const packagePath = repo?.packagePath && repo.packagePath !== '.' ? repo.packagePath : '';
  const repoLabel = repo ? (packagePath ? `${repo.name}/${packagePath}` : repo.name) : '';
  const subtitle = repo
    ? t(packagePath ? 'subtitle' : 'subtitleRepoOnly', {
        repo: repo.name,
        packagePath,
        manager: repo.manager,
      })
    : t('loading');

  return (
    <div
      className="dsnpm-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !running) controller.close();
      }}
    >
      <div
        ref={dialogRef}
        className="dsnpm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-shortcut-modal={MODAL_NAME}
        onKeyDown={onKeyDown}
      >
        <div className="dsnpm-head">
          <span className="dsnpm-glyph">
            <RunIcon />
          </span>
          <div className="dsnpm-heading">
            <h2 className="dsnpm-title" id={titleId}>
              {t('title')}
            </h2>
            <p className="dsnpm-subtitle" id={descriptionId}>
              <span className="dsnpm-subtitleText">{repo ? repoLabel : subtitle}</span>
              {repo ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="dsnpm-manager">{repo.manager}</span>
                </>
              ) : null}
            </p>
          </div>
          <button
            type="button"
            className="dsnpm-close"
            onClick={() => controller.close()}
            disabled={running}
            aria-label={t('close')}
            title={t('close')}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="dsnpm-searchWrap">
          <span className="dsnpm-searchIcon">
            <SearchIcon />
          </span>
          <input
            ref={searchRef}
            className="dsnpm-search"
            type="text"
            role="combobox"
            aria-label={t('searchLabel')}
            aria-autocomplete="list"
            aria-expanded={ready}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-busy={state.phase === 'loading'}
            placeholder={t('searchPlaceholder')}
            value={state.query}
            readOnly={running}
            aria-disabled={running}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={(event) => controller.setQuery(event.target.value)}
          />
        </div>

        {state.error ? (
          <div className="dsnpm-alert" role="alert">
            <strong className="dsnpm-alertTitle">
              {state.phase === 'failed' ? t('errorTitle') : t('terminalErrorTitle')}
            </strong>
            {errorCopy(t, state.error)}
            {state.phase === 'failed' ? (
              <>
                <br />
                <button type="button" className="dsnpm-retry" onClick={() => controller.retry()}>
                  {t('retry')}
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        <div className="dsnpm-listWrap">
          {state.phase === 'loading' ? (
            <div className="dsnpm-skeletons" aria-hidden="true">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="dsnpm-skeleton" />
              ))}
            </div>
          ) : ready && filtered.length === 0 ? (
            <div className="dsnpm-state">
              <span className="dsnpm-stateGlyph">
                <EmptyIcon />
              </span>
              {state.repo?.scripts?.length === 0 ? (
                <span>{t('empty')}</span>
              ) : (
                <span>{t('noMatches', { query: state.query.trim() })}</span>
              )}
            </div>
          ) : ready ? (
            <div
              ref={listRef}
              className="dsnpm-list"
              id={listId}
              role="listbox"
              aria-label={t('scriptsLabel')}
              aria-busy={running}
              tabIndex={-1}
            >
              {filtered.map((script, index) => (
                <ScriptRow
                  key={script.name}
                  script={script}
                  index={index}
                  active={index === active}
                  running={running}
                  onActivate={() => {
                    if (index !== active) setActive(index);
                  }}
                  onRun={run}
                />
              ))}
            </div>
          ) : null}
          <span className="dsnpm-srOnly" role="status" aria-live="polite">
            {ready
              ? state.query.trim()
                ? t(filtered.length === 1 ? 'filterResultOne' : 'filterResults', {
                    count: filtered.length,
                    query: state.query.trim(),
                  })
                : t(filtered.length === 1 ? 'allScriptOne' : 'allScripts', {
                    count: filtered.length,
                  })
              : ''}
          </span>
        </div>

        <div className="dsnpm-footer">
          {running ? (
            <span className="dsnpm-running" role="status">
              <span className="dsnpm-spinner" aria-hidden="true" />
              <span>
                {t('starting', { name: state.running.name })}
              </span>
            </span>
          ) : (
            <span className="dsnpm-hints">
              <span className="dsnpm-hint dsnpm-hintNavigate">
                <kbd className="dsnpm-kbd">↑</kbd>
                <kbd className="dsnpm-kbd">↓</kbd>
                {t('navigate')}
              </span>
              <span className="dsnpm-hint dsnpm-hintRun">
                <kbd className="dsnpm-kbd">↵</kbd>
                {t('enterToRun')}
              </span>
              <span className="dsnpm-hint">
                <kbd className="dsnpm-kbd">esc</kbd>
                {t('esc')}
              </span>
            </span>
          )}
          <span className="dsnpm-count">
            {ready
              ? state.query.trim()
                ? countLabel(t, filtered.length, 'matchesOne', 'matchesMany')
                : countLabel(t, filtered.length, 'countOne', 'countMany')
              : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

function Palette({ ctx, controller }) {
  const state = React.useSyncExternalStore(
    controller.subscribe,
    controller.getState,
    controller.getState,
  );
  const t = useTranslate(ctx);
  const dialogRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const previousFocus = React.useRef(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const listId = React.useId();

  React.useEffect(() => {
    if (!state.open) return undefined;
    previousFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (searchRef.current) {
      searchRef.current.focus({ preventScroll: true });
      searchRef.current.select();
    }
    const onKey = (event) => {
      if (event.key === 'Escape' && !controller.getState().running) {
        event.preventDefault();
        event.stopPropagation();
        controller.close();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      const previous = previousFocus.current;
      const dialog = dialogRef.current;
      const focusInside = dialog ? dialog.contains(document.activeElement) : false;
      if (
        previous &&
        previous.isConnected &&
        (document.activeElement === document.body || focusInside)
      ) {
        previous.focus({ preventScroll: true });
      }
    };
    // The dialog stays mounted while open; re-running on every state change would reset focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.open]);

  React.useEffect(() => {
    if (!state.open) return undefined;
    return ctx.sessions.list.subscribe(() => {
      const sessionId = activeSessionId(ctx);
      if (!state.sessionId || sessionId !== state.sessionId) controller.close();
    });
  }, [ctx, controller, state.open, state.sessionId]);

  if (!state.open) return null;
  return createPortal(
    <div className="dsnpm-root">
      <Dialog
        ctx={ctx}
        controller={controller}
        state={state}
        t={t}
        dialogRef={dialogRef}
        searchRef={searchRef}
        titleId={titleId}
        descriptionId={descriptionId}
        listId={listId}
      />
    </div>,
    document.body,
  );
}

function ensureStyles() {
  if (document.querySelector('style[data-dsh-npm-scripts]')) return;
  const style = document.createElement('style');
  style.dataset.dshNpmScripts = '';
  style.textContent = STYLES;
  document.head.appendChild(style);
}

function removeStyles() {
  document.querySelector('style[data-dsh-npm-scripts]')?.remove();
}

export const inject = ['sessions', 'layout', 'shortcuts', 'locale', 'sidebarRight', 'webTerminals'];

export function apply(ctx) {
  const controller = createController(ctx);
  ensureStyles();

  const rootElement = document.createElement('div');
  rootElement.dataset.dshNpmScriptsRoot = '';
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);
  root.render(h(Palette, { ctx, controller }));

  ctx.effect(
    () => () => {
      root.unmount();
      rootElement.remove();
      removeStyles();
    },
    'npm-scripts: overlay',
  );

  ctx.effect(() => ctx.locale.register(NS, 'en', EN), 'npm-scripts: en locale');
  ctx.effect(() => ctx.locale.register(NS, 'zh', ZH), 'npm-scripts: zh locale');

  ctx.effect(() => {
    const t = ctx.locale.bind(NS);
    const translate = (key) => {
      try {
        const copy = t(key);
        return typeof copy === 'string' ? copy : EN[key] ?? key;
      } catch {
        return EN[key] ?? key;
      }
    };
    const desktop = ctx.shortcuts.runtime === 'desktop';
    const defaults = desktop
      ? {
          'desktop:macos': { code: 'KeyA', modifiers: ['alt'] },
          'desktop:windows': { code: 'KeyA', modifiers: ['alt'] },
          'desktop:linux': { code: 'KeyA', modifiers: ['alt'] },
        }
      : {};
    try {
      return ctx.shortcuts.register({
        id: 'npm-scripts.open',
        label: () => translate('shortcutLabel'),
        aliases: ['npm scripts', 'run npm script', 'package scripts', 'run script'],
        defaults,
        regions: ['page', 'editable', 'terminal'],
        modals: [MODAL_NAME],
        resolve: () => {
          const sessionId = activeSessionId(ctx);
          if (!sessionId) {
            return { status: 'blocked', reason: translate('noSession') };
          }
          return {
            status: 'handled',
            run: () => controller.toggle(sessionId),
          };
        },
      });
    } catch (error) {
      // Raw Option+A remains available when a host refuses the default binding.
      console.warn('npm-scripts: shortcut registration failed', error);
      return () => {};
    }
  }, 'npm-scripts: shortcut');

  // Browsers reject single-modifier Option bindings, and a refused native
  // registration must not leave the palette unreachable. The listener is
  // guarded against double delivery with the native bridge.
  ctx.effect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.isComposing || event.repeat) return;
      if (event.code !== 'KeyA' || !event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }
      const target = event.target;
      if (target instanceof Element && target.closest('[role="menu"]')) return;
      if (controller.getState().open) {
        event.preventDefault();
        event.stopPropagation();
        controller.close();
        return;
      }
      if (hasForeignModal()) return;
      const sessionId = activeSessionId(ctx);
      if (!sessionId) return;
      event.preventDefault();
      event.stopPropagation();
      controller.toggle(sessionId);
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, 'npm-scripts: Option+A listener');
}
