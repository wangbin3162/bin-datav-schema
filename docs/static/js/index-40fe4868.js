import{u as k}from"./useSchemaStore-78e46cac.js";import{as as $,aC as C,a5 as j,f as z,J as B,o as i,A as l,d as I,z as N,B as u,u as E,F as O,K as D,E as f,c as J,O as L}from"./vendor-d82059d1.js";import{l as P}from"./database.api-9da29c0b.js";import{L as R,l as A,y as F,N as p}from"./index-9b587de5.js";import"./chunk-brace-7fd40d4c.js";import"./chunk-bin-ui-next-ebb85d31.js";const K={name:"Screen",components:{GLoading:R},setup(){const d=C(),c=j(),{loadScreenData:m,pageConfig:t,comps:v}=k(),s=z(!0),r=()=>{const a=t.value.width,n=document.documentElement.clientWidth/a;p(document.body,{transform:`scale(${n})`,transformOrigin:"left top",backgroundSize:"100%",backgroundRepeat:"no-repeat"})},e=async()=>{const a=c.params.screenId,n=c.name;if(!a){await d.push("/notfound");return}try{s.value=!0;let o={};if(n==="Preview")o=await P();else{const g=await A(a);if(g){const{id:_,name:w,pid:b,layout:y,components:x}=g;o={pageInfo:{id:_,name:w,pid:b},pageConfig:JSON.parse(y),comps:x.map(S=>JSON.parse(S.componentContent))}}}o&&(await m(o),h(o),setTimeout(()=>{s.value=!1},500),F(window,"resize",r))}catch{await d.push("/notfound")}},h=a=>{const{pageInfo:n}=a;document.title=n.name,document.querySelector('meta[name="viewport"]').setAttribute("content",`width=${t.value.width}`),p(document.documentElement,{overflowX:"hidden",overflowY:"visible"}),p(document.body,{width:`${t.value.width}px`,height:`${t.value.height}px`,backgroundImage:`url(${t.value.bgImage})`,backgroundColor:t.value.bgColor}),r()};return e(),{loading:s,comps:v}}},V={class:"screen-wrapper"},q={class:"dv-loading"},G={class:"scene"};function T(d,c,m,t,v,s){const r=B("g-loading");return i(),l("div",V,[I(u("div",q,[E(r,{spinning:""})],512),[[N,t.loading]]),u("div",{class:"dv-layout",style:f({visibility:t.loading?"hidden":"visible"})},[u("div",G,[(i(!0),l(O,null,D(t.comps,e=>(i(),l("div",{class:"dv-com absolute",key:e.id,style:f({left:e.attr.x+"px",top:e.attr.y+"px",width:e.attr.w+"px",height:e.attr.h+"px",opacity:e.attr.opacity,transform:`rotate(${e.attr.rotate}deg)`})},[(i(),J(L(e.name),{data:e},null,8,["data"]))],4))),128))])],4)])}var U=$(K,[["render",T]]);export{U as default};
