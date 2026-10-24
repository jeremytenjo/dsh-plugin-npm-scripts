// Generated from src/client.jsx by scripts/build-client.mjs. Do not edit.
window.__ModuleLoader__.load({
  id: "dsh-plugin-npm-scripts",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var ce=Object.create;var B=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var me=Object.getPrototypeOf,fe=Object.prototype.hasOwnProperty;var he=(e,n)=>{for(var t in n)B(e,t,{get:n[t],enumerable:!0})},V=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of ue(n))!fe.call(e,o)&&o!==t&&B(e,o,{get:()=>n[o],enumerable:!(r=pe(n,o))||r.enumerable});return e};var ge=(e,n,t)=>(t=e!=null?ce(me(e)):{},V(n||!e||!e.__esModule?B(t,"default",{value:e,enumerable:!0}):t,e)),be=e=>V(B({},"__esModule",{value:!0}),e);var Je={};he(Je,{apply:()=>Xe,inject:()=>Qe});module.exports=be(Je);var m=ge(require("react"),1),ae=require("react-dom"),oe=require("react-dom/client");function Y(e,n){let t=Array.isArray(e)?e:[],r=String(n??"").trim().toLowerCase();if(r.length===0)return t.map(i=>({name:i.name,command:i.command,match:{field:"",start:0,length:0}}));let o=[];return t.forEach((i,l)=>{let a=String(i.name??""),h=String(i.command??""),p=a.toLowerCase(),f=h.toLowerCase(),d=p.indexOf(r),g=f.indexOf(r),c=-1,y="",x=0;p===r?(c=0,y="name",x=0):p.startsWith(r)?(c=1,y="name",x=0):d!==-1?(c=2,y="name",x=d):g!==-1&&(c=3,y="command",x=g),c!==-1&&o.push({script:i,score:c,index:l,field:y,start:x})}),o.sort((i,l)=>i.score-l.score||i.index-l.index),o.map(({script:i,field:l,start:a})=>({name:i.name,command:i.command,match:{field:l,start:a,length:r.length}}))}function Z(e,n,t){let r=String(e??"");if(!n||n.field!==t||n.length<=0)return{before:r,hit:"",after:""};let o=Math.max(0,Math.min(n.start,r.length)),i=Math.min(r.length,o+n.length);return{before:r.slice(0,o),hit:r.slice(o,i),after:r.slice(i)}}var $=["control","alt","shift","meta"];function ye(e){return e==="macos"?{control:"\u2303",alt:"\u2325",shift:"\u21E7",meta:"\u2318"}:{control:"Ctrl",alt:"Alt",shift:"Shift",meta:"Meta"}}function we(e){return/^Key[A-Z]$/u.test(e)?e.slice(3):/^Digit[0-9]$/u.test(e)?e.slice(5):{ArrowUp:"\u2191",ArrowDown:"\u2193",ArrowLeft:"\u2190",ArrowRight:"\u2192"}[e]??e}function Q(e,n){if(!e)return[];let t=ye(n),r=$.filter(o=>e.modifiers.includes(o)).map(o=>t[o]);return r.push(we(e.code)),r}function _(e){return!!e&&e.code==="KeyA"&&e.modifiers.length===1&&e.modifiers[0]==="alt"}function X(e){return!e||!e.modified?!0:_(e.binding)}var xe=new Set(["npm","pnpm","yarn","bun"]);function J(e,n="macos"){let t=String(e??"");if(t.includes("\0"))throw new Error("A script value contains a NUL byte.");return n==="windows"?`'${t.replaceAll("'","''")}'`:`'${t.replaceAll("'","'\\''")}'`}function ee({manager:e,scriptName:n,packageDir:t,cwd:r,platform:o="macos"}){let i=xe.has(e)?e:"npm",l=String(n??"");if(l.length===0)throw new Error("A script name is required.");let a=`${i} run ${J(l,o)}`,h=typeof t=="string"?t.replace(/[\\/]+$/u,""):"",p=typeof r=="string"?r.replace(/[\\/]+$/u,""):"";return!h||!p||h===p?a:`cd ${J(h,o)} && ${a}`}var s=require("react/jsx-runtime"),te=m.createElement,K="dshNpmScripts",ve="/__dsh/npm-scripts",ie="npm-scripts",ke=6e3,Re=16e3,Se=160,Ee=80,O="npm-scripts.open",Ne={code:"KeyA",modifiers:["alt"]},j={title:"Run npm script",shortcutLabel:"Run npm script",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"Search scripts\u2026",searchLabel:"Search scripts",scriptsLabel:"Scripts",close:"Close dialog",loading:"Reading package.json\u2026",empty:"This package.json defines no scripts.",noMatches:"No scripts match \u201C{query}\u201D.",errorTitle:"Could not load scripts",terminalErrorTitle:"Could not start the terminal",retry:"Retry",runFailed:"The terminal could not be started. {message}",starting:"Starting \u201C{name}\u201D\u2026",startingHint:"Waiting for the new terminal\u2026",enterToRun:"Enter to run",navigate:"Navigate",run:"Run",esc:"Close",countOne:"1 script",countMany:"{count} scripts",matchesOne:"1 match",matchesMany:"{count} matches",noSession:"Open a session first.",sessionMissing:"The active session is no longer available.",directoryMissing:"The repository folder is no longer available.",noPackage:"No package.json was found in this repository.",invalidManifest:"package.json could not be read.",networkError:"Could not reach the DeepSeek Harness host.",unreadable:"The script list returned an unreadable response.",requestFailed:"Could not read the scripts for this repository.",timedOut:"Reading the repository timed out.",terminalUnavailable:"The terminal panel is not available in this window.",terminalTimeout:"The new terminal did not become ready in time.",filterResults:"{count} scripts match \u201C{query}\u201D.",filterResultOne:"1 script matches \u201C{query}\u201D.",allScripts:"{count} scripts available.",allScriptOne:"1 script available.",running:"Running",script:"script",shortcutTitle:"Keyboard shortcut",shortcutDescription:"Open the npm scripts palette from any project. The binding is saved for this device.",shortcutChange:"Change keyboard shortcut",shortcutRecording:"Press a shortcut\u2026",shortcutRecordingHint:"Release the keys to save, or press Esc to cancel.",shortcutNotSet:"Not set",shortcutReset:"Reset to default",shortcutLoading:"Loading shortcut\u2026",shortcutSaved:"Shortcut saved.",shortcutResetDone:"Shortcut reset to the default.",shortcutDefaultOptionA:"Using the default Option+A.",shortcutNativeFailed:"Could not start key recording. Close other dialogs and try again.",shortcutNotReady:"Shortcuts are still loading. Try again in a moment.",shortcutUnreadable:"The shortcut settings could not be read.",shortcutWriteFailed:"The shortcut could not be saved.",shortcutStale:"Shortcuts changed elsewhere. Try again.",shortcutConflict:"Already used by {commands}.",shortcutReserved:"That combination is reserved by DeepSeek Harness or the operating system.",shortcutUnsupportedBrowser:"Web builds cannot use that combination. Add Command or Control.",shortcutModifierRequired:"Include at least one modifier besides Shift.",shortcutUnsupportedKey:"That key cannot be used for a shortcut.",shortcutUnsupported:"That shortcut is not available on this device.",shortcutWebFallback:"Option+A is the Web default. Choose a browser-supported combination, or reset to use it.",shortcutRecordingStatus:"Recording. {hint}"},Te={title:"\u8FD0\u884C npm \u811A\u672C",shortcutLabel:"\u8FD0\u884C npm \u811A\u672C",subtitle:"{repo} \xB7 {packagePath} \xB7 {manager}",subtitleRepoOnly:"{repo} \xB7 {manager}",searchPlaceholder:"\u641C\u7D22\u811A\u672C\u2026",searchLabel:"\u641C\u7D22\u811A\u672C",scriptsLabel:"\u811A\u672C",close:"\u5173\u95ED\u5BF9\u8BDD\u6846",loading:"\u6B63\u5728\u8BFB\u53D6 package.json\u2026",empty:"\u8FD9\u4E2A package.json \u6CA1\u6709\u5B9A\u4E49\u811A\u672C\u3002",noMatches:"\u6CA1\u6709\u5339\u914D\u201C{query}\u201D\u7684\u811A\u672C\u3002",errorTitle:"\u65E0\u6CD5\u52A0\u8F7D\u811A\u672C",terminalErrorTitle:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF",retry:"\u91CD\u8BD5",runFailed:"\u65E0\u6CD5\u542F\u52A8\u7EC8\u7AEF\u3002{message}",starting:"\u6B63\u5728\u542F\u52A8\u201C{name}\u201D\u2026",startingHint:"\u6B63\u5728\u7B49\u5F85\u65B0\u7EC8\u7AEF\u2026",enterToRun:"\u56DE\u8F66\u8FD0\u884C",navigate:"\u5BFC\u822A",run:"\u8FD0\u884C",esc:"\u5173\u95ED",countOne:"1 \u4E2A\u811A\u672C",countMany:"{count} \u4E2A\u811A\u672C",matchesOne:"1 \u4E2A\u5339\u914D",matchesMany:"{count} \u4E2A\u5339\u914D",noSession:"\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u3002",sessionMissing:"\u5F53\u524D\u4F1A\u8BDD\u5DF2\u4E0D\u53EF\u7528\u3002",directoryMissing:"\u4ED3\u5E93\u6587\u4EF6\u5939\u5DF2\u4E0D\u53EF\u7528\u3002",noPackage:"\u5728\u6B64\u4ED3\u5E93\u4E2D\u627E\u4E0D\u5230 package.json\u3002",invalidManifest:"\u65E0\u6CD5\u8BFB\u53D6 package.json\u3002",networkError:"\u65E0\u6CD5\u8FDE\u63A5\u5230 DeepSeek Harness \u4E3B\u673A\u3002",unreadable:"\u811A\u672C\u5217\u8868\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002",requestFailed:"\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4ED3\u5E93\u7684\u811A\u672C\u3002",timedOut:"\u8BFB\u53D6\u4ED3\u5E93\u8D85\u65F6\u3002",terminalUnavailable:"\u6B64\u7A97\u53E3\u4E2D\u6CA1\u6709\u53EF\u7528\u7684\u7EC8\u7AEF\u9762\u677F\u3002",terminalTimeout:"\u65B0\u7EC8\u7AEF\u672A\u80FD\u53CA\u65F6\u5C31\u7EEA\u3002",filterResults:"{count} \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",filterResultOne:"1 \u4E2A\u811A\u672C\u5339\u914D\u201C{query}\u201D\u3002",allScripts:"\u5171 {count} \u4E2A\u811A\u672C\u3002",allScriptOne:"\u5171 1 \u4E2A\u811A\u672C\u3002",running:"\u6B63\u5728\u8FD0\u884C",script:"\u811A\u672C",shortcutTitle:"\u952E\u76D8\u5FEB\u6377\u952E",shortcutDescription:"\u5728\u4EFB\u610F\u9879\u76EE\u4E2D\u6253\u5F00 npm \u811A\u672C\u9762\u677F\u3002\u6B64\u7ED1\u5B9A\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u8BBE\u5907\u3002",shortcutChange:"\u66F4\u6539\u952E\u76D8\u5FEB\u6377\u952E",shortcutRecording:"\u6309\u4E0B\u5FEB\u6377\u952E\u2026",shortcutRecordingHint:"\u677E\u5F00\u7EC4\u5408\u952E\u5373\u4FDD\u5B58\uFF0C\u6309 Esc \u53D6\u6D88\u3002",shortcutNotSet:"\u672A\u8BBE\u7F6E",shortcutReset:"\u6062\u590D\u9ED8\u8BA4",shortcutLoading:"\u6B63\u5728\u8BFB\u53D6\u5FEB\u6377\u952E\u2026",shortcutSaved:"\u5FEB\u6377\u952E\u5DF2\u4FDD\u5B58\u3002",shortcutResetDone:"\u5FEB\u6377\u952E\u5DF2\u6062\u590D\u9ED8\u8BA4\u3002",shortcutDefaultOptionA:"\u4F7F\u7528\u9ED8\u8BA4\u7684 Option+A\u3002",shortcutNativeFailed:"\u65E0\u6CD5\u5F00\u59CB\u5F55\u5236\u6309\u952E\u3002\u8BF7\u5173\u95ED\u5176\u4ED6\u5BF9\u8BDD\u6846\u540E\u91CD\u8BD5\u3002",shortcutNotReady:"\u5FEB\u6377\u952E\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002",shortcutUnreadable:"\u65E0\u6CD5\u8BFB\u53D6\u5FEB\u6377\u952E\u8BBE\u7F6E\u3002",shortcutWriteFailed:"\u65E0\u6CD5\u4FDD\u5B58\u5FEB\u6377\u952E\u3002",shortcutStale:"\u5FEB\u6377\u952E\u5DF2\u5728\u5176\u4ED6\u4F4D\u7F6E\u66F4\u6539\uFF0C\u8BF7\u91CD\u8BD5\u3002",shortcutConflict:"\u5DF2\u88AB {commands} \u4F7F\u7528\u3002",shortcutReserved:"\u8BE5\u7EC4\u5408\u5DF2\u88AB DeepSeek Harness \u6216\u64CD\u4F5C\u7CFB\u7EDF\u5360\u7528\u3002",shortcutUnsupportedBrowser:"Web \u7248\u672C\u65E0\u6CD5\u4F7F\u7528\u8BE5\u7EC4\u5408\u3002\u8BF7\u6DFB\u52A0 Command \u6216 Control\u3002",shortcutModifierRequired:"\u9664 Shift \u5916\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u4FEE\u9970\u952E\u3002",shortcutUnsupportedKey:"\u8BE5\u6309\u952E\u4E0D\u80FD\u7528\u4E8E\u5FEB\u6377\u952E\u3002",shortcutUnsupported:"\u6B64\u8BBE\u5907\u65E0\u6CD5\u4F7F\u7528\u8BE5\u5FEB\u6377\u952E\u3002",shortcutWebFallback:"Option+A \u662F Web \u7684\u9ED8\u8BA4\u5FEB\u6377\u952E\u3002\u8BF7\u9009\u62E9\u6D4F\u89C8\u5668\u652F\u6301\u7684\u7EC4\u5408\uFF0C\u6216\u6062\u590D\u9ED8\u8BA4\u4EE5\u4F7F\u7528\u5B83\u3002",shortcutRecordingStatus:"\u6B63\u5728\u5F55\u5236\u3002{hint}"},Ce=`
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
`;function le(e){let[,n]=m.useReducer(r=>r+1,0);m.useEffect(()=>e.locale.subscribe(n),[e]);let t=m.useMemo(()=>e.locale.bind(K),[e]);return m.useCallback((r,o)=>{let i;try{i=t(r)}catch{i=j[r]}if((typeof i!="string"||i===r)&&(i=j[r]??r),o)for(let[l,a]of Object.entries(o))i=i.replaceAll(`{${l}}`,String(a));return i},[t])}function ne(e,n,t,r){return e(n===1?t:r,{count:n})}function H(e){if(e.layout.panelInfo.getSnapshot().activePanelId!==null)return;let n=e.sessions.list.getSnapshot().byId,t=Object.values(n).find(r=>(r.retainedBy?.mainView??0)>0);return typeof t?.id=="string"?t.id:void 0}function Ae(){return!!document.querySelector('[role="dialog"][aria-modal="true"]:not([data-shortcut-modal="npm-scripts"]), [role="menu"]')}function Me(e){let n={open:!1,sessionId:void 0,phase:"idle",repo:null,error:null,query:"",running:null},t,r=0,o=0,i=0,l=new Set;function a(d){n={...n,...d};for(let g of l)g()}function h(){t&&(t.abort(),t=void 0),r+=1}let p={subscribe(d){return l.add(d),()=>l.delete(d)},getState(){return n},open(d){if(typeof d!="string"||d.length===0||n.open&&n.sessionId===d)return;h();let g=r,c=new AbortController;t=c,o+=1,a({open:!0,sessionId:d,phase:"loading",repo:null,error:null,query:"",running:null}),f(d,c.signal,g)},close(){!n.open&&n.phase==="idle"||(h(),a({open:!1,phase:"idle",repo:null,error:null,query:"",running:null}))},toggle(d){let g=Date.now();g-i<Ee||(i=g,!n.running&&(n.open?p.close():p.open(d)))},setQuery(d){a({query:String(d??"")})},retry(){let d=n.sessionId;if(!d)return;h();let g=r,c=new AbortController;t=c,a({phase:"loading",repo:null,error:null,query:"",running:null}),f(d,c.signal,g)},async run(d){if(n.running||n.phase!=="ready"||!n.repo||!n.sessionId)return;let g=n.repo,c=n.sessionId,y=o+1;o=y,a({running:{name:d.name},error:null});try{let x=ee({manager:g.manager,scriptName:d.name,packageDir:g.packageDir,cwd:g.cwd,platform:e.shortcuts.platform});if(await Pe(e,c,x,d.name),o!==y)return;a({open:!1,phase:"idle",repo:null,query:"",running:null})}catch(x){if(o!==y)return;a({running:null,error:{code:"terminal-failed",message:x instanceof Error?x.message:String(x)}})}}};async function f(d,g,c){try{let y=await De(d,g);if(g.aborted||c!==r||!n.open)return;a({phase:"ready",repo:y,error:null})}catch(y){if(g.aborted||c!==r)return;a({phase:"failed",repo:null,error:{code:y?.code||"request-failed",message:y?.message||""}})}}return p}async function De(e,n){let t;try{t=await fetch(ve,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"list",sessionId:e}),signal:n})}catch(o){if(o?.name==="AbortError")throw o;let i=new Error("network");throw i.code="network",i}let r;try{r=await t.json()}catch{let o=new Error("unreadable");throw o.code="unreadable",o}if(!t.ok||!r||r.ok!==!0){let o=new Error(typeof r?.error=="string"&&r.error?r.error:"request-failed");throw o.code=typeof r?.code=="string"?r.code:"request-failed",o}return Oe(r.repo)}function Oe(e){let n=e&&typeof e=="object"?e:{},t=Array.isArray(n.scripts)?n.scripts.slice(0,1e3).filter(r=>r&&typeof r.name=="string"&&typeof r.command=="string").map(r=>({name:r.name.slice(0,200),command:r.command.slice(0,4e3)})):[];return{isRepo:!!n.isRepo,root:typeof n.root=="string"?n.root:"",name:typeof n.name=="string"?n.name:"repository",cwd:typeof n.cwd=="string"?n.cwd:"",packageDir:typeof n.packageDir=="string"?n.packageDir:"",packagePath:typeof n.packagePath=="string"?n.packagePath:".",packageName:typeof n.packageName=="string"?n.packageName:"",manager:["npm","pnpm","yarn","bun"].includes(n.manager)?n.manager:"npm",scripts:t,total:Number.isInteger(n.total)?n.total:t.length}}function Le(e){return new Promise(n=>setTimeout(n,e))}function Ie(e,n,t){return new Promise((r,o)=>{let i=!1,l=()=>{},a=setTimeout(()=>h(new Error("The new terminal tab did not appear.")),ke);function h(f,d){i||(i=!0,l(),clearTimeout(a),f?o(f):r(d))}function p(){if(i)return;let d=e.sidebarRight.openTabs.getSnapshot().find(g=>g.sessionId===n&&g.kind==="terminal"&&!t.has(g.tabId));d&&h(void 0,d)}l=e.sidebarRight.openTabs.subscribe(p),i?l():p()})}function qe(e){return new Promise((n,t)=>{let r=!1,o=()=>{},i=setTimeout(()=>l(new Error("The terminal did not become writable.")),Re);function l(h){r||(r=!0,o(),clearTimeout(i),h?t(h):n())}function a(){if(r)return;let h=e.state.getSnapshot();if(h.writable){l();return}(h.phase==="failed"||h.phase==="closed")&&l(new Error(h.error instanceof Error?h.error.message:typeof h.issue=="string"&&h.issue?h.issue:"The terminal stopped before it was ready."))}o=e.state.subscribe(a),r?o():a()})}async function Pe(e,n,t,r){if(!e.webTerminals||typeof e.webTerminals.view!="function")throw new Error("terminal-unavailable");if(!e.sidebarRight||typeof e.sidebarRight.openTab!="function")throw new Error("terminal-unavailable");let o=new Set(e.sidebarRight.openTabs.getSnapshot().filter(a=>a.sessionId===n&&a.kind==="terminal").map(a=>a.tabId));try{e.sidebarRight.openTab("terminal")}catch(a){throw new Error(a instanceof Error&&a.message?a.message:"terminal-unavailable")}let i=await Ie(e,n,o);if(!i)throw new Error("terminal-timeout");let l=e.webTerminals.view(n,i.tabId,i.contentId);if(!l)throw new Error("terminal-unavailable");try{await qe(l)}catch(a){throw new Error(a instanceof Error?a.message:"terminal-timeout")}l.rename(r).catch(()=>{}),await Le(Se),l.write(`${t}\r`)}function Ke(e,n){let t=n?.code||"";if(t==="session-missing"||t==="session-required")return e("sessionMissing");if(t==="no-working-directory"||t==="directory-unavailable")return e("directoryMissing");if(t==="no-package-json")return e("noPackage");if(t==="invalid-package-json"||t==="unreadable-package-json")return e("invalidManifest");if(t==="network")return e("networkError");if(t==="unreadable")return e("unreadable");if(t==="timeout")return e("timedOut");if(t==="terminal-failed"){let r=n?.message&&n.message!=="terminal-unavailable"?n.message:"";return r.includes("terminal-unavailable")?e("terminalUnavailable"):r.includes("did not become")||r.includes("did not appear")?e("terminalTimeout"):r||e("requestFailed")}return t==="terminal-unavailable"?e("terminalUnavailable"):t==="terminal-timeout"?e("terminalTimeout"):n?.message||e("requestFailed")}function re(e,n){return e(n==="reserved"?"shortcutReserved":n==="unsupported-browser"?"shortcutUnsupportedBrowser":n==="modifier-required"?"shortcutModifierRequired":n==="unsupported-key"?"shortcutUnsupportedKey":"shortcutUnsupported")}function je(e){let n=e.shortcuts.catalog.getSnapshot().find(t=>t.id===O);return X(n)}function ze(){return(0,s.jsxs)("svg",{className:"dsnpm-bindingEdit",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,s.jsx)("path",{d:"M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"}),(0,s.jsx)("path",{d:"m14.5 6.5 3 3"})]})}function Fe({keys:e,soft:n=!1}){return!e||e.length===0?null:(0,s.jsx)(s.Fragment,{children:e.map((t,r)=>(0,s.jsx)("kbd",{className:"dsnpm-key","data-soft":n?"true":void 0,children:t},`${t}-${r}`))})}function Ue({ctx:e,setIntercept:n}){let t=le(e),r=m.useSyncExternalStore(e.shortcuts.catalog.subscribe,e.shortcuts.catalog.getSnapshot,e.shortcuts.catalog.getSnapshot),o=m.useSyncExternalStore(e.shortcuts.config.subscribe,e.shortcuts.config.getSnapshot,e.shortcuts.config.getSnapshot),i=e.shortcuts.platform,[l,a]=m.useState(!1),[h,p]=m.useState(null),[f,d]=m.useState(!1),[g,c]=m.useState(null),y=m.useRef(null),x=m.useRef(!0),z=m.useRef(()=>{}),N=r.find(w=>w.id===O),F=e.shortcuts.runtime!=="desktop"&&(!N||!N.modified&&N.binding===null),R=l?h:F?Ne:N?.binding??null,T=Q(R,i),P=o.status==="ready",U=P&&!!N&&!f;m.useEffect(()=>()=>{x.current=!1},[]);function u(w){let k=e.shortcuts.fixedCatalog.getSnapshot();return(w??[]).filter(v=>v!==O).map(v=>{let A=r.find(D=>D.id===v);if(A?.label)return A.label;let M=k.find(D=>D.id===v);return M?.label?M.label:v})}function S(w,k){if(w.status==="saved"){c({tone:"success",text:t(k)});return}if(w.status==="conflict"){let v=u(w.conflicts);c({tone:"error",text:w.issue?re(t,w.issue):v.length>0?t("shortcutConflict",{commands:v.join(", ")}):t("shortcutUnsupported")});return}w.status==="stale"?c({tone:"error",text:t("shortcutStale")}):w.status==="not-ready"?c({tone:"error",text:t("shortcutNotReady")}):w.status==="unreadable"?c({tone:"error",text:t("shortcutUnreadable")}):c({tone:"error",text:t("shortcutWriteFailed")})}async function G(){if(U){d(!0),c(null);try{let w=e.shortcuts.config.getSnapshot();if(w.status!=="ready"){c({tone:"error",text:t("shortcutNotReady")});return}let k=await e.shortcuts.edit({type:"reset",id:O},w.revision);S(k,"shortcutResetDone")}finally{x.current&&d(!1)}}}async function E(w){if(x.current){d(!0),p(null);try{let k=e.shortcuts.catalog.getSnapshot().find(I=>I.id===O);if(_(w)&&e.shortcuts.runtime!=="desktop"){if(k?.modified){let I=e.shortcuts.config.getSnapshot();if(I.status!=="ready"){c({tone:"error",text:t("shortcutNotReady")});return}let b=await e.shortcuts.edit({type:"reset",id:O},I.revision);b.status==="saved"?c({tone:"success",text:t("shortcutDefaultOptionA")}):S(b,"shortcutDefaultOptionA");return}c({tone:"success",text:t("shortcutDefaultOptionA")});return}let v;try{v=e.shortcuts.describeBinding(w)}catch{c({tone:"error",text:t("shortcutUnsupportedKey")});return}if(v.issue){c({tone:"error",text:re(t,v.issue)});return}let A=u(v.conflicts);if(A.length>0){c({tone:"error",text:t("shortcutConflict",{commands:A.join(", ")})});return}let M=e.shortcuts.config.getSnapshot();if(M.status!=="ready"){c({tone:"error",text:t("shortcutNotReady")});return}let D=await e.shortcuts.edit({type:"set",id:O,binding:v.binding},M.revision);S(D,"shortcutSaved")}finally{x.current&&d(!1)}}}z.current=E,m.useEffect(()=>{if(!l)return;let w=!1,k=null;n(!0),p(null),c(null),e.shortcuts.recording(!0).catch(()=>{w||(c({tone:"error",text:t("shortcutNativeFailed")}),a(!1))});let v=b=>!/^(Control|Alt|Shift|Meta)(Left|Right)$/u.test(b),A=b=>{if(w||b.isComposing||b.getModifierState?.("AltGraph"))return;if(b.key==="Escape"&&!b.ctrlKey&&!b.altKey&&!b.metaKey&&!b.shiftKey){b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation(),c(null),a(!1);return}if(b.key==="Tab"){a(!1);return}if(!v(b.code)||(b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation(),b.repeat||k!==null)||b.code==="Escape")return;let W=$.filter(de=>({control:b.ctrlKey,alt:b.altKey,shift:b.shiftKey,meta:b.metaKey})[de]);k={code:b.code,modifiers:W},p(k),c(null)},M=b=>{if(w||k===null||b.code!==k.code)return;b.preventDefault(),b.stopImmediatePropagation(),b.stopPropagation();let W=k;k=null,a(!1),z.current(W)},D=()=>{w||a(!1)},I=b=>{y.current&&b.target!==y.current&&!y.current.contains(b.target)&&a(!1)};return document.addEventListener("keydown",A,!0),document.addEventListener("keyup",M,!0),document.addEventListener("focusin",I,!0),window.addEventListener("blur",D),()=>{w=!0,n(!1),p(null),document.removeEventListener("keydown",A,!0),document.removeEventListener("keyup",M,!0),document.removeEventListener("focusin",I,!0),window.removeEventListener("blur",D),e.shortcuts.recording(!1).catch(()=>{})}},[l]);function q(){if(!(!U&&!l)){if(l){a(!1);return}c(null),p(null),a(!0),y.current?.focus()}}let C="",L="";return g?(C=g.text,L=g.tone):l?C=t("shortcutRecordingHint"):o.status==="loading"?C=t("shortcutLoading"):o.status==="unreadable"?(C=t("shortcutUnreadable"),L="error"):F&&(C=t("shortcutWebFallback")),(0,s.jsxs)("div",{className:"dsnpm-settings",children:[(0,s.jsxs)("div",{className:"dsnpm-settingsRow",children:[(0,s.jsxs)("div",{className:"dsnpm-settingsText",children:[(0,s.jsx)("h3",{className:"dsnpm-settingsTitle",children:t("shortcutTitle")}),(0,s.jsx)("p",{className:"dsnpm-settingsDesc",children:t("shortcutDescription")})]}),(0,s.jsxs)("div",{className:"dsnpm-settingsControls",children:[(0,s.jsx)("button",{ref:y,type:"button",className:"dsnpm-binding","data-recording":l?"true":void 0,"data-tone":L==="error"?"error":void 0,onClick:q,disabled:f||!N||!P&&!l,"aria-pressed":l,"aria-label":l?t("shortcutRecording"):T.length>0?`${t("shortcutChange")}: ${T.join(" ")}`:t("shortcutChange"),title:t("shortcutChange"),children:l&&!h?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:"dsnpm-recordingDot","aria-hidden":"true"}),t("shortcutRecording")]}):T.length>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Fe,{keys:T}),(0,s.jsx)(ze,{})]}):t("shortcutNotSet")}),N?.modified?(0,s.jsx)("button",{type:"button",className:"dsnpm-bindingReset",onClick:()=>void G(),disabled:f||l||!P,children:t("shortcutReset")}):null]})]}),(0,s.jsx)("p",{className:"dsnpm-settingsStatus","data-tone":L||void 0,role:"status",children:C})]})}function Be(){return(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,s.jsx)("path",{d:"m7 8 4 4-4 4"}),(0,s.jsx)("path",{d:"M13 16h4"}),(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"16",rx:"3"})]})}function We(){return(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:[(0,s.jsx)("circle",{cx:"11",cy:"11",r:"6.5"}),(0,s.jsx)("path",{d:"m16 16 4 4"})]})}function $e(){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round","aria-hidden":"true",focusable:"false",children:(0,s.jsx)("path",{d:"M6 6l12 12M18 6 6 18"})})}function _e(){return(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[(0,s.jsx)("path",{d:"M8 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"}),(0,s.jsx)("path",{d:"M9 12h6M9 16h4M8 3v4h8V3"})]})}function se({text:e,match:n,field:t}){let r=Z(e,n,t);return(0,s.jsxs)(s.Fragment,{children:[r.before,r.hit?(0,s.jsx)("mark",{className:"dsnpm-mark",children:r.hit}):null,r.after]})}function He({script:e,index:n,active:t,running:r,onActivate:o,onRun:i}){return(0,s.jsxs)("div",{role:"option",id:`dsnpm-option-${n}`,"data-index":n,"data-active":t?"true":"false","aria-selected":t,className:"dsnpm-row",onMouseEnter:o,onMouseDown:l=>l.preventDefault(),onClick:()=>{r||i(e)},children:[(0,s.jsxs)("span",{className:"dsnpm-rowBody",children:[(0,s.jsx)("span",{className:"dsnpm-rowName",children:(0,s.jsx)(se,{text:e.name,match:e.match,field:"name"})}),(0,s.jsx)("span",{className:"dsnpm-rowCommand",children:(0,s.jsx)(se,{text:e.command,match:e.match,field:"command"})})]}),(0,s.jsx)("span",{className:"dsnpm-enter","aria-hidden":"true",children:"\u21B5"})]})}function Ge({ctx:e,controller:n,state:t,t:r,dialogRef:o,searchRef:i,titleId:l,descriptionId:a,listId:h}){let p=m.useMemo(()=>Y(t.repo?.scripts??[],t.query),[t.repo,t.query]),[f,d]=m.useState(0),g=m.useRef(null),c=!!t.running,y=t.phase==="ready";m.useEffect(()=>{d(0)},[t.query,t.repo]),m.useEffect(()=>{if(p.length===0){f!==0&&d(0);return}f>p.length-1&&d(p.length-1)},[f,p.length]),m.useEffect(()=>{if(!g.current)return;let u=g.current.querySelector(`[data-index="${f}"]`);u&&typeof u.scrollIntoView=="function"&&u.scrollIntoView({block:"nearest"})},[f]);let x=m.useCallback(u=>{u&&n.run(u)},[n]);function z(u){if(u.nativeEvent.isComposing||u.nativeEvent.keyCode===229)return;if(u.key==="Escape"){u.preventDefault(),u.stopPropagation(),c||n.close();return}if(u.key==="Tab"){let E=o.current;if(!E)return;let q=[...E.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(w=>w.getAttribute("aria-hidden")!=="true");if(q.length===0)return;let C=q[0],L=q[q.length-1];u.shiftKey&&document.activeElement===C?(u.preventDefault(),L.focus()):!u.shiftKey&&document.activeElement===L&&(u.preventDefault(),C.focus());return}if(!y||p.length===0||c)return;let S=u.target;(S===i.current||S instanceof Node&&g.current!==null&&g.current.contains(S))&&(u.key==="ArrowDown"?(u.preventDefault(),d(E=>(E+1)%p.length)):u.key==="ArrowUp"?(u.preventDefault(),d(E=>(E-1+p.length)%p.length)):u.key==="Home"?(u.preventDefault(),d(0)):u.key==="End"?(u.preventDefault(),d(p.length-1)):u.key==="PageDown"?(u.preventDefault(),d(E=>Math.min(p.length-1,E+6))):u.key==="PageUp"?(u.preventDefault(),d(E=>Math.max(0,E-6))):u.key==="Enter"&&(u.preventDefault(),x(p[f])))}let N=p[f],F=y&&N?`dsnpm-option-${f}`:void 0,R=t.repo,T=R?.packagePath&&R.packagePath!=="."?R.packagePath:"",P=R?T?`${R.name}/${T}`:R.name:"",U=R?r(T?"subtitle":"subtitleRepoOnly",{repo:R.name,packagePath:T,manager:R.manager}):r("loading");return(0,s.jsx)("div",{className:"dsnpm-overlay",onMouseDown:u=>{u.target===u.currentTarget&&!c&&n.close()},children:(0,s.jsxs)("div",{ref:o,className:"dsnpm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":l,"aria-describedby":a,"data-shortcut-modal":ie,onKeyDown:z,children:[(0,s.jsxs)("div",{className:"dsnpm-head",children:[(0,s.jsx)("span",{className:"dsnpm-glyph",children:(0,s.jsx)(Be,{})}),(0,s.jsxs)("div",{className:"dsnpm-heading",children:[(0,s.jsx)("h2",{className:"dsnpm-title",id:l,children:r("title")}),(0,s.jsxs)("p",{className:"dsnpm-subtitle",id:a,children:[(0,s.jsx)("span",{className:"dsnpm-subtitleText",children:R?P:U}),R?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{"aria-hidden":"true",children:"\xB7"}),(0,s.jsx)("span",{className:"dsnpm-manager",children:R.manager})]}):null]})]}),(0,s.jsx)("button",{type:"button",className:"dsnpm-close",onClick:()=>n.close(),disabled:c,"aria-label":r("close"),title:r("close"),children:(0,s.jsx)($e,{})})]}),(0,s.jsxs)("div",{className:"dsnpm-searchWrap",children:[(0,s.jsx)("span",{className:"dsnpm-searchIcon",children:(0,s.jsx)(We,{})}),(0,s.jsx)("input",{ref:i,className:"dsnpm-search",type:"text",role:"combobox","aria-label":r("searchLabel"),"aria-autocomplete":"list","aria-expanded":y,"aria-controls":h,"aria-activedescendant":F,"aria-busy":t.phase==="loading",placeholder:r("searchPlaceholder"),value:t.query,readOnly:c,"aria-disabled":c,spellCheck:!1,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",onChange:u=>n.setQuery(u.target.value)})]}),t.error?(0,s.jsxs)("div",{className:"dsnpm-alert",role:"alert",children:[(0,s.jsx)("strong",{className:"dsnpm-alertTitle",children:t.phase==="failed"?r("errorTitle"):r("terminalErrorTitle")}),Ke(r,t.error),t.phase==="failed"?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("br",{}),(0,s.jsx)("button",{type:"button",className:"dsnpm-retry",onClick:()=>n.retry(),children:r("retry")})]}):null]}):null,(0,s.jsxs)("div",{className:"dsnpm-listWrap",children:[t.phase==="loading"?(0,s.jsx)("div",{className:"dsnpm-skeletons","aria-hidden":"true",children:[0,1,2,3].map(u=>(0,s.jsx)("div",{className:"dsnpm-skeleton"},u))}):y&&p.length===0?(0,s.jsxs)("div",{className:"dsnpm-state",children:[(0,s.jsx)("span",{className:"dsnpm-stateGlyph",children:(0,s.jsx)(_e,{})}),t.repo?.scripts?.length===0?(0,s.jsx)("span",{children:r("empty")}):(0,s.jsx)("span",{children:r("noMatches",{query:t.query.trim()})})]}):y?(0,s.jsx)("div",{ref:g,className:"dsnpm-list",id:h,role:"listbox","aria-label":r("scriptsLabel"),"aria-busy":c,tabIndex:-1,children:p.map((u,S)=>(0,s.jsx)(He,{script:u,index:S,active:S===f,running:c,onActivate:()=>{S!==f&&d(S)},onRun:x},u.name))}):null,(0,s.jsx)("span",{className:"dsnpm-srOnly",role:"status","aria-live":"polite",children:y?t.query.trim()?r(p.length===1?"filterResultOne":"filterResults",{count:p.length,query:t.query.trim()}):r(p.length===1?"allScriptOne":"allScripts",{count:p.length}):""})]}),(0,s.jsxs)("div",{className:"dsnpm-footer",children:[c?(0,s.jsxs)("span",{className:"dsnpm-running",role:"status",children:[(0,s.jsx)("span",{className:"dsnpm-spinner","aria-hidden":"true"}),(0,s.jsx)("span",{children:r("starting",{name:t.running.name})})]}):(0,s.jsxs)("span",{className:"dsnpm-hints",children:[(0,s.jsxs)("span",{className:"dsnpm-hint dsnpm-hintNavigate",children:[(0,s.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2191"}),(0,s.jsx)("kbd",{className:"dsnpm-kbd",children:"\u2193"}),r("navigate")]}),(0,s.jsxs)("span",{className:"dsnpm-hint dsnpm-hintRun",children:[(0,s.jsx)("kbd",{className:"dsnpm-kbd",children:"\u21B5"}),r("enterToRun")]}),(0,s.jsxs)("span",{className:"dsnpm-hint",children:[(0,s.jsx)("kbd",{className:"dsnpm-kbd",children:"esc"}),r("esc")]})]}),(0,s.jsx)("span",{className:"dsnpm-count",children:y?t.query.trim()?ne(r,p.length,"matchesOne","matchesMany"):ne(r,p.length,"countOne","countMany"):""})]})]})})}function Ve({ctx:e,controller:n}){let t=m.useSyncExternalStore(n.subscribe,n.getState,n.getState),r=le(e),o=m.useRef(null),i=m.useRef(null),l=m.useRef(null),a=m.useId(),h=m.useId(),p=m.useId();return m.useEffect(()=>{if(!t.open)return;l.current=document.activeElement instanceof HTMLElement?document.activeElement:null,i.current&&(i.current.focus({preventScroll:!0}),i.current.select());let f=d=>{d.key==="Escape"&&!n.getState().running&&(d.preventDefault(),d.stopPropagation(),n.close())};return document.addEventListener("keydown",f,!0),()=>{document.removeEventListener("keydown",f,!0);let d=l.current,g=o.current,c=g?g.contains(document.activeElement):!1;d&&d.isConnected&&(document.activeElement===document.body||c)&&d.focus({preventScroll:!0})}},[t.open]),m.useEffect(()=>{if(t.open)return e.sessions.list.subscribe(()=>{let f=H(e);(!t.sessionId||f!==t.sessionId)&&n.close()})},[e,n,t.open,t.sessionId]),t.open?(0,ae.createPortal)((0,s.jsx)("div",{className:"dsnpm-root",children:(0,s.jsx)(Ge,{ctx:e,controller:n,state:t,t:r,dialogRef:o,searchRef:i,titleId:a,descriptionId:h,listId:p})}),document.body):null}function Ye(){if(document.querySelector("style[data-dsh-npm-scripts]"))return;let e=document.createElement("style");e.dataset.dshNpmScripts="",e.textContent=Ce,document.head.appendChild(e)}function Ze(){document.querySelector("style[data-dsh-npm-scripts]")?.remove()}var Qe=["sessions","layout","shortcuts","locale","slots","sidebarRight","webTerminals"];function Xe(e){let n=Me(e),t=!1,r=l=>{t=!!l};Ye();let o=document.createElement("div");o.dataset.dshNpmScriptsRoot="",document.body.appendChild(o);let i=(0,oe.createRoot)(o);i.render(te(Ve,{ctx:e,controller:n})),e.effect(()=>()=>{i.unmount(),o.remove(),Ze()},"npm-scripts: overlay"),e.effect(()=>e.locale.register(K,"en",j),"npm-scripts: en locale"),e.effect(()=>e.locale.register(K,"zh",Te),"npm-scripts: zh locale"),e.effect(()=>e.slots.inject("plugins.bundle.config",()=>e.slots.register({name:"plugins.bundle.config",key:"dsh-plugin-npm-scripts",locale:K},l=>te(Ue,{...l,ctx:e,setIntercept:r}))),"npm-scripts: settings"),e.effect(()=>{let l=e.locale.bind(K),a=f=>{try{let d=l(f);return typeof d=="string"?d:j[f]??f}catch{return j[f]??f}},p=e.shortcuts.runtime==="desktop"?{"desktop:macos":{code:"KeyA",modifiers:["alt"]},"desktop:windows":{code:"KeyA",modifiers:["alt"]},"desktop:linux":{code:"KeyA",modifiers:["alt"]}}:{};try{return e.shortcuts.register({id:O,label:()=>a("shortcutLabel"),aliases:["npm scripts","run npm script","package scripts","run script"],defaults:p,regions:["page","editable","terminal"],modals:[ie],resolve:()=>{if(t)return{status:"blocked",reason:"recording"};let f=H(e);return f?{status:"handled",run:()=>n.toggle(f)}:{status:"blocked",reason:a("noSession")}}})}catch(f){return console.warn("npm-scripts: shortcut registration failed",f),()=>{}}},"npm-scripts: shortcut"),e.effect(()=>{let l=a=>{if(a.defaultPrevented||a.isComposing||a.repeat||t||a.code!=="KeyA"||!a.altKey||a.metaKey||a.ctrlKey||a.shiftKey||!je(e))return;let h=a.target;if(h instanceof Element&&h.closest('[role="menu"]'))return;if(n.getState().open){a.preventDefault(),a.stopPropagation(),n.close();return}if(Ae())return;let p=H(e);p&&(a.preventDefault(),a.stopPropagation(),n.toggle(p))};return document.addEventListener("keydown",l,!0),()=>document.removeEventListener("keydown",l,!0)},"npm-scripts: Option+A listener")}

    return module.exports;
  },
});
