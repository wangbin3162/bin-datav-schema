import{j as h,R as t,b as _,c as p,M as a,l}from"./vendor-c1103bdb.js";import"./chunk-brace-0dab6832.js";const b={class:"setting-panel-gui"},G={__name:"config",props:{data:{type:Object,required:!0}},setup(o){const d=o,n=h(()=>d.data.config);return(x,e)=>{const i=t("g-switch"),c=t("g-field"),s=t("ChartGlobalConfig"),C=t("ChartGridConfig"),g=t("ChartLegendConfig"),r=t("ChartTooltipConfig"),f=t("ChartXAxisConfig"),m=t("ChartYAxisConfig");return _(),p("div",b,[a(s,{data:o.data},{default:l(()=>[a(c,{label:"\u66F2\u7EBF"},{default:l(()=>[a(i,{modelValue:n.value.global.smooth,"onUpdate:modelValue":e[0]||(e[0]=u=>n.value.global.smooth=u)},null,8,["modelValue"])]),_:1})]),_:1},8,["data"]),a(C,{data:o.data},null,8,["data"]),a(g,{data:o.data},null,8,["data"]),a(r,{data:o.data},null,8,["data"]),a(f,{data:o.data},null,8,["data"]),a(m,{data:o.data},null,8,["data"])])}}};export{G as default};
