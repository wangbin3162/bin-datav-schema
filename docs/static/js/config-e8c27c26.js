import{l as U,H as n,o as x,a as w,c as a,w as u,a1 as o,e as r,b as v}from"./vendor-302fa4a4.js";import"./chunk-brace-b1f520b9.js";const z={class:"setting-panel-gui"},S={class:"pt-5"},N={__name:"config",props:{data:{type:Object,required:!0}},setup(f){const b=f,l=U(()=>b.data.config);return(k,e)=>{const s=n("b-radio"),g=n("b-radio-group"),d=n("g-field"),m=n("g-input-number"),i=n("g-color-picker"),_=n("b-switch"),V=n("g-input"),p=n("g-field-collapse");return x(),w("div",z,[a(d,{label:"\u9876\u7AEF\u5F62\u72B6"},{default:u(()=>[a(g,{modelValue:o(l).linecap,"onUpdate:modelValue":e[0]||(e[0]=t=>o(l).linecap=t),type:"button",size:"mini"},{default:u(()=>[a(s,{label:"round"},{default:u(()=>[r("\u5706\u5F62")]),_:1}),a(s,{label:"square"},{default:u(()=>[r("\u65B9\u5F62")]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(d,{label:"\u73AF\u5F62\u6837\u5F0F",flat:""},{default:u(()=>[a(m,{modelValue:o(l).width,"onUpdate:modelValue":e[1]||(e[1]=t=>o(l).width=t),min:1,max:20,step:1,inline:"",label:"\u7EBF\u5BBD"},null,8,["modelValue"]),a(i,{modelValue:o(l).color,"onUpdate:modelValue":e[2]||(e[2]=t=>o(l).color=t),inline:"",label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u80CC\u666F\u6837\u5F0F",flat:""},{default:u(()=>[a(m,{modelValue:o(l).trailWidth,"onUpdate:modelValue":e[3]||(e[3]=t=>o(l).trailWidth=t),min:0,max:20,step:1,inline:"",label:"\u7EBF\u5BBD"},null,8,["modelValue"]),a(i,{modelValue:o(l).trailColor,"onUpdate:modelValue":e[4]||(e[4]=t=>o(l).trailColor=t),inline:"",label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u4EEA\u8868\u76D8\u6A21\u5F0F"},{default:u(()=>[v("div",S,[a(_,{modelValue:o(l).dashboard,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).dashboard=t),size:"small"},null,8,["modelValue"])])]),_:1}),a(p,{label:"\u6807\u9898",modelValue:o(l).title.show,"onUpdate:modelValue":e[9]||(e[9]=t=>o(l).title.show=t),toggle:""},{default:u(()=>[a(d,{label:"\u6807\u9898\u5185\u5BB9"},{default:u(()=>[a(V,{modelValue:o(l).title.content,"onUpdate:modelValue":e[6]||(e[6]=t=>o(l).title.content=t)},null,8,["modelValue"])]),_:1}),a(d,{label:"\u6587\u5B57\u5927\u5C0F"},{default:u(()=>[a(m,{modelValue:o(l).title.fontSize,"onUpdate:modelValue":e[7]||(e[7]=t=>o(l).title.fontSize=t),min:12,max:36,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u6587\u5B57\u989C\u8272"},{default:u(()=>[a(i,{modelValue:o(l).title.color,"onUpdate:modelValue":e[8]||(e[8]=t=>o(l).title.color=t)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),a(p,{label:"\u767E\u5206\u6BD4",modelValue:o(l).value.show,"onUpdate:modelValue":e[12]||(e[12]=t=>o(l).value.show=t),toggle:""},{default:u(()=>[a(d,{label:"\u6587\u5B57\u5927\u5C0F"},{default:u(()=>[a(m,{modelValue:o(l).value.fontSize,"onUpdate:modelValue":e[10]||(e[10]=t=>o(l).value.fontSize=t),min:12,max:36,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u6587\u5B57\u989C\u8272"},{default:u(()=>[a(i,{modelValue:o(l).value.color,"onUpdate:modelValue":e[11]||(e[11]=t=>o(l).value.color=t)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),a(p,{label:"\u6570\u503C",modelValue:o(l).num.show,"onUpdate:modelValue":e[16]||(e[16]=t=>o(l).num.show=t),toggle:""},{default:u(()=>[a(d,{label:"\u6587\u5B57\u5927\u5C0F"},{default:u(()=>[a(m,{modelValue:o(l).num.fontSize,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).num.fontSize=t),min:12,max:36,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u6587\u5B57\u989C\u8272"},{default:u(()=>[a(i,{modelValue:o(l).num.color,"onUpdate:modelValue":e[14]||(e[14]=t=>o(l).num.color=t)},null,8,["modelValue"])]),_:1}),a(d,{label:"\u6570\u503C\u683C\u5F0F\u5316"},{default:u(()=>[a(V,{modelValue:o(l).numFormat,"onUpdate:modelValue":e[15]||(e[15]=t=>o(l).numFormat=t)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}}};export{N as default};
