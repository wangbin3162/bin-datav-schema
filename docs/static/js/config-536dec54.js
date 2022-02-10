import{f as U,b as S,p as c,j as w,l as k,o as L,c as W}from"./select-options-e4b870fa.js";import{as as v,g as z,J as d,o as b,A as s,u as n,w as a,B as T,F as B,K as F,c as _,q as A,t as C}from"./vendor-95729a87.js";import"./chunk-brace-269ffce0.js";const N={name:"VBasicPieConfig",props:{data:{type:Object,required:!0}},setup(V){return{config:z(()=>V.data.config),fontFamilys:U,fontWeights:S,pieLabelPosition:c,pieLabelAlign:w,legendLocations:k,orients:L,legendIcons:W}}},P={class:"setting-panel-gui"},j={class:"pt-5"};function q(V,o,I,l,M,R){const g=d("g-select"),i=d("g-field"),t=d("g-input-number"),f=d("g-input"),p=d("b-switch"),m=d("g-field-collapse"),u=d("g-color-picker"),r=d("g-slider"),x=d("b-radio"),y=d("b-radio-group");return b(),s("div",P,[n(m,{label:"\u5168\u5C40"},{default:a(()=>[n(i,{label:"\u5B57\u4F53",tooltip:"\u8BF7\u9009\u62E9\u60A8\u7CFB\u7EDF\u6709\u7684\u5B57\u4F53\uFF0C\u5982\u679C\u60A8\u7CFB\u7EDF\u65E0\u6B64\u5B57\u4F53\uFF0C\u6807\u9898\u5C06\u4F1A\u663E\u793A\u9ED8\u8BA4\u5B57\u4F53"},{default:a(()=>[n(g,{modelValue:l.config.global.fontFamily,"onUpdate:modelValue":o[0]||(o[0]=e=>l.config.global.fontFamily=e),data:l.fontFamilys},null,8,["modelValue","data"])]),_:1}),n(i,{label:"\u5706\u89D2"},{default:a(()=>[n(t,{modelValue:l.config.global.borderRadius,"onUpdate:modelValue":o[1]||(o[1]=e=>l.config.global.borderRadius=e),min:0,max:300,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),n(i,{label:"\u4E2D\u5FC3\u4F4D\u7F6E",flat:"",tooltip:"\u997C\u56FE\u7684\u4E2D\u5FC3\uFF08\u5706\u5FC3\uFF09\u5750\u6807\uFF0C\u6570\u7EC4\u7684\u7B2C\u4E00\u9879\u662F\u6A2A\u5750\u6807\uFF0C\u7B2C\u4E8C\u9879\u662F\u7EB5\u5750\u6807/\u652F\u6301\u8BBE\u7F6E\u6210\u767E\u5206\u6BD4"},{default:a(()=>[n(f,{modelValue:l.config.global.center[0],"onUpdate:modelValue":o[2]||(o[2]=e=>l.config.global.center[0]=e),inline:"inline",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),n(f,{modelValue:l.config.global.center[1],"onUpdate:modelValue":o[3]||(o[3]=e=>l.config.global.center[1]=e),inline:"inline",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),n(i,{label:"\u997C\u56FE\u534A\u5F84",flat:"",tooltip:"\u997C\u56FE\u7684\u534A\u5F84\uFF0C\u503C\u4E3A<number|string>\uFF0C\u53EF\u8BBE\u7F6E\u53EF\u89C6\u533A\u57DF\u767E\u5206\u6BD4"},{default:a(()=>[n(f,{modelValue:l.config.global.radius[1],"onUpdate:modelValue":o[4]||(o[4]=e=>l.config.global.radius[1]=e),inline:"inline",label:"\u534A\u5F84"},null,8,["modelValue"])]),_:1}),n(i,{label:"\u5357\u4E01\u683C\u5C14\u56FE"},{default:a(()=>[T("div",j,[n(p,{modelValue:l.config.global.roseType,"onUpdate:modelValue":o[5]||(o[5]=e=>l.config.global.roseType=e),size:"small"},null,8,["modelValue"])])]),_:1})]),_:1}),n(m,{label:"\u6807\u6CE8",toggle:"",modelValue:l.config.label.show,"onUpdate:modelValue":o[14]||(o[14]=e=>l.config.label.show=e)},{default:a(()=>[n(i,{label:"\u4F4D\u7F6E"},{default:a(()=>[n(g,{modelValue:l.config.label.position,"onUpdate:modelValue":o[6]||(o[6]=e=>l.config.label.position=e),data:l.pieLabelPosition},null,8,["modelValue","data"])]),_:1}),n(i,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:a(()=>[n(t,{modelValue:l.config.label.textStyle.fontSize,"onUpdate:modelValue":o[7]||(o[7]=e=>l.config.label.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),n(g,{modelValue:l.config.label.textStyle.fontWeight,"onUpdate:modelValue":o[8]||(o[8]=e=>l.config.label.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),n(u,{modelValue:l.config.label.textStyle.color,"onUpdate:modelValue":o[9]||(o[9]=e=>l.config.label.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),n(i,{label:"\u5185\u5BB9\u683C\u5F0F\u5668",tooltip:`\u5185\u5BB9\u683C\u5F0F\u5668\uFF0C\u652F\u6301\u7528 \\n \u6362\u884C
\u5B57\u7B26\u4E32\u6A21\u677F\u53D8\u91CF
{a}\uFF1A\u7CFB\u5217\u540D
{b}\uFF1A\u6570\u636E\u540D
{c}\uFF1A\u6570\u636E\u503C
{d}\uFF1A\u767E\u5206\u6BD4`},{default:a(()=>[n(f,{modelValue:l.config.label.formatter,"onUpdate:modelValue":o[10]||(o[10]=e=>l.config.label.formatter=e)},null,8,["modelValue"])]),_:1}),n(i,{label:"\u6807\u7B7E\u5BF9\u9F50"},{default:a(()=>[n(g,{modelValue:l.config.label.alignTo,"onUpdate:modelValue":o[11]||(o[11]=e=>l.config.label.alignTo=e),data:l.pieLabelAlign},null,8,["modelValue","data"])]),_:1}),n(i,{label:"\u51FA\u8840\u7EBF\u5927\u5C0F"},{default:a(()=>[n(r,{modelValue:l.config.label.bleedMargin,"onUpdate:modelValue":o[12]||(o[12]=e=>l.config.label.bleedMargin=e),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),n(i,{label:"\u5B57\u7EBF\u8DDD\u79BB",tooltip:"\u6587\u5B57\u4E0E label line \u4E4B\u95F4\u7684\u8DDD\u79BB"},{default:a(()=>[n(r,{modelValue:l.config.label.distanceToLabelLine,"onUpdate:modelValue":o[13]||(o[13]=e=>l.config.label.distanceToLabelLine=e),min:0,max:100,step:1},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),n(m,{label:"\u56FE\u4F8B",toggle:"",modelValue:l.config.legend.show,"onUpdate:modelValue":o[25]||(o[25]=e=>l.config.legend.show=e)},{default:a(()=>[n(i,{label:"\u4F4D\u7F6E"},{default:a(()=>[n(g,{modelValue:l.config.legend.position,"onUpdate:modelValue":o[15]||(o[15]=e=>l.config.legend.position=e),data:l.legendLocations},null,8,["modelValue","data"])]),_:1}),n(i,{label:"\u5E03\u5C40\u65B9\u5F0F"},{default:a(()=>[n(y,{modelValue:l.config.legend.orient,"onUpdate:modelValue":o[16]||(o[16]=e=>l.config.legend.orient=e),type:"button",size:"mini"},{default:a(()=>[(b(!0),s(B,null,F(l.orients,e=>(b(),_(x,{key:e.value,label:e.value},{default:a(()=>[A(C(e.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),n(i,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:a(()=>[n(t,{modelValue:l.config.legend.textStyle.fontSize,"onUpdate:modelValue":o[17]||(o[17]=e=>l.config.legend.textStyle.fontSize=e),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),n(g,{modelValue:l.config.legend.textStyle.fontWeight,"onUpdate:modelValue":o[18]||(o[18]=e=>l.config.legend.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),n(u,{modelValue:l.config.legend.textStyle.color,"onUpdate:modelValue":o[19]||(o[19]=e=>l.config.legend.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),n(m,{label:"\u56FE\u5F62",modelValue:l.config.legend.symbol.show,"onUpdate:modelValue":o[24]||(o[24]=e=>l.config.legend.symbol.show=e),toggle:""},{default:a(()=>[n(i,{label:"\u56FE\u4F8B",flat:""},{default:a(()=>[n(t,{modelValue:l.config.legend.symbol.width,"onUpdate:modelValue":o[20]||(o[20]=e=>l.config.legend.symbol.width=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"]),n(t,{modelValue:l.config.legend.symbol.height,"onUpdate:modelValue":o[21]||(o[21]=e=>l.config.legend.symbol.height=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u9AD8\u5EA6"},null,8,["modelValue"]),n(t,{modelValue:l.config.legend.symbol.gap,"onUpdate:modelValue":o[22]||(o[22]=e=>l.config.legend.symbol.gap=e),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u95F4\u9694"},null,8,["modelValue"]),n(g,{modelValue:l.config.legend.symbol.icon,"onUpdate:modelValue":o[23]||(o[23]=e=>l.config.legend.symbol.icon=e),data:l.legendIcons,inline:"",label:"\u5F62\u72B6"},null,8,["modelValue","data"])]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),n(m,{label:"\u63D0\u793A\u6846",toggle:"",modelValue:l.config.tooltip.show,"onUpdate:modelValue":o[32]||(o[32]=e=>l.config.tooltip.show=e)},{default:a(()=>[n(i,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:a(()=>[n(t,{modelValue:l.config.tooltip.textStyle.fontSize,"onUpdate:modelValue":o[26]||(o[26]=e=>l.config.tooltip.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),n(g,{modelValue:l.config.tooltip.textStyle.fontWeight,"onUpdate:modelValue":o[27]||(o[27]=e=>l.config.tooltip.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),n(u,{modelValue:l.config.tooltip.textStyle.color,"onUpdate:modelValue":o[28]||(o[28]=e=>l.config.tooltip.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),n(i,{label:"\u80CC\u666F\u6837\u5F0F",flat:""},{default:a(()=>[n(t,{modelValue:l.config.tooltip.background.padding.h,"onUpdate:modelValue":o[29]||(o[29]=e=>l.config.tooltip.background.padding.h=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u6C34\u5E73\u8FB9\u8DDD"},null,8,["modelValue"]),n(t,{modelValue:l.config.tooltip.background.padding.v,"onUpdate:modelValue":o[30]||(o[30]=e=>l.config.tooltip.background.padding.v=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u5782\u76F4\u8FB9\u8DDD"},null,8,["modelValue"]),n(u,{modelValue:l.config.tooltip.background.color,"onUpdate:modelValue":o[31]||(o[31]=e=>l.config.tooltip.background.color=e),label:"\u80CC\u666F\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}var K=v(N,[["render",q]]);export{K as default};
