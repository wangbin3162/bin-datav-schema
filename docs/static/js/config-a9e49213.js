import{ar as v,au as y}from"./index-71bcd248.js";import{j as O,R as t,b as U,c as h,M as l,l as i,N as s}from"./vendor-c1103bdb.js";import"./chunk-bin-ui-design-9314e876.js";import"./chunk-brace-0dab6832.js";import"./chunk-bin-datav-6a4e943a.js";import"./chunk-particles.vue3-91e644a5.js";import"./chunk-three-06bdd351.js";import"./chunk-gsap-ecfb8fd4.js";import"./chunk-mockjs-03499d26.js";const S={class:"setting-panel-gui"},N={__name:"config",props:{data:{type:Object,required:!0}},setup(n){const f=n,a=O(()=>f.data.config);return(A,e)=>{const g=t("ChartGlobalConfig"),u=t("g-input-number"),m=t("g-select"),d=t("g-field"),p=t("g-slider"),b=t("g-switch"),r=t("g-field-collapse"),C=t("ChartGridConfig"),c=t("ChartLegendConfig"),V=t("ChartTooltipConfig"),_=t("ChartXAxisConfig"),x=t("ChartYAxisConfig");return U(),h("div",S,[l(g,{data:n.data},null,8,["data"]),l(r,{label:"\u56FE\u5F62"},{default:i(()=>[l(d,{label:"\u6807\u8BB0",flat:""},{default:i(()=>[l(u,{modelValue:a.value.global.symbolSize,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.global.symbolSize=o),min:0,max:300,step:1,suffix:"px",inline:"",label:"\u5927\u5C0F"},null,8,["modelValue"]),l(m,{modelValue:a.value.global.symbol,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.global.symbol=o),data:s(v),inline:"",label:"\u5F62\u72B6"},null,8,["modelValue","data"])]),_:1}),l(d,{label:"\u504F\u79FB",flat:""},{default:i(()=>[l(u,{modelValue:a.value.global.symbolOffset[0],"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.global.symbolOffset[0]=o),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u6C34\u5E73\u504F\u79FB"},null,8,["modelValue"]),l(u,{modelValue:a.value.global.symbolOffset[1],"onUpdate:modelValue":e[3]||(e[3]=o=>a.value.global.symbolOffset[1]=o),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u5782\u76F4\u504F\u79FB"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u65CB\u8F6C"},{default:i(()=>[l(p,{modelValue:a.value.global.symbolRotate,"onUpdate:modelValue":e[4]||(e[4]=o=>a.value.global.symbolRotate=o),min:-360,max:360,step:1,suffix:"px",label:"\u65CB\u8F6C\u5F27\u5EA6"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u7EDF\u8BA1\u7EBF\u56FE"},{default:i(()=>[l(m,{modelValue:a.value.global.line.lineEcStat,"onUpdate:modelValue":e[5]||(e[5]=o=>a.value.global.line.lineEcStat=o),data:s(y)},null,8,["modelValue","data"])]),_:1}),l(d,{label:"\u5E73\u6ED1\u66F2\u7EBF"},{default:i(()=>[l(b,{modelValue:a.value.global.line.smooth,"onUpdate:modelValue":e[6]||(e[6]=o=>a.value.global.line.smooth=o)},null,8,["modelValue"])]),_:1})]),_:1}),l(C,{data:n.data},null,8,["data"]),l(c,{data:n.data},null,8,["data"]),l(V,{data:n.data},null,8,["data"]),l(_,{data:n.data},null,8,["data"]),l(x,{data:n.data},null,8,["data"])])}}};export{N as default};
