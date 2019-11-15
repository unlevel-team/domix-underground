!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.domixterm=t():e.domixterm=t()}(window,(function(){return function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const s=new WeakMap,i=e=>"function"==typeof e&&s.has(e),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},a={},d={},l=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${l}--\x3e`,h=new RegExp(`${l}|${u}`),c="$lit$";class m{constructor(e,t){this.parts=[],this.element=t;const n=[],s=[],i=document.createTreeWalker(t.content,133,null,!1);let r=0,o=-1,a=0;const{strings:d,values:{length:u}}=e;for(;a<u;){const e=i.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let s=0;for(let e=0;e<n;e++)p(t[e].name,c)&&s++;for(;s-- >0;){const t=d[a],n=g.exec(t)[2],s=n.toLowerCase()+c,i=e.getAttribute(s);e.removeAttribute(s);const r=i.split(h);this.parts.push({type:"attribute",index:o,name:n,strings:r}),a+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(l)>=0){const s=e.parentNode,i=t.split(h),r=i.length-1;for(let t=0;t<r;t++){let n,r=i[t];if(""===r)n=f();else{const e=g.exec(r);null!==e&&p(e[2],c)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-c.length)+e[3]),n=document.createTextNode(r)}s.insertBefore(n,e),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(f(),e),n.push(e)):e.data=i[r],a+=r}}else if(8===e.nodeType)if(e.data===l){const t=e.parentNode;null!==e.previousSibling&&o!==r||(o++,t.insertBefore(f(),e)),r=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(n.push(e),o--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(l,t+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=s.pop()}for(const e of n)e.parentNode.removeChild(e)}}const p=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},_=e=>-1!==e.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let i,o=0,a=0,d=s.nextNode();for(;o<n.length;)if(i=n[o],_(i)){for(;a<i.index;)a++,"TEMPLATE"===d.nodeName&&(t.push(d),s.currentNode=d.content),null===(d=s.nextNode())&&(s.currentNode=t.pop(),d=s.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${l} `;class x{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const r=g.exec(e);t+=null===r?e+(n?v:u):e.substr(0,r.index)+r[1]+r[2]+c+r[3]+l}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const b=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new I(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let s=0;s<t;s++){n+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(b(e)||!w(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class I{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||b(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(f()),this.endNode=e.appendChild(f())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=f()),e.__insert(this.endNode=f())}insertAfterPart(e){e.__insert(this.startNode=f()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(b(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===d?(this.value=d,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const n=new y(t,e.processor,this.options),s=n._clone();n.update(e.values),this.__commitNode(s),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)void 0===(n=t[s])&&(n=new N(this.options),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){o(this.startNode.parentNode,e.nextSibling,this.endNode)}}class V{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class S extends C{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new L(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class L extends I{}let E=!1;try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class T{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=$(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const $=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const q=new class{handleAttributeExpressions(e,t,n,s){const i=t[0];if("."===i){return new S(e,t.slice(1),n).parts}return"@"===i?[new T(e,t.slice(1),s.eventContext)]:"?"===i?[new V(e,t.slice(1),n)]:new C(e,t,n).parts}handleTextExpression(e){return new N(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function k(e){let t=A.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},A.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const s=e.strings.join(l);return void 0===(n=t.keyString.get(s))&&(n=new m(e,e.getTemplateElement()),t.keyString.set(s,n)),t.stringsArray.set(e.strings,n),n}const A=new Map,D=new WeakMap,R=(e,t,n)=>{let s=D.get(t);void 0===s&&(o(t,t.firstChild),D.set(t,s=new N(Object.assign({templateFactory:k},n))),s.appendInto(t)),s.setValue(e),s.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const B=(e,...t)=>new x(e,t,"html",q),F=({controller:e,authorization:t={}})=>{const{term:n}=e._config,s={id:`controllerInstance-${Date.now()}`,controller:e,term:n,authorization:t,_sysInstance:null,_buffer:null,_input:null,_history:[],_decorator:{},_init:()=>{s._sysInstance=e._environment.system.getNewInstance({authorization:t}),s._buffer=s.term._termBuffer.getNewInstance({authorization:s.authorization}),s._input=s.term._termInput.getNewInstance({authorization:s.authorization}),s._termInterface={...s._termInterface,...s._buffer.interface(),...s._input.interface()};const n=(({term:e})=>{const t={_term:e,_interface:{commands:{start:({command:e})=>{n().addLine({type:"command-start",text:e,updateRender:!0})},end:()=>{n().addLine({type:"command-end",updateRender:!0})},setupTask:e=>{return{_env:{_task:e},key:"end",method:e=>{s().commands.end()}}}}}},n=()=>t._term,s=()=>t._interface;return t.interface=s,t})({term:s._termInterface});s._decorator={_obj:n,...n.interface()}},system:()=>(null===s._sysInstance&&null!==e._environment.system&&s._init(),null!==s._sysInstance?s._sysInstance.interface():null),_termInterface:{execCommand:({command:e,...t})=>{if(""!==e){r().commands.start({command:e});try{const n=s.system().commands.exec({command:e,...t,term:i(),setupTask:r().commands.setupTask});s._history.push({...n})}catch(e){console.error("ERROR!",e),i().addLines(["Something happens:",e.message]),i().addLine({type:"command-end"})}}},getSystem:e=>s.system(),system:e=>s.system(),getCommandsHistory:e=>s._history},interface:()=>s._termInterface},i=()=>s._termInterface,r=()=>s._decorator;return s.system(),!0!==t.execCommand&&delete s._termInterface.execCommand,s};class M{constructor({term:e}){this._environment={system:null},this._config={history:[],term:e},!1===e.sysless&&this._init_System()}getNewInstance(e){return F({controller:this,...e})}getSystem(){return this._environment.system}bindSystem({system:e}){if(null!==this._environment.system)throw Error("This terminal has a system");this._environment.system=e;const{term:t}=this._config;t._termInput.update()}}const H={Shell:"shell",Request:"request"},O=({termInput:e})=>{const t={id:`inputInstance-${Date.now()}`,termInput:e,_interface:{request:e=>t.termInput.request(e),updateInput:e=>t.termInput.update(e)},interface:()=>t._interface};return t};var j=class{constructor({termController:e}){this._myDIV=document.createElement("div"),this._termController=e.getNewInstance({authorization:{execCommand:!0}}),this._mode=H.Shell,this._user_command={command:""},this._request={userInput:"",requestHandler:null,extra:null},this.getComponent=this.getComponent.bind(this),this.update=this.update.bind(this),this._handleKeyDownCommand=this._handleKeyDownCommand.bind(this),this.request=this.request.bind(this),this._render(),this._inputForCommand=this._myDIV.querySelector('input[name="user_command"]')}_render(){const e=this._renderUserControls();R(e,this._myDIV)}update(){this._render()}getComponent(){return this._myDIV}getNewInstance(e){return O({termInput:this})}_renderUserControls(){const e=this._mode===H.Shell?"commands":"";return B`
      <input type="text" name="user_command"
        size="60" placeholder="Type some command"
        list="${e}"
        @keydown=${e=>this._handleKeyDownCommand(e)}
        />
      <datalist id="commands">
        <select name="commands">
          ${this._renderOptionsForCommands()}
        </select>
      </datalist>
    `}_renderOptionsForCommands(){if(void 0===this._termController||null===this._termController.system())return;const e=this._termController.interface().getSystem().commands.info();return B`
      ${e.commands.map(e=>B`
         <option value="${e.name}">
        `)}
      ${e.commandsExtra.map(e=>B`
         <option value="${e.name}">
        `)}
    `}_handleKeyDownCommand(e){switch(e.keyCode){case 13:this._processInput()}}_processInput(){switch(this._mode){case H.Shell:this._processCommand();break;case H.Request:this._processRequest()}}_processCommand(){this._user_command.command=`${this._inputForCommand.value}`,this._inputForCommand.value="";const e=this._user_command.command.trim().split(" ")[0];this._termController.interface().execCommand({commandLine:`${this._user_command.command}`,command:e,data:{key:"somekey"}})}_processRequest(){this._request.userInput=`${this._inputForCommand.value}`,this._inputForCommand.value="";const e=this._request.requestHandler({userInput:this._request.userInput,extra:this._request.extra});"function"==typeof e?e():this._mode=H.Shell,this.update()}request({requestHandler:e,extra:t=null}){this._request.requestHandler=e,this._request.extra=t,this._mode=H.Request,this.update()}};class P{constructor({type:e="text",text:t="",html:n}){this._myDiv=document.createElement("div"),this._type=e,this._text=t,this._html=n||function(){},this.getComponent=this.getComponent.bind(this),this.update=this.update.bind(this),this._render()}_render(){const e=B`
      <div data-rol="buffer-line" part="buffer-line">
        ${this._renderContent()}
        ${this._html()}
      </div>
    `;R(e,this._myDiv)}_renderContent(){let e="";switch(this._type){case"text":e=B`${this._text}`}return e}update(){this._render()}getComponent(){return this._myDiv}}const z=({buffer:e})=>{const t={id:`bufferInstance-${Date.now()}`,buffer:e,_fragments:{},_interface:{addLine:(...e)=>t.buffer.addLine(...e),addLines:(...e)=>t.buffer.addLines(...e),clear:e=>t.buffer.clear(e),updateBuffer:e=>t.buffer.update(e),fragments:{create:({id:e})=>{if(n().fragments.isFragment())throw Error("Cannot create a fragment inside a fragment");const s=new K({id:e,buffer:t.buffer});return t._fragments[e]=s,s},isFragment:()=>!0===t.buffer._isFragment,get:({id:e})=>t._fragments[e]}},interface:()=>t._interface},n=()=>t._interface;return t.interface=n,t};class W{constructor(){this._myDIV=document.createElement("div"),this._buffer={lines:[]},this.getComponent=this.getComponent.bind(this),this.update=this.update.bind(this),this.addLine=this.addLine.bind(this),this.addLines=this.addLines.bind(this),this.clear=this.clear.bind(this),this._render(),this._bufferLayer=this._myDIV.querySelector('div[part="buffer"]')}_render(){const e=this._renderBuffer();R(e,this._myDIV)}_renderBuffer(){return B`
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Droid+Sans" />

      <div data-rol="buffer" part="buffer">
        ${this._buffer.lines.map(e=>e.getComponent())}
      </div>
    `}update(){this._render(),this._bufferLayer.scrollTop=this._bufferLayer.scrollHeight}getComponent(){return this._myDIV}getNewInstance(){return z({buffer:this})}addLine({type:e="text",text:t="",html:n=(()=>{}),updateRender:s=!1},...i){if("string"==typeof arguments[0]){const e=void 0!==i[1]?i[1]:{};return this.addLine({text:arguments[0],...e})}switch(e){case"text":case"html":this._buffer.lines.push(new P({type:e,text:t,html:n}));break;case"command-start":this._buffer.lines.push(new P({type:"text",text:`⚙▫▫▫ [ ${t} ]🔽🏁`}));break;case"command-end":this._buffer.lines.push(new P({type:"text",text:"⚙▫▫▫ [✔]"})),s=!0}!0===s&&this.update()}addLines({lines:e=[],updateRender:t=!1,...n},...s){if(Array.isArray(arguments[0])){const e=s[1]?s[1]:{};return this.addLines({lines:arguments[0],...e,updateRender:!1})}for(const t of e)"string"==typeof t?this.addLine({text:t,...n,updateRender:!1}):this.addLine({text:t.text,...n,updateRender:!1});!0===t&&this.update()}clear(){this._buffer.lines=[],this.update()}}class K extends W{constructor({id:e,buffer:t}){super(),this._id=e,this._isFragment=!0,this._config={parent:t}}_renderBuffer(){return B`
      <div data-rol="buffer-frament" part="buffer">
        ${this._buffer.lines.map(e=>e.getComponent())}
      </div>
    `}}var U=W;class G extends HTMLElement{constructor(){super(),this._termController=new M({term:this}),this._termBuffer=null,this._init_Buffer(),this._termInput=null,this._init_TermInput(),this.attachShadow({mode:"open"}),this._render()}_init_Buffer(){this._termBuffer=new U}_init_TermInput(){this._termInput=new j({termController:this._termController})}connectedCallback(){this._initWelcome()}_initWelcome(){this.addLine({text:"D⚙M❗❌ running... 👽",updateRender:!0})}static get observedAttributes(){return[]}attributeChangedCallback(e,t,n){}_render(){const e=B`
      <style>
      </style>
      
      <div data-rol="term">
        ${this._termBuffer.getComponent()}
        <div data-rol="user_controls">
          ${this._termInput.getComponent()}
        </diV>
      </div>
    `;R(e,this.shadowRoot)}get controller(){return this._termController}addLine(e){this._termBuffer.addLine(e)}clear(e){this._termBuffer.clear(e)}requestData(e){this._termInput.request(e)}bindSystem(e){this._termController.bindSystem(e),this._termInput.update()}}window.customElements.define("domix-term",G)}])}));