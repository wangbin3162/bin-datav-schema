import{V as $,e as I,n as z,D as R,W as u}from"./index-a2a480dc.js";import{ax as B,aK as D,a8 as E,r as N,c as m,z as Y,A as q,h as v,v as K,F as O,d as P,n as g,I as V,K as A,b as d,k as F,m as G}from"./vendor-0bcca4c5.js";import{l as J}from"./database.api-009ddd3f.js";import"./chunk-bin-ui-next-98c8f2d2.js";import"./chunk-brace-b1f520b9.js";import"./chunk-bin-datav-bdc06cb1.js";import"./chunk-three-06bdd351.js";import"./chunk-gsap-80ac4909.js";import"./chunk-particles.vue3-83a83be1.js";import"./chunk-mockjs-9e1335a8.js";const L={name:"Screen",components:{GLoading:$},setup(){const l=D(),c=E(),{schemaStore:p,storeToRefs:r}=I(),{pageConfig:n,comps:f}=r(p),s=N(!0);V("RenderModel","runtime");const t=()=>{const e=document.querySelector("#app");if(!e)return;const a=n.value.width,o=document.documentElement.clientWidth/a;u(e,{transform:`scale(${o})`,transformOrigin:"left top",backgroundSize:"100%",backgroundRepeat:"no-repeat"})};function i(e){const a={left:e.attr.x+"px",top:e.attr.y+"px",width:e.attr.w+"px",height:e.attr.h+"px",opacity:e.attr.opacity,transform:`rotate(${e.attr.rotate}deg)`,pointerEvents:e.name==="Group"?"none":null};return e.attr.rotateY&&e.attr.rotateY!==0&&(a["transform-style"]="preserve-3d",a.perspective="1000px",a.overflow="visible"),a}const y=async()=>{const e=c.params.screenId,a=c.name;if(!e){await l.push("/notfound");return}try{s.value=!0;let o={};if(a==="Preview")o=await J();else{const h=await z(e);if(h){const{id:_,name:x,pid:S,layout:b,components:k}=h;o={pageInfo:{id:_,name:x,pid:S},pageConfig:JSON.parse(b),comps:k.map(C=>JSON.parse(C.componentContent))}}}o&&(p.loadScreenData(o),w(o),setTimeout(()=>{s.value=!1},500),R(window,"resize",t))}catch{await l.push("/notfound")}},w=e=>{const a=document.querySelector("#app");if(!a)return;const{pageInfo:o}=e;document.title=o.name,document.querySelector('meta[name="viewport"]').setAttribute("content",`width=${n.value.width}`),u(document.documentElement,{overflowX:"hidden",overflowY:"visible"}),u(a,{width:`${n.value.width}px`,height:`${n.value.height}px`,backgroundImage:`url(${n.value.bgImage})`,backgroundColor:n.value.bgColor}),t()};return y(),{loading:s,comps:f,getComStyle:i}}},T={class:"screen-wrapper"},W={class:"dv-loading"},M={class:"scene"};function X(l,c,p,r,n,f){const s=A("g-loading");return d(),m("div",T,[Y(v("div",W,[K(s,{spinning:""})],512),[[q,r.loading]]),v("div",{class:"dv-layout",style:g({visibility:r.loading?"hidden":"visible"})},[v("div",M,[(d(!0),m(O,null,P(r.comps,t=>{var i;return d(),m("div",{class:"dv-com absolute",key:t.id,style:g(r.getComStyle(t))},[(d(),F(G(t.name),{data:t,style:g({width:t.attr.w+"px",height:t.attr.h+"px",opacity:t.attr.opacity,transform:`rotatey(${(i=t.attr.rotateY)!=null?i:0}deg)`})},null,8,["data","style"]))],4)}),128))])],4)])}var re=B(L,[["render",X]]);export{re as default};
