import{as as r,a2 as l,J as n,o as d,A as f,u as a,w as g}from"./vendor-4f77c8c8.js";import"./chunk-brace-7fd40d4c.js";const m={name:"VDecorationConfig",props:{data:{type:Object,required:!0}},setup(o){return{config:l(o.data,"config")}}},p={class:"setting-panel-gui"};function _(o,e,u,t,V,v){const s=n("g-images-select"),c=n("g-field");return d(),f("div",p,[a(c,{label:"\u5143\u7D20\u9009\u62E9"},{default:g(()=>[a(s,{modelValue:t.config.img,"onUpdate:modelValue":e[0]||(e[0]=i=>t.config.img=i),images:["decoration"]},null,8,["modelValue"])]),_:1})])}var j=r(m,[["render",_]]);export{j as default};
