// Generated from src/client.jsx by scripts/build-client.mjs. Do not edit.
window.__ModuleLoader__.load({
  id: "dsh-plugin-npm-scripts",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var Se=Object.create;var Y=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var Ne=Object.getOwnPropertyNames;var Te=Object.getPrototypeOf,Ie=Object.prototype.hasOwnProperty;var Ae=(e,r)=>{for(var n in r)Y(e,n,{get:r[n],enumerable:!0})},re=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of Ne(r))!Ie.call(e,s)&&s!==n&&Y(e,s,{get:()=>r[s],enumerable:!(t=Ee(r,s))||t.enumerable});return e};var Ce=(e,r,n)=>(n=e!=null?Se(Te(e)):{},re(r||!e||!e.__esModule?Y(n,"default",{value:e,enumerable:!0}):n,e)),De=e=>re(Y({},"__esModule",{value:!0}),e);var xt={};Ae(xt,{apply:()=>wt,inject:()=>yt});module.exports=De(xt);var u=Ce(require("react"),1),ye=require("react-dom"),we=require("react-dom/client");function ae(e,r){let n=Array.isArray(e)?e:[],t=String(r??"").trim().toLowerCase();if(t.length===0)return n.map(i=>({name:i.name,command:i.command,match:{field:"",start:0,length:0}}));let s=[];return n.forEach((i,o)=>{let d=String(i.name??""),f=String(i.command??""),c=d.toLowerCase(),m=f.toLowerCase(),g=c.indexOf(t),v=m.indexOf(t),h=-1,I="",x=0;c===t?(h=0,I="name",x=0):c.startsWith(t)?(h=1,I="name",x=0):g!==-1?(h=2,I="name",x=g):v!==-1&&(h=3,I="command",x=v),h!==-1&&s.push({script:i,score:h,index:o,field:I,start:x})}),s.sort((i,o)=>i.score-o.score||i.index-o.index),s.map(({script:i,field:o,start:d})=>({name:i.name,command:i.command,match:{field:o,start:d,length:t.length}}))}function se(e,r,n){let t=String(e??"");if(!r||r.field!==n||r.length<=0)return{before:t,hit:"",after:""};let s=Math.max(0,Math.min(r.start,t.length)),i=Math.min(t.length,s+r.length);return{before:t.slice(0,s),hit:t.slice(s,i),after:t.slice(i)}}var ie="dsh.npm-scripts.launches.v1";var F={sessionId:256,contentId:512,tabId:256,scriptName:200,packageDir:4096,title:200},Me=/^[\w-]{1,128}$/u;function _(e,r){return typeof e=="string"&&e.length>0&&e.length<=r?e:void 0}function Q(e){if(!e||typeof e!="object"||Array.isArray(e))return;let r=_(e.sessionId,F.sessionId),n=_(e.contentId,F.contentId),t=_(e.tabId,F.tabId),s=_(e.scriptName,F.scriptName),i=_(e.packageDir,F.packageDir),o=typeof e.title=="string"&&e.title.length>0?e.title.slice(0,F.title):s,d=typeof e.terminalId=="string"&&Me.test(e.terminalId)?e.terminalId:void 0,f=typeof e.launchedAt=="number"&&Number.isFinite(e.launchedAt)&&e.launchedAt>0?e.launchedAt:void 0;if(!(!r||!n||!t||!s||!i||!d||!f))return{sessionId:r,contentId:n,tabId:t,terminalId:d,scriptName:s,packageDir:i,title:o,launchedAt:f}}function z(e){return JSON.stringify([e.sessionId,e.packageDir,e.scriptName])}function W(e){if(!Array.isArray(e))return[];let r=[];for(let s of e){let i=Q(s);i&&r.push(i)}r.sort((s,i)=>i.launchedAt-s.launchedAt);let n=new Set,t=[];for(let s of r){let i=z(s);if(!n.has(i)&&(n.add(i),t.push(s),t.length>=200))break}return t}function X(e,r){if(!Array.isArray(e))return;let n=z(r);return e.find(t=>z(t)===n)}function oe(e,r){let n=Q(r);if(!n)return W(e);let t=z(n),s=Array.isArray(e)?e.filter(i=>Q(i)&&z(i)!==t):[];return W([n,...s])}function le(e,r){if(!Array.isArray(e))return[];let n=z(r);return W(e.filter(t=>z(t)!==n))}function $(e){if(!e)return[];try{let r=e.getItem(ie);return r?W(JSON.parse(r)):[]}catch{return[]}}function Z(e,r){if(e)try{e.setItem(ie,JSON.stringify(W(r)))}catch{}}var ee=["control","alt","shift","meta"];function Le(e){return e==="macos"?{control:"\u2303",alt:"\u2325",shift:"\u21E7",meta:"\u2318"}:{control:"Ctrl",alt:"Alt",shift:"Shift",meta:"Meta"}}function Oe(e){return/^Key[A-Z]$/u.test(e)?e.slice(3):/^Digit[0-9]$/u.test(e)?e.slice(5):{ArrowUp:"\u2191",ArrowDown:"\u2193",ArrowLeft:"\u2190",ArrowRight:"\u2192"}[e]??e}function de(e,r){if(!e)return[];let n=Le(r),t=ee.filter(s=>e.modifiers.includes(s)).map(s=>n[s]);return t.push(Oe(e.code)),t}function te(e){return!!e&&e.code==="KeyA"&&e.modifiers.length===1&&e.modifiers[0]==="alt"}function ce(e){return!e||!e.modified?!0:te(e.binding)}var Pe=new Set(["npm","pnpm","yarn","bun"]);function pe(e,r="macos"){let n=String(e??"");if(n.includes("\0"))throw new Error("A script value contains a NUL byte.");return r==="windows"?`'${n.replaceAll("'","''")}'`:`'${n.replaceAll("'","'\\''")}'`}function ue({manager:e,scriptName:r,packageDir:n,cwd:t,platform:s="macos"}){let i=Pe.has(e)?e:"npm",o=String(r??"");if(o.length===0)throw new Error("A script name is required.");let d=`${i} run ${pe(o,s)}`,f=typeof n=="string"?n.replace(/[\\/]+$/u,""):"",c=typeof t=="string"?t.replace(/[\\/]+$/u,""):"";return!f||!c||f===c?d:`cd ${pe(f,s)} && ${d}`}var a=require("react/jsx-runtime"),me=u.createElement,H="dshNpmScripts",qe="/__dsh/npm-scripts",xe="npm-scripts",Ue=6e3,je=16e3,Be=160,Ke=80,ze=320,Fe=140,_e=120,We=2400,$e=5e3,j="npm-scripts.open",He={code:"KeyA",modifiers:["alt"]},G={title:"Run npm script",shortcutLabel:"Run npm script",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"Search scripts\u2026",searchLabel:"Search scripts",scriptsLabel:"Scripts",close:"Close dialog",loading:"Reading package.json\u2026",empty:"This package.json defines no scripts.",noMatches:"No scripts match \u201C{query}\u201D.",errorTitle:"Could not load scripts",terminalErrorTitle:"Could not start the terminal",retry:"Retry",runFailed:"The terminal could not be started. {message}",starting:"Starting \u201C{name}\u201D\u2026",startingHint:"Waiting for the new terminal\u2026",enterToRun:"Enter to run",navigate:"Navigate",run:"Run",esc:"Close",countOne:"1 script",countMany:"{count} scripts",matchesOne:"1 match",matchesMany:"{count} matches",noSession:"Open a session first.",sessionMissing:"The active session is no longer available.",directoryMissing:"The repository folder is no longer available.",noPackage:"No package.json was found in this repository.",invalidManifest:"package.json could not be read.",networkError:"Could not reach the DeepSeek Harness host.",unreadable:"The script list returned an unreadable response.",requestFailed:"Could not read the scripts for this repository.",timedOut:"Reading the repository timed out.",terminalUnavailable:"The terminal panel is not available in this window.",terminalTimeout:"The new terminal did not become ready in time.",filterResults:"{count} scripts match \u201C{query}\u201D.",filterResultOne:"1 script matches \u201C{query}\u201D.",allScripts:"{count} scripts available.",allScriptOne:"1 script available.",running:"Running",script:"script",checking:"Checking \u201C{name}\u201D\u2026",restartTitle:"Restart script?",restartLead:"\u201C{name}\u201D is still open in a terminal tab.",restartDetail:"Restarting stops the current process with Ctrl+C and runs the script again in the same terminal tab.",restartConfirm:"Restart script",restartCancel:"Cancel",restarting:"Restarting \u201C{name}\u201D\u2026",restartHint:"Enter to restart",restartErrorTitle:"Could not restart the script",restartUnavailable:"The terminal tab for this script is no longer available.",shortcutTitle:"Keyboard shortcut",shortcutDescription:"Open the npm scripts palette from any project. The binding is saved for this device.",shortcutChange:"Change keyboard shortcut",shortcutRecording:"Press a shortcut\u2026",shortcutRecordingHint:"Release the keys to save, or press Esc to cancel.",shortcutNotSet:"Not set",shortcutReset:"Reset to default",shortcutLoading:"Loading shortcut\u2026",shortcutSaved:"Shortcut saved.",shortcutResetDone:"Shortcut reset to the default.",shortcutDefaultOptionA:"Using the default Option+A.",shortcutNativeFailed:"Could not start key recording. Close other dialogs and try again.",shortcutNotReady:"Shortcuts are still loading. Try again in a moment.",shortcutUnreadable:"The shortcut settings could not be read.",shortcutWriteFailed:"The shortcut could not be saved.",shortcutStale:"Shortcuts changed elsewhere. Try again.",shortcutConflict:"Already used by {commands}.",shortcutReserved:"That combination is reserved by DeepSeek Harness or the operating system.",shortcutUnsupportedBrowser:"Web builds cannot use that combination. Add Command or Control.",shortcutModifierRequired:"Include at least one modifier besides Shift.",shortcutUnsupportedKey:"That key cannot be used for a shortcut.",shortcutUnsupported:"That shortcut is not available on this device.",shortcutWebFallback:"Option+A is the Web default. Choose a browser-supported combination, or reset to use it.",shortcutRecordingStatus:"Recording. {hint}"},Ge={title:"\u8FD0\u884C npm \u811A\u672C",shortcutLabel:"\u8FD0\u884C npm \u811A\u672C",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"\u641C\u7D22\u811A\u672C\u2026",searchLabel:"\u641C\u7D22\u811A\u672C",scriptsLabel:"\u811A\u672C",close:"\u5173\u95ED\u5BF9\u8BDD\u6846",loading:"\u6B63\u5728\u8BFB\u53D6 package.json\u2026",empty:"\u8FD9\u4E2A package.json \u6CA1\u6709\u5B9A\u4E49\u811A\u672C\u3002",noMatches:"\u6CA1\u6709\u5339\u914D\u201C{query}\u201D\u7684\u811A\u672C\u3002",errorTitle:"\u65E0\u6CD5\u52A0\u8F7D\u811A\u672C",terminalErrorTitle:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF",retry:"\u91CD\u8BD5",runFailed:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF\u3002{message}",starting:"\u6B63\u5728\u542F\u52A8\u201C{name}\u201D\u2026",startingHint:"\u6B63\u5728\u7B49\u5F85\u65B0\u7EC8\u7AEF\u2026",enterToRun:"\u56DE\u8F66\u8FD0\u884C",navigate:"\u5BFC\u822A",run:"\u8FD0\u884C",esc:"\u5173\u95ED",countOne:"1 \u4E2A\u811A\u672C",countMany:"{count} \u4E2A\u811A\u672C",matchesOne:"1 \u4E2A\u5339\u914D",matchesMany:"{count} \u4E2A\u5339\u914D",noSession:"\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u3002",sessionMissing:"\u5F53\u524D\u4F1A\u8BDD\u5DF2\u4E0D\u53EF\u7528\u3002",directoryMissing:"\u4ED3\u5E93\u6587\u4EF6\u5939\u5DF2\u4E0D\u53EF\u7528\u3002",noPackage:"\u5728\u6B64\u4ED3\u5E93\u4E2D\u627E\u4E0D\u5230 package.json\u3002",invalidManifest:"\u65E0\u6CD5\u8BFB\u53D6 package.json\u3002",networkError:"\u65E0\u6CD5\u8FDE\u63A5\u5230 DeepSeek Harness \u4E3B\u673A\u3002",unreadable:"\u811A\u672C\u5217\u8868\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002",requestFailed:"\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4ED3\u5E93\u7684\u811A\u672C\u3002",timedOut:"\u8BFB\u53D6\u4ED3\u5E93\u8D85\u65F6\u3002",terminalUnavailable:"\u6B64\u7A97\u53E3\u4E2D\u6CA1\u6709\u53EF\u7528\u7684\u7EC8\u7AEF\u9762\u677F\u3002",terminalTimeout:"\u65B0\u7EC8\u7AEF\u672A\u80FD\u53CA\u65F6\u5C31\u7EEA\u3002",filterResults:"{count} \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",filterResultOne:"1 \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",allScripts:"\u5171 {count} \u4E2A\u811A\u672C\u3002",allScriptOne:"\u5171 1 \u4E2A\u811A\u672C\u3002",running:"\u6B63\u5728\u8FD0\u884C",script:"\u811A\u672C",checking:"\u6B63\u5728\u68C0\u67E5\u201C{name}\u201D\u2026",restartTitle:"\u91CD\u65B0\u542F\u52A8\u811A\u672C\uFF1F",restartLead:"\u201C{name}\u201D\u4ECD\u5728\u7EC8\u7AEF\u6807\u7B7E\u9875\u4E2D\u6253\u5F00\u3002",restartDetail:"\u91CD\u65B0\u542F\u52A8\u4F1A\u7528 Ctrl+C \u505C\u6B62\u5F53\u524D\u8FDB\u7A0B\uFF0C\u5E76\u5728\u540C\u4E00\u7EC8\u7AEF\u6807\u7B7E\u9875\u4E2D\u518D\u6B21\u8FD0\u884C\u8BE5\u811A\u672C\u3002",restartConfirm:"\u91CD\u65B0\u542F\u52A8\u811A\u672C",restartCancel:"\u53D6\u6D88",restarting:"\u6B63\u5728\u91CD\u65B0\u542F\u52A8\u201C{name}\u201D\u2026",restartHint:"\u56DE\u8F66\u91CD\u65B0\u542F\u52A8",restartErrorTitle:"\u65E0\u6CD5\u91CD\u65B0\u542F\u52A8\u811A\u672C",restartUnavailable:"\u6B64\u811A\u672C\u7684\u7EC8\u7AEF\u6807\u7B7E\u9875\u5DF2\u4E0D\u53EF\u7528\u3002",shortcutTitle:"\u952E\u76D8\u5FEB\u6377\u952E",shortcutDescription:"\u5728\u4EFB\u610F\u9879\u76EE\u4E2D\u6253\u5F00 npm \u811A\u672C\u9762\u677F\u3002\u6B64\u7ED1\u5B9A\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u8BBE\u5907\u3002",shortcutChange:"\u66F4\u6539\u952E\u76D8\u5FEB\u6377\u952E",shortcutRecording:"\u6309\u4E0B\u5FEB\u6377\u952E\u2026",shortcutRecordingHint:"\u677E\u5F00\u7EC4\u5408\u952E\u5373\u4FDD\u5B58\uFF0C\u6309 Esc \u53D6\u6D88\u3002",shortcutNotSet:"\u672A\u8BBE\u7F6E",shortcutReset:"\u6062\u590D\u9ED8\u8BA4",shortcutLoading:"\u6B63\u5728\u8BFB\u53D6\u5FEB\u6377\u952E\u2026",shortcutSaved:"\u5FEB\u6377\u952E\u5DF2\u4FDD\u5B58\u3002",shortcutResetDone:"\u5FEB\u6377\u952E\u5DF2\u6062\u590D\u9ED8\u8BA4\u3002",shortcutDefaultOptionA:"\u4F7F\u7528\u9ED8\u8BA4\u7684 Option+A\u3002",shortcutNativeFailed:"\u65E0\u6CD5\u5F00\u59CB\u5F55\u5236\u6309\u952E\u3002\u8BF7\u5173\u95ED\u5176\u4ED6\u5BF9\u8BDD\u6846\u540E\u91CD\u8BD5\u3002",shortcutNotReady:"\u5FEB\u6377\u952E\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002",shortcutUnreadable:"\u65E0\u6CD5\u8BFB\u53D6\u5FEB\u6377\u952E\u8BBE\u7F6E\u3002",shortcutWriteFailed:"\u65E0\u6CD5\u4FDD\u5B58\u5FEB\u6377\u952E\u3002",shortcutStale:"\u5FEB\u6377\u952E\u5DF2\u5728\u5176\u4ED6\u4F4D\u7F6E\u66F4\u6539\uFF0C\u8BF7\u91CD\u8BD5\u3002",shortcutConflict:"\u5DF2\u88AB {commands} \u4F7F\u7528\u3002",shortcutReserved:"\u8BE5\u7EC4\u5408\u5DF2\u88AB DeepSeek Harness \u6216\u64CD\u4F5C\u7CFB\u7EDF\u5360\u7528\u3002",shortcutUnsupportedBrowser:"Web \u7248\u672C\u65E0\u6CD5\u4F7F\u7528\u8BE5\u7EC4\u5408\u3002\u8BF7\u6DFB\u52A0 Command \u6216 Control\u3002",shortcutModifierRequired:"\u9664 Shift \u5916\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u4FEE\u9970\u952E\u3002",shortcutUnsupportedKey:"\u8BE5\u6309\u952E\u4E0D\u80FD\u7528\u4E8E\u5FEB\u6377\u952E\u3002",shortcutUnsupported:"\u6B64\u8BBE\u5907\u65E0\u6CD5\u4F7F\u7528\u8BE5\u5FEB\u6377\u952E\u3002",shortcutWebFallback:"Option+A \u662F Web \u7684\u9ED8\u8BA4\u5FEB\u6377\u952E\u3002\u8BF7\u9009\u62E9\u6D4F\u89C8\u5668\u652F\u6301\u7684\u7EC4\u5408\uFF0C\u6216\u6062\u590D\u9ED8\u8BA4\u4EE5\u4F7F\u7528\u5B83\u3002",shortcutRecordingStatus:"\u6B63\u5728\u5F55\u5236\u3002{hint}"},Ye=`
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
.dsnpm-confirm {
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: 13px;
  min-height: 190px;
  padding: 22px 20px 20px;
  animation: dsnpm-fade 120ms ease-out;
}
.dsnpm-confirmGlyph {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-top: 1px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-brand-primary, #4d6bfe);
}
.dsnpm-confirmGlyph svg {
  width: 18px;
  height: 18px;
}
.dsnpm-confirmBody {
  min-width: 0;
  flex: 1;
}
.dsnpm-confirmLead {
  margin: 0;
  color: var(--dsw-alias-label-primary, #16181d);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.dsnpm-confirmDetail {
  margin: 5px 0 0;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 12px;
  line-height: 1.6;
}
.dsnpm-confirmCommand {
  display: block;
  margin: 12px 0 0;
  padding: 8px 10px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.dsnpm-confirmActions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
.dsnpm-confirmButton {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 0;
  padding: 0 13px;
  border: 0.5px solid var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.3));
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-primary, #16181d);
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 100ms ease, border-color 100ms ease;
}
.dsnpm-confirmButton:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
}
.dsnpm-confirmButton:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
.dsnpm-confirmButton[data-variant="primary"] {
  border-color: transparent;
  background: var(--dsw-alias-button-primary-fill, #4d6bfe);
  color: var(--dsw-alias-label-primary-foreground, #ffffff);
}
.dsnpm-confirmButton[data-variant="primary"]:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover, #3f5ae0);
}
.dsnpm-confirmButton:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #4d6bfe));
  outline-offset: 1px;
}
.dsnpm-confirmButton[data-variant="primary"]:focus-visible {
  outline-color: var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #4d6bfe));
  outline-offset: 2px;
}
.dsnpm-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1px 0 2px;
}
.dsnpm-settingsRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}
.dsnpm-settingsText {
  min-width: 0;
  flex: 1;
}
.dsnpm-settingsTitle {
  margin: 0;
  color: var(--dsw-alias-label-primary, #16181d);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.dsnpm-settingsDesc {
  margin: 4px 0 0;
  max-width: 520px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 12px;
  line-height: 18px;
}
.dsnpm-settingsControls {
  display: flex;
  flex: none;
  align-items: center;
  gap: 10px;
}
.dsnpm-binding {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 108px;
  max-width: 280px;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  border: 0.5px solid var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.3));
  border-radius: 10px;
  background: var(--dsw-alias-bg-module-platform, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-primary, #16181d);
  font: inherit;
  font-size: 12.5px;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 100ms ease, border-color 100ms ease, box-shadow 100ms ease;
}
.dsnpm-binding:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.16));
}
.dsnpm-binding:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #4d6bfe);
  outline-offset: 1px;
}
.dsnpm-binding:disabled {
  cursor: default;
  opacity: 0.55;
}
.dsnpm-binding[data-recording="true"] {
  border-color: var(--dsw-alias-brand-primary, #4d6bfe);
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary, #4d6bfe);
  color: var(--dsw-alias-brand-primary, #4d6bfe);
}
.dsnpm-binding[data-tone="error"] {
  border-color: var(--dsw-alias-state-error-primary, #d33b3b);
}
.dsnpm-bindingReset {
  margin: 0;
  padding: 6px 2px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, #606673);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
}
.dsnpm-bindingReset:hover:not(:disabled) {
  color: var(--dsw-alias-label-primary, #16181d);
}
.dsnpm-bindingReset:focus-visible {
  outline: 1px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary, #4d6bfe));
  outline-offset: 2px;
}
.dsnpm-bindingReset:disabled {
  cursor: default;
  opacity: 0.45;
}
.dsnpm-key {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.26));
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-primary, #16181d);
  font-family: inherit;
  font-size: 11px;
  line-height: 1;
}
.dsnpm-bindingEdit {
  width: 12px;
  height: 12px;
  margin-left: 2px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  flex: none;
}
.dsnpm-binding:hover .dsnpm-bindingEdit {
  color: var(--dsw-alias-label-secondary, #606673);
}
.dsnpm-settingsStatus {
  margin: 0;
  min-height: 18px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}
.dsnpm-settingsStatus[data-tone="error"] {
  color: var(--dsw-alias-state-error-primary, #d33b3b);
}
.dsnpm-settingsStatus[data-tone="success"] {
  color: var(--dsw-alias-state-success-secondary, #2f9e44);
}
.dsnpm-recordingDot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary, #4d6bfe);
  animation: dsnpm-pulse 1s ease-in-out infinite;
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
`;function ve(e){let[,r]=u.useReducer(t=>t+1,0);u.useEffect(()=>e.locale.subscribe(r),[e]);let n=u.useMemo(()=>e.locale.bind(H),[e]);return u.useCallback((t,s)=>{let i;try{i=n(t)}catch{i=G[t]}if((typeof i!="string"||i===t)&&(i=G[t]??t),s)for(let[o,d]of Object.entries(s))i=i.replaceAll(`{${o}}`,String(d));return i},[n])}function fe(e,r,n,t){return e(r===1?n:t,{count:r})}function ne(e){if(e.layout.panelInfo.getSnapshot().activePanelId!==null)return;let r=e.sessions.list.getSnapshot().byId,n=Object.values(r).find(t=>(t.retainedBy?.mainView??0)>0);return typeof n?.id=="string"?n.id:void 0}function Ve(){return!!document.querySelector('[role="dialog"][aria-modal="true"]:not([data-shortcut-modal="npm-scripts"]), [role="menu"]')}function Je(e){let r;try{r=typeof localStorage>"u"?void 0:localStorage}catch{r=void 0}let n=$(r),t={open:!1,sessionId:void 0,phase:"idle",repo:null,error:null,query:"",running:null,confirming:null},s,i=0,o=0,d=0,f=new Set;function c(l){t={...t,...l};for(let y of f)y()}function m(){s&&(s.abort(),s=void 0),i+=1}function g(l,y){return ue({manager:l.manager,scriptName:y.name,packageDir:l.packageDir,cwd:l.cwd,platform:e.shortcuts.platform})}function v(l){n=oe($(r),l),Z(r,n)}function h(l){n=le($(r),l),Z(r,n)}async function I(l,y,S){let E={sessionId:l,packageDir:y.packageDir,scriptName:S.name},C=X(n,E);if(C||(n=$(r),C=X(n,E)),!C)return;let k=e.sidebarRight?.openTabs?.getSnapshot?.(),R=Array.isArray(k)?k.find(p=>p.sessionId===l&&p.kind==="terminal"&&p.contentId===C.contentId):void 0;if(!R||!e.webTerminals||typeof e.webTerminals.view!="function")return;let M;try{M=e.webTerminals.view(l,R.tabId,R.contentId,C.terminalId);let p=M.state.getSnapshot();!p.info&&(p.phase==="idle"||p.phase==="loading")&&await Ze(M.refresh(),$e)}catch{let p=M?.state.getSnapshot();(p?.issue==="missingTerminal"||p?.phase==="failed"||p?.phase==="closed")&&h(E);return}let P=M.state.getSnapshot();if(!P.info||P.info.state!=="running"||P.phase==="failed"||P.phase==="closed"){h(E);return}return{...C,tabId:R.tabId,contentId:R.contentId,view:M}}let x={subscribe(l){return f.add(l),()=>f.delete(l)},getState(){return t},open(l){if(typeof l!="string"||l.length===0||t.open&&t.sessionId===l)return;m();let y=i,S=new AbortController;s=S,o+=1,c({open:!0,sessionId:l,phase:"loading",repo:null,error:null,query:"",running:null,confirming:null}),A(l,S.signal,y)},close(){!t.open&&t.phase==="idle"||(o+=1,m(),c({open:!1,phase:"idle",repo:null,error:null,query:"",running:null,confirming:null}))},toggle(l){let y=Date.now();y-d<Ke||(d=y,!t.running&&(t.open?x.close():x.open(l)))},setQuery(l){c({query:String(l??"")})},retry(){let l=t.sessionId;if(!l)return;m();let y=i,S=new AbortController;s=S,c({phase:"loading",repo:null,error:null,query:"",running:null,confirming:null}),A(l,S.signal,y)},async run(l){if(t.running||t.phase!=="ready"||!t.repo||!t.sessionId)return;let y=t.repo,S=t.sessionId,E=o+1;o=E;let C;try{C=g(y,l)}catch(R){c({error:{code:"terminal-failed",message:R instanceof Error?R.message:String(R)}});return}c({running:{name:l.name,mode:"check"},confirming:null,error:null});let k;try{k=await I(S,y,l)}catch{k=void 0}if(o===E){if(k){c({running:null,confirming:{script:l,command:C,target:k}});return}c({running:{name:l.name,mode:"launch"}});try{let R=await tt(e,S,C,l.name);if(o!==E)return;v({sessionId:S,packageDir:y.packageDir,scriptName:l.name,title:l.name,...R,launchedAt:Date.now()}),c({open:!1,phase:"idle",repo:null,query:"",running:null,confirming:null})}catch(R){if(o!==E)return;c({running:null,confirming:null,error:{code:"terminal-failed",message:R instanceof Error?R.message:String(R)}})}}},cancelRestart(){!t.confirming||t.running||c({confirming:null})},async acceptRestart(){let l=t.confirming;if(!l||t.running)return;let y=o+1;o=y,c({running:{name:l.script.name,mode:"restart"},confirming:null,error:null});try{if(await nt(e,l.target,l.command),o!==y)return;v({sessionId:l.target.sessionId,packageDir:l.target.packageDir,scriptName:l.script.name,title:l.script.name,tabId:l.target.tabId,contentId:l.target.contentId,terminalId:l.target.terminalId,launchedAt:Date.now()}),c({open:!1,phase:"idle",repo:null,query:"",running:null,confirming:null})}catch(S){if(o!==y)return;c({running:null,error:{code:"restart-failed",message:S instanceof Error?S.message:String(S)}})}}};async function A(l,y,S){try{let E=await Qe(l,y);if(y.aborted||S!==i||!t.open)return;c({phase:"ready",repo:E,error:null})}catch(E){if(y.aborted||S!==i)return;c({phase:"failed",repo:null,error:{code:E?.code||"request-failed",message:E?.message||""}})}}return x}async function Qe(e,r){let n;try{n=await fetch(qe,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"list",sessionId:e}),signal:r})}catch(s){if(s?.name==="AbortError")throw s;let i=new Error("network");throw i.code="network",i}let t;try{t=await n.json()}catch{let s=new Error("unreadable");throw s.code="unreadable",s}if(!n.ok||!t||t.ok!==!0){let s=new Error(typeof t?.error=="string"&&t.error?t.error:"request-failed");throw s.code=typeof t?.code=="string"?t.code:"request-failed",s}return Xe(t.repo)}function Xe(e){let r=e&&typeof e=="object"?e:{},n=Array.isArray(r.scripts)?r.scripts.slice(0,1e3).filter(t=>t&&typeof t.name=="string"&&typeof t.command=="string").map(t=>({name:t.name.slice(0,200),command:t.command.slice(0,4e3)})):[];return{isRepo:!!r.isRepo,root:typeof r.root=="string"?r.root:"",name:typeof r.name=="string"?r.name:"repository",cwd:typeof r.cwd=="string"?r.cwd:"",packageDir:typeof r.packageDir=="string"?r.packageDir:"",packagePath:typeof r.packagePath=="string"?r.packagePath:".",packageName:typeof r.packageName=="string"?r.packageName:"",manager:["npm","pnpm","yarn","bun"].includes(r.manager)?r.manager:"npm",scripts:n,total:Number.isInteger(r.total)?r.total:n.length}}function V(e){return new Promise(r=>setTimeout(r,e))}function Ze(e,r){return new Promise((n,t)=>{let s=setTimeout(()=>t(new Error("timeout")),r);e.then(i=>{clearTimeout(s),n(i)},i=>{clearTimeout(s),t(i)})})}function et(e,r,n){return new Promise((t,s)=>{let i=!1,o=()=>{},d=setTimeout(()=>f(new Error("The new terminal tab did not appear.")),Ue);function f(m,g){i||(i=!0,o(),clearTimeout(d),m?s(m):t(g))}function c(){if(i)return;let g=e.sidebarRight.openTabs.getSnapshot().find(v=>v.sessionId===r&&v.kind==="terminal"&&!n.has(v.tabId));g&&f(void 0,g)}o=e.sidebarRight.openTabs.subscribe(c),i?o():c()})}function ke(e){return new Promise((r,n)=>{let t=!1,s=()=>{},i=setTimeout(()=>o(new Error("The terminal did not become writable.")),je);function o(f){t||(t=!0,s(),clearTimeout(i),f?n(f):r())}function d(){if(t)return;let f=e.state.getSnapshot();if(f.writable){o();return}(f.phase==="failed"||f.phase==="closed")&&o(new Error(f.error instanceof Error?f.error.message:typeof f.issue=="string"&&f.issue?f.issue:"The terminal stopped before it was ready."))}s=e.state.subscribe(d),t?s():d()})}async function tt(e,r,n,t){if(!e.webTerminals||typeof e.webTerminals.view!="function")throw new Error("terminal-unavailable");if(!e.sidebarRight||typeof e.sidebarRight.openTab!="function")throw new Error("terminal-unavailable");let s=new Set(e.sidebarRight.openTabs.getSnapshot().filter(d=>d.sessionId===r&&d.kind==="terminal").map(d=>d.tabId));try{e.sidebarRight.openTab("terminal")}catch(d){throw new Error(d instanceof Error&&d.message?d.message:"terminal-unavailable")}let i=await et(e,r,s);if(!i)throw new Error("terminal-timeout");let o=e.webTerminals.view(r,i.tabId,i.contentId);if(!o)throw new Error("terminal-unavailable");try{await ke(o)}catch(d){throw new Error(d instanceof Error?d.message:"terminal-timeout")}return o.rename(t).catch(()=>{}),await V(Be),o.write(`${n}\r`),{tabId:i.tabId,contentId:i.contentId,terminalId:o.id}}async function nt(e,r,n){if(!r?.view||!e.sidebarRight||typeof e.sidebarRight.focus!="function")throw new Error("terminal-unavailable");let t=r.view;if(e.webTerminals&&typeof e.webTerminals.view=="function"&&r.terminalId)try{t=e.webTerminals.view(r.sessionId,r.tabId,r.contentId,r.terminalId)}catch{}try{typeof e.sidebarRight.isExpanded=="function"&&!e.sidebarRight.isExpanded()&&typeof e.sidebarRight.toggleExpanded=="function"&&e.sidebarRight.toggleExpanded(),e.sidebarRight.focus(r.tabId)}catch(s){throw new Error(s instanceof Error&&s.message?s.message:"terminal-unavailable")}if(!t.state.getSnapshot().writable&&typeof t.connect=="function"&&t.connect(),await ke(t),!t.state.getSnapshot().writable)throw new Error("terminal-timeout");if(t.write(""),await V(Fe),t.state.getSnapshot().writable&&t.write(""),await rt(t),!t.state.getSnapshot().writable)throw new Error("terminal-timeout");t.write(`${n}\r`)}async function rt(e){let r=Date.now();await V(ze);let n=e.state.getSnapshot().render?.revision,t=Date.now();for(;Date.now()-r<We;){await V(60);let s=e.state.getSnapshot().render?.revision;if(s!==n)n=s,t=Date.now();else if(Date.now()-t>=_e)return}}function at(e,r){let n=r?.code||"";if(n==="session-missing"||n==="session-required")return e("sessionMissing");if(n==="no-working-directory"||n==="directory-unavailable")return e("directoryMissing");if(n==="no-package-json")return e("noPackage");if(n==="invalid-package-json"||n==="unreadable-package-json")return e("invalidManifest");if(n==="network")return e("networkError");if(n==="unreadable")return e("unreadable");if(n==="timeout")return e("timedOut");if(n==="terminal-failed"){let t=r?.message&&r.message!=="terminal-unavailable"?r.message:"";return t.includes("terminal-unavailable")?e("terminalUnavailable"):t.includes("did not become")||t.includes("did not appear")?e("terminalTimeout"):t||e("requestFailed")}if(n==="restart-failed"){let t=r?.message||"";return t.includes("terminal-unavailable")||t==="missingTerminal"?e("restartUnavailable"):t.includes("did not become")||t==="terminal-timeout"?e("terminalTimeout"):t||e("restartUnavailable")}return n==="terminal-unavailable"?e("terminalUnavailable"):n==="terminal-timeout"?e("terminalTimeout"):r?.message||e("requestFailed")}function ge(e,r){return e(r==="reserved"?"shortcutReserved":r==="unsupported-browser"?"shortcutUnsupportedBrowser":r==="modifier-required"?"shortcutModifierRequired":r==="unsupported-key"?"shortcutUnsupportedKey":"shortcutUnsupported")}function st(e){let r=e.shortcuts.catalog.getSnapshot().find(n=>n.id===j);return ce(r)}function it(){return(0,a.jsxs)("svg",{className:"dsnpm-bindingEdit",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,a.jsx)("path",{d:"M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"}),(0,a.jsx)("path",{d:"m14.5 6.5 3 3"})]})}function ot({keys:e,soft:r=!1}){return!e||e.length===0?null:(0,a.jsx)(a.Fragment,{children:e.map((n,t)=>(0,a.jsx)("kbd",{className:"dsnpm-key","data-soft":r?"true":void 0,children:n},`${n}-${t}`))})}function lt({ctx:e,setIntercept:r}){let n=ve(e),t=u.useSyncExternalStore(e.shortcuts.catalog.subscribe,e.shortcuts.catalog.getSnapshot,e.shortcuts.catalog.getSnapshot),s=u.useSyncExternalStore(e.shortcuts.config.subscribe,e.shortcuts.config.getSnapshot,e.shortcuts.config.getSnapshot),i=e.shortcuts.platform,[o,d]=u.useState(!1),[f,c]=u.useState(null),[m,g]=u.useState(!1),[v,h]=u.useState(null),I=u.useRef(null),x=u.useRef(!0),A=u.useRef(()=>{}),l=t.find(w=>w.id===j),y=e.shortcuts.runtime!=="desktop"&&(!l||!l.modified&&l.binding===null),S=o?f:y?He:l?.binding??null,E=de(S,i),C=s.status==="ready",k=C&&!!l&&!m;u.useEffect(()=>()=>{x.current=!1},[]);function R(w){let T=e.shortcuts.fixedCatalog.getSnapshot();return(w??[]).filter(N=>N!==j).map(N=>{let O=t.find(U=>U.id===N);if(O?.label)return O.label;let q=T.find(U=>U.id===N);return q?.label?q.label:N})}function M(w,T){if(w.status==="saved"){h({tone:"success",text:n(T)});return}if(w.status==="conflict"){let N=R(w.conflicts);h({tone:"error",text:w.issue?ge(n,w.issue):N.length>0?n("shortcutConflict",{commands:N.join(", ")}):n("shortcutUnsupported")});return}w.status==="stale"?h({tone:"error",text:n("shortcutStale")}):w.status==="not-ready"?h({tone:"error",text:n("shortcutNotReady")}):w.status==="unreadable"?h({tone:"error",text:n("shortcutUnreadable")}):h({tone:"error",text:n("shortcutWriteFailed")})}async function P(){if(k){g(!0),h(null);try{let w=e.shortcuts.config.getSnapshot();if(w.status!=="ready"){h({tone:"error",text:n("shortcutNotReady")});return}let T=await e.shortcuts.edit({type:"reset",id:j},w.revision);M(T,"shortcutResetDone")}finally{x.current&&g(!1)}}}async function p(w){if(x.current){g(!0),c(null);try{let T=e.shortcuts.catalog.getSnapshot().find(K=>K.id===j);if(te(w)&&e.shortcuts.runtime!=="desktop"){if(T?.modified){let K=e.shortcuts.config.getSnapshot();if(K.status!=="ready"){h({tone:"error",text:n("shortcutNotReady")});return}let b=await e.shortcuts.edit({type:"reset",id:j},K.revision);b.status==="saved"?h({tone:"success",text:n("shortcutDefaultOptionA")}):M(b,"shortcutDefaultOptionA");return}h({tone:"success",text:n("shortcutDefaultOptionA")});return}let N;try{N=e.shortcuts.describeBinding(w)}catch{h({tone:"error",text:n("shortcutUnsupportedKey")});return}if(N.issue){h({tone:"error",text:ge(n,N.issue)});return}let O=R(N.conflicts);if(O.length>0){h({tone:"error",text:n("shortcutConflict",{commands:O.join(", ")})});return}let q=e.shortcuts.config.getSnapshot();if(q.status!=="ready"){h({tone:"error",text:n("shortcutNotReady")});return}let U=await e.shortcuts.edit({type:"set",id:j,binding:N.binding},q.revision);M(U,"shortcutSaved")}finally{x.current&&g(!1)}}}A.current=p,u.useEffect(()=>{if(!o)return;let w=!1,T=null;r(!0),c(null),h(null),e.shortcuts.recording(!0).catch(()=>{w||(h({tone:"error",text:n("shortcutNativeFailed")}),d(!1))});let N=b=>!/^(Control|Alt|Shift|Meta)(Left|Right)$/u.test(b),O=b=>{if(w||b.isComposing||b.getModifierState?.("AltGraph"))return;if(b.key==="Escape"&&!b.ctrlKey&&!b.altKey&&!b.metaKey&&!b.shiftKey){b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation(),h(null),d(!1);return}if(b.key==="Tab"){d(!1);return}if(!N(b.code)||(b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation(),b.repeat||T!==null)||b.code==="Escape")return;let J=ee.filter(Re=>({control:b.ctrlKey,alt:b.altKey,shift:b.shiftKey,meta:b.metaKey})[Re]);T={code:b.code,modifiers:J},c(T),h(null)},q=b=>{if(w||T===null||b.code!==T.code)return;b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation();let J=T;T=null,d(!1),A.current(J)},U=()=>{w||d(!1)},K=b=>{I.current&&b.target!==I.current&&!I.current.contains(b.target)&&d(!1)};return document.addEventListener("keydown",O,!0),document.addEventListener("keyup",q,!0),document.addEventListener("focusin",K,!0),window.addEventListener("blur",U),()=>{w=!0,r(!1),c(null),document.removeEventListener("keydown",O,!0),document.removeEventListener("keyup",q,!0),document.removeEventListener("focusin",K,!0),window.removeEventListener("blur",U),e.shortcuts.recording(!1).catch(()=>{})}},[o]);function L(){if(!(!k&&!o)){if(o){d(!1);return}h(null),c(null),d(!0),I.current?.focus()}}let B="",D="";return v?(B=v.text,D=v.tone):o?B=n("shortcutRecordingHint"):s.status==="loading"?B=n("shortcutLoading"):s.status==="unreadable"?(B=n("shortcutUnreadable"),D="error"):y&&(B=n("shortcutWebFallback")),(0,a.jsxs)("div",{className:"dsnpm-settings",children:[(0,a.jsxs)("div",{className:"dsnpm-settingsRow",children:[(0,a.jsxs)("div",{className:"dsnpm-settingsText",children:[(0,a.jsx)("h3",{className:"dsnpm-settingsTitle",children:n("shortcutTitle")}),(0,a.jsx)("p",{className:"dsnpm-settingsDesc",children:n("shortcutDescription")})]}),(0,a.jsxs)("div",{className:"dsnpm-settingsControls",children:[(0,a.jsx)("button",{ref:I,type:"button",className:"dsnpm-binding","data-recording":o?"true":void 0,"data-tone":D==="error"?"error":void 0,onClick:L,disabled:m||!l||!C&&!o,"aria-pressed":o,"aria-label":o?n("shortcutRecording"):E.length>0?`${n("shortcutChange")}: ${E.join(" ")}`:n("shortcutChange"),title:n("shortcutChange"),children:o&&!f?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"dsnpm-recordingDot","aria-hidden":"true"}),n("shortcutRecording")]}):E.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(ot,{keys:E}),(0,a.jsx)(it,{})]}):n("shortcutNotSet")}),l?.modified?(0,a.jsx)("button",{type:"button",className:"dsnpm-bindingReset",onClick:()=>void P(),disabled:m||o||!C,children:n("shortcutReset")}):null]})]}),(0,a.jsx)("p",{className:"dsnpm-settingsStatus","data-tone":D||void 0,role:"status",children:B})]})}function dt(){return(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,a.jsx)("path",{d:"m7 8 4 4-4 4"}),(0,a.jsx)("path",{d:"M13 16h4"}),(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"16",rx:"3"})]})}function he(){return(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,a.jsx)("path",{d:"M20 11a8 8 0 1 0-2.3 5.7"}),(0,a.jsx)("path",{d:"M20 4v7h-7"})]})}function ct(){return(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:[(0,a.jsx)("circle",{cx:"11",cy:"11",r:"6.5"}),(0,a.jsx)("path",{d:"m16 16 4 4"})]})}function pt(){return(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:(0,a.jsx)("path",{d:"M6 6l12 12M18 6 6 18"})})}function ut(){return(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,a.jsx)("path",{d:"M8 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"}),(0,a.jsx)("path",{d:"M9 12h6M9 16h4M8 3v4h8V3"})]})}function be({text:e,match:r,field:n}){let t=se(e,r,n);return(0,a.jsxs)(a.Fragment,{children:[t.before,t.hit?(0,a.jsx)("mark",{className:"dsnpm-mark",children:t.hit}):null,t.after]})}function mt({script:e,index:r,active:n,running:t,onActivate:s,onRun:i}){return(0,a.jsxs)("div",{role:"option",id:`dsnpm-option-${r}`,"data-index":r,"data-active":n?"true":"false","aria-selected":n,className:"dsnpm-row",onMouseEnter:s,onMouseDown:o=>o.preventDefault(),onClick:()=>{t||i(e)},children:[(0,a.jsxs)("span",{className:"dsnpm-rowBody",children:[(0,a.jsx)("span",{className:"dsnpm-rowName",children:(0,a.jsx)(be,{text:e.name,match:e.match,field:"name"})}),(0,a.jsx)("span",{className:"dsnpm-rowCommand",children:(0,a.jsx)(be,{text:e.command,match:e.match,field:"command"})})]}),(0,a.jsx)("span",{className:"dsnpm-enter","aria-hidden":"true",children:"\u21B5"})]})}function ft({ctx:e,controller:r,state:n,t,dialogRef:s,searchRef:i,titleId:o,descriptionId:d,listId:f}){let c=u.useMemo(()=>ae(n.repo?.scripts??[],n.query),[n.repo,n.query]),[m,g]=u.useState(0),v=u.useRef(null),h=u.useRef(null),I=u.useRef(!1),x=!!n.running,A=n.confirming,l=n.phase==="ready";u.useEffect(()=>{g(0)},[n.query,n.repo]),u.useEffect(()=>{if(A){I.current=!0,h.current?.focus({preventScroll:!0});return}!I.current||x||(I.current=!1,i.current?.focus({preventScroll:!0}))},[A,x,i]),u.useEffect(()=>{if(c.length===0){m!==0&&g(0);return}m>c.length-1&&g(c.length-1)},[m,c.length]),u.useEffect(()=>{if(!v.current)return;let p=v.current.querySelector(`[data-index="${m}"]`);p&&typeof p.scrollIntoView=="function"&&p.scrollIntoView({block:"nearest"})},[m]);let y=u.useCallback(p=>{p&&r.run(p)},[r]);function S(p){if(p.nativeEvent.isComposing||p.nativeEvent.keyCode===229)return;if(p.key==="Enter"&&p.repeat){p.preventDefault();return}if(p.key==="Escape"){if(p.preventDefault(),p.stopPropagation(),x)return;A?r.cancelRestart():r.close();return}if(p.key==="Tab"){let D=s.current;if(!D)return;let w=[...D.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(O=>O.getAttribute("aria-hidden")!=="true");if(w.length===0)return;let T=w[0],N=w[w.length-1];p.shiftKey&&document.activeElement===T?(p.preventDefault(),N.focus()):!p.shiftKey&&document.activeElement===N&&(p.preventDefault(),T.focus());return}if(!l||c.length===0||x||A)return;let L=p.target;(L===i.current||L instanceof Node&&v.current!==null&&v.current.contains(L))&&(p.key==="ArrowDown"?(p.preventDefault(),g(D=>(D+1)%c.length)):p.key==="ArrowUp"?(p.preventDefault(),g(D=>(D-1+c.length)%c.length)):p.key==="Home"?(p.preventDefault(),g(0)):p.key==="End"?(p.preventDefault(),g(c.length-1)):p.key==="PageDown"?(p.preventDefault(),g(D=>Math.min(c.length-1,D+6))):p.key==="PageUp"?(p.preventDefault(),g(D=>Math.max(0,D-6))):p.key==="Enter"&&(p.preventDefault(),y(c[m])))}let E=c[m],C=l&&E?`dsnpm-option-${m}`:void 0,k=n.repo,R=k?.packagePath&&k.packagePath!=="."?k.packagePath:"",M=k?R?`${k.name}/${R}`:k.name:"",P=k?t(R?"subtitle":"subtitleRepoOnly",{repo:k.name,packagePath:R,manager:k.manager}):t("loading");return(0,a.jsx)("div",{className:"dsnpm-overlay",onMouseDown:p=>{p.target===p.currentTarget&&!x&&r.close()},children:(0,a.jsxs)("div",{ref:s,className:"dsnpm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":o,"aria-describedby":d,"data-shortcut-modal":xe,onKeyDown:S,children:[(0,a.jsxs)("div",{className:"dsnpm-head",children:[(0,a.jsx)("span",{className:"dsnpm-glyph",children:A?(0,a.jsx)(he,{}):(0,a.jsx)(dt,{})}),(0,a.jsxs)("div",{className:"dsnpm-heading",children:[(0,a.jsx)("h2",{className:"dsnpm-title",id:o,children:t(A?"restartTitle":"title")}),(0,a.jsxs)("p",{className:"dsnpm-subtitle",id:d,children:[(0,a.jsx)("span",{className:"dsnpm-subtitleText",children:k?M:P}),k?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{"aria-hidden":"true",children:"\xB7"}),(0,a.jsx)("span",{className:"dsnpm-manager",children:k.manager})]}):null]})]}),(0,a.jsx)("button",{type:"button",className:"dsnpm-close",onClick:()=>r.close(),disabled:x,"aria-label":t("close"),title:t("close"),children:(0,a.jsx)(pt,{})})]}),A?(0,a.jsxs)("div",{className:"dsnpm-confirm",children:[(0,a.jsx)("span",{className:"dsnpm-confirmGlyph","aria-hidden":"true",children:(0,a.jsx)(he,{})}),(0,a.jsxs)("div",{className:"dsnpm-confirmBody",children:[(0,a.jsxs)("div",{role:"alert",children:[(0,a.jsx)("p",{className:"dsnpm-confirmLead",children:t("restartLead",{name:A.script.name})}),(0,a.jsx)("p",{className:"dsnpm-confirmDetail",children:t("restartDetail")})]}),(0,a.jsx)("code",{className:"dsnpm-confirmCommand",children:A.command}),(0,a.jsxs)("div",{className:"dsnpm-confirmActions",children:[(0,a.jsx)("button",{type:"button",className:"dsnpm-confirmButton",onClick:()=>r.cancelRestart(),disabled:x,children:t("restartCancel")}),(0,a.jsx)("button",{ref:h,type:"button",className:"dsnpm-confirmButton","data-variant":"primary",onClick:()=>void r.acceptRestart(),disabled:x,children:t("restartConfirm")})]})]})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"dsnpm-searchWrap",children:[(0,a.jsx)("span",{className:"dsnpm-searchIcon",children:(0,a.jsx)(ct,{})}),(0,a.jsx)("input",{ref:i,className:"dsnpm-search",type:"text",role:"combobox","aria-label":t("searchLabel"),"aria-autocomplete":"list","aria-expanded":l,"aria-controls":f,"aria-activedescendant":C,"aria-busy":n.phase==="loading",placeholder:t("searchPlaceholder"),value:n.query,readOnly:x,"aria-disabled":x,spellCheck:!1,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",onChange:p=>r.setQuery(p.target.value)})]}),n.error?(0,a.jsxs)("div",{className:"dsnpm-alert",role:"alert",children:[(0,a.jsx)("strong",{className:"dsnpm-alertTitle",children:n.phase==="failed"?t("errorTitle"):n.error.code==="restart-failed"?t("restartErrorTitle"):t("terminalErrorTitle")}),at(t,n.error),n.phase==="failed"?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("br",{}),(0,a.jsx)("button",{type:"button",className:"dsnpm-retry",onClick:()=>r.retry(),children:t("retry")})]}):null]}):null,(0,a.jsxs)("div",{className:"dsnpm-listWrap",children:[n.phase==="loading"?(0,a.jsx)("div",{className:"dsnpm-skeletons","aria-hidden":"true",children:[0,1,2,3].map(p=>(0,a.jsx)("div",{className:"dsnpm-skeleton"},p))}):l&&c.length===0?(0,a.jsxs)("div",{className:"dsnpm-state",children:[(0,a.jsx)("span",{className:"dsnpm-stateGlyph",children:(0,a.jsx)(ut,{})}),n.repo?.scripts?.length===0?(0,a.jsx)("span",{children:t("empty")}):(0,a.jsx)("span",{children:t("noMatches",{query:n.query.trim()})})]}):l?(0,a.jsx)("div",{ref:v,className:"dsnpm-list",id:f,role:"listbox","aria-label":t("scriptsLabel"),"aria-busy":x,tabIndex:-1,children:c.map((p,L)=>(0,a.jsx)(mt,{script:p,index:L,active:L===m,running:x,onActivate:()=>{L!==m&&g(L)},onRun:y},p.name))}):null,(0,a.jsx)("span",{className:"dsnpm-srOnly",role:"status","aria-live":"polite",children:l?n.query.trim()?t(c.length===1?"filterResultOne":"filterResults",{count:c.length,query:n.query.trim()}):t(c.length===1?"allScriptOne":"allScripts",{count:c.length}):""})]})]}),(0,a.jsxs)("div",{className:"dsnpm-footer",children:[x?(0,a.jsxs)("span",{className:"dsnpm-running",role:"status",children:[(0,a.jsx)("span",{className:"dsnpm-spinner","aria-hidden":"true"}),(0,a.jsx)("span",{children:t(n.running.mode==="restart"?"restarting":n.running.mode==="check"?"checking":"starting",{name:n.running.name})})]}):A?(0,a.jsxs)("span",{className:"dsnpm-hints",children:[(0,a.jsxs)("span",{className:"dsnpm-hint",children:[(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"\u21B5"}),t("restartHint")]}),(0,a.jsxs)("span",{className:"dsnpm-hint",children:[(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"esc"}),t("restartCancel")]})]}):(0,a.jsxs)("span",{className:"dsnpm-hints",children:[(0,a.jsxs)("span",{className:"dsnpm-hint dsnpm-hintNavigate",children:[(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2191"}),(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2193"}),t("navigate")]}),(0,a.jsxs)("span",{className:"dsnpm-hint dsnpm-hintRun",children:[(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"\u21B5"}),t("enterToRun")]}),(0,a.jsxs)("span",{className:"dsnpm-hint",children:[(0,a.jsx)("kbd",{className:"dsnpm-kbd",children:"esc"}),t("esc")]})]}),(0,a.jsx)("span",{className:"dsnpm-count",children:!A&&l?n.query.trim()?fe(t,c.length,"matchesOne","matchesMany"):fe(t,c.length,"countOne","countMany"):""})]})]})})}function gt({ctx:e,controller:r}){let n=u.useSyncExternalStore(r.subscribe,r.getState,r.getState),t=ve(e),s=u.useRef(null),i=u.useRef(null),o=u.useRef(null),d=u.useId(),f=u.useId(),c=u.useId();return u.useEffect(()=>{if(!n.open)return;o.current=document.activeElement instanceof HTMLElement?document.activeElement:null,i.current&&(i.current.focus({preventScroll:!0}),i.current.select());let m=g=>{if(g.key!=="Escape")return;let v=r.getState();v.running||v.confirming||(g.preventDefault(),g.stopPropagation(),r.close())};return document.addEventListener("keydown",m,!0),()=>{document.removeEventListener("keydown",m,!0);let g=o.current,v=s.current,h=v?v.contains(document.activeElement):!1;g&&g.isConnected&&(document.activeElement===document.body||h)&&g.focus({preventScroll:!0})}},[n.open]),u.useEffect(()=>{if(n.open)return e.sessions.list.subscribe(()=>{let m=ne(e);(!n.sessionId||m!==n.sessionId)&&r.close()})},[e,r,n.open,n.sessionId]),n.open?(0,ye.createPortal)((0,a.jsx)("div",{className:"dsnpm-root",children:(0,a.jsx)(ft,{ctx:e,controller:r,state:n,t,dialogRef:s,searchRef:i,titleId:d,descriptionId:f,listId:c})}),document.body):null}function ht(){if(document.querySelector("style[data-dsh-npm-scripts]"))return;let e=document.createElement("style");e.dataset.dshNpmScripts="",e.textContent=Ye,document.head.appendChild(e)}function bt(){document.querySelector("style[data-dsh-npm-scripts]")?.remove()}var yt=["sessions","layout","shortcuts","locale","slots","sidebarRight","webTerminals"];function wt(e){let r=Je(e),n=!1,t=o=>{n=!!o};ht();let s=document.createElement("div");s.dataset.dshNpmScriptsRoot="",document.body.appendChild(s);let i=(0,we.createRoot)(s);i.render(me(gt,{ctx:e,controller:r})),e.effect(()=>()=>{i.unmount(),s.remove(),bt()},"npm-scripts: overlay"),e.effect(()=>e.locale.register(H,"en",G),"npm-scripts: en locale"),e.effect(()=>e.locale.register(H,"zh",Ge),"npm-scripts: zh locale"),e.effect(()=>e.slots.inject("plugins.bundle.config",()=>e.slots.register({name:"plugins.bundle.config",key:"dsh-plugin-npm-scripts",locale:H},o=>me(lt,{...o,ctx:e,setIntercept:t}))),"npm-scripts: settings"),e.effect(()=>{let o=e.locale.bind(H),d=m=>{try{let g=o(m);return typeof g=="string"?g:G[m]??m}catch{return G[m]??m}},c=e.shortcuts.runtime==="desktop"?{"desktop:macos":{code:"KeyA",modifiers:["alt"]},"desktop:windows":{code:"KeyA",modifiers:["alt"]},"desktop:linux":{code:"KeyA",modifiers:["alt"]}}:{};try{return e.shortcuts.register({id:j,label:()=>d("shortcutLabel"),aliases:["npm scripts","run npm script","package scripts","run script"],defaults:c,regions:["page","editable","terminal"],modals:[xe],resolve:()=>{if(n)return{status:"blocked",reason:"recording"};let m=ne(e);return m?{status:"handled",run:()=>r.toggle(m)}:{status:"blocked",reason:d("noSession")}}})}catch(m){return console.warn("npm-scripts: shortcut registration failed",m),()=>{}}},"npm-scripts: shortcut"),e.effect(()=>{let o=d=>{if(d.defaultPrevented||d.isComposing||d.repeat||n||d.code!=="KeyA"||!d.altKey||d.metaKey||d.ctrlKey||d.shiftKey||!st(e))return;let f=d.target;if(f instanceof Element&&f.closest('[role="menu"]'))return;if(r.getState().open){d.preventDefault(),d.stopPropagation(),r.close();return}if(Ve())return;let c=ne(e);c&&(d.preventDefault(),d.stopPropagation(),r.toggle(c))};return document.addEventListener("keydown",o,!0),()=>document.removeEventListener("keydown",o,!0)},"npm-scripts: Option+A listener")}

    return module.exports;
  },
});
