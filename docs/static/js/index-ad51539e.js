var q=Object.defineProperty,A=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var w=(e,t,s)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,u=(e,t)=>{for(var s in t||(t={}))R.call(t,s)&&w(e,s,t[s]);if(y)for(var s of y(t))T.call(t,s)&&w(e,s,t[s]);return e},g=(e,t)=>A(e,E(t));import{P as z}from"./page-wrapper-3aa5784b.js";import{A as F}from"./index-8f924e96.js";import{a4 as P,y as k,a6 as $,G as C,J as l,L as x,o as m,c as G,w as d,B as a,u as i,d as J,A as S,K,t as r,F as M,q as D,a8 as U,a9 as W}from"./vendor-0fc4fabe.js";import{r as H,g as O}from"./database.api-9713b641.js";import{a as Q}from"./chunk-bin-ui-next-51eb6328.js";import"./index-a4e94847.js";import"./chunk-brace-7fd40d4c.js";const X={name:"DatasetDemo",components:{ActionButton:F,PageWrapper:z},setup(){const e=k({tabs:[{key:"all",title:"\u5168\u90E8"},{key:"mine",title:"\u6211\u7684"}],activeTab:"all"}),t=k({loading:!1,list:[]}),s=$(),c=n=>{let p=s.resolve({path:"/schema/screen",query:{id:n.id}});window.open(p.href,"_blank")},h=()=>{let n=s.resolve({path:"/schema/screen",query:{}});window.open(n.href,"_blank")},b=async n=>{await H(n)&&(Q.error("\u5220\u9664\u6210\u529F\uFF01"),await _())};async function _(){try{t.loading=!0;const{data:n}=await O();t.list=n}catch(n){console.log(n)}t.loading=!1}return _(),g(u(u({},C(e)),C(t)),{handleEdit:c,handleCreate:h,handleRemove:b,initList:_})}},Y=e=>(U("data-v-e534cb84"),e=e(),W(),e),Z={style:{margin:"0 0 -16px"}},ee=D("\u65B0\u5EFA\u4EEA\u8868\u677F"),te=D("\u65B0\u5EFA\u6587\u4EF6\u5939"),ae={class:"p16"},se={class:"list-wrap"},oe={class:"list-item-meta"},ne={class:"list-item-meta-content"},ie={class:"list-item-meta-title"},le=["onClick"],ce={class:"list-item-meta-description"},de={class:"list-item-content"},re={class:"list-item-content-item",style:{width:"180px"}},_e=Y(()=>a("span",null,"\u521B\u5EFA\u8005",-1)),pe={class:"list-item-content-item"},ue={class:"list-item-content-item pt-8",style:{width:"120px"}},me={class:"list-item-action"};function he(e,t,s,c,h,b){const _=l("b-tabs"),n=l("b-input"),p=l("b-button"),j=l("b-space"),B=l("b-icon"),v=l("action-button"),V=l("b-collapse-wrap"),I=l("page-wrapper"),L=x("loading"),N=x("no-data");return m(),G(I,null,{desc:d(()=>[a("div",Z,[i(_,{modelValue:e.activeTab,"onUpdate:modelValue":t[0]||(t[0]=o=>e.activeTab=o),data:e.tabs},null,8,["modelValue","data"])])]),default:d(()=>[i(V,{title:"\u4EEA\u8868\u677F",shadow:"none"},{right:d(()=>[i(j,null,{default:d(()=>[i(n,{size:"small",placeholder:"\u8BF7\u8F93\u5165...",search:"",onSearch:c.initList},null,8,["onSearch"]),i(p,{size:"small",icon:"plus",type:"primary",onClick:c.handleCreate},{default:d(()=>[ee]),_:1},8,["onClick"]),i(p,{size:"small",icon:"plus",type:"primary",transparent:""},{default:d(()=>[te]),_:1})]),_:1})]),default:d(()=>[a("div",ae,[J(a("ul",se,[(m(!0),S(M,null,K(e.list,o=>(m(),S("li",{key:o.id,class:"base-list-item"},[a("div",oe,[i(B,{name:"barchart"}),a("div",ne,[a("div",ie,[a("a",{onClick:f=>c.handleEdit(o)},r(o.datasetName),9,le)]),a("div",ce,r(o.workspaceId),1)])]),a("div",de,[a("div",re,[_e,a("p",null,r(o.creator),1)]),a("div",pe,[a("span",null,"\u4FEE\u6539\u4EBA\uFF1A"+r(o.updater),1),a("p",null,"\u4FEE\u6539\u65F6\u95F4\uFF1A"+r(o.updateDate),1)]),a("div",ue,[a("span",null,r(o.datasourceName),1)])]),a("div",me,[i(v,{type:"text",icon:"edit-square",onClick:f=>c.handleEdit(o)},null,8,["onClick"]),i(v,{type:"text",icon:"delete",color:"#f5222d",confirm:"",disabled:["screen_0001","screen_0002"].includes(o.id),onClick:f=>c.handleRemove(o.id)},null,8,["disabled","onClick"])])]))),128))],512),[[L,e.loading],[N,e.list.length===0]])])]),_:1})]),_:1})}var xe=P(X,[["render",he],["__scopeId","data-v-e534cb84"]]);export{xe as default};