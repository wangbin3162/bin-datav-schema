var k=Object.defineProperty;var d=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var h=(c,e,o)=>e in c?k(c,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):c[e]=o,y=(c,e)=>{for(var o in e||(e={}))q.call(e,o)&&h(c,o,e[o]);if(d)for(var o of d(e))B.call(e,o)&&h(c,o,e[o]);return c};import{a5 as K,a6 as Q,g as s}from"./vendor-4f77c8c8.js";import{F as U,G as Z,s as $,t as aa}from"./index-bb6c43e3.js";import{b as ea}from"./database.api-639341ba.js";const g=220,v=50,ta=332,S=40,C=60;function ia(){const c=K(),e=Q(),o=s(()=>e.state.schema),i=s(()=>o.value.pageInfo),r=s(()=>o.value.pageConfig),p=s(()=>o.value.comps),w=s(()=>o.value.selectedCom),b=s(()=>o.value.hoveredCom),l=s(()=>o.value.toolbar),D=s(()=>o.value.toolbox),P=s(()=>o.value.canvas),T=s(()=>{const a=l.value;let t=v;return a.layer&&(t+=g),a.config&&(t+=ta),t}),I=s(()=>{const a=l.value;let t=0;return a.toolbox&&(t+=S),t}),O=s(()=>{const a=l.value;let t=C+v;return a.layer&&(t+=g),t}),x=s(()=>{const a=l.value;let t=40+C;return a.toolbox&&(t+=S),t});async function L(a){await e.dispatch("schema/toggleLayerPanel",a)}async function H(a){await e.dispatch("schema/toggleCompsPanel",a)}async function N(a){await e.dispatch("schema/toggleConfigPanel",a)}async function A(a){await e.dispatch("schema/toggleToolbox",a)}async function E(a){await e.dispatch("schema/setPageInfo",a)}async function G({component:a,index:t}){await e.dispatch("schema/addCom",{component:a,index:t}),await e.dispatch("schema/recordSnapshot")}async function X(a){await e.dispatch("schema/copyCom",a),await e.dispatch("schema/recordSnapshot")}async function Y(a){await e.dispatch("schema/deleteCom",a),await e.dispatch("schema/recordSnapshot"),await u()}async function _(a){await e.dispatch("schema/hoveredCom",a)}async function u(a){await e.dispatch("schema/selectedCom",a)}async function V(a,t){await e.dispatch("schema/moveCom",{id:a,moveType:t}),await e.dispatch("schema/recordSnapshot")}const m=()=>({offsetX:T.value,offsetY:I.value});async function j(){await e.dispatch("schema/autoCanvasScale",m)}async function J(a){await e.dispatch("schema/setCanvasScale",y({scale:a},m()))}async function W({key:a,value:t}){const n={left:"x",top:"y"};await e.dispatch("schema/setShapeSingleStyle",{key:n[a],value:t})}async function f(a){await e.commit("schema/setLoading",a)}async function z(a){await e.dispatch("schema/loadScreenData",a),await e.dispatch("schema/recordSnapshot")}async function F(a){await e.dispatch("schema/setScreenSize",a)}async function M(a="edit"){const t={id:i.value.id||c.query.id,name:i.value.name,pid:i.value.pid,status:a,layout:JSON.stringify(r.value),components:p.value.map(n=>U(n.apiData)?{name:n.alias,componentType:n.componentType,componentContent:JSON.stringify(n),componentDataType:Z.static,modelId:"",x:[],y:[],drill:[],filters:[]}:{name:n.alias,componentType:n.componentType,componentDataType:n.apiData.type,modelId:n.apiData.config.modelId,componentContent:JSON.stringify(n),x:n.apiData.config.x,y:n.apiData.config.y,drill:[],filters:[]})};try{return await $(t)}catch(n){aa("userSchemaStore/saveScreenData",n)}return""}async function R(){let a={};try{await f(!0);const t={pageInfo:{id:i.value.id,name:i.value.name||"\u770B\u677F\u9884\u89C8",pid:i.value.pid||"1"},pageConfig:r.value,comps:p.value};a=await ea(t)}catch{a={}}return await f(!1),a}return{store:e,pageInfo:i,canvas:P,toolbar:l,toolbox:D,pageConfig:r,comps:p,hoveredCom:b,selectedCom:w,getPanelOffsetLeft:O,getPanelOffsetTop:x,getPanelOffset:m,setPageInfo:E,toggleLayerPanel:L,toggleCompsPanel:H,toggleConfigPanel:N,toggleToolbox:A,addCom:G,copyCom:X,deleteCom:Y,onCompHovered:_,onCompSelected:u,onCompMoved:V,autoCanvasScale:j,setCanvasScale:J,setSingleComAttr:W,setGlobalLoading:f,loadScreenData:z,saveScreenData:M,setScreenSize:F,previewScreen:R}}export{ia as u};
