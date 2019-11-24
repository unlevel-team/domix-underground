window.domixDevTools=function(e){var n={};function t(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(s,i,function(n){return e[n]}.bind(null,i));return s},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);const s=e=>{const{term:n,commandLine:t,lifecycle:s}=e,i=n.getSystem(),a=t.trim().split(" ");if(n.addLine("DOMix system manager"),1===a.length)return(({term:e})=>{e.addLines(["How to use:","- Information: dmxsys info","- Tasks: dmxsys tasks"])})({term:n}),void s.end({result:"ok"});let r={};switch(a[1]){case"info":r=(({term:e,params:n,system:t})=>{const s=t.domixInfo();return e.addLines(["System information:",`- ID: ${s.systemID}`]),{result:null}})({term:n,system:i,params:a});break;case"tasks":r=(({term:e,params:n,system:t})=>{const s=t.tasks();return e.addLines(["Tasks information:",`- Launched: ${s.history.tasksLaunched}`,`- Finished: ${s.history.tasksFinished}`]),{result:null}})({term:n,system:i,params:a});break;case"devices":r=(({term:e,params:n,system:t})=>{const s=t.layer().devices.manage.list();e.addLine("Devices information:");for(let n of s)e.addLine(`- ${n}`);return{result:null}})({term:n,system:i,params:a})}"error"===r.result&&n.addLines(["ERROR!!!",`${r.error}`]),s.end({result:"ok"})},i=({deploySystem:e})=>{console.log("domix-plugin-dmxpm -> _installPlugin",e),e.addCommand({name:"dmxsys",description:"DOMix system manager",handler:s,extra:{}})};var a=e=>{return{config:{name:"dmxsys",provides:{commands:["dmxsys"]}},metadata:{version:"0.0.1",description:"DOMix system manager",author:{name:"Unlevel Team"}},lifecycle:{install:i,uninstall:null}}};const r={importModuleJS:({url:e,cacheTrick:n})=>{let t=`${e}?`;return t=void 0!==n?`${t}cacheTrick=${n}`:t,import(t)}},l=e=>{return{config:{name:"dmxpm"},metadata:{version:"0.0.1",description:"DOMix package manager",author:{name:"Unlevel Team"}},lifecycle:{install:()=>r,uninstall:null}}},o=e=>{const{term:n,commandLine:t,lifecycle:s}=e,i=n.system(),a=t.trim().split(" ");if(1===a.length)return(({term:e})=>{e.addLines(["How to use:","- Manage plugins: dmxpm plugins","- Manage modules: dmxpm modules"])})({term:n}),void s.end({result:"ok"});let r={};switch(a[1]){case"plugins":r=(({term:e,params:n,system:t,lifecycle:s})=>{const i=t.packages(),a=t.library(),r=i.plugins.info();n.length<3&&e.addLines(["Plugins:",`- Definitions: ${r.total}`,`- Installed: ${r.installed}`]);const l=n[2],o=n[3];switch(l){case"define":e.addLine(`Define plugin at: ${o}`,{updateRender:!0});const n=a.modules.get({name:"dmxpm"});s.wait(!0),n.importModuleJS({url:o,cacheTrick:Date.now()}).then(n=>{const t=n.default.defineDOMixPlugin();e.addLines([`- name: ${t.config.name}`,`- version: ${t.metadata.version}`]),i.plugins.define({pluginDefinition:t}),s.end({result:"ok"})}).catch(e=>{console.log("ERROR!!!",e),s.end({result:"error"})});break;case"install":e.addLine(`Install plugin: ${o}`,{updateRender:!0}),i.plugins.install({name:o}),e.addLine("...plugin installed");break;case"list":e.addLine("List of plugins:"),Object.values(r.plugins).filter(e=>e.installed).forEach(n=>{e.addLine({text:`- ${n.name}`,updateRender:!1})});break;case"listdefs":e.addLine("List of plugins definitions:"),Object.keys(r.plugins).forEach(n=>{e.addLine(`- ${n.name}`)})}return{result:null}})({term:n,system:i,params:a,lifecycle:s});break;case"modules":r=(({term:e,params:n,system:t,lifecycle:s})=>{const i=t.library(),a=i.modules.info();n.length<3&&e.addLines(["Modules:",`- Definitions: ${a.total}`,`- Installed: ${a.installed}`]);const r=n[2],l=n[3];switch(r){case"define":e.addLine({text:`Define module at: ${l}`,updateRender:!0});const n=i.modules.get({name:"dmxpm"});s.wait(!0),n.importModuleJS({url:l,cacheTrick:Date.now()}).then(n=>{const t=n.default.defineDOMixModule();e.addLines([`- name: ${t.config.name}`,`- version: ${t.metadata.version}`]),i.modules.define({moduleDefinition:t}),s.end({result:"ok"})}).catch(e=>{console.log("ERROR!!!",e),s.end({result:"error"})});break;case"install":e.addLine(`Install module: ${l}`,{updateRender:!0}),i.modules.install({name:l}),e.addLine("...module installed");break;case"list":e.addLine("List of modules:"),Object.values(a.modules).filter(e=>e.installed).forEach(n=>{e.addLine(`- ${n.name}`)});break;case"listdefs":e.addLine({text:"List of module definitions:"}),Object.keys(a.modules).forEach(n=>{e.addLine({text:`- ${n.name}`,updateRender:!1})})}return{result:null}})({term:n,system:i,params:a,lifecycle:s})}!0!==s.info().waiting&&s.end({result:"ok"}),"error"===r.result&&(n.addLines(["ERROR!!!",`${r.error}`]),s.end({result:"error"}))},d=({deploySystem:e})=>{console.log("domix-plugin-dmxpm -> _installPlugin",{deploySystem:e}),e.modules.define({moduleDefinition:l()}),e.modules.install({name:"dmxpm"}),e.addCommand({name:"dmxpm",description:"DOMix package manager",handler:o,extra:{}})};var c=e=>{return{config:{name:"dmxpm",provides:{modules:["dmxpm"],commands:["dmxpm"]},require:{authorization:{dmxcore:!0},modules:[]}},metadata:{version:"0.0.1",description:"DOMix package manager",author:{name:"Unlevel Team"}},lifecycle:{install:d,uninstall:null}}};var m={cd:({path:e,context:n,...t})=>{void 0===e&&(e=n.args[0]),void 0===e&&(e=n.currentPath);const{fs:s}=t;return null===s.interface().queryPath({path:e}).inode?`... ${e} not found`:(n.currentPath=`${e}`,{result:!0,text:[]})},echo:({text:e,context:n})=>(void 0===e&&(e=n.args.join(" ")),e),exec:({path:e,context:n,...t})=>{if(void 0===e&&(e=n.args[0]),void 0===e)return null;const{fs:s}=t,i=s.interface().queryPath({path:e}).inode;if(null===i)return`... ${e} not found`;const a=i.dev;return null===a||void 0===a.control.exec?`... cannot run ${e}`:{result:a.control.exec({path:e,inode:i.id,metadata:i.metadata,args:n.args}),text:[]}},exit:({value:e=0,context:n})=>null,help:({context:e})=>{},ls:({path:e,context:n,...t})=>{void 0===e&&(e=n.args[0]),void 0===e&&(e=n.currentPath);const{fs:s}=t,i=s.interface(),a=i.listDir({path:e});if(null===i.queryPath({path:e}).inode)return`... ${e} not found`;let r=[".",".."];return Object.values(a).map(e=>{r.push(e.metadata.name)}),r.push(`Files ${Object.keys(a).length} 📜`),{value:a,text:r}},printf:({text:e="",path:n,context:t})=>{},pwd:({context:e})=>e.currentPath,read:({path:e,context:n})=>{}};const u={_systemLayer:null,_devices:{mem:{id:"mem",_env:{sysDriver:null},control:null},pty:{id:"pty"},input:{id:"input"}},_env:{devices:{},endPoins:{}},setupSystemDriver({driver:e}){const n=u._devices[e.name];if(void 0===n)return null;n._env.sysDriver=e.sysDriver,n.control=n._env.sysDriver.control,e.shDriver=n},define:{dmx:({args:e,fsID:n,fs:t})=>{const s=e[3]||null,i=u._devices[s];return void 0===i?null:void 0!==u._env.devices[s]?null:(u._env.devices[s]={name:s,type:"dmx",dev:i},void t.newFile({id:`${n}-dev::dmx-${s}`,name:s,parent:`${n}-dev`,dev:i,metadata:{}}))},custom:()=>{},ep:()=>{}},use:{ep:()=>{}}};const f={_env:{sysLayer:null,fsID:null,fs:null,fileTypes:{},drivers:{},protocols:{},devices:u},_RESPONSE_NULL:{result:null,text:[]},useDOMixDriver:({driver:e,sysLayer:n})=>{if(!0===e.inUse)return;const t=n.devices.drivers.get({id:e.name});void 0!==t&&(e.sysDriver=t,f._env.devices.setupSystemDriver({driver:e}),e.inUse=!0,console.log(" -- _useDOMixDriver -> ",{driver:e,_sysDriver:t}))},define:{file:({args:e})=>{const n=e[2],t=e[3]||null;f._env.fileTypes[n]={type:n,driver:t,inUse:!1}},device:({args:e})=>{const n=e[2];f._env.devices.define[n]({args:e,fsID:f._env.fsID,fs:f._env.fs.interface()})},driver:({args:e})=>{const n=e[2],t=e[3]||null;f._env.drivers[n]={name:n,dev:t,inUse:!1}},protocol:({args:e})=>{const n=e[2],t=e[3]||null;f._env.protocols[n]={name:n,driver:t}}},request:{filetypes:()=>({text:Object.keys(f._env.fileTypes)}),drivers:()=>({text:Object.keys(f._env.drivers)}),protocols:()=>({text:Object.keys(f._env.protocols)})},update:{},manage:{driver:({args:e})=>{const n=e[2],t=e[3],s=f._env.drivers[n];if(console.log("  -- manage.driver -> ",{args:e,name:n,action:t,driver:s}),void 0===s)return f._RESPONSE_NULL;"dmx-driver"===t&&f.useDOMixDriver({driver:s,sysLayer:f._env.sysLayer})}}},p={who:()=>({text:["... an alien 👽"]}),get:({args:e,metadata:n,...t})=>{const s=e[1];let i={text:{}};try{i=f.request[s]({args:e,metadata:n,_options:t})}catch(e){}return i},set:({args:e,metadata:n,...t})=>!0,def:({args:e,metadata:n,...t})=>{const s=e[1];try{f.define[s]({args:e,metadata:n,_options:t})}catch(e){}return!0},use:({args:e,metadata:n,...t})=>{const s=e[1];try{f.manage[s]({args:e,metadata:n,_options:t})}catch(e){}return!0}},v={execBatch:({cmdList:e=[]})=>{for(let n of e)console.log("  --- _SH_SCRIPT_A1 - execBatch -> ",{cmdList:e,_COMMANDS:p,_command:n}),p[n.name]({args:n.args,metadata:n.metadata})}};var y={COMMANDS:p,setup:({sysLayer:e,fsID:n,fs:t})=>{f._env.sysLayer=e,f._env.fsID=n,f._env.fs=t},execBatch:v.execBatch};const g={FUNCTIONS:{WHO:{fn:"who"},GET:{fn:"get"},SET:{fn:"set"},DEF:{fn:"def"},USE:{fn:"use"}},COMMANDS:y.COMMANDS,_env:{},control:{read:e=>(console.log("  --- _DEV_CORE_FN_HACKED - read -> ",{_options:e}),null),write:({data:e=null,...n})=>{console.log("  --- _DEV_CORE_FN_HACKED - write -> ",{data:e,_options:n})},close:e=>{console.log("  --- _DEV_CORE_FN_HACKED - close -> ",{_options:e})},exec:e=>{const{fn:n}=e.metadata;return(0,g.COMMANDS[n])(e)}}},_={_create_CoreFN:({id:e,fs:n})=>{const t=Object.values(g.FUNCTIONS),s=n.interface();for(let n of t)s.newFile({id:`${e}-bin::${n.fn}`,name:n.fn,parent:`${e}-bin`,dev:g,metadata:{fn:n.fn}})},setupShell({id:e,fs:n}){x._env.fsID=e,x._env.fs=n,x._legacy.setupShell({id:e,fs:n}),_._create_CoreFN({id:e,fs:n})}},x={module:null,_env:{fs:null,fsID:null},_legacy:{},_modifications:{exec:({path:e,context:n,...t})=>{if(void 0===(e=void 0!==e?e:n.args[0]))return null;const{fs:s}=t,i=s.interface().queryPath({path:e}).inode;if(null===i)return`... ${e} not found`;const a=i.dev;if(null===a||void 0===a.control.exec)return`... cannot run ${e}`;const r=a.control.exec({path:e,inode:i.id,metadata:i.metadata,args:n.args});return{result:r,text:r.text||[]}},setupShell:e=>{_.setupShell(e)}},execBatch:({cmdList:e=[]})=>{const n=x.module.syntax.exec;for(let t of e)n({context:{args:t.args},fs:x._env.fs})},hack:()=>{x._legacy={...x.module},x.module.setupShell=x._modifications.setupShell,x.module.syntax.exec=e=>x._modifications.exec(e),x.module.syntax.who=e=>g.COMMANDS.who(e)}};var h=({systemLayer:e,system:n,fsID:t,fs:s})=>{console.log("  --- SH - modify plugin ->",{systemLayer:e,system:n,library:n.library(),_SH_plugin:x});const i=n.library();x.module=i.modules.get({name:"sh"}),x.systemLayer=e,y.setup({sysLayer:x.systemLayer,fsID:t,fs:s}),x.hack()},D=()=>{x.execBatch({cmdList:[{name:"exec",args:["/bin/def","driver","mem"],metadata:{}},{name:"exec",args:["/bin/use","driver","mem","dmx-driver"],metadata:{}},{name:"exec",args:["/bin/def","device","dmx","mem"],metadata:{}},{name:"exec",args:["/bin/def","driver","pty"],metadata:{}},{name:"exec",args:["/bin/use","driver","pty","dmx-driver"],metadata:{}},{name:"exec",args:["/bin/def","device","dmx","pty"],metadata:{}},{name:"exec",args:["/bin/def","driver","input"],metadata:{}},{name:"exec",args:["/bin/use","driver","input","dmx-driver"],metadata:{}},{name:"exec",args:["/bin/def","device","dmx","input"],metadata:{}}]})};const L={FUNCTIONS:{TOUCH:{fn:"touch"},UNAME:{fn:"uname"}},_env:{},control:{read:e=>(console.log("  --- _DEV_CORE_FN - read -> ",{_options:e}),null),write:({data:e=null,...n})=>{console.log("  --- _DEV_CORE_FN - write -> ",{data:e,_options:n})},close:e=>{console.log("  --- _DEV_CORE_FN - close -> ",{_options:e})},exec:e=>(console.log("  --- _DEV_CORE_FN - exec -> ",{_options:e}),{result:!0,text:[]})}},S={_create_CoreFN:({id:e,fs:n})=>{const t=Object.values(L.FUNCTIONS),s=n.interface();for(let n of t)s.newFile({id:`${e}-bin::${n.fn}`,name:n.fn,parent:`${e}-bin`,dev:L,metadata:{fn:n.fn}})},setupShell({id:e,fs:n}){S._create_CoreFN({id:e,fs:n})}},b={syntax:{cd:e=>m.cd(e),echo:e=>m.echo(e),exec:e=>m.exec(e),exit:e=>m.exit(e),help:e=>null,ls:e=>m.ls(e),printf:e=>null,pwd:e=>m.pwd(e),read:e=>null},setupShell:S.setupShell,newSHContext:()=>{return{currentPath:null,home:null,user:null,command:null,args:null,mode:null}},_DMX_SHFS:{_lib:null,default:{fs:null,cli:null,shContext:null}}};var O={defineDOMixModule:e=>{return{config:{name:"sh"},metadata:{version:"0.0.1",description:"DOMix shell",author:{name:"Unlevel Team"}},lifecycle:{install:()=>b,uninstall:null}}}};var w=e=>(({fs:e})=>{const n={_env:{fs:e,root:null},_interface:{chroot:({root:e})=>{t().root=e},newFile:({id:e,name:n,parent:s=null,dev:i=null,metadata:a})=>{const{fs:r}=t();r.agent.file.set({id:e});const l=r.agent.file.get({id:e});l.inode.parent=null!==s?s:l.inode.parent,l.inode.dev=null!==i?i:l.inode.dev,l.inode.metadata={...l.inode.metadata,...a},l.inode.metadata.name=n,r.agent.file.set(l.inode)},newDir:({id:e,name:n,parent:s})=>{const{fs:i}=t();i.agent.directory.set({id:e}),i.agent.directory.set({id:e,name:n,parent:s})},queryPath:({path:e,currentPath:n})=>{const{fs:s,root:i}=t();return{path:e,inode:s.manage.getInode({path:e,root:i})}},listDir:({path:e})=>{const n=s()._interface,{fs:i}=t(),a=n.queryPath({path:e}).inode;return i.agent.directory.list({id:a.id})}},interface:()=>n._interface},t=()=>n._env,s=()=>n;return n})(e),k=e=>(({id:e,fs:n})=>{const t=`${e}-root`;n.newDir({id:t,name:t}),n.newDir({id:`${e}-bin`,name:"bin",parent:t}),n.newDir({id:`${e}-etc`,name:"etc",parent:t}),n.newDir({id:`${e}-dev`,name:"dev",parent:t}),n.newDir({id:`${e}-home`,name:"home",parent:t}),n.newDir({id:`${e}-mnt`,name:"mnt",parent:t}),n.newDir({id:`${e}-lib`,name:"lib",parent:t}),n.newDir({id:`${e}-proc`,name:"proc",parent:t}),n.newDir({id:`${e}-tmp`,name:"tmp",parent:t}),n.newDir({id:`${e}-usr`,name:"usr",parent:t}),n.newDir({id:`${e}-var`,name:"var",parent:t}),n.chroot({root:t})})(e);const $={_lib:null,_shFS:null,cmdHandler:e=>{if(null===$._lib){const{term:n}=e;$._lib=n.getSystem().library().modules.get({name:"sh"}),$._shFS=$._lib._DMX_SHFS,$._shFS.default.cli=$,$._shFS._lib=$._lib}e.extra={...e.extra,shFS:$._shFS},(e=>{const{term:n,commandLine:t,lifecycle:s}=e,{shFS:i}=e.extra,a=i._lib;if(null===i.default.fs){const e=n.getSystem(),t=e.layer(),s=w({fs:t.fs}),r="customFS-sh-default";k({id:r,fs:s.interface()}),i.default.fs=s;const l=a.newSHContext();l.home="/home",l.currentPath="/home",i.default.shContext=l,h({systemLayer:t,system:e,fsID:r,fs:i.default.fs}),a.setupShell({id:r,fs:s}),D()}const r=i.default.cli.interface(),l=({userInput:e,extra:t})=>{const s=t.term,i=t.lifecycle,a=r.parseCommand({commandLine:e.trim()}),o=r.exec(a);if(null!==o){let e=o.text;const t=(e=void 0===e?[o]:e).pop();for(let t of e)n.addLine({text:t});n.addLine({text:t,updateRender:!0})}if("exit"!==a.command)return null===o&&(s.addLine({text:"...What???"}),s.addLine({text:`...-???-> ${e}`,updateRender:!0})),()=>s.request({requestHandler:l,extra:{cli:r,term:s,lifecycle:i}});i.end({result:"ok"})};n.request({requestHandler:l,extra:{cli:i.default.cli.interface(),term:n,lifecycle:s}}),s.wait(!0)})(e)},_interface:{parseCommand:({commandLine:e})=>{const n=e.split(" ");return{command:n[0],params:n.splice(1),args:n}},exec:({command:e,params:n})=>{const t=$._lib.syntax,s=$._shFS.default.shContext,i=t[e];return void 0!==i?(s.command=e,s.args=n,i({context:s,shLib:$._lib,fs:$._shFS.default.fs})):null}},interface:()=>$._interface};var M={cli:$};const C=({deploySystem:e})=>{console.log("domix-plugin-sh -> _installPlugin",e),e.modules.define({moduleDefinition:O.defineDOMixModule()}),e.modules.install({name:"sh"}),e.addCommand({name:"sh",description:"DOMix shell",handler:M.cli.cmdHandler,extra:{}})};var E=e=>{return{config:{name:"sh",provides:{modules:["sh"],commands:["sh"]}},metadata:{version:"0.0.1",author:{name:"Unlevel Team"}},lifecycle:{install:C,uninstall:null}}};const P="mem",F={_contexts:{},add:({id:e,...n})=>{F._contexts[e]={id:e,...n}},get:({id:e})=>F._contexts[e],remove:({id:e})=>{delete F._contexts[e]}},I={main:e=>{console.log("---\x3e> _memDriver -> main",e)},read:({context:e="",key:n=""})=>(console.log("---\x3e> _memDriver -> read",{context:e,key:n}),F.get({id:e})._keys[n]),write:({context:e="",key:n="",value:t=""})=>{F.get({id:e})._keys[n]=t,console.log("---\x3e> _memDriver -> write",{})},newContext:({context:e})=>{void 0===F.get({id:e})&&F.add({id:e,_keys:{}})}};const N="pty",R={_psterms:{},add:({id:e,...n})=>{const t={id:e,_env:{control:null},...n},s=(({psterm:e})=>{return{_env:{psterm:e},interface:{exec:()=>{},request:()=>{},buffer:{clear:()=>{},lines:()=>{},getLine:()=>{}}}}})({psterm:t});t._env.control=s,t._control=s.interface,R._psterms[e]=t},get:({id:e})=>R._psterms[e],remove:({id:e})=>{delete R._psterms[e]}},T={main:e=>{console.log("---\x3e> _ptyDriver -> main",e)},read:({term:e=""})=>{console.log("---\x3e> _ptyDriver -> read",{term:e}),R.get({id:e})},write:e=>{console.log("---\x3e> _ptyDriver -> write",e)}};const U="vcs";const j="lp";const A="misc";const H="input";const q="sound";const V="fb";const B={_drivers:{MEM:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=P;t.define({id:s,type:n.types.SPECIAL}),t.make({id:s,engine:I}),t.install({id:s})}},PTY:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=N;t.define({id:s,type:n.types.SPECIAL}),t.make({id:s,engine:T}),t.install({id:s})}},VCS:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=U;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _vcsDriver -> main",e)},read:e=>{console.log("---\x3e> _vcsDriver -> read",e)},write:e=>{console.log("---\x3e> _vcsDriver -> write",e)}};t.make({id:s,engine:i}),t.install({id:s})}},LP:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=j;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _lpDriver -> main",e)},read:e=>{console.log("---\x3e> _lpDriver -> read",e)},write:e=>{console.log("---\x3e> _lpDriver -> write",e)}};t.make({id:s,engine:i}),t.install({id:s})}},MISC:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=A;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _miscDriver -> main",e)},read:e=>{console.log("---\x3e> _miscDriver -> read",e)},write:e=>{console.log("---\x3e> _miscDriver -> write",e)},register:e=>{console.log("---\x3e> _miscDriver -> register",e)},deregister:e=>{console.log("---\x3e> _miscDriver -> deregister",e)}};t.make({id:s,engine:i}),t.install({id:s})}},INPUT:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=H;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _inputDriver -> main",e)},read:e=>{console.log("---\x3e> _inputDriver -> read",e)},write:e=>{console.log("---\x3e> _inputDriver -> write",e)}};t.make({id:s,engine:i}),t.install({id:s})}},SOUND:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=q;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _soundDriver -> main",e)},read:e=>{console.log("---\x3e> _soundDriver -> read",e)},write:e=>{console.log("---\x3e> _soundDriver -> write",e)}};t.make({id:s,engine:i}),t.install({id:s})}},FB:{install:({sysLayer:e})=>{const n=e.devices,t=e.devices.drivers,s=V;t.define({id:s,type:n.types.SPECIAL});const i={main:e=>{console.log("---\x3e> _fbDriver -> main",e)},read:e=>{console.log("---\x3e> _fbDriver -> read",e)},write:e=>{console.log("---\x3e> _fbDriver -> write",e)}};t.make({id:s,engine:i}),t.install({id:s})}}}};var J=({name:e,sysLayer:n})=>{B._drivers[e.toUpperCase()].install({sysLayer:n})};const K={_system:null,init:({system:e})=>{K._system=e,K.install_plugin_dmxsys(),K.install_plugin_dmxpm(),K.install_plugin_sh(),J({name:"mem",sysLayer:DOMixDEV._layers.system}),J({name:"pty",sysLayer:DOMixDEV._layers.system}),J({name:"input",sysLayer:DOMixDEV._layers.system})},install_plugin_dmxsys:()=>{console.log("  install_plugin_dmxsys"),K._system.packages.manager.addPluginDefinition({pluginDefinition:a()}),K._system.packages.manager.installPlugin({name:"dmxsys"})},install_plugin_dmxpm:()=>{console.log("  install_plugin_dmxpm"),K._system.packages.manager.addPluginDefinition({pluginDefinition:c()}),K._system.packages.manager.installPlugin({name:"dmxpm"})},install_plugin_sh:()=>{console.log("  install_plugin_sh"),K._system.packages.manager.addPluginDefinition({pluginDefinition:E()}),K._system.packages.manager.installPlugin({name:"sh"})}};n.default=K}]);