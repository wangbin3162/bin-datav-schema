import{a2 as _}from"./index-bf286ad8.js";import{j as i,K as r,b as c,c as x,v as t,l as n,a1 as l}from"./vendor-0bcca4c5.js";import"./chunk-bin-ui-next-98c8f2d2.js";import"./chunk-brace-b1f520b9.js";import"./chunk-bin-datav-bdc06cb1.js";import"./chunk-three-66e2f152.js";import"./chunk-particles.vue3-83a83be1.js";import"./chunk-mockjs-9e1335a8.js";const C={class:"setting-panel-gui"},R={__name:"config",props:{data:{type:Object,required:!0}},setup(f){const p=f,{dvData:V}=_(p.data),e=i(()=>p.data.config),b=i(()=>{var m;return(m=V.value)!=null?m:e.value.options});return(m,o)=>{const g=r("g-select"),d=r("g-field"),u=r("g-color-picker"),s=r("g-input-number");return c(),x("div",C,[t(d,{label:"\u9ED8\u8BA4\u503C"},{default:n(()=>[t(g,{modelValue:l(e).default,"onUpdate:modelValue":o[0]||(o[0]=a=>l(e).default=a),data:l(b)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u5B57\u4F53\u989C\u8272"},{default:n(()=>[t(u,{modelValue:l(e).color,"onUpdate:modelValue":o[1]||(o[1]=a=>l(e).color=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5B57\u4F53\u5927\u5C0F"},{default:n(()=>[t(s,{modelValue:l(e).fontSize,"onUpdate:modelValue":o[2]||(o[2]=a=>l(e).fontSize=a),min:12,max:50,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u80CC\u666F\u989C\u8272"},{default:n(()=>[t(u,{modelValue:l(e).background,"onUpdate:modelValue":o[3]||(o[3]=a=>l(e).background=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u8FB9\u6846\u989C\u8272"},{default:n(()=>[t(u,{modelValue:l(e).borderColor,"onUpdate:modelValue":o[4]||(o[4]=a=>l(e).borderColor=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u7BAD\u5934\u989C\u8272"},{default:n(()=>[t(u,{modelValue:l(e).arrowColor,"onUpdate:modelValue":o[5]||(o[5]=a=>l(e).arrowColor=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5706\u89D2\u5927\u5C0F"},{default:n(()=>[t(s,{modelValue:l(e).borderRadius,"onUpdate:modelValue":o[6]||(o[6]=a=>l(e).borderRadius=a),min:0,max:50,step:1,suffix:"px"},null,8,["modelValue"])]),_:1})])}}};export{R as default};
