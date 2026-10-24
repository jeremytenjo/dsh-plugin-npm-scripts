// Generated from src/client.jsx by scripts/build-client.mjs. Do not edit.
window.__ModuleLoader__.load({
  id: "dsh-plugin-npm-scripts",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var H=Object.create;var E=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var X=(n,e)=>{for(var r in e)E(n,r,{get:e[r],enumerable:!0})},q=(n,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of V(e))!Q.call(n,i)&&i!==r&&E(n,i,{get:()=>e[i],enumerable:!(a=G(e,i))||a.enumerable});return n};var Z=(n,e,r)=>(r=n!=null?H(Y(n)):{},q(e||!n||!n.__esModule?E(r,"default",{value:n,enumerable:!0}):r,n)),J=n=>q(E({},"__esModule",{value:!0}),n);var qe={};X(qe,{apply:()=>Ce,inject:()=>Me});module.exports=J(qe);var f=Z(require("react"),1),j=require("react-dom"),z=require("react-dom/client");function I(n,e){let r=Array.isArray(n)?n:[],a=String(e??"").trim().toLowerCase();if(a.length===0)return r.map(s=>({name:s.name,command:s.command,match:{field:"",start:0,length:0}}));let i=[];return r.forEach((s,p)=>{let l=String(s.name??""),c=String(s.command??""),u=l.toLowerCase(),h=c.toLowerCase(),o=u.indexOf(a),m=h.indexOf(a),g=-1,b="",y=0;u===a?(g=0,b="name",y=0):u.startsWith(a)?(g=1,b="name",y=0):o!==-1?(g=2,b="name",y=o):m!==-1&&(g=3,b="command",y=m),g!==-1&&i.push({script:s,score:g,index:p,field:b,start:y})}),i.sort((s,p)=>s.score-p.score||s.index-p.index),i.map(({script:s,field:p,start:l})=>({name:s.name,command:s.command,match:{field:p,start:l,length:a.length}}))}function A(n,e,r){let a=String(n??"");if(!e||e.field!==r||e.length<=0)return{before:a,hit:"",after:""};let i=Math.max(0,Math.min(e.start,a.length)),s=Math.min(a.length,i+e.length);return{before:a.slice(0,i),hit:a.slice(i,s),after:a.slice(s)}}var ee=new Set(["npm","pnpm","yarn","bun"]);function O(n,e="macos"){let r=String(n??"");if(r.includes("\0"))throw new Error("A script value contains a NUL byte.");return e==="windows"?`'${r.replaceAll("'","''")}'`:`'${r.replaceAll("'","'\\''")}'`}function P({manager:n,scriptName:e,packageDir:r,cwd:a,platform:i="macos"}){let s=ee.has(n)?n:"npm",p=String(e??"");if(p.length===0)throw new Error("A script name is required.");let l=`${s} run ${O(p,i)}`,c=typeof r=="string"?r.replace(/[\\/]+$/u,""):"",u=typeof a=="string"?a.replace(/[\\/]+$/u,""):"";return!c||!u||c===u?l:`cd ${O(c,i)} && ${l}`}var t=require("react/jsx-runtime"),ne=f.createElement,N="dshNpmScripts",re="/__dsh/npm-scripts",K="npm-scripts",ae=6e3,te=16e3,se=160,ie=80,k={title:"Run npm script",shortcutLabel:"Run npm script",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"Search scripts\u2026",searchLabel:"Search scripts",scriptsLabel:"Scripts",close:"Close dialog",loading:"Reading package.json\u2026",empty:"This package.json defines no scripts.",noMatches:"No scripts match \u201C{query}\u201D.",errorTitle:"Could not load scripts",terminalErrorTitle:"Could not start the terminal",retry:"Retry",runFailed:"The terminal could not be started. {message}",starting:"Starting \u201C{name}\u201D\u2026",startingHint:"Waiting for the new terminal\u2026",enterToRun:"Enter to run",navigate:"Navigate",run:"Run",esc:"Close",countOne:"1 script",countMany:"{count} scripts",matchesOne:"1 match",matchesMany:"{count} matches",noSession:"Open a session first.",sessionMissing:"The active session is no longer available.",directoryMissing:"The repository folder is no longer available.",noPackage:"No package.json was found in this repository.",invalidManifest:"package.json could not be read.",networkError:"Could not reach the DeepSeek Harness host.",unreadable:"The script list returned an unreadable response.",requestFailed:"Could not read the scripts for this repository.",timedOut:"Reading the repository timed out.",terminalUnavailable:"The terminal panel is not available in this window.",terminalTimeout:"The new terminal did not become ready in time.",filterResults:"{count} scripts match \u201C{query}\u201D.",filterResultOne:"1 script matches \u201C{query}\u201D.",allScripts:"{count} scripts available.",allScriptOne:"1 script available.",running:"Running",script:"script"},oe={title:"\u8FD0\u884C npm \u811A\u672C",shortcutLabel:"\u8FD0\u884C npm \u811A\u672C",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"\u641C\u7D22\u811A\u672C\u2026",searchLabel:"\u641C\u7D22\u811A\u672C",scriptsLabel:"\u811A\u672C",close:"\u5173\u95ED\u5BF9\u8BDD\u6846",loading:"\u6B63\u5728\u8BFB\u53D6 package.json\u2026",empty:"\u8FD9\u4E2A package.json \u6CA1\u6709\u5B9A\u4E49\u811A\u672C\u3002",noMatches:"\u6CA1\u6709\u5339\u914D\u201C{query}\u201D\u7684\u811A\u672C\u3002",errorTitle:"\u65E0\u6CD5\u52A0\u8F7D\u811A\u672C",terminalErrorTitle:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF",retry:"\u91CD\u8BD5",runFailed:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF\u3002{message}",starting:"\u6B63\u5728\u542F\u52A8\u201C{name}\u201D\u2026",startingHint:"\u6B63\u5728\u7B49\u5F85\u65B0\u7EC8\u7AEF\u2026",enterToRun:"\u56DE\u8F66\u8FD0\u884C",navigate:"\u5BFC\u822A",run:"\u8FD0\u884C",esc:"\u5173\u95ED",countOne:"1 \u4E2A\u811A\u672C",countMany:"{count} \u4E2A\u811A\u672C",matchesOne:"1 \u4E2A\u5339\u914D",matchesMany:"{count} \u4E2A\u5339\u914D",noSession:"\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u3002",sessionMissing:"\u5F53\u524D\u4F1A\u8BDD\u5DF2\u4E0D\u53EF\u7528\u3002",directoryMissing:"\u4ED3\u5E93\u6587\u4EF6\u5939\u5DF2\u4E0D\u53EF\u7528\u3002",noPackage:"\u5728\u6B64\u4ED3\u5E93\u4E2D\u627E\u4E0D\u5230 package.json\u3002",invalidManifest:"\u65E0\u6CD5\u8BFB\u53D6 package.json\u3002",networkError:"\u65E0\u6CD5\u8FDE\u63A5\u5230 DeepSeek Harness \u4E3B\u673A\u3002",unreadable:"\u811A\u672C\u5217\u8868\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002",requestFailed:"\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4ED3\u5E93\u7684\u811A\u672C\u3002",timedOut:"\u8BFB\u53D6\u4ED3\u5E93\u8D85\u65F6\u3002",terminalUnavailable:"\u6B64\u7A97\u53E3\u4E2D\u6CA1\u6709\u53EF\u7528\u7684\u7EC8\u7AEF\u9762\u677F\u3002",terminalTimeout:"\u65B0\u7EC8\u7AEF\u672A\u80FD\u53CA\u65F6\u5C31\u7EEA\u3002",filterResults:"{count} \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",filterResultOne:"1 \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",allScripts:"\u5171 {count} \u4E2A\u811A\u672C\u3002",allScriptOne:"\u5171 1 \u4E2A\u811A\u672C\u3002",running:"\u6B63\u5728\u8FD0\u884C",script:"\u811A\u672C"},le=`
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
`;function de(n){let[,e]=f.useReducer(a=>a+1,0);f.useEffect(()=>n.locale.subscribe(e),[n]);let r=f.useMemo(()=>n.locale.bind(N),[n]);return f.useCallback((a,i)=>{let s;try{s=r(a)}catch{s=k[a]}if((typeof s!="string"||s===a)&&(s=k[a]??a),i)for(let[p,l]of Object.entries(i))s=s.replaceAll(`{${p}}`,String(l));return s},[r])}function D(n,e,r,a){return n(e===1?r:a,{count:e})}function T(n){if(n.layout.panelInfo.getSnapshot().activePanelId!==null)return;let e=n.sessions.list.getSnapshot().byId,r=Object.values(e).find(a=>(a.retainedBy?.mainView??0)>0);return typeof r?.id=="string"?r.id:void 0}function pe(){return!!document.querySelector('[role="dialog"][aria-modal="true"]:not([data-shortcut-modal="npm-scripts"]), [role="menu"]')}function ce(n){let e={open:!1,sessionId:void 0,phase:"idle",repo:null,error:null,query:"",running:null},r,a=0,i=0,s=0,p=new Set;function l(o){e={...e,...o};for(let m of p)m()}function c(){r&&(r.abort(),r=void 0),a+=1}let u={subscribe(o){return p.add(o),()=>p.delete(o)},getState(){return e},open(o){if(typeof o!="string"||o.length===0||e.open&&e.sessionId===o)return;c();let m=a,g=new AbortController;r=g,i+=1,l({open:!0,sessionId:o,phase:"loading",repo:null,error:null,query:"",running:null}),h(o,g.signal,m)},close(){!e.open&&e.phase==="idle"||(c(),l({open:!1,phase:"idle",repo:null,error:null,query:"",running:null}))},toggle(o){let m=Date.now();m-s<ie||(s=m,!e.running&&(e.open?u.close():u.open(o)))},setQuery(o){l({query:String(o??"")})},retry(){let o=e.sessionId;if(!o)return;c();let m=a,g=new AbortController;r=g,l({phase:"loading",repo:null,error:null,query:"",running:null}),h(o,g.signal,m)},async run(o){if(e.running||e.phase!=="ready"||!e.repo||!e.sessionId)return;let m=e.repo,g=e.sessionId,b=i+1;i=b,l({running:{name:o.name},error:null});try{let y=P({manager:m.manager,scriptName:o.name,packageDir:m.packageDir,cwd:m.cwd,platform:n.shortcuts.platform});if(await be(n,g,y,o.name),i!==b)return;l({open:!1,phase:"idle",repo:null,query:"",running:null})}catch(y){if(i!==b)return;l({running:null,error:{code:"terminal-failed",message:y instanceof Error?y.message:String(y)}})}}};async function h(o,m,g){try{let b=await ue(o,m);if(m.aborted||g!==a||!e.open)return;l({phase:"ready",repo:b,error:null})}catch(b){if(m.aborted||g!==a)return;l({phase:"failed",repo:null,error:{code:b?.code||"request-failed",message:b?.message||""}})}}return u}async function ue(n,e){let r;try{r=await fetch(re,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"list",sessionId:n}),signal:e})}catch(i){if(i?.name==="AbortError")throw i;let s=new Error("network");throw s.code="network",s}let a;try{a=await r.json()}catch{let i=new Error("unreadable");throw i.code="unreadable",i}if(!r.ok||!a||a.ok!==!0){let i=new Error(typeof a?.error=="string"&&a.error?a.error:"request-failed");throw i.code=typeof a?.code=="string"?a.code:"request-failed",i}return me(a.repo)}function me(n){let e=n&&typeof n=="object"?n:{},r=Array.isArray(e.scripts)?e.scripts.slice(0,1e3).filter(a=>a&&typeof a.name=="string"&&typeof a.command=="string").map(a=>({name:a.name.slice(0,200),command:a.command.slice(0,4e3)})):[];return{isRepo:!!e.isRepo,root:typeof e.root=="string"?e.root:"",name:typeof e.name=="string"?e.name:"repository",cwd:typeof e.cwd=="string"?e.cwd:"",packageDir:typeof e.packageDir=="string"?e.packageDir:"",packagePath:typeof e.packagePath=="string"?e.packagePath:".",packageName:typeof e.packageName=="string"?e.packageName:"",manager:["npm","pnpm","yarn","bun"].includes(e.manager)?e.manager:"npm",scripts:r,total:Number.isInteger(e.total)?e.total:r.length}}function fe(n){return new Promise(e=>setTimeout(e,n))}function ge(n,e,r){return new Promise((a,i)=>{let s=!1,p=()=>{},l=setTimeout(()=>c(new Error("The new terminal tab did not appear.")),ae);function c(h,o){s||(s=!0,p(),clearTimeout(l),h?i(h):a(o))}function u(){if(s)return;let o=n.sidebarRight.openTabs.getSnapshot().find(m=>m.sessionId===e&&m.kind==="terminal"&&!r.has(m.tabId));o&&c(void 0,o)}p=n.sidebarRight.openTabs.subscribe(u),s?p():u()})}function he(n){return new Promise((e,r)=>{let a=!1,i=()=>{},s=setTimeout(()=>p(new Error("The terminal did not become writable.")),te);function p(c){a||(a=!0,i(),clearTimeout(s),c?r(c):e())}function l(){if(a)return;let c=n.state.getSnapshot();if(c.writable){p();return}(c.phase==="failed"||c.phase==="closed")&&p(new Error(c.error instanceof Error?c.error.message:typeof c.issue=="string"&&c.issue?c.issue:"The terminal stopped before it was ready."))}i=n.state.subscribe(l),a?i():l()})}async function be(n,e,r,a){if(!n.webTerminals||typeof n.webTerminals.view!="function")throw new Error("terminal-unavailable");if(!n.sidebarRight||typeof n.sidebarRight.openTab!="function")throw new Error("terminal-unavailable");let i=new Set(n.sidebarRight.openTabs.getSnapshot().filter(l=>l.sessionId===e&&l.kind==="terminal").map(l=>l.tabId));try{n.sidebarRight.openTab("terminal")}catch(l){throw new Error(l instanceof Error&&l.message?l.message:"terminal-unavailable")}let s=await ge(n,e,i);if(!s)throw new Error("terminal-timeout");let p=n.webTerminals.view(e,s.tabId,s.contentId);if(!p)throw new Error("terminal-unavailable");try{await he(p)}catch(l){throw new Error(l instanceof Error?l.message:"terminal-timeout")}p.rename(a).catch(()=>{}),await fe(se),p.write(`${r}\r`)}function ye(n,e){let r=e?.code||"";if(r==="session-missing"||r==="session-required")return n("sessionMissing");if(r==="no-working-directory"||r==="directory-unavailable")return n("directoryMissing");if(r==="no-package-json")return n("noPackage");if(r==="invalid-package-json"||r==="unreadable-package-json")return n("invalidManifest");if(r==="network")return n("networkError");if(r==="unreadable")return n("unreadable");if(r==="timeout")return n("timedOut");if(r==="terminal-failed"){let a=e?.message&&e.message!=="terminal-unavailable"?e.message:"";return a.includes("terminal-unavailable")?n("terminalUnavailable"):a.includes("did not become")||a.includes("did not appear")?n("terminalTimeout"):a||n("requestFailed")}return r==="terminal-unavailable"?n("terminalUnavailable"):r==="terminal-timeout"?n("terminalTimeout"):e?.message||n("requestFailed")}function we(){return(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,t.jsx)("path",{d:"m7 8 4 4-4 4"}),(0,t.jsx)("path",{d:"M13 16h4"}),(0,t.jsx)("rect",{x:"3",y:"4",width:"18",height:"16",rx:"3"})]})}function xe(){return(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:[(0,t.jsx)("circle",{cx:"11",cy:"11",r:"6.5"}),(0,t.jsx)("path",{d:"m16 16 4 4"})]})}function ve(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:(0,t.jsx)("path",{d:"M6 6l12 12M18 6 6 18"})})}function ke(){return(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,t.jsx)("path",{d:"M8 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"}),(0,t.jsx)("path",{d:"M9 12h6M9 16h4M8 3v4h8V3"})]})}function L({text:n,match:e,field:r}){let a=A(n,e,r);return(0,t.jsxs)(t.Fragment,{children:[a.before,a.hit?(0,t.jsx)("mark",{className:"dsnpm-mark",children:a.hit}):null,a.after]})}function Re({script:n,index:e,active:r,running:a,onActivate:i,onRun:s}){return(0,t.jsxs)("div",{role:"option",id:`dsnpm-option-${e}`,"data-index":e,"data-active":r?"true":"false","aria-selected":r,className:"dsnpm-row",onMouseEnter:i,onMouseDown:p=>p.preventDefault(),onClick:()=>{a||s(n)},children:[(0,t.jsxs)("span",{className:"dsnpm-rowBody",children:[(0,t.jsx)("span",{className:"dsnpm-rowName",children:(0,t.jsx)(L,{text:n.name,match:n.match,field:"name"})}),(0,t.jsx)("span",{className:"dsnpm-rowCommand",children:(0,t.jsx)(L,{text:n.command,match:n.match,field:"command"})})]}),(0,t.jsx)("span",{className:"dsnpm-enter","aria-hidden":"true",children:"\u21B5"})]})}function Se({ctx:n,controller:e,state:r,t:a,dialogRef:i,searchRef:s,titleId:p,descriptionId:l,listId:c}){let u=f.useMemo(()=>I(r.repo?.scripts??[],r.query),[r.repo,r.query]),[h,o]=f.useState(0),m=f.useRef(null),g=!!r.running,b=r.phase==="ready";f.useEffect(()=>{o(0)},[r.query,r.repo]),f.useEffect(()=>{if(u.length===0){h!==0&&o(0);return}h>u.length-1&&o(u.length-1)},[h,u.length]),f.useEffect(()=>{if(!m.current)return;let d=m.current.querySelector(`[data-index="${h}"]`);d&&typeof d.scrollIntoView=="function"&&d.scrollIntoView({block:"nearest"})},[h]);let y=f.useCallback(d=>{d&&e.run(d)},[e]);function $(d){if(d.nativeEvent.isComposing||d.nativeEvent.keyCode===229)return;if(d.key==="Escape"){d.preventDefault(),d.stopPropagation(),g||e.close();return}if(d.key==="Tab"){let x=i.current;if(!x)return;let S=[...x.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(U=>U.getAttribute("aria-hidden")!=="true");if(S.length===0)return;let M=S[0],C=S[S.length-1];d.shiftKey&&document.activeElement===M?(d.preventDefault(),C.focus()):!d.shiftKey&&document.activeElement===C&&(d.preventDefault(),M.focus());return}if(!b||u.length===0||g)return;let v=d.target;(v===s.current||v instanceof Node&&m.current!==null&&m.current.contains(v))&&(d.key==="ArrowDown"?(d.preventDefault(),o(x=>(x+1)%u.length)):d.key==="ArrowUp"?(d.preventDefault(),o(x=>(x-1+u.length)%u.length)):d.key==="Home"?(d.preventDefault(),o(0)):d.key==="End"?(d.preventDefault(),o(u.length-1)):d.key==="PageDown"?(d.preventDefault(),o(x=>Math.min(u.length-1,x+6))):d.key==="PageUp"?(d.preventDefault(),o(x=>Math.max(0,x-6))):d.key==="Enter"&&(d.preventDefault(),y(u[h])))}let F=u[h],W=b&&F?`dsnpm-option-${h}`:void 0,w=r.repo,R=w?.packagePath&&w.packagePath!=="."?w.packagePath:"",_=w?R?`${w.name}/${R}`:w.name:"",B=w?a(R?"subtitle":"subtitleRepoOnly",{repo:w.name,packagePath:R,manager:w.manager}):a("loading");return(0,t.jsx)("div",{className:"dsnpm-overlay",onMouseDown:d=>{d.target===d.currentTarget&&!g&&e.close()},children:(0,t.jsxs)("div",{ref:i,className:"dsnpm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":p,"aria-describedby":l,"data-shortcut-modal":K,onKeyDown:$,children:[(0,t.jsxs)("div",{className:"dsnpm-head",children:[(0,t.jsx)("span",{className:"dsnpm-glyph",children:(0,t.jsx)(we,{})}),(0,t.jsxs)("div",{className:"dsnpm-heading",children:[(0,t.jsx)("h2",{className:"dsnpm-title",id:p,children:a("title")}),(0,t.jsxs)("p",{className:"dsnpm-subtitle",id:l,children:[(0,t.jsx)("span",{className:"dsnpm-subtitleText",children:w?_:B}),w?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{"aria-hidden":"true",children:"\xB7"}),(0,t.jsx)("span",{className:"dsnpm-manager",children:w.manager})]}):null]})]}),(0,t.jsx)("button",{type:"button",className:"dsnpm-close",onClick:()=>e.close(),disabled:g,"aria-label":a("close"),title:a("close"),children:(0,t.jsx)(ve,{})})]}),(0,t.jsxs)("div",{className:"dsnpm-searchWrap",children:[(0,t.jsx)("span",{className:"dsnpm-searchIcon",children:(0,t.jsx)(xe,{})}),(0,t.jsx)("input",{ref:s,className:"dsnpm-search",type:"text",role:"combobox","aria-label":a("searchLabel"),"aria-autocomplete":"list","aria-expanded":b,"aria-controls":c,"aria-activedescendant":W,"aria-busy":r.phase==="loading",placeholder:a("searchPlaceholder"),value:r.query,disabled:r.phase==="loading"||r.phase==="failed"||g,spellCheck:!1,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",onChange:d=>e.setQuery(d.target.value)})]}),r.error?(0,t.jsxs)("div",{className:"dsnpm-alert",role:"alert",children:[(0,t.jsx)("strong",{className:"dsnpm-alertTitle",children:r.phase==="failed"?a("errorTitle"):a("terminalErrorTitle")}),ye(a,r.error),r.phase==="failed"?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("br",{}),(0,t.jsx)("button",{type:"button",className:"dsnpm-retry",onClick:()=>e.retry(),children:a("retry")})]}):null]}):null,(0,t.jsxs)("div",{className:"dsnpm-listWrap",children:[r.phase==="loading"?(0,t.jsx)("div",{className:"dsnpm-skeletons","aria-hidden":"true",children:[0,1,2,3].map(d=>(0,t.jsx)("div",{className:"dsnpm-skeleton"},d))}):b&&u.length===0?(0,t.jsxs)("div",{className:"dsnpm-state",children:[(0,t.jsx)("span",{className:"dsnpm-stateGlyph",children:(0,t.jsx)(ke,{})}),r.repo?.scripts?.length===0?(0,t.jsx)("span",{children:a("empty")}):(0,t.jsx)("span",{children:a("noMatches",{query:r.query.trim()})})]}):b?(0,t.jsx)("div",{ref:m,className:"dsnpm-list",id:c,role:"listbox","aria-label":a("scriptsLabel"),"aria-busy":g,tabIndex:-1,children:u.map((d,v)=>(0,t.jsx)(Re,{script:d,index:v,active:v===h,running:g,onActivate:()=>{v!==h&&o(v)},onRun:y},d.name))}):null,(0,t.jsx)("span",{className:"dsnpm-srOnly",role:"status","aria-live":"polite",children:b?r.query.trim()?a(u.length===1?"filterResultOne":"filterResults",{count:u.length,query:r.query.trim()}):a(u.length===1?"allScriptOne":"allScripts",{count:u.length}):""})]}),(0,t.jsxs)("div",{className:"dsnpm-footer",children:[g?(0,t.jsxs)("span",{className:"dsnpm-running",role:"status",children:[(0,t.jsx)("span",{className:"dsnpm-spinner","aria-hidden":"true"}),(0,t.jsx)("span",{children:a("starting",{name:r.running.name})})]}):(0,t.jsxs)("span",{className:"dsnpm-hints",children:[(0,t.jsxs)("span",{className:"dsnpm-hint dsnpm-hintNavigate",children:[(0,t.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2191"}),(0,t.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2193"}),a("navigate")]}),(0,t.jsxs)("span",{className:"dsnpm-hint dsnpm-hintRun",children:[(0,t.jsx)("kbd",{className:"dsnpm-kbd",children:"\u21B5"}),a("enterToRun")]}),(0,t.jsxs)("span",{className:"dsnpm-hint",children:[(0,t.jsx)("kbd",{className:"dsnpm-kbd",children:"esc"}),a("esc")]})]}),(0,t.jsx)("span",{className:"dsnpm-count",children:b?r.query.trim()?D(a,u.length,"matchesOne","matchesMany"):D(a,u.length,"countOne","countMany"):""})]})]})})}function Ee({ctx:n,controller:e}){let r=f.useSyncExternalStore(e.subscribe,e.getState,e.getState),a=de(n),i=f.useRef(null),s=f.useRef(null),p=f.useRef(null),l=f.useId(),c=f.useId(),u=f.useId();return f.useEffect(()=>{if(!r.open)return;p.current=document.activeElement instanceof HTMLElement?document.activeElement:null,s.current&&(s.current.focus({preventScroll:!0}),s.current.select());let h=o=>{o.key==="Escape"&&!e.getState().running&&(o.preventDefault(),o.stopPropagation(),e.close())};return document.addEventListener("keydown",h,!0),()=>{document.removeEventListener("keydown",h,!0);let o=p.current,m=i.current,g=m?m.contains(document.activeElement):!1;o&&o.isConnected&&(document.activeElement===document.body||g)&&o.focus({preventScroll:!0})}},[r.open]),f.useEffect(()=>{if(r.open)return n.sessions.list.subscribe(()=>{let h=T(n);(!r.sessionId||h!==r.sessionId)&&e.close()})},[n,e,r.open,r.sessionId]),r.open?(0,j.createPortal)((0,t.jsx)("div",{className:"dsnpm-root",children:(0,t.jsx)(Se,{ctx:n,controller:e,state:r,t:a,dialogRef:i,searchRef:s,titleId:l,descriptionId:c,listId:u})}),document.body):null}function Ne(){if(document.querySelector("style[data-dsh-npm-scripts]"))return;let n=document.createElement("style");n.dataset.dshNpmScripts="",n.textContent=le,document.head.appendChild(n)}function Te(){document.querySelector("style[data-dsh-npm-scripts]")?.remove()}var Me=["sessions","layout","shortcuts","locale","sidebarRight","webTerminals"];function Ce(n){let e=ce(n);Ne();let r=document.createElement("div");r.dataset.dshNpmScriptsRoot="",document.body.appendChild(r);let a=(0,z.createRoot)(r);a.render(ne(Ee,{ctx:n,controller:e})),n.effect(()=>()=>{a.unmount(),r.remove(),Te()},"npm-scripts: overlay"),n.effect(()=>n.locale.register(N,"en",k),"npm-scripts: en locale"),n.effect(()=>n.locale.register(N,"zh",oe),"npm-scripts: zh locale"),n.effect(()=>{let i=n.locale.bind(N),s=c=>{try{let u=i(c);return typeof u=="string"?u:k[c]??c}catch{return k[c]??c}},l=n.shortcuts.runtime==="desktop"?{"desktop:macos":{code:"KeyA",modifiers:["alt"]},"desktop:windows":{code:"KeyA",modifiers:["alt"]},"desktop:linux":{code:"KeyA",modifiers:["alt"]}}:{};try{return n.shortcuts.register({id:"npm-scripts.open",label:()=>s("shortcutLabel"),aliases:["npm scripts","run npm script","package scripts","run script"],defaults:l,regions:["page","editable","terminal"],modals:[K],resolve:()=>{let c=T(n);return c?{status:"handled",run:()=>e.toggle(c)}:{status:"blocked",reason:s("noSession")}}})}catch(c){return console.warn("npm-scripts: shortcut registration failed",c),()=>{}}},"npm-scripts: shortcut"),n.effect(()=>{let i=s=>{if(s.defaultPrevented||s.isComposing||s.repeat||s.code!=="KeyA"||!s.altKey||s.metaKey||s.ctrlKey||s.shiftKey)return;let p=s.target;if(p instanceof Element&&p.closest('[role="menu"]'))return;if(e.getState().open){s.preventDefault(),s.stopPropagation(),e.close();return}if(pe())return;let l=T(n);l&&(s.preventDefault(),s.stopPropagation(),e.toggle(l))};return document.addEventListener("keydown",i,!0),()=>document.removeEventListener("keydown",i,!0)},"npm-scripts: Option+A listener")}

    return module.exports;
  },
});
