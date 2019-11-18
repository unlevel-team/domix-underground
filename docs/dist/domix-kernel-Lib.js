window.domixKernel=function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);const r=()=>{const e=function(){var n=function(n,t){return e.channels[n]||(e.channels[n]=[]),e.channels[n].push({context:this,callback:t}),this},t=function(n){if(!e.channels[n])return!1;for(var t=Array.prototype.slice.call(arguments,1),r=0,s=e.channels[n].length;r<s;r++){var a=e.channels[n][r];a.callback.apply(a.context,t)}return this};return{channels:{},publish:t,subscribe:n,installTo:function(e){e.subscribe=n,e.publish=t}}}();return e},s={SIGNAL:"signal",SOCKET:"socket",MESSAGE_QUEUE:"msg_queue",ANONYMOUS_PIPE:"anonymous_pipe",NAMED_PIPE:"named_pipe",SHARED_MEMORY:"shared_memory",MESSAGE_PASING:"msg_passing",MEMORY_MAPPED_FILE:"memory_mapped_file",PPC:"protected_proc_call"};class a{constructor({type:e=s.SIGNAL}){this._type=e,this._env={},this._init()}_init(){switch(this._type){case s.SIGNAL:this._init_SIGNAL()}}_init_SIGNAL(){const e=r();this._env={mediator:e,signal:{}},e.installTo(this._env.signal),this.listen=(...e)=>{this._env.signal.subscribe(...e)},this.emit=(...e)=>{this._env.signal.publish(...e)}}}const i=({domains:e})=>{const n={_env:{domains:e},_interface:{get:e=>t().get_Domain(e),add:e=>t().add_Domain(e)},interface:()=>n._interface},t=()=>n._env.domains;return n};class c{constructor({ipc:e}){this._ipc=e,this._domains={rings:{},gates:{}},this._instance=i({domains:this})}get interface(){return this._instance.interface()}add_Domain({name:e,parent:n,kernel:t,ipc:r=this._ipc}){if(void 0!==this._domains.rings[e])throw Error("Domain already exist");if(void 0!==this._domains.gates[n])throw Error("Gate already exist");this._domains.rings[e]={name:e,parent:n,kernel:t({ipc:r,name:e})},this._domains.gates[n]={name:e,ring:this._domains.rings[e]}}get_Domain({name:e}){if(void 0===this._domains.rings[e])throw Error("Domain not found");return this._domains.rings[e].kernel}}const o=({ipc:e,domain:n})=>{const t={_env:{ipc:e,domain:n},listen:({signal:e,handler:n})=>r().ipc.listen(e,n),emit:({signal:e,message:n=""})=>r().ipc.emit(e,n)},r=()=>t._env;return t},l=({kernel:e})=>{const n={_kernel:e,_interface:{domains:{...e._domains.interface,add:({name:e,...n})=>(t().add({name:e,...n}),t().get({name:e})),listen:({domain:e,signal:n,handler:r})=>t().get({name:e}).listen({signal:n,handler:r}),emit:({domain:e,signal:n,message:r=""})=>t().get({name:e}).emit({signal:n,message:r})},getNew_IPC:(e={})=>new a(e),getNew_MicroKernel:e=>o(e)},interface:()=>n._interface},t=()=>n._kernel._domains.interface;return n};class _{constructor(){this._ipc=new a({}),this._domains=new c({ipc:this._ipc,kernelFactory:o}),this._instance=l({kernel:this})}get interface(){return this._instance.interface()}}const d=({baseKernel:e})=>{const{_env:n,...t}=e,r={_env:{baseKernel:e},_interface:{...t},interface:()=>r._interface};return r._env.xkernel=(({kernel:e})=>{const n={_env:{kernel:e},_interface:{mutate:{append:({extra:e})=>{for(const n of Object.keys(e))void 0===t()[n]&&(t()[n]=e[n])},adapt:({adjust:e,adapter:n})=>{void 0!==t()[e]&&(t()[e]=n(t()[e]))}}},interface:()=>n._interface},t=()=>n._env.kernel._interface;return(()=>n._env.kernel)()._interface._xkernel=n.interface(),n})({kernel:r}),r};var m={getNew_Xkernel:e=>d(e)};const f=()=>{const e={_env:{layers:{},gates:{},endSignal:null},getLayer:({name:e})=>n()[e].kernel,addLoyers:({dmx_kernel:e,kernel:n})=>{const t=o();r({name:"core",parent:"kernel",dmx_kernel:e,kernel:n,setup:t._setupLayer_Core}),r({name:"system",parent:"core",dmx_kernel:e,kernel:n,setup:t._setupLayer_System}),r({name:"user",parent:"system",dmx_kernel:e,kernel:n,setup:t._setupLayer_System})},setupLayers:({bootKernel:n,endSignal:t})=>{const r=e._env.layers;e._env.endSignal=t;for(const e of Object.keys(r))s({name:e,setup:r[e].setup,bootKernel:n});e._install({bootKernel:n})},_install:({bootKernel:e})=>{const t=Object.values(n()).sort((e,n)=>e.position-n.position);for(const n of t)e.emit({signal:`${n.name}-start`})},_setupLayer_Core:({data:n,bootKernel:r,layer:s})=>{s.kernel.interface()._kernel.listen({signal:"dmx-stack",handler:({action:n,layer:r="core",stack:s})=>{switch("function"!=typeof s&&(s=e=>e),n){case"up":const n=t()[r];void 0!==n&&(s=s(e.getLayer({name:n.child})))}}})},_setupLayer_System:({data:e,bootKernel:n,layer:t})=>{},_setupLayer_User:({data:e,bootKernel:n,layer:t})=>{}},n=()=>e._env.layers,t=()=>e._env.gates,r=({name:e,parent:n,dmx_kernel:t,kernel:r,setup:s})=>{const a=o(),i=Object.keys(a._env.layers).length;a._env.layers[e]={name:e,position:i,kernel:t.domains.add({name:e,parent:n,kernel:r}),setup:s,started:!1},void 0!==n&&(a._env.gates[n]={name:`${n}-${e}`,parent:n,child:e})},s=({name:e,setup:n,bootKernel:t})=>{t.listen({signal:`${e}-start`,handler:r=>a({name:e,setup:n,data:r,bootKernel:t})}),t.listen({signal:`${e}-started`,handler:n=>i({name:e,bootKernel:t})})},a=({name:e,setup:n,data:t,bootKernel:r})=>{n({data:t,bootKernel:r,layer:o()._env.layers[e]}),r.emit({signal:`${e}-started`})},i=({name:n,bootKernel:t})=>{e._env.layers[n].started=!0,c({bootKernel:t})},c=({bootKernel:e})=>{const t=o();0===Object.values(n()).filter(e=>!1===e.started).length&&e.emit({signal:t._env.endSignal})},o=()=>e;return e};const u=()=>{return{_time_start:null,_time_end:null,wait:!1,define:()=>{},start:()=>{},stop:()=>{},continue:null,end:()=>{},_result:null}},y=({id:e,type:n,lifecycle:t})=>{const r={_config:{id:e,type:n},_env:{lifecycle:t,controller:null},_interface:{lifecycle:t},interface:()=>r._interface};return r._env.controller=v({process:r}),r.controller=r._env.controller.interface(),r},v=({process:e})=>{const n={_env:{process:e,parent:null,children:{}},_interface:{start:e=>{if(null!==t._time_start){console.log("--- ProcessController -> child",n);const t=y(e);return t._env.parent=r._config.id,s[t._config.id]=t,t}t._time_start=Date.now(),t.start(e)},wait:e=>{t.wait=e},stop:({next:e})=>{null!==t._time_end&&(t.continue=e,t._time_end=Date.now())},end:({result:e})=>{t._result=e,t._time_end=Date.now(),null!==t.continue&&t.continue()},isFinished:()=>null!==t._time_end,info:()=>({time_start:t._time_start,time_end:t._time_end,waiting:t.wait,result:t._result})},interface:()=>n._interface},t=n._env.process._env.lifecycle,r=n._env.process,s=n._env.children;return n};const p=({process:e,lifecycle:n})=>{const t={_env:{process:e,lifecycle:n},_generators:{newProcess:e=>t._env.process(e),newPLifecycle:e=>t._env.lifecycle(e)},_interface:{generateProcess:({lifecycle:e,...n})=>{const t={...r().newPLifecycle(),start:e.start};return r().newProcess({...n,lifecycle:t})},generateLifecycle:e=>r().newPLifecycle()},interface:()=>t._interface},r=()=>t._generators;return t};class g{constructor({processesFactory:e}){this._env={processesFactory:e},this._processes={},this._instance=k({manager:this}),this._controller=h({manager:this})}get interface(){return this._instance.interface()}get controller(){return this._controller.interface()}get factory(){return this._env.processesFactory.interface()}defineProcess({id:e,type:n,lifecycle:t}){return this._processes[e]=this.factory.generateProcess({id:e,type:n,lifecycle:t}),{id:e,interface:this._processes[e].interface(),controller:this._processes[e].controller}}startProcess({id:e}){this._processes[e].controller.start()}stopProcess({id:e}){this._processes[e].controller.stop()}}const k=({manager:e})=>{const n={_env:{manager:e},_interface:{processes:{define:e=>t().defineProcess(e),start:e=>t().startProcess(e),stop:e=>t().stopProcess(e)}},interface:()=>n._interface},t=()=>n._env.manager;return n},h=({manager:e})=>{const n={_env:{manager:e},_interface:{processes:{define:e=>t().defineProcess(e),start:({id:e})=>{const n=t().processes[e],s=n.interface().lifecycle;t().startProcess({id:e}),!0===s.wait&&(s.continue=()=>r(n)),r(n)},stop:e=>t().stopProcess(e)}},interface:()=>n._interface},t=()=>n._env.manager,r=e=>{null!==_process.interface().lifecycle._time_end&&delete t().processes[e._config.id]};return n};var S={definition:()=>{const e={config:{name:"system-process"},metadata:{author:{name:"Unlevel Team"}},_context:{SystemProcesses:g,ProcessesFactory:p,SystemProcess:y,ProcessLifecycle:u,manager:null},lifecycle:{install:({systemLayer:e})=>{const{SystemProcesses:t,ProcessesFactory:r,SystemProcess:s,ProcessLifecycle:a}=n();return n().manager=new t({processesFactory:r({process:s,lifecycle:a})}),e._xkernel.mutate.append({extra:n().manager.controller}),n().manager},load:e=>{}}},n=()=>e._context;return e}};class b{constructor(){this._tasks={},this._history={tasksLaunched:0,tasksFinished:0}}_getTask({id:e}){return this._tasks[e]}_addTask({id:e,type:n,lifecycle:t,...r}){this._tasks[e]={id:e,type:n,lifecycle:t,...r}}_runTask({id:e}){const n=this._tasks[e];n.lifecycle.start({task:n}),this._history.tasksLaunched++}_finishTask({id:e}){const n=this._tasks[e];void 0!==n&&(n.lifecycle.stop({task:n}),this._history.tasksFinished++)}getTasksInfo(){return{tasks:Object.values(this._tasks).reduce((e,n,t)=>(e[n.id]={id:n.id,type:n.type,description:n.metadata.description},e),{}),history:this._history}}}class L{constructor({systemLayer:e}){const n=new b;this._env={tasks:n,processes:e.processes},this._instance=x({systemTasks:this})}get interface(){return this._instance.interface()}}const x=({systemTasks:e})=>{const n={_env:{systemTasks:e},_interface:{tasks:{add:({id:e,type:s,lifecycle:a})=>{const i=(({id:e,type:n})=>{const t={_env:{task:{id:e,type:n,metadata:{description:`System task ${n}`}},process:null,controller:null,supervisor:null},definition:()=>({...r(),lifecycle:s().interface()}),controller:null,supervisor:null},r=()=>t._env.task,s=()=>t._env.controller;return t})({id:e,type:s});i._env.process=t.define({id:`task-${e}`,type:`task-${s}`,lifecycle:a}),(({task:e})=>{const n={_env:{task:e,customTask:{}},_interface:{setup:({key:e,method:t})=>{n._env.customTask[e]=t},start:e=>r().start(e),end:({result:e})=>{void 0!==n._env.customTask.end&&n._env.customTask.end({result:e}),t().controller.end({result:e}),r().finish()},stop:(e={})=>{t().controller.stop(e)},wait:e=>t().controller.wait(e),info:()=>t().controller.info()},interface:()=>n._interface},t=()=>n._env.task._env.process,r=()=>n._env.task.supervisor;e._env.controller=n,e.controller=n.interface()})({task:i}),(({task:e,manager:n})=>{const t={_env:{task:e,manager:n},_interface:{start:e=>{a().controller.start(e)},finish:()=>{r().tasks.finish({id:s()._env.task.id})}},interface:()=>t._interface},r=()=>t._env.manager,s=()=>t._env.task,a=()=>t._env.task._env.process;e._env.supervisor=t,e.supervisor=t.interface()})({task:i,manager:n.interface()}),r._addTask(i.definition())},run:({id:e})=>{r._runTask({id:e})},finish:({id:e})=>{r._finishTask({id:e}),delete r._tasks[e]},info:()=>r.getTasksInfo()}},interface:()=>n._interface},{processes:t,tasks:r}=n._env.systemTasks._env;return n};var w={definition:()=>{const e={config:{name:"system-tasks",require:{"system-process":!0}},metadata:{author:{name:"Unlevel Team"}},_context:{SystemTasks:L,tasks:null},lifecycle:{install:({systemLayer:e})=>{const{SystemTasks:t}=n();return n().tasks=new t({systemLayer:e}),e._xkernel.mutate.append({extra:n().tasks.interface}),n().tasks},load:e=>{}}},n=()=>e._context;return e}};const P=({cmdHandler:e,environment:n})=>{const t={_env:{cmdHandler:e,environment:n,subroutines:{}},_interface:{addSub:({name:e,handler:n})=>{r()[e]={name:e,handler:n}},callSub:({name:e,options:n})=>r()[e](n),environment:()=>t._env.environment},interface:()=>t._interface},r=()=>t._env.subroutines;return t},K=({stack:e})=>{const n={_env:{stack:e},call:e=>t()._env.cmdHandler({...t()._env.environment,lifecycle:e})},t=()=>n._env.stack;return n};class M{constructor(){this._factory={newCallStack:e=>P(e),newSystemCall:e=>K(e)},this._instance=O({systemCalls:this})}get factory(){return this._factory}get interface(){return this._instance.interface()}}const O=({systemCalls:e})=>{const n={_env:{systemCalls:e},_interface:{syscall:{newStack:e=>t().factory.newCallStack(e),newCall:e=>t().factory.newSystemCall(e)}},interface:()=>n._interface},t=()=>n._env.systemCalls;return n};var C={definition:()=>{const e={config:{name:"system-call",require:{}},metadata:{author:{name:"Unlevel Team"}},_context:{SystemCalls:M,SystemCallsInstance:O,SystemCall:K,CallStack:P,sysCalls:null},lifecycle:{install:({systemLayer:e})=>{const{SystemCalls:t}=n();return n().sysCalls=new t,e._xkernel.mutate.append({extra:n().sysCalls.interface}),n().sysCalls},load:e=>{}}},n=()=>e._context;return e}};const E={INT:0,SYMBOLS:1,ADDRESS:2,CONTROL:3,MEMORY:4,BACKPLANE:5};var T={getNew_BUS:e=>(({sys:e,signal:n})=>{const t={_env:{bus:{},sys:e,signal:n,actions:E},_listener:({action:e,...n})=>{console.log("--- SysBUS ->",{action:e,...n});const t=r.actions;switch(e){case t.INT:break;case t.SYMBOLS:console.log("  -> Some symbols...")}},_interface:{},interface:()=>t._interface},r=t._env;return e._kernel.listen({signal:r.signal,handler:t._listener}),t})(e),getNew_Operator:e=>(({bus:e})=>{const n={_env:{bus:e},_interface:{symbols:()=>{const e={action:r.actions.SYMBOLS};t().emit({signal:r.signal,message:e})}},interface:()=>n._interface},t=()=>n._env.bus._env.sys._kernel,r=n._env;return r.signal=e._env.signal,r.actions=e._env.actions,n})(e)};const N={CHAR:0,BLOCK:1,NET:2,SPECIAL:3},D={CHAR:{readChar:null,writeChar:null},BLOCK:{readBlock:null,writeBlock:null},NET:{request:null,response:null},SPECIAL:{read:null,write:null}},I=({type:e})=>{const n={},t=Object.keys(N).find(n=>N[n]===e);for(let e of Object.keys(D[t]))n[e]=()=>{};return n},F=()=>{const e={_env:{methods:{}},_interface:{control:()=>e._env.methods},interface:()=>e._interface};return e},A=({dev:e,policy:n,mechanism:t})=>{const r={_env:{dev:e,policy:n,mechanism:t},_interface:{setMechanism:({methods:e})=>{s()._env.methods={...I(a().dev),...e}},mechanism:()=>s().interface()},interface:()=>r._interface},s=()=>r._env.mechanism,a=()=>r._env;return r};var j={getNew_SYSDEV:e=>(({type:e})=>{const n={_config:{type:e},_env:{controller:null},_interface:{controller:null,newController:e=>A(e),newMechanism:e=>F()},interface:()=>n._interface},t=A({policy:{},mechanism:F(),dev:n._config});return n._env.controller=t,n._interface.controller=t.interface(),n})(e),createMechanism:I};const U=()=>{const e={_interface:{install:()=>{},load:e=>{},unload:()=>{}},interface:()=>e._interface};return e},q=()=>{const e={_env:{def:{config:{name:"",require:{}},metadata:{author:{name:""}},_context:{id:null,devType:null,driver:null},lifecycle:{install:({systemLayer:e,id:n,driver:t})=>{const s=e.devices,{devType:a}=r();return s.manage.define({id:n,type:a}),s.manage.install({id:n,driver:t}),r().id=n,r().driver=t,t}}},driverLC:U(),engine:null},_interface:{define:({type:e=N.CHAR,name:n="",author:r="",require:s={}})=>{t().config.name=n,t().metadata.author=r,t().require=s,t()._context.devType=e},params:()=>{},engine:n().engine},interface:()=>e._interface},n=()=>e._env,t=()=>e._env.def;e.deploy=()=>(({driver:e})=>{const n={_env:{driver:e,dev:null},_interface:{install:({dev:e})=>{t().dev=e;const n=e.interface().controller;r().driverLC.interface().install(),n.setMechanism({methods:r().engine})},load:e=>r().driverLC.load(e),mechanism:()=>t().dev},interface:()=>n._interface},t=()=>n._env,r=()=>n._env.driver;return n})({driver:n()});const r=()=>e._env.def._context;return e};var R={DriverModules:({coreLayer:e})=>{const n={_env:{coreLayer:e,modules:e.modules},_interface:{create:q,make:({module:e,engine:n})=>{e._env.engine=n,t.define({def:e._env.def})},install:({driver:e})=>{const n=e._env.def,s=r._kernel.stack.up(),a=e.deploy();t.install({name:n.config.name,env:{systemLayer:s.interface(),id:n.config.name,driver:a}})}},interface:()=>n._interface},t=n._env.modules,r=n._env.coreLayer;return n}};const{DriverModules:Y}=R,$=({bus:e,devMaker:n})=>{const t={_env:{devices:{},bus:e,devMaker:n},_interface:{define:({id:e,type:n})=>{s()[e]=a({type:n})},install:({id:e,driver:n})=>{const t=s()[e];return t._env.controller=n.interface(),t._env.controller.install({dev:t})},list:()=>Object.keys(s()),ksymbols:()=>r().symbols()},interface:()=>t._interface},r=()=>t._env.bus.interface(),s=()=>t._env.devices,a=e=>t._env.devMaker.getNew_SYSDEV(e);return t},B=({modMaker:e})=>{const n={_env:{drivers:{},modMaker:e},_interface:{define:({id:e,type:n})=>{const s={id:e,def:r.create()};s.control=s.def.interface(),s.control.define({type:n,name:e}),t()[e]=s},get:({id:e})=>t()[e],make:({id:e,engine:n={}})=>r.make({module:t()[e].def,engine:{main:()=>{},...n}}),install:({id:e})=>{r.install({driver:t()[e].def})},list:()=>Object.keys(t())},interface:()=>n._interface},t=()=>n._env.drivers,r=e.interface();return n};const G=({sysdev:e})=>{const n={_dev:{sysdev:e},_interface:{devices:{manage:e._manager.interface(),drivers:e._drivers.interface()}},interface:()=>n._interface};return n};var H={SystemDevices:class{constructor({coreLayer:e,systemLayer:n}){this._bus=T.getNew_BUS({sys:n,signal:"sys-bus"}),this._manager=$({bus:T.getNew_Operator({bus:this._bus}),devMaker:j}),this._drivers=B({modMaker:Y({coreLayer:e})}),this._instance=G({sysdev:this})}get interface(){return this._instance.interface()}}};var X={definition:({coreLayer:e})=>{const n={config:{name:"system-devices",require:{}},metadata:{author:{name:"Unlevel Team"}},_context:{...H,coreLayer:e,sysdev:null},lifecycle:{install:({systemLayer:e})=>{const{SystemDevices:n,coreLayer:r}=t(),s=new n({coreLayer:r,systemLayer:e});return e._xkernel.mutate.append({extra:s.interface}),t().sysdev=s,s},load:e=>{}}},t=()=>n._context;return n}};var W={_INODES_TYPES:{FILE:0,DIRECTORY:1,HARDLINK:2,SOFTLINK:3,SPECIAL:4},Inode:({id:e,dev:n,type:t,parent:r=null,metadata:s={}})=>({id:e,dev:n,type:t,parent:r,metadata:s,open:null,release:null,read:null,write:null})};const{_INODES_TYPES:V,Inode:Q}=W;var z={FSContext:({id:e})=>{const n={_env:{id:e,root:null,iNodes:{},dev:null},_interface:{add:({id:e,...t})=>{n._env.iNodes[e]={id:e,...t}},get:({id:e})=>n._env.iNodes[e],remove:({id:e})=>{delete n._env.iNodes[e]}},interface:()=>n._interface},t=Q({id:e,dev:n._env.dev,type:V.SPECIAL});return t.metadata={context:n},n._env.root=t,n},FSAgent:({context:e})=>{const n={_env:{context:e},_interface:{file:{get:()=>{},set:()=>{},delete:()=>{}},directory:{get:e=>{const n=t().get({id:e}),r={};return r.name=n.metadata.name,r.files=n.metadata.files,r.actions={open:n.open,read:n.read,write:n.write,release:n.release,list:()=>{}},r},set:({id:e,parent:n,name:r})=>{const s=t().get({id:e});s.parent=void 0!==n?n:s.parent,s.metadata.name=void 0!==r?r:s.metadata.name},delete:()=>{}}},interface:()=>n._interface},t=()=>e.interface();return n}};const{FSContext:J,FSAgent:Z}=z;const ee=({fs:e})=>{const n={_env:{fs:e},_interface:{fs:{manage:()=>{},drivers:()=>{}}},interface:()=>n._interface};return n};var ne={FileSystem:class{constructor(){this._instance=ee({fs:this}),this._context=J({}),this._agent=Z({context:this._context})}get interface(){return this._instance.interface()}},FSInstance:ee};const{FileSystem:te}=ne;var re={definition:()=>{const e={config:{name:"system-fs",require:{}},metadata:{author:{name:"Unlevel Team"}},_context:{FileSystem:te,fs:null},lifecycle:{install:({systemLayer:e})=>{const{FileSystem:t}=n();return n().fs=new t,e._xkernel.mutate.append({extra:n().fs.interface}),n().fs},load:e=>{}}},n=()=>e._context;return e}};const se=({process:e})=>{const n={_env:{process:e,lifecycle:{start:e=>{}}},_interface:{lifecycle:{def:()=>t(),end:e=>t().end(e)}},interface:()=>n._interface},t=()=>n._env.lifecycle;return n};var ae={StreamProcess:({stream:e})=>{const n={_env:{stream:e,controller:null},_interface:{},interface:()=>n._interface};n._env.controller=se({process:n});n._env.controller.interface();return n},ProcessController:se,ProcessMaker:({systemLayer:e})=>{const n={_env:{manager:e.processes},_interface:{newProcess:({id:e,lifecycle:n})=>{t.define({id:`sys-stream-${e}${Date.now()}`,type:"sys-stream",lifecycle:n})}},interface:()=>n._interface},t=n._env.manager;return n}};const ie={stdin:0,stdout:1,stderr:2},ce={iterator:0,syscall:1},oe=({id:e,type:n,process:t})=>{const r={_config:{id:e,type:n,controller:null},_env:{process:t},_interface:{controller:()=>r._config.controller.interface()},interface:()=>r._interface};return r._config.controller=le({stream:r}),r},le=({stream:e})=>{const n={_env:{stream:e,mode:ce.iterator,value:null},_interface:{mode:e=>t().mode=ce[e],value:e=>_val?t().value=e:t().value},interface:()=>n._interface},t=()=>n._env;return n};var _e={Stream:oe,StreamsFactory:()=>{const e={_types:{std:ie},_interface:{createStream:({id:n,family:t="std",type:r,process:s=null})=>oe({id:n,type:e._types[t][r],process:s}),families:()=>Object.keys(e._types)},interface:()=>e._interface};return e}};const de=({factory:e})=>{const n={_env:{factory:e},_config:{streams:{},operators:{}},_interface:{add:e=>{const n=r().createStream(e);t()[n._config.id]=n},get:e=>t()[e]},newOperator:()=>{const e=`op-${Date.now()}`;return s()[e]=me({manager:n}),{id:e,controller:s()[e].interface()}},factory:()=>n._env.factory,interface:()=>n._interface},t=()=>n._config.streams,r=()=>n._env.factory.interface(),s=()=>n._config.operators;return n},me=({manager:e})=>{const n={_env:{manager:e,streams:{}},_interface:{add:({id:e,...n})=>{t().add({id:e,...n}),r()[e]=t().get(e)},get:e=>r()[e]},interface:()=>n._interface},t=()=>n._env.manager.interface(),r=()=>n._env.streams;return n};const fe=({streams:e})=>{const n={_env:{streams:e},_interface:{streams:{newOperator:()=>t.newOperator()}},interface:()=>n._interface},t=n._env.streams._manager;return n};var ue={StreamsManager:de,SystemStreams:class{constructor({systemLayer:e}){this._manager=de({factory:_e.StreamsFactory()}),this._instance=fe({streams:this}),this._processMaker=ae.ProcessMaker({systemLayer:e})}get interface(){return this._instance.interface()}},StreamsOperator:me};var ye={definition:()=>{const e={config:{name:"system-streams",require:{"system-process":!0}},metadata:{author:{name:"Unlevel Team"}},_context:{...ue,streams:null},lifecycle:{install:({systemLayer:e})=>{const{SystemStreams:t}=n();return n().streams=new t({systemLayer:e}),e._xkernel.mutate.append({extra:n().streams.interface}),n().streams},load:e=>{}}},n=()=>e._context;return e}};const ve=({id:e,type:n="annonymous"})=>{return{_config:{id:e,type:n},_env:{in:null,out:null}}},pe=()=>{return{_config:{seq:{}}}};class ge{constructor(){this._instance=ke({pipelines:this})}get interface(){return this._instance.interface()}}const ke=({pipelines:e})=>{const n={_env:{pipelines:e},_interface:{pipelines:{create:()=>{}}},interface:()=>n._interface};return n};var he={definition:()=>{const e={config:{name:"system-pipelines",require:{"system-streams":!0}},metadata:{author:{name:"Unlevel Team"}},_context:{SystemPipelines:ge,PipeLinesInstance:ke,Pipeline:pe,SytemPipe:ve,pipelines:null},lifecycle:{install:({systemLayer:e})=>{const{SystemPipelines:t}=n();return n().pipelines=new t,e._xkernel.mutate.append({extra:n().pipelines.interface}),n().pipelines},load:e=>{}}},n=()=>e._context;return e}};const Se={config:{name:"",require:{}},metadata:{description:"",author:{name:"",email:""}},lifecycle:{install:null,load:null,unload:null,uninstall:null}},be=({def:e,env:n={}})=>{const t={_def:e,_env:n,install:()=>r().install(t._env)},r=()=>t._def.lifecycle;return t};class Le{constructor(){this._defs={},this._mods={}}newDEF({name:e}){({...Se}).config.name=e}addDEF({def:e}){if(void 0!==this._defs[e.config.name])throw Error("Defintion already exists");this._defs[e.config.name]=e}install({name:e,env:n}){const t=this._defs[e];if(void 0===t)throw Error("Defintion not found");const r=be({def:t,env:n}).install();this._mods[e]={name:e,def:t,module:r}}info(){return{modules:Object.values(this._defs).reduce((e,n,t)=>(e[n.config.name]={name:n.config.name,metadata:n.metadata,installed:void 0!==this._mods[n.config.name]},e),{}),total:Object.keys(this._defs).length,installed:Object.keys(this._mods).length}}}const xe=({manager:e})=>{const n={_env:{manager:e},_interface:{modules:{define:e=>t().addDEF(e),install:e=>t().install(e),info:e=>t().info(e)}},interface:()=>n._interface},t=()=>n._env.manager;return n};class we{constructor({coreLayer:e}){this._coreLayer=e,this._modules=new Le,this._instance=xe({manager:this._modules}),this._coreLayer._xkernel.mutate.append({extra:this._instance.interface()})}make({bootKernel:e}){e.listen({signal:"modules-start",handler:this._setupModules}),this._defineModules()}_defineModules(){const e=this._coreLayer.modules;e.define({def:S.definition()}),e.define({def:w.definition()}),e.define({def:C.definition()}),e.define({def:X.definition({coreLayer:this._coreLayer})}),e.define({def:ye.definition()}),e.define({def:he.definition()}),e.define({def:re.definition()})}install({bootKernel:e}){const n=this._coreLayer;e.emit({signal:"modules-start",message:{coreLayer:n,bootKernel:e}})}_setupModules({coreLayer:e,bootKernel:n}){const t=e.modules.info().modules,r=e._kernel.stack.up();Object.values(t).forEach(n=>{e.modules.install({name:n.name,env:{systemLayer:r.interface()}})}),n.emit({signal:"modules-started",message:{coreLayer:e}})}}const Pe=({dmx_kernel:e,...n})=>{const t=e.getNew_MicroKernel({...n,ipc:e.getNew_IPC()}),r=m.getNew_Xkernel({baseKernel:t}),s=r.interface();s._xkernel.mutate.append({extra:{stack:{up:()=>{let e=null;return i().emit({signal:"dmx-stack",message:{action:"up",stack:n=>(e=n,n)}}),e}}}});const a={_env:{xkernel:r},_kernel:s},i=()=>a._kernel;return a},Ke=({kernel:e})=>{e._env.xkernel.interface().mutate.adapt({adjust:"domains",adapter:e=>{const n={_mutate:{adjust:e},...e,get:e=>{const n=t().get(e);return console.log("  --\x3e adapter doamins get",{_options:e,_result:n}),n}},t=()=>n._mutate.adjust;return n}})},Me=({kernelStack:e})=>{const{kernelWrapper:n,domains:t}=e,{_xkernel:r,...s}=n.interface();return{_env:{kernelWrapper:n,xkernel:r,domains:t},layers:{core:t.getLayer({name:"core"}).interface(),system:t.getLayer({name:"system"}).interface(),user:t.getLayer({name:"user"}).interface()}}},Oe=({dmx_kernel:e,modify:n,xkLib:t})=>{const r={_env:{dmx_kernel:e,modify:n,xkLib:t},_interface:{newKernel:e=>{const{xkLib:n,modify:t}=s(),r=a().newMicroKernel(e),i=n.getNew_Xkernel({baseKernel:r});return t({kernel:i}),i},newMicroKernel:e=>Pe({...e,dmx_kernel:s().dmx_kernel})},interface:()=>r._interface},s=()=>r._env,a=()=>r._interface;return r};const Ce=({kernel:e,domains:n,modules:t,bootKernel:r})=>{const s={_env:{kernel:e,domains:n,modules:t,bootKernel:r,signal:"domains-setup-finish"},boot:()=>{const e=a(),n=e.signal,t=e.bootKernel._kernel;t.listen({signal:n,handler:n=>{e.modules.make({bootKernel:t}),e.modules.install({bootKernel:t}),e.kernel.domains.emit({domain:"kernel",signal:"kernel-started"})}}),e.domains.setupLayers({endSignal:n,bootKernel:t})},_setupModules:()=>{}},a=()=>s._env;return s};class Ee extends _{constructor(){super();const e=this.interface;this._domains._domains.rings.kernel={name:"kernel",kernel:e.getNew_MicroKernel({ipc:this._ipc})};const n=m.getNew_Xkernel({baseKernel:e});Ke({kernel:n}),this._kernelStack={kernelWrapper:n,kernel:null,domains:f(),modules:null},this._KernelAccessPoint=Me;const t=Oe({dmx_kernel:this.interface,modify:Ke,xkLib:m});this._kernelFactory={factory:t,interface:t.interface()},this._publicStack=null,this._init(),this._boot()}get info(){return DOMIX_KERNEL_INFO}get stack(){return this._publicStack}getNew_MicroKernel(e){return Pe({...e,dmx_kernel:this.interface})}_init(){this._kernelStack.kernel=this._kernelStack.kernelWrapper.interface();const e=this.interface;e.domains.get({name:"kernel"}).listen({signal:"kernel-start",handler:this._setupLayer_Kernel}),e.domains.emit({domain:"kernel",signal:"kernel-start",message:{dmx_kernel:e,instance:this,factory:this._kernelFactory.interface}})}_boot(){const e=this._kernelStack.domains.getLayer({name:"core"}).interface();this._kernelStack.modules=new we({coreLayer:e}),Ce({kernel:this.interface,domains:this._kernelStack.domains,modules:this._kernelStack.modules,bootKernel:this.getNew_MicroKernel()}).boot()}_setupLayer_Kernel({dmx_kernel:e,instance:n,factory:t}){e.domains.get({name:"kernel"}).listen({signal:"kernel-started",handler:e=>{n._publicStack=n._KernelAccessPoint({kernelStack:n._kernelStack})}}),n._kernelStack.domains.addLoyers({dmx_kernel:e,kernel:t.newKernel})}}var Te=()=>new Ee;n.default={newKernel:()=>Te()}}]);