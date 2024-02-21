import{aq as w,af as f,a8 as L,ar as y}from"./index-71bcd248.js";import{j as W,R as s,b as g,c as S,M as o,l as u,N as V,F as N,d as O,k as A}from"./vendor-c1103bdb.js";import"./chunk-bin-ui-design-9314e876.js";import"./chunk-brace-0dab6832.js";import"./chunk-bin-datav-6a4e943a.js";import"./chunk-particles.vue3-91e644a5.js";import"./chunk-three-06bdd351.js";import"./chunk-gsap-ecfb8fd4.js";import"./chunk-mockjs-03499d26.js";const B={class:"setting-panel-gui"},G={__name:"config",props:{data:{type:Object,required:!0}},setup(k){const C=k,l=W(()=>C.data.config);function T(){l.value.axisLine.lineStyle.color.push([1,""])}function z(){l.value.axisLine.lineStyle.color.pop()}return(F,e)=>{const d=s("g-input"),t=s("g-field"),n=s("g-input-number"),p=s("g-switch"),i=s("g-field-collapse"),m=s("g-select"),r=s("g-color-picker"),U=s("b-icon"),x=s("b-button");return g(),S("div",B,[o(i,{label:"\u5168\u5C40"},{default:u(()=>[o(t,{label:"\u5706\u5FC3\u5750\u6807",flat:"",tooltip:"\u4EEA\u8868\u76D8\u5706\u5FC3\uFF08\u4E2D\u5FC3\uFF09\u5750\u6807,\u652F\u6301\u8BBE\u7F6E\u6210\u767E\u5206\u6BD4"},{default:u(()=>[o(d,{modelValue:l.value.global.center[0],"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.global.center[0]=a),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),o(d,{modelValue:l.value.global.center[1],"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.global.center[1]=a),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u534A\u5F84",flat:""},{default:u(()=>[o(d,{modelValue:l.value.global.radius,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.global.radius=a)},null,8,["modelValue"])]),_:1}),o(t,{label:"\u89D2\u5EA6\u8303\u56F4",flat:""},{default:u(()=>[o(n,{modelValue:l.value.global.startAngle,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.global.startAngle=a),min:360,max:360,inline:"",label:"\u8D77\u59CB\u89D2\u5EA6"},null,8,["modelValue"]),o(n,{modelValue:l.value.global.endAngle,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.global.endAngle=a),min:360,max:360,inline:"",label:"\u7ED3\u675F\u89D2\u5EA6"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u987A\u65F6\u9488",tooltip:"\u4EEA\u8868\u76D8\u523B\u5EA6\u662F\u5426\u987A\u65F6\u9488\u589E\u957F"},{default:u(()=>[o(p,{modelValue:l.value.global.clockwise,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.global.clockwise=a)},null,8,["modelValue"])]),_:1}),o(t,{label:"\u523B\u5EA6\u5206\u5272\u6570"},{default:u(()=>[o(n,{modelValue:l.value.global.splitNumber,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.global.splitNumber=a),min:1},null,8,["modelValue"])]),_:1})]),_:1}),o(i,{label:"\u6807\u9898",modal:"",toggle:"",modelValue:l.value.title.show,"onUpdate:modelValue":e[14]||(e[14]=a=>l.value.title.show=a)},{default:u(()=>[o(t,{label:"\u4F4D\u7F6E",flat:""},{default:u(()=>[o(d,{modelValue:l.value.title.offsetCenter[0],"onUpdate:modelValue":e[7]||(e[7]=a=>l.value.title.offsetCenter[0]=a),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),o(d,{modelValue:l.value.title.offsetCenter[1],"onUpdate:modelValue":e[8]||(e[8]=a=>l.value.title.offsetCenter[1]=a),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u6587\u672C",flat:""},{default:u(()=>[o(n,{modelValue:l.value.title.width,"onUpdate:modelValue":e[9]||(e[9]=a=>l.value.title.width=a),inline:"",label:"\u5BBD\u5EA6",min:0,max:1e3},null,8,["modelValue"]),o(m,{modelValue:l.value.title.overflow,"onUpdate:modelValue":e[10]||(e[10]=a=>l.value.title.overflow=a),data:V(w),label:"\u8D85\u51FA\u6362\u884C/\u622A\u65AD",inline:""},null,8,["modelValue","data"]),o(n,{modelValue:l.value.title.fontSize,"onUpdate:modelValue":e[11]||(e[11]=a=>l.value.title.fontSize=a),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),o(m,{modelValue:l.value.title.fontWeight,"onUpdate:modelValue":e[12]||(e[12]=a=>l.value.title.fontWeight=a),data:V(f),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),o(r,{modelValue:l.value.title.color,"onUpdate:modelValue":e[13]||(e[13]=a=>l.value.title.color=a),label:"\u6587\u5B57\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u6570\u636E\u8BE6\u60C5",modal:"",toggle:"",modelValue:l.value.detail.show,"onUpdate:modelValue":e[23]||(e[23]=a=>l.value.detail.show=a)},{default:u(()=>[o(t,{label:"\u5355\u4F4D"},{default:u(()=>[o(d,{modelValue:l.value.detail.unit,"onUpdate:modelValue":e[15]||(e[15]=a=>l.value.detail.unit=a)},null,8,["modelValue"])]),_:1}),o(t,{label:"\u4F4D\u7F6E",flat:""},{default:u(()=>[o(d,{modelValue:l.value.detail.offsetCenter[0],"onUpdate:modelValue":e[16]||(e[16]=a=>l.value.detail.offsetCenter[0]=a),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),o(d,{modelValue:l.value.detail.offsetCenter[1],"onUpdate:modelValue":e[17]||(e[17]=a=>l.value.detail.offsetCenter[1]=a),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u6587\u672C",flat:""},{default:u(()=>[o(n,{modelValue:l.value.detail.width,"onUpdate:modelValue":e[18]||(e[18]=a=>l.value.detail.width=a),inline:"",label:"\u5BBD\u5EA6",min:0,max:1e3},null,8,["modelValue"]),o(m,{modelValue:l.value.detail.overflow,"onUpdate:modelValue":e[19]||(e[19]=a=>l.value.detail.overflow=a),data:V(w),label:"\u8D85\u51FA\u6362\u884C/\u622A\u65AD",inline:""},null,8,["modelValue","data"]),o(n,{modelValue:l.value.detail.fontSize,"onUpdate:modelValue":e[20]||(e[20]=a=>l.value.detail.fontSize=a),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),o(m,{modelValue:l.value.detail.fontWeight,"onUpdate:modelValue":e[21]||(e[21]=a=>l.value.detail.fontWeight=a),data:V(f),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),o(r,{modelValue:l.value.detail.color,"onUpdate:modelValue":e[22]||(e[22]=a=>l.value.detail.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u8F74\u7EBF",modal:"",toggle:"",modelValue:l.value.axisLine.show,"onUpdate:modelValue":e[26]||(e[26]=a=>l.value.axisLine.show=a)},{default:u(()=>[o(t,{label:"\u5C5E\u6027",flat:""},{default:u(()=>[o(p,{modelValue:l.value.axisLine.roundCap,"onUpdate:modelValue":e[24]||(e[24]=a=>l.value.axisLine.roundCap=a),inline:"",label:"\u4E24\u7AEF\u539F\u578B"},null,8,["modelValue"]),o(n,{modelValue:l.value.axisLine.lineStyle.width,"onUpdate:modelValue":e[25]||(e[25]=a=>l.value.axisLine.lineStyle.width=a),min:0,max:100,step:1,inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"])]),_:1}),o(i,{label:"\u8F74\u7EBF\u6837\u5F0F","default-open":""},{add:u(()=>[o(x,{type:"text",onClick:T,title:"\u65B0\u589E\u4E00\u4E2A\u8F74\u7EBF\u533A\u57DF"},{default:u(()=>[o(U,{name:"plus",size:"16"})]),_:1}),o(x,{type:"text",disabled:l.value.axisLine.lineStyle.color.length===1,onClick:z,title:"\u79FB\u9664\u6700\u540E\u4E00\u4E2A\u8F74\u7EBF\u533A\u57DF"},{default:u(()=>[o(U,{name:"delete",size:"16"})]),_:1},8,["disabled"])]),default:u(()=>[(g(!0),S(N,null,O(l.value.axisLine.lineStyle.color,(a,v)=>(g(),A(t,{key:v,flat:"",label:`\u8F74\u7EBF${v+1}`},{default:u(()=>[o(n,{modelValue:l.value.axisLine.lineStyle.color[v][0],"onUpdate:modelValue":b=>l.value.axisLine.lineStyle.color[v][0]=b,inline:"",label:"\u5BBD\u5EA6",min:0,max:1,step:.1,precision:1},null,8,["modelValue","onUpdate:modelValue"]),o(r,{modelValue:l.value.axisLine.lineStyle.color[v][1],"onUpdate:modelValue":b=>l.value.axisLine.lineStyle.color[v][1]=b,label:"\u989C\u8272",inline:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u8FDB\u5EA6\u6761",modal:"",toggle:"",modelValue:l.value.progress.show,"onUpdate:modelValue":e[31]||(e[31]=a=>l.value.progress.show=a)},{default:u(()=>[o(t,{label:"\u662F\u5426\u91CD\u53E0",tooltip:"\u591A\u7EC4\u6570\u636E\u65F6\u8FDB\u5EA6\u6761\u662F\u5426\u91CD\u53E0"},{default:u(()=>[o(p,{modelValue:l.value.progress.overlap,"onUpdate:modelValue":e[27]||(e[27]=a=>l.value.progress.overlap=a)},null,8,["modelValue"])]),_:1}),o(t,{label:"\u5BBD\u5EA6"},{default:u(()=>[o(n,{modelValue:l.value.progress.width,"onUpdate:modelValue":e[28]||(e[28]=a=>l.value.progress.width=a),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),o(t,{label:"\u4E24\u7AEF\u5706\u89D2"},{default:u(()=>[o(p,{modelValue:l.value.progress.roundCap,"onUpdate:modelValue":e[29]||(e[29]=a=>l.value.progress.roundCap=a)},null,8,["modelValue"])]),_:1}),o(t,{label:"\u88C1\u526A",tooltip:"\u662F\u5426\u88C1\u6389\u8D85\u51FA\u90E8\u5206"},{default:u(()=>[o(p,{modelValue:l.value.progress.clip,"onUpdate:modelValue":e[30]||(e[30]=a=>l.value.progress.clip=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u5206\u9694\u7EBF",modal:"",toggle:"",modelValue:l.value.splitLine.show,"onUpdate:modelValue":e[37]||(e[37]=a=>l.value.splitLine.show=a)},{default:u(()=>[o(t,{flat:"",label:"\u5C5E\u6027"},{default:u(()=>[o(d,{modelValue:l.value.splitLine.length,"onUpdate:modelValue":e[32]||(e[32]=a=>l.value.splitLine.length=a),inline:"",label:"\u7EBF\u957F"},null,8,["modelValue"]),o(n,{modelValue:l.value.splitLine.lineStyle.width,"onUpdate:modelValue":e[33]||(e[33]=a=>l.value.splitLine.lineStyle.width=a),inline:"",min:1,max:10,step:1,label:"\u7EBF\u5BBD"},null,8,["modelValue"]),o(m,{modelValue:l.value.splitLine.lineStyle.type,"onUpdate:modelValue":e[34]||(e[34]=a=>l.value.splitLine.lineStyle.type=a),inline:"",data:V(L),label:"\u7EBF\u578B"},null,8,["modelValue","data"]),o(n,{modelValue:l.value.splitLine.distance,"onUpdate:modelValue":e[35]||(e[35]=a=>l.value.splitLine.distance=a),inline:"",min:-100,max:100,step:1,label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"]),o(r,{modelValue:l.value.splitLine.lineStyle.color,"onUpdate:modelValue":e[36]||(e[36]=a=>l.value.splitLine.lineStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u523B\u5EA6",modal:"",toggle:"",modelValue:l.value.axisTick.show,"onUpdate:modelValue":e[49]||(e[49]=a=>l.value.axisTick.show=a)},{default:u(()=>[o(t,{label:"\u523B\u5EA6\u6570",tooltip:"\u5206\u9694\u7EBF\u4E4B\u95F4\u5206\u9694\u7684\u523B\u5EA6\u6570"},{default:u(()=>[o(n,{modelValue:l.value.axisTick.splitNumber,"onUpdate:modelValue":e[38]||(e[38]=a=>l.value.axisTick.splitNumber=a),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),o(t,{label:"\u5C5E\u6027",flat:""},{default:u(()=>[o(d,{modelValue:l.value.axisTick.length,"onUpdate:modelValue":e[39]||(e[39]=a=>l.value.axisTick.length=a),inline:"",label:"\u7EBF\u957F"},null,8,["modelValue"]),o(n,{modelValue:l.value.axisTick.lineStyle.width,"onUpdate:modelValue":e[40]||(e[40]=a=>l.value.axisTick.lineStyle.width=a),inline:"",min:1,max:10,step:1,label:"\u7EBF\u5BBD"},null,8,["modelValue"]),o(m,{modelValue:l.value.axisTick.lineStyle.type,"onUpdate:modelValue":e[41]||(e[41]=a=>l.value.axisTick.lineStyle.type=a),inline:"",data:V(L),label:"\u7EBF\u578B"},null,8,["modelValue","data"]),o(n,{modelValue:l.value.axisTick.distance,"onUpdate:modelValue":e[42]||(e[42]=a=>l.value.axisTick.distance=a),inline:"",min:-100,max:100,step:1,label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"]),o(r,{modelValue:l.value.axisTick.lineStyle.color,"onUpdate:modelValue":e[43]||(e[43]=a=>l.value.axisTick.lineStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u6807\u7B7E",flat:""},{default:u(()=>[o(p,{modelValue:l.value.axisLabel.show,"onUpdate:modelValue":e[44]||(e[44]=a=>l.value.axisLabel.show=a),label:"\u5C55\u793A",inline:""},null,8,["modelValue"]),o(n,{modelValue:l.value.axisLabel.distance,"onUpdate:modelValue":e[45]||(e[45]=a=>l.value.axisLabel.distance=a),min:-100,max:100,step:1,inline:"",label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"]),o(n,{modelValue:l.value.axisLabel.fontSize,"onUpdate:modelValue":e[46]||(e[46]=a=>l.value.axisLabel.fontSize=a),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),o(m,{modelValue:l.value.axisLabel.fontWeight,"onUpdate:modelValue":e[47]||(e[47]=a=>l.value.axisLabel.fontWeight=a),data:V(f),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),o(r,{modelValue:l.value.axisLabel.color,"onUpdate:modelValue":e[48]||(e[48]=a=>l.value.axisLabel.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),o(i,{label:"\u6307\u9488",modal:"",toggle:"",modelValue:l.value.pointer.show,"onUpdate:modelValue":e[62]||(e[62]=a=>l.value.pointer.show=a)},{default:u(()=>[o(t,{label:"\u4F4D\u7F6E",flat:""},{default:u(()=>[o(d,{modelValue:l.value.pointer.offsetCenter[0],"onUpdate:modelValue":e[50]||(e[50]=a=>l.value.pointer.offsetCenter[0]=a),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),o(d,{modelValue:l.value.pointer.offsetCenter[1],"onUpdate:modelValue":e[51]||(e[51]=a=>l.value.pointer.offsetCenter[1]=a),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),o(t,{label:"\u6307\u9488\u6837\u5F0F",flat:""},{default:u(()=>[o(d,{modelValue:l.value.pointer.length,"onUpdate:modelValue":e[52]||(e[52]=a=>l.value.pointer.length=a),inline:"",label:"\u957F\u5EA6"},null,8,["modelValue"]),o(n,{modelValue:l.value.pointer.width,"onUpdate:modelValue":e[53]||(e[53]=a=>l.value.pointer.width=a),min:0,max:10,step:1,inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"]),o(m,{modelValue:l.value.pointer.icon,"onUpdate:modelValue":e[54]||(e[54]=a=>l.value.pointer.icon=a),data:V(y),label:"\u6307\u9488\u7C7B\u578B"},null,8,["modelValue","data"])]),_:1}),o(t,{label:"\u56FA\u5B9A\u70B9",flat:""},{default:u(()=>[o(p,{modelValue:l.value.anchor.show,"onUpdate:modelValue":e[55]||(e[55]=a=>l.value.anchor.show=a),label:"\u5C55\u793A",inline:""},null,8,["modelValue"]),o(m,{modelValue:l.value.anchor.icon,"onUpdate:modelValue":e[56]||(e[56]=a=>l.value.anchor.icon=a),data:V(y),label:"\u7C7B\u578B",inline:""},null,8,["modelValue","data"]),o(d,{modelValue:l.value.anchor.offsetCenter[0],"onUpdate:modelValue":e[57]||(e[57]=a=>l.value.anchor.offsetCenter[0]=a),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),o(d,{modelValue:l.value.anchor.offsetCenter[1],"onUpdate:modelValue":e[58]||(e[58]=a=>l.value.anchor.offsetCenter[1]=a),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"]),o(n,{modelValue:l.value.anchor.size,"onUpdate:modelValue":e[59]||(e[59]=a=>l.value.anchor.size=a),min:0,max:20,step:1,inline:"",label:"\u5927\u5C0F"},null,8,["modelValue"]),o(n,{modelValue:l.value.anchor.itemStyle.opacity,"onUpdate:modelValue":e[60]||(e[60]=a=>l.value.anchor.itemStyle.opacity=a),min:0,max:1,step:.1,precision:1,inline:"",label:"\u900F\u660E\u5EA6"},null,8,["modelValue"]),o(r,{modelValue:l.value.anchor.itemStyle.color,"onUpdate:modelValue":e[61]||(e[61]=a=>l.value.anchor.itemStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}}};export{G as default};
