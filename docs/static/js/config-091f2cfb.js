import{x as B,a6 as F,af as O,ag as T,ah as W,ai as M,a8 as N}from"./index-71bcd248.js";import{j,R as d,b as s,c as b,M as a,l as t,N as n,F as V,d as A,k as f,x as I,p as L}from"./vendor-c1103bdb.js";import"./chunk-bin-ui-design-9314e876.js";import"./chunk-brace-0dab6832.js";import"./chunk-bin-datav-6a4e943a.js";import"./chunk-particles.vue3-91e644a5.js";import"./chunk-three-06bdd351.js";import"./chunk-gsap-ecfb8fd4.js";import"./chunk-mockjs-03499d26.js";const R=`\u63D2\u9875 (\u9634\u5F71\u5411\u5185) | x \u504F\u79FB\u91CF | y \u504F\u79FB\u91CF | \u9634\u5F71\u6A21\u7CCA\u534A\u5F84 | \u9634\u5F71\u6269\u6563\u534A\u5F84;
\u53EF\u9009\uFF0Cinset\u5173\u952E\u5B57\uFF0C\u6CA1\u6709\u6307\u5B9Ainset\uFF0C\u9ED8\u8BA4\u9634\u5F71\u5728\u8FB9\u6846\u5916\uFF0C\u5373\u9634\u5F71\u5411\u5916\u6269\u6563;
<offset-x> <offset-y>: \u7528\u6765\u8BBE\u7F6E\u9634\u5F71\u504F\u79FB\u91CF;
<blur-radius>\uFF1A\u6A21\u7CCA\u9762\u79EF\u8D8A\u5927\uFF0C\u9634\u5F71\u5C31\u8D8A\u5927\u8D8A\u6DE1\u3002\u4E0D\u80FD\u4E3A\u8D1F\u503C;
<spread-radius>\uFF1A\u53D6\u6B63\u503C\u65F6\uFF0C\u9634\u5F71\u6269\u5927\uFF1B\u53D6\u8D1F\u503C\u65F6\uFF0C\u9634\u5F71\u6536\u7F29;`,q={class:"setting-panel-gui"},Y={__name:"config",props:{data:{type:Object,required:!0}},setup(v){const y=v,e=j(()=>y.data.config),{schemaStore:S,storeToRefs:k}=B();k(S);const x=()=>{e.value.bgImage=""};return(D,o)=>{const p=d("g-input"),u=d("g-field"),i=d("g-select"),g=d("g-input-number"),m=d("g-color-picker"),_=d("b-switch"),r=d("g-field-collapse"),U=d("b-radio"),w=d("b-radio-group"),C=d("g-image"),z=d("g-switch");return s(),b("div",q,[a(r,{label:" \u5C5E\u6027","default-open":""},{default:t(()=>[a(u,{tooltip:"\u652F\u6301\u4ECE\u6570\u636E\u4E2D\u83B7\u53D6\u6807\u9898\u5185\u5BB9\uFF0C\u8BE6\u89C1\u6570\u636E\u9762\u677F",label:"\u6807\u9898\u540D"},{default:t(()=>[a(p,{modelValue:e.value.title,"onUpdate:modelValue":o[0]||(o[0]=l=>e.value.title=l)},null,8,["modelValue"])]),_:1}),a(u,{tooltip:"\u8BF7\u9009\u62E9\u60A8\u7CFB\u7EDF\u6709\u7684\u5B57\u4F53,\u5982\u679C\u60A8\u7CFB\u7EDF\u65E0\u6B64\u5B57\u4F53,\u6807\u9898\u5C06\u4F1A\u663E\u793A\u9ED8\u8BA4\u5B57\u4F53",label:"\u5B57\u4F53"},{default:t(()=>[a(i,{modelValue:e.value.textStyle.fontFamily,"onUpdate:modelValue":o[1]||(o[1]=l=>e.value.textStyle.fontFamily=l),data:n(F)},null,8,["modelValue","data"])]),_:1}),a(u,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:t(()=>[a(g,{modelValue:e.value.textStyle.fontSize,"onUpdate:modelValue":o[2]||(o[2]=l=>e.value.textStyle.fontSize=l),min:10,max:100,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),a(i,{modelValue:e.value.textStyle.fontWeight,"onUpdate:modelValue":o[3]||(o[3]=l=>e.value.textStyle.fontWeight=l),data:n(O),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),a(m,{modelValue:e.value.textStyle.color,"onUpdate:modelValue":o[4]||(o[4]=l=>e.value.textStyle.color=l),label:"\u989C\u8272"},null,8,["modelValue"]),a(i,{modelValue:e.value.textAlign,"onUpdate:modelValue":o[5]||(o[5]=l=>e.value.textAlign=l),data:n(T),label:"\u5BF9\u9F50\u65B9\u5F0F",inline:""},null,8,["modelValue","data"]),a(i,{modelValue:e.value.writingMode,"onUpdate:modelValue":o[6]||(o[6]=l=>e.value.writingMode=l),data:n(W),label:"\u6587\u5B57\u6392\u5217\u65B9\u5F0F",inline:""},null,8,["modelValue","data"])]),_:1}),a(u,{tooltip:"\u6EA2\u51FA\u6587\u672C\u52A0\u7701\u7565\u53F7",label:"\u7701\u7565\u53F7"},{default:t(()=>[a(_,{modelValue:e.value.ellipsis,"onUpdate:modelValue":o[7]||(o[7]=l=>e.value.ellipsis=l),size:"small"},null,8,["modelValue"])]),_:1})]),_:1}),a(r,{label:"\u80CC\u666F\u6837\u5F0F",modelValue:e.value.backgroundStyle.show,"onUpdate:modelValue":o[15]||(o[15]=l=>e.value.backgroundStyle.show=l),toggle:""},{default:t(()=>[a(u,{label:"\u80CC\u666F\u7C7B\u578B"},{default:t(()=>[a(w,{modelValue:e.value.backgroundStyle.backgroundType,"onUpdate:modelValue":o[8]||(o[8]=l=>e.value.backgroundStyle.backgroundType=l),type:"button",size:"small"},{default:t(()=>[(s(!0),b(V,null,A(n(M),l=>(s(),f(U,{key:l.value,label:l.value},{default:t(()=>[I(L(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e.value.backgroundStyle.backgroundType==="normal"?(s(),b(V,{key:0},[a(u,{label:"\u80CC\u666F\u8272"},{default:t(()=>[a(m,{modelValue:e.value.backgroundStyle.bgColor,"onUpdate:modelValue":o[9]||(o[9]=l=>e.value.backgroundStyle.bgColor=l)},null,8,["modelValue"])]),_:1}),a(u,{label:"\u8FB9\u6846\u6837\u5F0F",flat:""},{default:t(()=>[a(g,{modelValue:e.value.backgroundStyle.borderWidth,"onUpdate:modelValue":o[10]||(o[10]=l=>e.value.backgroundStyle.borderWidth=l),min:0,max:88888,step:1,label:"\u8FB9\u6846\u7C97\u7EC6",suffix:"px",inline:""},null,8,["modelValue"]),a(i,{modelValue:e.value.backgroundStyle.borderStyle,"onUpdate:modelValue":o[11]||(o[11]=l=>e.value.backgroundStyle.borderStyle=l),data:n(N),label:"\u8FB9\u6846\u7EBF",inline:""},null,8,["modelValue","data"]),a(m,{modelValue:e.value.backgroundStyle.borderColor,"onUpdate:modelValue":o[12]||(o[12]=l=>e.value.backgroundStyle.borderColor=l),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})],64)):(s(),f(u,{key:1,label:"\u56FE\u7247"},{default:t(()=>[a(C,{modelValue:e.value.src,"onUpdate:modelValue":o[13]||(o[13]=l=>e.value.src=l),"show-resize":!1,"show-clear":"",onClear:x},null,8,["modelValue"])]),_:1})),a(u,{label:"\u5706\u89D2"},{default:t(()=>[a(g,{modelValue:e.value.radius,"onUpdate:modelValue":o[14]||(o[14]=l=>e.value.radius=l),min:0,max:1e3,step:1,suffix:"px"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),a(r,{modelValue:e.value.shadow.show,"onUpdate:modelValue":o[18]||(o[18]=l=>e.value.shadow.show=l),toggle:"",label:"\u9634\u5F71"},{default:t(()=>[a(u,{label:"\u9634\u5F71\u5C5E\u6027",tooltip:n(R)},{default:t(()=>[a(p,{modelValue:e.value.shadow.size,"onUpdate:modelValue":o[16]||(o[16]=l=>e.value.shadow.size=l)},null,8,["modelValue"])]),_:1},8,["tooltip"]),a(u,{label:"\u9634\u5F71\u989C\u8272"},{default:t(()=>[a(m,{modelValue:e.value.shadow.color,"onUpdate:modelValue":o[17]||(o[17]=l=>e.value.shadow.color=l)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),a(r,{label:"\u8D85\u94FE\u63A5\u914D\u7F6E"},{default:t(()=>[a(u,{label:"\u8D85\u94FE\u63A5",tooltip:"\u70B9\u51FB\u6807\u9898\u533A\u57DF\u53EF\u8DF3\u8F6C\u81F3\u8BBE\u5B9A\u7684\u8D85\u94FE\u63A5"},{default:t(()=>[a(p,{modelValue:e.value.urlConfig.url,"onUpdate:modelValue":o[19]||(o[19]=l=>e.value.urlConfig.url=l)},null,8,["modelValue"])]),_:1}),a(u,{label:"\u65B0\u7A97\u53E3\u6253\u5F00"},{default:t(()=>[a(z,{modelValue:e.value.urlConfig.isBlank,"onUpdate:modelValue":o[20]||(o[20]=l=>e.value.urlConfig.isBlank=l),size:"small"},null,8,["modelValue"])]),_:1})]),_:1})])}}};export{Y as default};
