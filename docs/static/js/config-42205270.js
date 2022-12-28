import{d as V,i as k,e as f,b as g}from"./select-options-04fab100.js";import{j as W,K as m,b as s,c as p,v as t,l as d,a1 as l,F as y,d as v,k as U,y as T,p as z}from"./vendor-4c8a7a86.js";import"./chunk-echarts-cf4087a0.js";import"./chunk-brace-b1f520b9.js";const O={class:"setting-panel-gui"},N={__name:"config",props:{data:{type:Object,required:!0}},setup(x){const C=x,o=W(()=>C.data.config);return(_,a)=>{const i=m("g-input-number"),u=m("g-field"),n=m("g-color-picker"),b=m("g-select"),S=m("b-radio"),w=m("b-radio-group"),r=m("g-field-collapse");return s(),p("div",O,[t(r,{label:"\u5168\u5C40",modal:""},{default:d(()=>[t(u,{flat:"",label:"\u9634\u5F71\u504F\u79FB"},{default:d(()=>[t(i,{modelValue:l(o).global.shadowOffsetX,"onUpdate:modelValue":a[0]||(a[0]=e=>l(o).global.shadowOffsetX=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u6C34\u5E73\u504F\u79FB"},null,8,["modelValue"]),t(i,{modelValue:l(o).global.shadowOffsetY,"onUpdate:modelValue":a[1]||(a[1]=e=>l(o).global.shadowOffsetY=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u5782\u76F4\u504F\u79FB"},null,8,["modelValue"])]),_:1}),t(u,{label:"\u9634\u5F71\u989C\u8272"},{default:d(()=>[t(n,{modelValue:l(o).global.shadowColor,"onUpdate:modelValue":a[2]||(a[2]=e=>l(o).global.shadowColor=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"\u533A\u57DF"},{default:d(()=>[t(u,{label:"\u533A\u57DF\u6837\u5F0F",flat:""},{default:d(()=>[t(i,{modelValue:l(o).global.borderWidth,"onUpdate:modelValue":a[3]||(a[3]=e=>l(o).global.borderWidth=e),min:0,max:5,step:1,label:"\u7C97\u7EC6",inline:""},null,8,["modelValue"]),t(b,{modelValue:l(o).global.borderType,"onUpdate:modelValue":a[4]||(a[4]=e=>l(o).global.borderType=e),data:l(V),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(n,{modelValue:l(o).global.borderColor,"onUpdate:modelValue":a[5]||(a[5]=e=>l(o).global.borderColor=e),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),t(u,{label:"\u5E03\u5C40\u65B9\u5F0F"},{default:d(()=>[t(w,{modelValue:l(o).global.areaColor.type,"onUpdate:modelValue":a[6]||(a[6]=e=>l(o).global.areaColor.type=e),type:"button",size:"mini"},{default:d(()=>[(s(!0),p(y,null,v(l(k),e=>(s(),U(S,{key:e.value,label:e.value},{default:d(()=>[T(z(e.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(o).global.areaColor.type==="solid"?(s(),U(u,{key:0,label:"\u989C\u8272\u914D\u7F6E"},{default:d(()=>[t(n,{modelValue:l(o).global.areaColor.value,"onUpdate:modelValue":a[7]||(a[7]=e=>l(o).global.areaColor.value=e)},null,8,["modelValue"])]),_:1})):(s(),p(y,{key:1},[t(u,{label:"\u5F00\u59CB\u989C\u8272"},{default:d(()=>[t(n,{modelValue:l(o).global.areaColor.from,"onUpdate:modelValue":a[8]||(a[8]=e=>l(o).global.areaColor.from=e)},null,8,["modelValue"])]),_:1}),t(u,{label:"\u7ED3\u675F\u989C\u8272"},{default:d(()=>[t(n,{modelValue:l(o).global.areaColor.to,"onUpdate:modelValue":a[9]||(a[9]=e=>l(o).global.areaColor.to=e)},null,8,["modelValue"])]),_:1})],64))]),_:1}),t(r,{label:"\u533A\u57DF\u60AC\u6D6E\u6837\u5F0F"},{default:d(()=>[t(u,{label:"\u989C\u8272\u914D\u7F6E"},{default:d(()=>[t(n,{modelValue:l(o).global.itemStyle.areaColor,"onUpdate:modelValue":a[10]||(a[10]=e=>l(o).global.itemStyle.areaColor=e)},null,8,["modelValue"])]),_:1}),t(u,{label:"\u8FB9\u6846\u6837\u5F0F",flat:""},{default:d(()=>[t(i,{modelValue:l(o).global.itemStyle.borderWidth,"onUpdate:modelValue":a[11]||(a[11]=e=>l(o).global.itemStyle.borderWidth=e),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(b,{modelValue:l(o).global.itemStyle.borderType,"onUpdate:modelValue":a[12]||(a[12]=e=>l(o).global.itemStyle.borderType=e),data:l(V),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(n,{modelValue:l(o).global.itemStyle.borderColor,"onUpdate:modelValue":a[13]||(a[13]=e=>l(o).global.itemStyle.borderColor=e),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(r,{label:"\u6807\u6CE8",modal:"",toggle:"",modelValue:l(o).label.show,"onUpdate:modelValue":a[18]||(a[18]=e=>l(o).label.show=e)},{default:d(()=>[t(u,{label:"\u4F4D\u7F6E"},{default:d(()=>[t(b,{modelValue:l(o).label.position,"onUpdate:modelValue":a[14]||(a[14]=e=>l(o).label.position=e),data:l(f)},null,8,["modelValue","data"])]),_:1}),t(u,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:d(()=>[t(i,{modelValue:l(o).label.fontSize,"onUpdate:modelValue":a[15]||(a[15]=e=>l(o).label.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(b,{modelValue:l(o).label.fontWeight,"onUpdate:modelValue":a[16]||(a[16]=e=>l(o).label.fontWeight=e),data:l(g),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(n,{modelValue:l(o).label.color,"onUpdate:modelValue":a[17]||(a[17]=e=>l(o).label.color=e),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(r,{label:"\u63D0\u793A",modal:"",toggle:"",modelValue:l(o).label.emphasis.show,"onUpdate:modelValue":a[23]||(a[23]=e=>l(o).label.emphasis.show=e)},{default:d(()=>[t(u,{label:"\u4F4D\u7F6E"},{default:d(()=>[t(b,{modelValue:l(o).label.emphasis.position,"onUpdate:modelValue":a[19]||(a[19]=e=>l(o).label.emphasis.position=e),data:l(f)},null,8,["modelValue","data"])]),_:1}),t(u,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:d(()=>[t(i,{modelValue:l(o).label.emphasis.fontSize,"onUpdate:modelValue":a[20]||(a[20]=e=>l(o).label.emphasis.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(b,{modelValue:l(o).label.emphasis.fontWeight,"onUpdate:modelValue":a[21]||(a[21]=e=>l(o).label.emphasis.fontWeight=e),data:l(g),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(n,{modelValue:l(o).label.emphasis.color,"onUpdate:modelValue":a[22]||(a[22]=e=>l(o).label.emphasis.color=e),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}}};export{N as default};
