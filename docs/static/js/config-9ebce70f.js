import{h as G}from"./select-options-04fab100.js";import{j as N,K as d,b as p,c as b,v as l,l as n,a1 as t,y as s,h as g,F as z,d as H,k as R,p as A,e as T}from"./vendor-0bcca4c5.js";import"./chunk-brace-b1f520b9.js";const j={class:"setting-panel-gui"},F={class:"p8 t-right"},L={class:"series-title inline"},P={key:0,style:{"min-height":"80px"},flex:"main:center cross:center"},K={__name:"config",props:{data:{type:Object,required:!0}},setup(h){const w=h,e=N(()=>w.data.config),C=()=>{e.value.columnWidth.push(100),e.value.align.push("left")},k=()=>{e.value.columnWidth.pop(),e.value.align.pop()};return(S,o)=>{const y=d("g-input"),r=d("g-input-number"),u=d("g-field"),m=d("b-radio"),c=d("b-radio-group"),_=d("g-field-collapse"),x=d("g-slider"),V=d("g-color-picker"),B=d("b-switch"),U=d("b-icon"),v=d("b-button"),W=d("g-select");return p(),b("div",j,[l(_,{label:"\u884C\u53F7",toggle:"",modelValue:t(e).index,"onUpdate:modelValue":o[3]||(o[3]=a=>t(e).index=a)},{default:n(()=>[l(u,{label:"\u8868\u5934",flat:""},{default:n(()=>[l(y,{modelValue:t(e).indexHeader,"onUpdate:modelValue":o[0]||(o[0]=a=>t(e).indexHeader=a),inline:"",label:"\u884C\u53F7\u6587\u5B57"},null,8,["modelValue"]),l(r,{modelValue:t(e).indexWidth,"onUpdate:modelValue":o[1]||(o[1]=a=>t(e).indexWidth=a),min:1,max:100,step:1,inline:"",label:"\u884C\u53F7\u5217\u5BBD"},null,8,["modelValue"])]),_:1}),l(u,{label:"\u884C\u53F7\u5BF9\u9F50"},{default:n(()=>[l(c,{modelValue:t(e).indexAlign,"onUpdate:modelValue":o[2]||(o[2]=a=>t(e).indexAlign=a),type:"button",size:"mini"},{default:n(()=>[l(m,{label:"left"},{default:n(()=>[s("\u5DE6\u5BF9\u9F50")]),_:1}),l(m,{label:"center"},{default:n(()=>[s("\u5C45\u4E2D")]),_:1}),l(m,{label:"right"},{default:n(()=>[s("\u53F3\u5BF9\u9F50")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),l(_,{label:"\u901A\u7528\u914D\u7F6E",modal:""},{default:n(()=>[l(u,{label:"\u8868\u884C\u6570",flat:""},{default:n(()=>[l(r,{modelValue:t(e).rowNum,"onUpdate:modelValue":o[4]||(o[4]=a=>t(e).rowNum=a),min:1,max:10,step:1},null,8,["modelValue"])]),_:1}),l(u,{label:"\u8868\u5934\u9AD8\u5EA6",flat:""},{default:n(()=>[l(x,{modelValue:t(e).headerHeight,"onUpdate:modelValue":o[5]||(o[5]=a=>t(e).headerHeight=a),min:10,max:50,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),l(u,{label:"\u8868\u5934\u80CC\u666F"},{default:n(()=>[l(V,{modelValue:t(e).headerBGC,"onUpdate:modelValue":o[6]||(o[6]=a=>t(e).headerBGC=a)},null,8,["modelValue"])]),_:1}),l(u,{label:"\u5947\u6570\u884C\u80CC\u666F\u8272"},{default:n(()=>[l(V,{modelValue:t(e).oddRowBGC,"onUpdate:modelValue":o[7]||(o[7]=a=>t(e).oddRowBGC=a)},null,8,["modelValue"])]),_:1}),l(u,{label:"\u5076\u6570\u884C\u80CC\u666F\u8272"},{default:n(()=>[l(V,{modelValue:t(e).evenRowBGC,"onUpdate:modelValue":o[8]||(o[8]=a=>t(e).evenRowBGC=a)},null,8,["modelValue"])]),_:1}),l(u,{label:"\u8F6E\u64AD\u65B9\u5F0F"},{default:n(()=>[l(c,{modelValue:t(e).carousel,"onUpdate:modelValue":o[9]||(o[9]=a=>t(e).carousel=a),type:"button",size:"mini"},{default:n(()=>[l(m,{label:"single"},{default:n(()=>[s("\u5355\u884C")]),_:1}),l(m,{label:"page"},{default:n(()=>[s("\u6574\u9875")]),_:1})]),_:1},8,["modelValue"])]),_:1}),l(u,{label:"\u8F6E\u64AD\u65F6\u95F4\u95F4\u9694"},{default:n(()=>[l(x,{modelValue:t(e).waitTime,"onUpdate:modelValue":o[10]||(o[10]=a=>t(e).waitTime=a),min:1e3,max:3e3,step:100,suffix:"ms"},null,8,["modelValue"])]),_:1}),l(u,{label:"\u60AC\u505C\u6682\u505C\u8F6E\u64AD"},{default:n(()=>[l(B,{modelValue:t(e).hoverPause,"onUpdate:modelValue":o[11]||(o[11]=a=>t(e).hoverPause=a),size:"small"},null,8,["modelValue"])]),_:1})]),_:1}),l(_,{label:"\u5217\u914D\u7F6E",modal:""},{default:n(()=>[g("div",F,[l(v,{type:"text",onClick:C,title:"\u65B0\u589E\u4E00\u4E2A\u5217\u914D\u7F6E"},{default:n(()=>[l(U,{name:"plus",size:"16"})]),_:1}),l(v,{type:"text",disabled:t(e).columnWidth.length===0,onClick:k,title:"\u79FB\u9664\u6700\u540E\u4E00\u4E2A\u5217\u914D\u7F6E"},{default:n(()=>[l(U,{name:"delete",size:"16"})]),_:1},8,["disabled"])]),(p(!0),b(z,null,H(t(e).columnWidth,(a,i)=>(p(),R(u,{key:i,flat:"",label:`\u5217${i+1}`},{label:n(()=>[g("div",L,[g("span",null,"\u5217"+A(i+1),1)])]),default:n(()=>[l(r,{modelValue:t(e).columnWidth[i],"onUpdate:modelValue":f=>t(e).columnWidth[i]=f,min:30,step:1,inline:"",label:"\u5217\u5BBD"},null,8,["modelValue","onUpdate:modelValue"]),l(W,{modelValue:t(e).align[i],"onUpdate:modelValue":f=>t(e).align[i]=f,data:t(G),inline:"",label:"\u5217\u5BF9\u9F50\u65B9\u5F0F"},null,8,["modelValue","onUpdate:modelValue","data"])]),_:2},1032,["label"]))),128)),t(e).columnWidth.length===0?(p(),b("div",P," \u6682\u65E0\u914D\u7F6E\uFF0C\u6240\u6709\u5217\u81EA\u9002\u5E94 ")):T("",!0)]),_:1})])}}};export{K as default};
