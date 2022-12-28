import{q as T,b as w,d as z,r as N,i as D}from"./select-options-04fab100.js";import{j as E,K as p,b,c as U,v as t,l as n,a1 as l,h as g,F as y,d as L,k as S,p as k,y as I,e as K}from"./vendor-4c8a7a86.js";import"./chunk-echarts-cf4087a0.js";import"./chunk-brace-b1f520b9.js";const O={class:"setting-panel-gui"},$={class:"pt-5"},G={class:"pt-5"},H={class:"series-title inline"},J={class:"pt-5"},M={class:"pt-5"},P={class:"pt-5"},Q={key:0},R={class:"series-title"},c={__name:"config",props:{data:{type:Object,required:!0}},setup(W){const A=W,e=E(()=>A.data.config);function B(){e.value.axisLine.lineStyle.color.push([1,""])}function j(){e.value.axisLine.lineStyle.color.pop()}return(X,a)=>{const m=p("g-input"),d=p("g-field"),i=p("g-input-number"),x=p("b-switch"),V=p("g-field-collapse"),f=p("g-select"),r=p("g-color-picker"),C=p("b-icon"),v=p("b-button"),q=p("b-radio"),F=p("b-radio-group");return b(),U("div",O,[t(V,{label:"\u5168\u5C40",modal:""},{default:n(()=>[t(d,{label:"\u5706\u5FC3\u5750\u6807",inline:"",tooltip:"\u4EEA\u8868\u76D8\u5706\u5FC3\uFF08\u4E2D\u5FC3\uFF09\u5750\u6807,\u652F\u6301\u8BBE\u7F6E\u6210\u767E\u5206\u6BD4"},{default:n(()=>[t(m,{modelValue:l(e).global.center[0],"onUpdate:modelValue":a[0]||(a[0]=o=>l(e).global.center[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),t(m,{modelValue:l(e).global.center[1],"onUpdate:modelValue":a[1]||(a[1]=o=>l(e).global.center[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u534A\u5F84"},{default:n(()=>[t(m,{modelValue:l(e).global.radius,"onUpdate:modelValue":a[2]||(a[2]=o=>l(e).global.radius=o)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u89D2\u5EA6\u8303\u56F4",inline:""},{default:n(()=>[t(i,{modelValue:l(e).global.startAngle,"onUpdate:modelValue":a[3]||(a[3]=o=>l(e).global.startAngle=o),min:360,max:360,inline:"",label:"\u8D77\u59CB\u89D2\u5EA6"},null,8,["modelValue"]),t(i,{modelValue:l(e).global.endAngle,"onUpdate:modelValue":a[4]||(a[4]=o=>l(e).global.endAngle=o),min:360,max:360,inline:"",label:"\u7ED3\u675F\u89D2\u5EA6"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u987A\u65F6\u9488",tooltip:"\u4EEA\u8868\u76D8\u523B\u5EA6\u662F\u5426\u987A\u65F6\u9488\u589E\u957F"},{default:n(()=>[g("div",$,[t(x,{modelValue:l(e).global.clockwise,"onUpdate:modelValue":a[5]||(a[5]=o=>l(e).global.clockwise=o),size:"small"},null,8,["modelValue"])])]),_:1}),t(d,{label:"\u523B\u5EA6\u5206\u5272\u6570"},{default:n(()=>[t(i,{modelValue:l(e).global.splitNumber,"onUpdate:modelValue":a[6]||(a[6]=o=>l(e).global.splitNumber=o),min:1},null,8,["modelValue"])]),_:1})]),_:1}),t(V,{label:"\u6807\u9898",modal:"",toggle:"",modelValue:l(e).title.show,"onUpdate:modelValue":a[14]||(a[14]=o=>l(e).title.show=o)},{default:n(()=>[t(d,{label:"\u4F4D\u7F6E",inline:""},{default:n(()=>[t(m,{modelValue:l(e).title.offsetCenter[0],"onUpdate:modelValue":a[7]||(a[7]=o=>l(e).title.offsetCenter[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),t(m,{modelValue:l(e).title.offsetCenter[1],"onUpdate:modelValue":a[8]||(a[8]=o=>l(e).title.offsetCenter[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6587\u672C",inline:""},{default:n(()=>[t(i,{modelValue:l(e).title.width,"onUpdate:modelValue":a[9]||(a[9]=o=>l(e).title.width=o),inline:"",label:"\u5BBD\u5EA6",min:0,max:1e3},null,8,["modelValue"]),t(f,{modelValue:l(e).title.overflow,"onUpdate:modelValue":a[10]||(a[10]=o=>l(e).title.overflow=o),data:l(T),label:"\u8D85\u51FA\u6362\u884C/\u622A\u65AD",inline:""},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[t(i,{modelValue:l(e).title.fontSize,"onUpdate:modelValue":a[11]||(a[11]=o=>l(e).title.fontSize=o),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(f,{modelValue:l(e).title.fontWeight,"onUpdate:modelValue":a[12]||(a[12]=o=>l(e).title.fontWeight=o),data:l(w),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(r,{modelValue:l(e).title.color,"onUpdate:modelValue":a[13]||(a[13]=o=>l(e).title.color=o),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u8BE6\u60C5",modal:"",toggle:"",modelValue:l(e).detail.show,"onUpdate:modelValue":a[23]||(a[23]=o=>l(e).detail.show=o)},{default:n(()=>[t(d,{label:"\u5355\u4F4D"},{default:n(()=>[t(m,{modelValue:l(e).detail.unit,"onUpdate:modelValue":a[15]||(a[15]=o=>l(e).detail.unit=o)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u4F4D\u7F6E",inline:""},{default:n(()=>[t(m,{modelValue:l(e).detail.offsetCenter[0],"onUpdate:modelValue":a[16]||(a[16]=o=>l(e).detail.offsetCenter[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),t(m,{modelValue:l(e).detail.offsetCenter[1],"onUpdate:modelValue":a[17]||(a[17]=o=>l(e).detail.offsetCenter[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6587\u672C",inline:""},{default:n(()=>[t(i,{modelValue:l(e).detail.width,"onUpdate:modelValue":a[18]||(a[18]=o=>l(e).detail.width=o),inline:"",label:"\u5BBD\u5EA6",min:0,max:1e3},null,8,["modelValue"]),t(f,{modelValue:l(e).detail.overflow,"onUpdate:modelValue":a[19]||(a[19]=o=>l(e).detail.overflow=o),data:l(T),label:"\u8D85\u51FA\u6362\u884C/\u622A\u65AD",inline:""},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[t(i,{modelValue:l(e).detail.fontSize,"onUpdate:modelValue":a[20]||(a[20]=o=>l(e).detail.fontSize=o),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(f,{modelValue:l(e).detail.fontWeight,"onUpdate:modelValue":a[21]||(a[21]=o=>l(e).detail.fontWeight=o),data:l(w),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(r,{modelValue:l(e).detail.color,"onUpdate:modelValue":a[22]||(a[22]=o=>l(e).detail.color=o),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u8F74\u7EBF",modal:"",toggle:"",modelValue:l(e).axisLine.show,"onUpdate:modelValue":a[26]||(a[26]=o=>l(e).axisLine.show=o)},{default:n(()=>[t(d,{label:"\u4E24\u7AEF\u5706\u5F62"},{default:n(()=>[g("div",G,[t(x,{modelValue:l(e).axisLine.roundCap,"onUpdate:modelValue":a[24]||(a[24]=o=>l(e).axisLine.roundCap=o),size:"small"},null,8,["modelValue"])])]),_:1}),t(V,{label:"\u8F74\u7EBF\u6837\u5F0F"},{add:n(()=>[t(v,{type:"text",onClick:B,title:"\u65B0\u589E\u4E00\u4E2A\u8F74\u7EBF\u533A\u57DF"},{default:n(()=>[t(C,{name:"plus",size:"16"})]),_:1}),t(v,{type:"text",disabled:l(e).axisLine.lineStyle.color.length===1,onClick:j,title:"\u79FB\u9664\u6700\u540E\u4E00\u4E2A\u8F74\u7EBF\u533A\u57DF"},{default:n(()=>[t(C,{name:"delete",size:"16"})]),_:1},8,["disabled"])]),default:n(()=>[(b(!0),U(y,null,L(l(e).axisLine.lineStyle.color,(o,u)=>(b(),S(d,{key:u,flat:"",label:`\u533A\u57DF${u+1}`},{label:n(()=>[g("div",H,[g("span",null,"\u533A\u57DF"+k(u+1),1)])]),default:n(()=>[t(i,{modelValue:l(e).axisLine.lineStyle.color[u][0],"onUpdate:modelValue":s=>l(e).axisLine.lineStyle.color[u][0]=s,inline:"",label:"\u5BBD\u5EA6",min:0,max:1,step:.1,precision:1},null,8,["modelValue","onUpdate:modelValue","step"]),t(r,{modelValue:l(e).axisLine.lineStyle.color[u][1],"onUpdate:modelValue":s=>l(e).axisLine.lineStyle.color[u][1]=s,label:"\u989C\u8272",inline:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1}),t(d,{label:"\u5BBD\u5EA6"},{default:n(()=>[t(i,{modelValue:l(e).axisLine.lineStyle.width,"onUpdate:modelValue":a[25]||(a[25]=o=>l(e).axisLine.lineStyle.width=o),min:0,max:100,step:1},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u8FDB\u5EA6\u6761",modal:"",toggle:"",modelValue:l(e).progress.show,"onUpdate:modelValue":a[31]||(a[31]=o=>l(e).progress.show=o)},{default:n(()=>[t(d,{label:"\u662F\u5426\u91CD\u53E0",tooltip:"\u591A\u7EC4\u6570\u636E\u65F6\u8FDB\u5EA6\u6761\u662F\u5426\u91CD\u53E0"},{default:n(()=>[g("div",J,[t(x,{modelValue:l(e).progress.overlap,"onUpdate:modelValue":a[27]||(a[27]=o=>l(e).progress.overlap=o),size:"small"},null,8,["modelValue"])])]),_:1}),t(d,{label:"\u5BBD\u5EA6"},{default:n(()=>[t(i,{modelValue:l(e).progress.width,"onUpdate:modelValue":a[28]||(a[28]=o=>l(e).progress.width=o),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),t(d,{label:"\u4E24\u7AEF\u5706\u89D2"},{default:n(()=>[g("div",M,[t(x,{modelValue:l(e).progress.roundCap,"onUpdate:modelValue":a[29]||(a[29]=o=>l(e).progress.roundCap=o),size:"small"},null,8,["modelValue"])])]),_:1}),t(d,{label:"\u88C1\u526A",tooltip:"\u662F\u5426\u88C1\u6389\u8D85\u51FA\u90E8\u5206"},{default:n(()=>[g("div",P,[t(x,{modelValue:l(e).progress.clip,"onUpdate:modelValue":a[30]||(a[30]=o=>l(e).progress.clip=o),size:"small"},null,8,["modelValue"])])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u5206\u9694\u7EBF",modal:"",toggle:"",modelValue:l(e).splitLine.show,"onUpdate:modelValue":a[37]||(a[37]=o=>l(e).splitLine.show=o)},{default:n(()=>[t(d,{flat:"",label:"\u5206\u9694\u7EBF\u6837\u5F0F"},{default:n(()=>[t(m,{modelValue:l(e).splitLine.length,"onUpdate:modelValue":a[32]||(a[32]=o=>l(e).splitLine.length=o),inline:"",label:"\u7EBF\u957F"},null,8,["modelValue"]),t(i,{modelValue:l(e).splitLine.lineStyle.width,"onUpdate:modelValue":a[33]||(a[33]=o=>l(e).splitLine.lineStyle.width=o),inline:"",min:1,max:10,step:1,label:"\u7EBF\u5BBD"},null,8,["modelValue"]),t(f,{modelValue:l(e).splitLine.lineStyle.type,"onUpdate:modelValue":a[34]||(a[34]=o=>l(e).splitLine.lineStyle.type=o),inline:"",data:l(z),label:"\u7EBF\u578B"},null,8,["modelValue","data"]),t(i,{modelValue:l(e).splitLine.distance,"onUpdate:modelValue":a[35]||(a[35]=o=>l(e).splitLine.distance=o),inline:"",min:-100,max:100,step:1,label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"]),t(r,{modelValue:l(e).splitLine.lineStyle.color,"onUpdate:modelValue":a[36]||(a[36]=o=>l(e).splitLine.lineStyle.color=o),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u523B\u5EA6",modal:"",toggle:"",modelValue:l(e).axisTick.show,"onUpdate:modelValue":a[44]||(a[44]=o=>l(e).axisTick.show=o)},{default:n(()=>[t(d,{label:"\u523B\u5EA6\u6570",tooltip:"\u5206\u9694\u7EBF\u4E4B\u95F4\u5206\u9694\u7684\u523B\u5EA6\u6570"},{default:n(()=>[t(i,{modelValue:l(e).axisTick.splitNumber,"onUpdate:modelValue":a[38]||(a[38]=o=>l(e).axisTick.splitNumber=o),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),t(d,{label:"\u523B\u5EA6\u7EBF\u6837\u5F0F",flat:""},{default:n(()=>[t(m,{modelValue:l(e).axisTick.length,"onUpdate:modelValue":a[39]||(a[39]=o=>l(e).axisTick.length=o),inline:"",label:"\u7EBF\u957F"},null,8,["modelValue"]),t(i,{modelValue:l(e).axisTick.lineStyle.width,"onUpdate:modelValue":a[40]||(a[40]=o=>l(e).axisTick.lineStyle.width=o),inline:"",min:1,max:10,step:1,label:"\u7EBF\u5BBD"},null,8,["modelValue"]),t(f,{modelValue:l(e).axisTick.lineStyle.type,"onUpdate:modelValue":a[41]||(a[41]=o=>l(e).axisTick.lineStyle.type=o),inline:"",data:l(z),label:"\u7EBF\u578B"},null,8,["modelValue","data"]),t(i,{modelValue:l(e).axisTick.distance,"onUpdate:modelValue":a[42]||(a[42]=o=>l(e).axisTick.distance=o),inline:"",min:-100,max:100,step:1,label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"]),t(r,{modelValue:l(e).axisTick.lineStyle.color,"onUpdate:modelValue":a[43]||(a[43]=o=>l(e).axisTick.lineStyle.color=o),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u523B\u5EA6\u6807\u7B7E",modal:"",toggle:"",modelValue:l(e).axisLabel.show,"onUpdate:modelValue":a[49]||(a[49]=o=>l(e).axisLabel.show=o)},{default:n(()=>[t(d,{label:"\u6587\u5B57\u6837\u5F0F",flat:""},{default:n(()=>[t(i,{modelValue:l(e).axisLabel.fontSize,"onUpdate:modelValue":a[45]||(a[45]=o=>l(e).axisLabel.fontSize=o),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(f,{modelValue:l(e).axisLabel.fontWeight,"onUpdate:modelValue":a[46]||(a[46]=o=>l(e).axisLabel.fontWeight=o),data:l(w),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(r,{modelValue:l(e).axisLabel.color,"onUpdate:modelValue":a[47]||(a[47]=o=>l(e).axisLabel.color=o),label:"\u989C\u8272"},null,8,["modelValue"]),t(i,{modelValue:l(e).axisLabel.distance,"onUpdate:modelValue":a[48]||(a[48]=o=>l(e).axisLabel.distance=o),min:-100,max:100,step:1,label:"\u4E0E\u8F74\u7EBF\u7684\u8DDD\u79BB"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u6307\u9488",modal:"",toggle:"",modelValue:l(e).pointer.show,"onUpdate:modelValue":a[55]||(a[55]=o=>l(e).pointer.show=o)},{default:n(()=>[t(d,{label:"\u4F4D\u7F6E",flat:""},{default:n(()=>[t(m,{modelValue:l(e).pointer.offsetCenter[0],"onUpdate:modelValue":a[50]||(a[50]=o=>l(e).pointer.offsetCenter[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),t(m,{modelValue:l(e).pointer.offsetCenter[1],"onUpdate:modelValue":a[51]||(a[51]=o=>l(e).pointer.offsetCenter[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6307\u9488\u6837\u5F0F",flat:""},{default:n(()=>[t(m,{modelValue:l(e).pointer.length,"onUpdate:modelValue":a[52]||(a[52]=o=>l(e).pointer.length=o),inline:"",label:"\u957F\u5EA6"},null,8,["modelValue"]),t(i,{modelValue:l(e).pointer.width,"onUpdate:modelValue":a[53]||(a[53]=o=>l(e).pointer.width=o),min:0,max:10,step:1,inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"]),t(f,{modelValue:l(e).pointer.icon,"onUpdate:modelValue":a[54]||(a[54]=o=>l(e).pointer.icon=o),data:l(N),label:"\u6307\u9488\u7C7B\u578B"},null,8,["modelValue","data"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u56FA\u5B9A\u70B9",modal:"",toggle:"",modelValue:l(e).anchor.show,"onUpdate:modelValue":a[62]||(a[62]=o=>l(e).anchor.show=o)},{default:n(()=>[t(d,{label:"\u4F4D\u7F6E",flat:""},{default:n(()=>[t(m,{modelValue:l(e).anchor.offsetCenter[0],"onUpdate:modelValue":a[56]||(a[56]=o=>l(e).anchor.offsetCenter[0]=o),inline:"",label:"\u6C34\u5E73\u4F4D\u7F6E"},null,8,["modelValue"]),t(m,{modelValue:l(e).anchor.offsetCenter[1],"onUpdate:modelValue":a[57]||(a[57]=o=>l(e).anchor.offsetCenter[1]=o),inline:"",label:"\u5782\u76F4\u4F4D\u7F6E"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u56FA\u5B9A\u70B9\u6837\u5F0F",flat:""},{default:n(()=>[t(i,{modelValue:l(e).anchor.size,"onUpdate:modelValue":a[58]||(a[58]=o=>l(e).anchor.size=o),min:0,max:20,step:1,inline:"",label:"\u5927\u5C0F"},null,8,["modelValue"]),t(f,{modelValue:l(e).anchor.icon,"onUpdate:modelValue":a[59]||(a[59]=o=>l(e).anchor.icon=o),data:l(N),label:"\u7C7B\u578B",inline:""},null,8,["modelValue","data"]),t(i,{modelValue:l(e).anchor.itemStyle.opacity,"onUpdate:modelValue":a[60]||(a[60]=o=>l(e).anchor.itemStyle.opacity=o),min:0,max:1,step:.1,precision:1,inline:"",label:"\u900F\u660E\u5EA6"},null,8,["modelValue","step"]),t(r,{modelValue:l(e).anchor.itemStyle.color,"onUpdate:modelValue":a[61]||(a[61]=o=>l(e).anchor.itemStyle.color=o),label:"\u989C\u8272",inline:""},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(V,{label:"\u7CFB\u5217",modal:""},{default:n(()=>[(b(!0),U(y,null,L(l(e).series,(o,u)=>(b(),U(y,{key:u},[u<1?(b(),U("div",Q,[g("div",R,[g("span",null,"\u7CFB\u5217"+k(u+1),1)]),t(d,{label:"\u586B\u5145\u7C7B\u578B"},{default:n(()=>[t(F,{modelValue:l(e).series[u].color.type,"onUpdate:modelValue":s=>l(e).series[u].color.type=s,type:"button",size:"mini"},{default:n(()=>[(b(!0),U(y,null,L(l(D),s=>(b(),S(q,{key:s.value,label:s.value},{default:n(()=>[I(k(s.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(e).series[u].color.type==="solid"?(b(),S(d,{key:0,label:"\u989C\u8272\u914D\u7F6E"},{default:n(()=>[t(r,{modelValue:l(e).series[u].color.value,"onUpdate:modelValue":s=>l(e).series[u].color.value=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):(b(),U(y,{key:1},[t(d,{label:"\u5F00\u59CB\u989C\u8272"},{default:n(()=>[t(r,{modelValue:l(e).series[u].color.from,"onUpdate:modelValue":s=>l(e).series[u].color.from=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(d,{label:"\u7ED3\u675F\u989C\u8272"},{default:n(()=>[t(r,{modelValue:l(e).series[u].color.to,"onUpdate:modelValue":s=>l(e).series[u].color.to=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)],64))])):K("",!0)],64))),128))]),_:1})])}}};export{c as default};
