var E=Object.defineProperty,M=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var b=(a,e,o)=>e in a?E(a,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[e]=o,T=(a,e)=>{for(var o in e||(e={}))B.call(e,o)&&b(a,o,e[o]);if(C)for(var o of C(e))k.call(e,o)&&b(a,o,e[o]);return a},w=(a,e)=>M(a,V(e));import{K as N,_ as H,u as P,C as R,D as z,A as F,R as K}from"./index-1ea4dda2.js";import{M as L}from"./chunk-bin-ui-next-663f6350.js";import{at as O,m as I,I as U,l as x,D as Y,E as j,H as l,o as r,a as f,b as c,c as g,w as h,F as q,O as G,f as S,e as J,t as Q,aA as W,aB as X}from"./vendor-471160ad.js";import"./chunk-brace-269ffce0.js";const Z={name:"source-panel",components:{DataEditor:N(()=>H(()=>import("./data-editor-ee535355.js"),["static/js/data-editor-ee535355.js","static/css/data-editor-ba74dd9e.css","static/js/vendor-471160ad.js","static/css/vendor-2b79d43b.css","static/js/chunk-brace-269ffce0.js"]))},setup(){const a=I("260px"),e=I(null),o=U("ModelTree",[]),s=x(()=>{const n=t=>{const p=i.value.config?i.value.config.modelId:"",D=w(T({},t),{icon:t.directory==="Y"?"folder":t.modelType==="DM"?"deploymentunit":"database",selected:p===t.id});return t.children&&t.children.length&&(D.children=t.children.map(n)),D};return o.value.map(n)}),{schemaStore:v,storeToRefs:y}=P(),{selectedCom:_}=y(v),i=x(()=>_.value.apiData),u=n=>{i.value.config.data=n},d=()=>{a.value=`${document.body.clientHeight-260}px`},m=(n,t)=>{var p;t.directory==="Y"?(t.selected=!1,L.warning("\u4E0D\u80FD\u9009\u62E9\u6587\u4EF6\u5939\uFF01")):(i.value.config.modelId===t.id&&(t.selected=!0),(p=e.value)==null||p.open({modelId:t.id,modelName:t.name}))};return Y(()=>{d(),R(window,"resize",d)}),j(()=>{z(window,"resize",d)}),{staticEditorHeight:a,sourceDrawerRef:e,ApiType:F,apiDataConfig:i,modelTree:s,handleChange:m,ApiTypeMap:K(),updateData:u}}},A=a=>(W("data-v-4aec554a"),a=a(),X(),a),$={class:"api-editor"},ee={class:"attr-source-wp"},ae={class:"data-source"},te=A(()=>c("div",{class:"data-result-title"},"\u6570\u636E\u6E90\u914D\u7F6E",-1)),oe={class:"data-source-config"},se={key:1,class:"pt-10"},ne=A(()=>c("div",{class:"data-result-title"},"\u9009\u62E9\u5206\u6790\u6A21\u578B",-1)),ie={class:"p16"};function ce(a,e,o,s,v,y){const _=l("b-radio"),i=l("b-radio-group"),u=l("g-field"),d=l("data-editor"),m=l("b-tree");return r(),f("div",$,[c("div",ee,[c("div",ae,[te,c("div",oe,[g(u,{label:"\u6570\u636E\u6765\u6E90"},{default:h(()=>[g(i,{modelValue:s.apiDataConfig.type,"onUpdate:modelValue":e[0]||(e[0]=n=>s.apiDataConfig.type=n),type:"button",size:"mini"},{default:h(()=>[(r(!0),f(q,null,G(s.ApiTypeMap,(n,t)=>(r(),S(_,{key:t,label:t},{default:h(()=>[J(Q(n),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),s.apiDataConfig.type===s.ApiType.static?(r(),S(d,{key:0,"model-value":s.apiDataConfig.config.data,height:s.staticEditorHeight,onChange:s.updateData},null,8,["model-value","height","onChange"])):(r(),f("div",se,[ne,c("div",ie,[g(m,{data:s.modelTree,titleKey:"name","default-expand":"",onSelectChange:s.handleChange},null,8,["data","onSelectChange"])])]))])])])])}var ue=O(Z,[["render",ce],["__scopeId","data-v-4aec554a"]]);export{ue as default};
