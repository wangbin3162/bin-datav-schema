import{j as c,R as t,b as _,c as V,M as l,l as n}from"./vendor-c1103bdb.js";import"./chunk-brace-0dab6832.js";const C={class:"setting-panel-gui"},U={__name:"config",props:{data:{type:Object,required:!0}},setup(u){const m=u,e=c(()=>m.data.config);return(v,a)=>{const s=t("ChartGlobalConfig"),r=t("g-switch"),d=t("g-field"),g=t("g-input-number"),i=t("g-input"),p=t("g-field-collapse"),b=t("ChartLegendConfig"),f=t("ChartTooltipConfig");return _(),V("div",C,[l(s,{data:u.data},null,8,["data"]),l(p,{label:"\u56FE\u5F62"},{default:n(()=>[l(d,{label:"\u73AB\u7470\u56FE"},{default:n(()=>[l(r,{modelValue:e.value.global.roseType,"onUpdate:modelValue":a[0]||(a[0]=o=>e.value.global.roseType=o)},null,8,["modelValue"])]),_:1}),l(d,{label:"\u5706\u89D2"},{default:n(()=>[l(g,{modelValue:e.value.global.itemStyle.borderRadius,"onUpdate:modelValue":a[1]||(a[1]=o=>e.value.global.itemStyle.borderRadius=o),min:0,max:300,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u4E2D\u5FC3\u4F4D\u7F6E",flat:"",tooltip:"\u73AF\u56FE\u7684\u4E2D\u5FC3\uFF08\u5706\u5FC3\uFF09\u5750\u6807\uFF0C\u6570\u7EC4\u7684\u7B2C\u4E00\u9879\u662F\u6A2A\u5750\u6807\uFF0C\u7B2C\u4E8C\u9879\u662F\u7EB5\u5750\u6807/\u652F\u6301\u8BBE\u7F6E\u6210\u767E\u5206\u6BD4"},{default:n(()=>[l(i,{modelValue:e.value.global.center[0],"onUpdate:modelValue":a[2]||(a[2]=o=>e.value.global.center[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),l(i,{modelValue:e.value.global.center[1],"onUpdate:modelValue":a[3]||(a[3]=o=>e.value.global.center[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u73AF\u56FE\u534A\u5F84",flat:"",tooltip:"\u73AF\u56FE\u7684\u534A\u5F84\uFF0C\u503C\u4E3A<number|string>\uFF0C\u53EF\u8BBE\u7F6E\u53EF\u89C6\u533A\u57DF\u767E\u5206\u6BD4"},{default:n(()=>[l(i,{modelValue:e.value.global.radius[1],"onUpdate:modelValue":a[4]||(a[4]=o=>e.value.global.radius[1]=o),inline:"",label:"\u534A\u5F84"},null,8,["modelValue"])]),_:1})]),_:1}),l(b,{data:u.data},null,8,["data"]),l(f,{data:u.data},null,8,["data"])])}}};export{U as default};
