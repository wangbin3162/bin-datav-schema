import{f as c,a as x,e as _,l as S,o as y,b as U,t as z,c as v,h as w,d as R,v as B,g as C,k,s as L,m as O,n as T,B as W,i as F}from"./select-options-d59f2fa4.js";import{at as P,l as m,H as i,o as A,a as N,c as a,w as n,b as j}from"./vendor-ee652189.js";import"./chunk-brace-a5f4a3e9.js";const q={name:"VBasicWordCloudConfig",props:{data:{type:Object,required:!0}},setup(s){const e=m(()=>s.data.config),u=m(()=>s.data.config.series[0]),l=m(()=>s.data.apiData.config.seriesCount),f=m(()=>F.filter(r=>r.value!=="value"));return{config:e,seriesCount:l,fontFamilys:c,fontWeights:x,echartsLabelPositions:_,legendLocations:S,orients:y,legendIcons:U,xAxisTypes:f,titleLocations:z,lineStyles:v,hAligns:w,timeFormats:R,valueFormats:B,fillTypes:C,alignType:k,sortTypes:L,funnelLabelPosition:O,legendLocationsPie:T,global:u,cloudShape:W}}},D={class:"setting-panel-gui"},E={class:"pt-5"};function H(s,e,u,l,f,r){const p=i("b-switch"),d=i("g-field"),b=i("g-select"),t=i("g-input-number"),g=i("g-field-collapse"),V=i("g-color-picker");return A(),N("div",D,[a(g,{label:"\u5168\u5C40"},{default:n(()=>[a(d,{label:"\u8D85\u51FA\u7ED8\u5236",tooltip:"\u662F\u5426\u5141\u8BB8\u8BCD\u4E91\u56FE\u5728\u5916\u754C\u6E32\u67D3"},{default:n(()=>[j("div",E,[a(p,{modelValue:l.global.drawOutOfBound,"onUpdate:modelValue":e[0]||(e[0]=o=>l.global.drawOutOfBound=o),size:"small"},null,8,["modelValue"])])]),_:1}),a(d,{label:"\u7ED8\u5236\u5F62\u72B6"},{default:n(()=>[a(b,{modelValue:l.global.shape,"onUpdate:modelValue":e[1]||(e[1]=o=>l.global.shape=o),data:l.cloudShape,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"])]),_:1}),a(g,{label:"\u6587\u5B57",flat:""},{default:n(()=>[a(d,{label:"\u5927\u5C0F\u8303\u56F4"},{default:n(()=>[a(t,{modelValue:l.global.sizeRange[0],"onUpdate:modelValue":e[2]||(e[2]=o=>l.global.sizeRange[0]=o),min:12,max:60,step:1,inline:"",label:"\u6700\u5C0F"},null,8,["modelValue"]),a(t,{modelValue:l.global.sizeRange[1],"onUpdate:modelValue":e[3]||(e[3]=o=>l.global.sizeRange[1]=o),min:12,max:60,step:1,inline:"",label:"\u6700\u5927"},null,8,["modelValue"])]),_:1}),a(d,{label:"\u65CB\u8F6C\u8303\u56F4",flat:""},{default:n(()=>[a(t,{modelValue:l.global.rotationRange[0],"onUpdate:modelValue":e[4]||(e[4]=o=>l.global.rotationRange[0]=o),min:0,max:180,step:1,inline:"",label:"\u6700\u5C0F"},null,8,["modelValue"]),a(t,{modelValue:l.global.rotationRange[1],"onUpdate:modelValue":e[5]||(e[5]=o=>l.global.rotationRange[1]=o),min:0,max:180,step:1,inline:"",label:"\u6700\u5927"},null,8,["modelValue"]),a(t,{modelValue:l.global.rotationStep,"onUpdate:modelValue":e[6]||(e[6]=o=>l.global.rotationStep=o),min:0,max:180,step:1,inline:"",label:"\u65CB\u8F6C\u6B65\u957F"},null,8,["modelValue"]),a(t,{modelValue:l.global.gridSize,"onUpdate:modelValue":e[7]||(e[7]=o=>l.global.gridSize=o),min:0,max:50,step:1,inline:"",label:"\u6587\u672C\u95F4\u8DDD"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(g,{label:"\u63D0\u793A\u6846",toggle:"",modelValue:l.config.tooltip.show,"onUpdate:modelValue":e[11]||(e[11]=o=>l.config.tooltip.show=o)},{default:n(()=>[a(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[a(t,{modelValue:l.config.tooltip.textStyle.fontSize,"onUpdate:modelValue":e[8]||(e[8]=o=>l.config.tooltip.textStyle.fontSize=o),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),a(b,{modelValue:l.config.tooltip.textStyle.fontWeight,"onUpdate:modelValue":e[9]||(e[9]=o=>l.config.tooltip.textStyle.fontWeight=o),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),a(V,{modelValue:l.config.tooltip.textStyle.color,"onUpdate:modelValue":e[10]||(e[10]=o=>l.config.tooltip.textStyle.color=o),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}var K=P(q,[["render",H]]);export{K as default};
