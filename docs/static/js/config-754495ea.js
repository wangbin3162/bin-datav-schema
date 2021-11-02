import{f as v,b as k,j as z,m as j}from"./select-options-cef96b18.js";import{a4 as F,a1 as C,J as i,o as d,A as m,u as t,w as n,F as _,K as p,c as y,q as x,t as S}from"./vendor-cf8cb8a4.js";import"./chunk-brace-7fd40d4c.js";const w={name:"VTimerConfig",props:{data:{type:Object,required:!0}},setup(f){return{config:C(f.data,"config"),fontFamilys:v,fontWeights:k,justifyContents:z,aligns:j}}},W={class:"setting-panel-gui"};function B(f,o,R,e,q,N){const u=i("g-slider"),a=i("g-field"),r=i("g-color-picker"),g=i("g-field-collapse"),s=i("g-select"),c=i("g-input-number"),U=i("g-input"),V=i("b-radio"),b=i("b-radio-group");return d(),m("div",W,[t(g,{modelValue:e.config.iconStyle.show,"onUpdate:modelValue":o[3]||(o[3]=l=>e.config.iconStyle.show=l),toggle:"",label:"\u56FE\u6807\u6837\u5F0F"},{default:n(()=>[t(a,{label:"\u5927\u5C0F"},{default:n(()=>[t(u,{modelValue:e.config.iconStyle.size,"onUpdate:modelValue":o[0]||(o[0]=l=>e.config.iconStyle.size=l),min:0,max:100,step:.1},null,8,["modelValue","step"])]),_:1}),t(a,{label:"\u8FB9\u8DDD"},{default:n(()=>[t(u,{modelValue:e.config.iconStyle.marginRight,"onUpdate:modelValue":o[1]||(o[1]=l=>e.config.iconStyle.marginRight=l),min:-100,max:100,step:1},null,8,["modelValue"])]),_:1}),t(a,{label:"\u989C\u8272"},{default:n(()=>[t(r,{modelValue:e.config.iconStyle.color,"onUpdate:modelValue":o[2]||(o[2]=l=>e.config.iconStyle.color=l)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(g,{label:"\u65F6\u95F4\u5668"},{default:n(()=>[t(a,{tooltip:"\u8BF7\u9009\u62E9\u60A8\u7CFB\u7EDF\u6709\u7684\u5B57\u4F53\uFF0C\u5982\u679C\u60A8\u7CFB\u7EDF\u65E0\u6B64\u5B57\u4F53\uFF0C\u6807\u9898\u5C06\u4F1A\u663E\u793A\u9ED8\u8BA4\u5B57\u4F53",label:"\u5B57\u4F53"},{default:n(()=>[t(s,{modelValue:e.config.time.textStyle.fontFamily,"onUpdate:modelValue":o[4]||(o[4]=l=>e.config.time.textStyle.fontFamily=l),data:e.fontFamilys},null,8,["modelValue","data"])]),_:1}),t(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[t(c,{modelValue:e.config.time.textStyle.fontSize,"onUpdate:modelValue":o[5]||(o[5]=l=>e.config.time.textStyle.fontSize=l),min:12,max:100,step:1,suffix:"px",label:"\u5B57\u53F7",inline:""},null,8,["modelValue"]),t(s,{modelValue:e.config.time.textStyle.fontWeight,"onUpdate:modelValue":o[6]||(o[6]=l=>e.config.time.textStyle.fontWeight=l),data:e.fontWeights,label:"\u5B57\u4F53\u7C97\u7EC6",inline:""},null,8,["modelValue","data"]),t(r,{modelValue:e.config.time.textStyle.color,"onUpdate:modelValue":o[7]||(o[7]=l=>e.config.time.textStyle.color=l),label:"\u5B57\u4F53\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),t(a,{tooltip:"\u5982\uFF1Ahh:mm:ss\u4E3A12\u5C0F\u65F6\u5236\u7684\u683C\u5F0F",label:"\u683C\u5F0F\u5316"},{default:n(()=>[t(U,{modelValue:e.config.time.format,"onUpdate:modelValue":o[8]||(o[8]=l=>e.config.time.format=l)},null,8,["modelValue"])]),_:1}),t(a,{label:"\u95F4\u9694\u65F6\u95F4"},{default:n(()=>[t(c,{modelValue:e.config.time.duration,"onUpdate:modelValue":o[9]||(o[9]=l=>e.config.time.duration=l),min:0,step:100,suffix:"ms"},null,8,["modelValue"])]),_:1}),t(a,{label:"\u6C34\u5E73\u5BF9\u9F50"},{default:n(()=>[t(b,{modelValue:e.config.time.horizontal,"onUpdate:modelValue":o[10]||(o[10]=l=>e.config.time.horizontal=l),type:"button",size:"mini"},{default:n(()=>[(d(!0),m(_,null,p(e.justifyContents,l=>(d(),y(V,{key:l.value,label:l.value},{default:n(()=>[x(S(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(a,{label:"\u5782\u76F4\u5BF9\u9F50"},{default:n(()=>[t(b,{modelValue:e.config.time.vertical,"onUpdate:modelValue":o[11]||(o[11]=l=>e.config.time.vertical=l),type:"button",size:"mini"},{default:n(()=>[(d(!0),m(_,null,p(e.aligns,l=>(d(),y(V,{key:l.value,label:l.value},{default:n(()=>[x(S(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})])}var E=F(w,[["render",B]]);export{E as default};
