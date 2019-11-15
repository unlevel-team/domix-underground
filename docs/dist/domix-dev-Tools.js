window.domixDevTools=function(e){var n={};function t(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(s,i,function(n){return e[n]}.bind(null,i));return s},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);const s=e=>{const{term:n,commandLine:t,lifecycle:s}=e,i=n.getSystem(),a=t.trim().split(" ");if(n.addLine("DOMix system manager"),1===a.length)return(({term:e})=>{e.addLines(["How to use:","- Information: dmxsys info","- Tasks: dmxsys tasks"])})({term:n}),void s.end({result:"ok"});let l={};switch(a[1]){case"info":l=(({term:e,params:n,system:t})=>{const s=t.domixInfo();return e.addLines(["System information:",`- ID: ${s.systemID}`]),{result:null}})({term:n,system:i,params:a});break;case"tasks":l=(({term:e,params:n,system:t})=>{const s=t.tasks();return e.addLines(["Tasks information:",`- Launched: ${s.history.tasksLaunched}`,`- Finished: ${s.history.tasksFinished}`]),{result:null}})({term:n,system:i,params:a});break;case"devices":l=(({term:e,params:n,system:t})=>{const s=t.layer().devices.manage.list();e.addLine("Devices information:");for(let n of s)e.addLine(`- ${n}`);return{result:null}})({term:n,system:i,params:a})}"error"===l.result&&n.addLines(["ERROR!!!",`${l.error}`]),s.end({result:"ok"})},i=({deploySystem:e})=>{console.log("domix-plugin-dmxpm -> _installPlugin",e),e.addCommand({name:"dmxsys",description:"DOMix system manager",handler:s,extra:{}})};var a=e=>{return{config:{name:"dmxsys",provides:{commands:["dmxsys"]}},metadata:{version:"0.0.1",description:"DOMix system manager",author:{name:"Unlevel Team"}},lifecycle:{install:i,uninstall:null}}};const l={importModuleJS:({url:e,cacheTrick:n})=>{let t=`${e}?`;return t=void 0!==n?`${t}cacheTrick=${n}`:t,import(t)}},r=e=>{return{config:{name:"dmxpm"},metadata:{version:"0.0.1",description:"DOMix package manager",author:{name:"Unlevel Team"}},lifecycle:{install:()=>l,uninstall:null}}},d=e=>{const{term:n,commandLine:t,lifecycle:s}=e,i=n.system(),a=t.trim().split(" ");if(1===a.length)return(({term:e})=>{e.addLines(["How to use:","- Manage plugins: dmxpm plugins","- Manage modules: dmxpm modules"])})({term:n}),void s.end({result:"ok"});let l={};switch(a[1]){case"plugins":l=(({term:e,params:n,system:t,lifecycle:s})=>{const i=t.packages(),a=t.library(),l=i.plugins.info();n.length<3&&e.addLines(["Plugins:",`- Definitions: ${l.total}`,`- Installed: ${l.installed}`]);const r=n[2],d=n[3];switch(r){case"define":e.addLine(`Define plugin at: ${d}`,{updateRender:!0});const n=a.modules.get({name:"dmxpm"});s.wait(!0),n.importModuleJS({url:d,cacheTrick:Date.now()}).then(n=>{const t=n.default.defineDOMixPlugin();e.addLines([`- name: ${t.config.name}`,`- version: ${t.metadata.version}`]),i.plugins.define({pluginDefinition:t}),s.end({result:"ok"})}).catch(e=>{console.log("ERROR!!!",e),s.end({result:"error"})});break;case"install":e.addLine(`Install plugin: ${d}`,{updateRender:!0}),i.plugins.install({name:d}),e.addLine("...plugin installed");break;case"list":e.addLine("List of plugins:"),Object.values(l.plugins).filter(e=>e.installed).forEach(n=>{e.addLine({text:`- ${n.name}`,updateRender:!1})});break;case"listdefs":e.addLine("List of plugins definitions:"),Object.keys(l.plugins).forEach(n=>{e.addLine(`- ${n.name}`)})}return{result:null}})({term:n,system:i,params:a,lifecycle:s});break;case"modules":l=(({term:e,params:n,system:t,lifecycle:s})=>{const i=t.library(),a=i.modules.info();n.length<3&&e.addLines(["Modules:",`- Definitions: ${a.total}`,`- Installed: ${a.installed}`]);const l=n[2],r=n[3];switch(l){case"define":e.addLine({text:`Define module at: ${r}`,updateRender:!0});const n=i.modules.get({name:"dmxpm"});s.wait(!0),n.importModuleJS({url:r,cacheTrick:Date.now()}).then(n=>{const t=n.default.defineDOMixModule();e.addLines([`- name: ${t.config.name}`,`- version: ${t.metadata.version}`]),i.modules.define({moduleDefinition:t}),s.end({result:"ok"})}).catch(e=>{console.log("ERROR!!!",e),s.end({result:"error"})});break;case"install":e.addLine(`Install module: ${r}`,{updateRender:!0}),i.modules.install({name:r}),e.addLine("...module installed");break;case"list":e.addLine("List of modules:"),Object.values(a.modules).filter(e=>e.installed).forEach(n=>{e.addLine(`- ${n.name}`)});break;case"listdefs":e.addLine({text:"List of module definitions:"}),Object.keys(a.modules).forEach(n=>{e.addLine({text:`- ${n.name}`,updateRender:!1})})}return{result:null}})({term:n,system:i,params:a,lifecycle:s})}!0!==s.info().waiting&&s.end({result:"ok"}),"error"===l.result&&(n.addLines(["ERROR!!!",`${l.error}`]),s.end({result:"error"}))},o=({deploySystem:e})=>{console.log("domix-plugin-dmxpm -> _installPlugin",{deploySystem:e}),e.modules.define({moduleDefinition:r()}),e.modules.install({name:"dmxpm"}),e.addCommand({name:"dmxpm",description:"DOMix package manager",handler:d,extra:{}})};var m=e=>{return{config:{name:"dmxpm",provides:{modules:["dmxpm"],commands:["dmxpm"]},require:{authorization:{dmxcore:!0},modules:[]}},metadata:{version:"0.0.1",description:"DOMix package manager",author:{name:"Unlevel Team"}},lifecycle:{install:o,uninstall:null}}};const u={_system:null,init:({system:e})=>{u._system=e,u.install_plugin_dmxsys(),u.install_plugin_dmxpm(),console.log("DOMix development tools -> init",{system:u._system})},install_plugin_dmxsys:()=>{console.log("  install_plugin_dmxsys"),u._system.packages.manager.addPluginDefinition({pluginDefinition:a()}),u._system.packages.manager.installPlugin({name:"dmxsys"})},install_plugin_dmxpm:()=>{console.log("  install_plugin_dmxpm"),u._system.packages.manager.addPluginDefinition({pluginDefinition:m()}),u._system.packages.manager.installPlugin({name:"dmxpm"})}};n.default=u}]);