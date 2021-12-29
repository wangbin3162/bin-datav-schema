import{a as Y,f as B,b as N,e as P,l as j,o as D,c as G,t as H,d as X,h as q,g as I,v as M,i as R}from"./select-options-49432307.js";import{as as E,g as v,J as s,o as g,A as b,u as i,w as n,F as A,K as p,c as V,q as W,t as S,a as r,B as T}from"./vendor-d82059d1.js";import"./chunk-brace-7fd40d4c.js";const J={name:"VHorizontalBarConfig",props:{data:{type:Object,required:!0}},setup(L){const o=v(()=>L.data.config),z=v(()=>L.data.apiData.config.seriesCount),l=v(()=>Y.filter(F=>F.value!=="value"));return{config:o,seriesCount:z,fontFamilys:B,fontWeights:N,echartsLabelPositions:P,legendLocations:j,orients:D,legendIcons:G,yAxisTypes:l,titleLocations:H,lineStyles:X,hAligns:q,timeFormats:I,valueFormats:M,fillTypes:R}}},K={class:"setting-panel-gui"},O={class:"pt-5"},Q={key:0},Z={class:"series-title"};function c(L,o,z,l,F,_){const t=s("g-select"),a=s("g-field"),d=s("g-input-number"),U=s("g-slider"),y=s("g-input"),m=s("g-color-picker"),f=s("g-field-collapse"),w=s("b-radio"),k=s("b-radio-group"),C=s("b-switch");return g(),b("div",K,[i(f,{label:"\u5168\u5C40"},{default:n(()=>[i(a,{label:"\u5B57\u4F53",tooltip:"\u8BF7\u9009\u62E9\u60A8\u7CFB\u7EDF\u6709\u7684\u5B57\u4F53\uFF0C\u5982\u679C\u60A8\u7CFB\u7EDF\u65E0\u6B64\u5B57\u4F53\uFF0C\u6807\u9898\u5C06\u4F1A\u663E\u793A\u9ED8\u8BA4\u5B57\u4F53"},{default:n(()=>[i(t,{modelValue:l.config.global.fontFamily,"onUpdate:modelValue":o[0]||(o[0]=e=>l.config.global.fontFamily=e),data:l.fontFamilys},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u8FB9\u8DDD",flat:""},{default:n(()=>[i(d,{modelValue:l.config.global.margin.top,"onUpdate:modelValue":o[1]||(o[1]=e=>l.config.global.margin.top=e),min:0,max:300,step:1,suffix:"px",inline:"inline",label:"\u9876\u90E8"},null,8,["modelValue"]),i(d,{modelValue:l.config.global.margin.bottom,"onUpdate:modelValue":o[2]||(o[2]=e=>l.config.global.margin.bottom=e),min:0,max:300,step:1,suffix:"px",inline:"inline",label:"\u5E95\u90E8"},null,8,["modelValue"]),i(d,{modelValue:l.config.global.margin.left,"onUpdate:modelValue":o[3]||(o[3]=e=>l.config.global.margin.left=e),min:0,max:300,step:1,suffix:"px",inline:"inline",label:"\u5DE6\u4FA7"},null,8,["modelValue"]),i(d,{modelValue:l.config.global.margin.right,"onUpdate:modelValue":o[4]||(o[4]=e=>l.config.global.margin.right=e),min:0,max:300,step:1,suffix:"px",inline:"inline",label:"\u53F3\u4FA7"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u7EC4\u5185\u95F4\u8DDD"},{default:n(()=>[i(U,{modelValue:l.config.global.innerPadding,"onUpdate:modelValue":o[5]||(o[5]=e=>l.config.global.innerPadding=e),min:-100,max:100,step:1,suffix:"%"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u7EC4\u95F4\u95F4\u8DDD"},{default:n(()=>[i(U,{modelValue:l.config.global.outerPadding,"onUpdate:modelValue":o[6]||(o[6]=e=>l.config.global.outerPadding=e),min:-100,max:100,step:1,suffix:"%"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u67F1\u5B50\u5BBD\u5EA6",tooltip:"\u4E0D\u8BBE\u65F6\u81EA\u9002\u5E94\uFF0C\u53EF\u4EE5\u662F\u7EDD\u5BF9\u503C\u50CF\u7D20\u6216\u767E\u5206\u6BD4\u3002"},{default:n(()=>[i(y,{modelValue:l.config.global.barWidth,"onUpdate:modelValue":o[7]||(o[7]=e=>l.config.global.barWidth=e)},null,8,["modelValue"])]),_:1}),i(a,{label:"\u67F1\u5B50\u5706\u89D2"},{default:n(()=>[i(d,{modelValue:l.config.global.borderRadius,"onUpdate:modelValue":o[8]||(o[8]=e=>l.config.global.borderRadius=e),min:0,max:300,step:1,suffix:"px"},null,8,["modelValue"])]),_:1}),i(f,{label:"\u80CC\u666F",toggle:"",modelValue:l.config.global.background.show,"onUpdate:modelValue":o[10]||(o[10]=e=>l.config.global.background.show=e)},{default:n(()=>[i(a,{label:"\u80CC\u666F\u989C\u8272"},{default:n(()=>[i(m,{modelValue:l.config.global.background.color,"onUpdate:modelValue":o[9]||(o[9]=e=>l.config.global.background.color=e)},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),i(f,{label:"\u67F1\u5B50\u6807\u6CE8",toggle:"",modelValue:l.config.label.show,"onUpdate:modelValue":o[17]||(o[17]=e=>l.config.label.show=e)},{default:n(()=>[i(a,{label:"\u4F4D\u7F6E"},{default:n(()=>[i(t,{modelValue:l.config.label.position,"onUpdate:modelValue":o[11]||(o[11]=e=>l.config.label.position=e),data:l.echartsLabelPositions},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.label.textStyle.fontSize,"onUpdate:modelValue":o[12]||(o[12]=e=>l.config.label.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.label.textStyle.fontWeight,"onUpdate:modelValue":o[13]||(o[13]=e=>l.config.label.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.label.textStyle.color,"onUpdate:modelValue":o[14]||(o[14]=e=>l.config.label.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u6C34\u5E73\u504F\u79FB"},{default:n(()=>[i(U,{modelValue:l.config.label.offsetX,"onUpdate:modelValue":o[15]||(o[15]=e=>l.config.label.offsetX=e),min:-100,max:100,step:1},null,8,["modelValue"])]),_:1}),i(a,{label:"\u5782\u76F4\u504F\u79FB"},{default:n(()=>[i(U,{modelValue:l.config.label.offsetY,"onUpdate:modelValue":o[16]||(o[16]=e=>l.config.label.offsetY=e),min:-100,max:100,step:1},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u56FE\u4F8B",toggle:"",modelValue:l.config.legend.show,"onUpdate:modelValue":o[28]||(o[28]=e=>l.config.legend.show=e)},{default:n(()=>[i(a,{label:"\u4F4D\u7F6E"},{default:n(()=>[i(t,{modelValue:l.config.legend.position,"onUpdate:modelValue":o[18]||(o[18]=e=>l.config.legend.position=e),data:l.legendLocations},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u5E03\u5C40\u65B9\u5F0F"},{default:n(()=>[i(k,{modelValue:l.config.legend.orient,"onUpdate:modelValue":o[19]||(o[19]=e=>l.config.legend.orient=e),type:"button",size:"mini"},{default:n(()=>[(g(!0),b(A,null,p(l.orients,e=>(g(),V(w,{key:e.value,label:e.value},{default:n(()=>[W(S(e.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.legend.textStyle.fontSize,"onUpdate:modelValue":o[20]||(o[20]=e=>l.config.legend.textStyle.fontSize=e),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.legend.textStyle.fontWeight,"onUpdate:modelValue":o[21]||(o[21]=e=>l.config.legend.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.legend.textStyle.color,"onUpdate:modelValue":o[22]||(o[22]=e=>l.config.legend.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),i(f,{label:"\u56FE\u5F62",modelValue:l.config.legend.symbol.show,"onUpdate:modelValue":o[27]||(o[27]=e=>l.config.legend.symbol.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u56FE\u4F8B",flat:""},{default:n(()=>[i(d,{modelValue:l.config.legend.symbol.width,"onUpdate:modelValue":o[23]||(o[23]=e=>l.config.legend.symbol.width=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"]),i(d,{modelValue:l.config.legend.symbol.height,"onUpdate:modelValue":o[24]||(o[24]=e=>l.config.legend.symbol.height=e),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u9AD8\u5EA6"},null,8,["modelValue"]),i(d,{modelValue:l.config.legend.symbol.gap,"onUpdate:modelValue":o[25]||(o[25]=e=>l.config.legend.symbol.gap=e),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u95F4\u9694"},null,8,["modelValue"]),i(t,{modelValue:l.config.legend.symbol.icon,"onUpdate:modelValue":o[26]||(o[26]=e=>l.config.legend.symbol.icon=e),data:l.legendIcons,inline:"",label:"\u5F62\u72B6"},null,8,["modelValue","data"])]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),i(f,{label:"Y\u8F74",toggle:"",modelValue:l.config.yAxis.show,"onUpdate:modelValue":o[62]||(o[62]=e=>l.config.yAxis.show=e)},{default:n(()=>[i(a,{label:"\u7C7B\u578B"},{default:n(()=>[i(k,{modelValue:l.config.yAxis.type,"onUpdate:modelValue":o[29]||(o[29]=e=>l.config.yAxis.type=e),type:"button",size:"mini"},{default:n(()=>[(g(!0),b(A,null,p(l.yAxisTypes,e=>(g(),V(w,{key:e.value,label:e.value},{default:n(()=>[W(S(e.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),i(f,{label:"\u8F74\u6807\u9898",modelValue:l.config.yAxis.title.show,"onUpdate:modelValue":o[37]||(o[37]=e=>l.config.yAxis.title.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u6807\u9898\u663E\u793A"},{default:n(()=>[i(y,{modelValue:l.config.yAxis.title.name,"onUpdate:modelValue":o[30]||(o[30]=e=>l.config.yAxis.title.name=e)},null,8,["modelValue"])]),_:1}),i(a,{label:"\u4F4D\u7F6E"},{default:n(()=>[i(t,{modelValue:l.config.yAxis.title.location,"onUpdate:modelValue":o[31]||(o[31]=e=>l.config.yAxis.title.location=e),data:l.titleLocations},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.title.display.rotate,"onUpdate:modelValue":o[32]||(o[32]=e=>l.config.yAxis.title.display.rotate=e),min:0,max:360,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),i(d,{modelValue:l.config.yAxis.title.display.offset,"onUpdate:modelValue":o[33]||(o[33]=e=>l.config.yAxis.title.display.offset=e),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.title.textStyle.fontSize,"onUpdate:modelValue":o[34]||(o[34]=e=>l.config.yAxis.title.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.yAxis.title.textStyle.fontWeight,"onUpdate:modelValue":o[35]||(o[35]=e=>l.config.yAxis.title.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.yAxis.title.textStyle.color,"onUpdate:modelValue":o[36]||(o[36]=e=>l.config.yAxis.title.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u7EBF",modelValue:l.config.yAxis.axisLine.show,"onUpdate:modelValue":o[41]||(o[41]=e=>l.config.yAxis.axisLine.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u8F74\u7EBF\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.axisLine.width,"onUpdate:modelValue":o[38]||(o[38]=e=>l.config.yAxis.axisLine.width=e),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(t,{modelValue:l.config.yAxis.axisLine.type,"onUpdate:modelValue":o[39]||(o[39]=e=>l.config.yAxis.axisLine.type=e),data:l.lineStyles,inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.yAxis.axisLine.color,"onUpdate:modelValue":o[40]||(o[40]=e=>l.config.yAxis.axisLine.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u523B\u5EA6",modelValue:l.config.yAxis.axisTick.show,"onUpdate:modelValue":o[45]||(o[45]=e=>l.config.yAxis.axisTick.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u523B\u5EA6\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.axisTick.width,"onUpdate:modelValue":o[42]||(o[42]=e=>l.config.yAxis.axisTick.width=e),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(t,{modelValue:l.config.yAxis.axisTick.type,"onUpdate:modelValue":o[43]||(o[43]=e=>l.config.yAxis.axisTick.type=e),data:l.lineStyles,inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.yAxis.axisTick.color,"onUpdate:modelValue":o[44]||(o[44]=e=>l.config.yAxis.axisTick.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u6807\u7B7E",modelValue:l.config.yAxis.axisLabel.show,"onUpdate:modelValue":o[55]||(o[55]=e=>l.config.yAxis.axisLabel.show=e),toggle:""},{default:n(()=>[l.config.yAxis.type==="time"?(g(),V(a,{key:0,label:"\u663E\u793A\u683C\u5F0F",tooltip:"\u65F6\u95F4\u8BF7\u53C2\u7167 YYYY/MM/DD HH:mm:ss"},{default:n(()=>[i(t,{modelValue:l.config.yAxis.axisLabel.timeFormat,"onUpdate:modelValue":o[46]||(o[46]=e=>l.config.yAxis.axisLabel.timeFormat=e),data:l.timeFormats},null,8,["modelValue","data"])]),_:1})):r("",!0),i(a,{label:"\u4E24\u7AEF\u7559\u767D"},{default:n(()=>[T("div",O,[i(C,{modelValue:l.config.yAxis.boundaryGap,"onUpdate:modelValue":o[47]||(o[47]=e=>l.config.yAxis.boundaryGap=e),size:"small"},null,8,["modelValue"])])]),_:1}),i(a,{label:"\u95F4\u9694",tooltip:"\u9ED8\u8BA4\u4F1A\u91C7\u7528\u6807\u7B7E\u4E0D\u91CD\u53E0\u7684\u7B56\u7565\u95F4\u9694\u663E\u793A\u6807\u7B7E\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u6210 0 \u5F3A\u5236\u663E\u793A\u6240\u6709\u6807\u7B7E\u3002"},{default:n(()=>[i(y,{modelValue:l.config.yAxis.axisLabel.interval,"onUpdate:modelValue":o[48]||(o[48]=e=>l.config.yAxis.axisLabel.interval=e)},null,8,["modelValue"])]),_:1}),i(a,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.axisLabel.display.rotate,"onUpdate:modelValue":o[49]||(o[49]=e=>l.config.yAxis.axisLabel.display.rotate=e),min:0,max:100,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),i(d,{modelValue:l.config.yAxis.axisLabel.display.margin,"onUpdate:modelValue":o[50]||(o[50]=e=>l.config.yAxis.axisLabel.display.margin=e),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u5BF9\u9F50\u65B9\u5F0F"},{default:n(()=>[i(t,{modelValue:l.config.yAxis.axisLabel.align,"onUpdate:modelValue":o[51]||(o[51]=e=>l.config.yAxis.axisLabel.align=e),data:l.hAligns},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.yAxis.axisLabel.textStyle.fontSize,"onUpdate:modelValue":o[52]||(o[52]=e=>l.config.yAxis.axisLabel.textStyle.fontSize=e),min:10,max:100,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.yAxis.axisLabel.textStyle.fontWeight,"onUpdate:modelValue":o[53]||(o[53]=e=>l.config.yAxis.axisLabel.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.yAxis.axisLabel.textStyle.color,"onUpdate:modelValue":o[54]||(o[54]=e=>l.config.yAxis.axisLabel.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u7F51\u683C\u7EBF",modelValue:l.config.yAxis.grid.show,"onUpdate:modelValue":o[61]||(o[61]=e=>l.config.yAxis.grid.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u7EBF\u578B\u6837\u5F0F",flat:""},{default:n(()=>[i(t,{modelValue:l.config.yAxis.grid.line.type,"onUpdate:modelValue":o[56]||(o[56]=e=>l.config.yAxis.grid.line.type=e),data:l.lineStyles,inline:"inline",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(d,{modelValue:l.config.yAxis.grid.line.width,"onUpdate:modelValue":o[57]||(o[57]=e=>l.config.yAxis.grid.line.width=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(m,{modelValue:l.config.yAxis.grid.line.color,"onUpdate:modelValue":o[58]||(o[58]=e=>l.config.yAxis.grid.line.color=e),inline:"inline-single",label:"\u989C\u8272"},null,8,["modelValue"]),l.config.yAxis.grid.line.type==="dashed"?(g(),V(d,{key:0,modelValue:l.config.yAxis.grid.line.dashedLength,"onUpdate:modelValue":o[59]||(o[59]=e=>l.config.yAxis.grid.line.dashedLength=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u957F\u5EA6"},null,8,["modelValue"])):r("",!0),l.config.yAxis.grid.line.type==="dashed"?(g(),V(d,{key:1,modelValue:l.config.yAxis.grid.line.dashedSpace,"onUpdate:modelValue":o[60]||(o[60]=e=>l.config.yAxis.grid.line.dashedSpace=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u95F4\u8DDD"},null,8,["modelValue"])):r("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),i(f,{label:"X\u8F74",toggle:"",modelValue:l.config.xAxis.show,"onUpdate:modelValue":o[97]||(o[97]=e=>l.config.xAxis.show=e)},{default:n(()=>[i(a,{label:"\u663E\u793A\u8303\u56F4",flat:"",tooltip:"\u9ED8\u8BA4\u53EF\u4EE5\u586B\u5199auto\uFF0C\u6216\u8005\u81EA\u884C\u8F93\u5165\u6570\u503C"},{default:n(()=>[i(y,{modelValue:l.config.xAxis.extent.min,"onUpdate:modelValue":o[63]||(o[63]=e=>l.config.xAxis.extent.min=e),inline:"inline",label:"\u6700\u5C0F\u503C"},null,8,["modelValue"]),i(y,{modelValue:l.config.xAxis.extent.max,"onUpdate:modelValue":o[64]||(o[64]=e=>l.config.xAxis.extent.max=e),inline:"inline",label:"\u6700\u5927\u503C"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u6807\u7B7E\u6570\u91CF",tooltip:"\u8FD9\u662F\u4E2A\u9884\u4F30\u503C\uFF0C\u5B9E\u9645\u663E\u793A\u4F1A\u505A\u8C03\u6574\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u6210 0 \u5F3A\u5236\u663E\u793A\u6240\u6709\u6807\u7B7E\u3002"},{default:n(()=>[i(d,{modelValue:l.config.xAxis.splitNumber,"onUpdate:modelValue":o[65]||(o[65]=e=>l.config.xAxis.splitNumber=e),min:0,max:100,step:1},null,8,["modelValue"])]),_:1}),i(f,{label:"\u8F74\u6807\u9898",modelValue:l.config.xAxis.title.show,"onUpdate:modelValue":o[73]||(o[73]=e=>l.config.xAxis.title.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u6807\u9898\u663E\u793A"},{default:n(()=>[i(y,{modelValue:l.config.xAxis.title.name,"onUpdate:modelValue":o[66]||(o[66]=e=>l.config.xAxis.title.name=e)},null,8,["modelValue"])]),_:1}),i(a,{label:"\u4F4D\u7F6E"},{default:n(()=>[i(t,{modelValue:l.config.xAxis.title.location,"onUpdate:modelValue":o[67]||(o[67]=e=>l.config.xAxis.title.location=e),data:l.titleLocations},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.title.display.rotate,"onUpdate:modelValue":o[68]||(o[68]=e=>l.config.xAxis.title.display.rotate=e),min:0,max:360,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),i(d,{modelValue:l.config.xAxis.title.display.offset,"onUpdate:modelValue":o[69]||(o[69]=e=>l.config.xAxis.title.display.offset=e),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.title.textStyle.fontSize,"onUpdate:modelValue":o[70]||(o[70]=e=>l.config.xAxis.title.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.xAxis.title.textStyle.fontWeight,"onUpdate:modelValue":o[71]||(o[71]=e=>l.config.xAxis.title.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.xAxis.title.textStyle.color,"onUpdate:modelValue":o[72]||(o[72]=e=>l.config.xAxis.title.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u7EBF",modelValue:l.config.xAxis.axisLine.show,"onUpdate:modelValue":o[77]||(o[77]=e=>l.config.xAxis.axisLine.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u8F74\u7EBF\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.axisLine.width,"onUpdate:modelValue":o[74]||(o[74]=e=>l.config.xAxis.axisLine.width=e),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(t,{modelValue:l.config.xAxis.axisLine.type,"onUpdate:modelValue":o[75]||(o[75]=e=>l.config.xAxis.axisLine.type=e),data:l.lineStyles,inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.xAxis.axisLine.color,"onUpdate:modelValue":o[76]||(o[76]=e=>l.config.xAxis.axisLine.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u523B\u5EA6",modelValue:l.config.xAxis.axisTick.show,"onUpdate:modelValue":o[81]||(o[81]=e=>l.config.xAxis.axisTick.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u523B\u5EA6\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.axisTick.width,"onUpdate:modelValue":o[78]||(o[78]=e=>l.config.xAxis.axisTick.width=e),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(t,{modelValue:l.config.xAxis.axisTick.type,"onUpdate:modelValue":o[79]||(o[79]=e=>l.config.xAxis.axisTick.type=e),data:l.lineStyles,inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.xAxis.axisTick.color,"onUpdate:modelValue":o[80]||(o[80]=e=>l.config.xAxis.axisTick.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u8F74\u6807\u7B7E",modelValue:l.config.xAxis.axisLabel.show,"onUpdate:modelValue":o[90]||(o[90]=e=>l.config.xAxis.axisLabel.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u663E\u793A\u683C\u5F0F",tooltip:"\u6574\u6570\u53C2\u7167 d, \u6D6E\u70B9\u53C2\u7167 .1f"},{default:n(()=>[i(t,{modelValue:l.config.xAxis.axisLabel.valueFormat,"onUpdate:modelValue":o[82]||(o[82]=e=>l.config.xAxis.axisLabel.valueFormat=e),data:l.valueFormats},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u4E24\u7AEF\u95F4\u8DDD"},{default:n(()=>[i(d,{modelValue:l.config.xAxis.axisLabel.boundaryGap,"onUpdate:modelValue":o[83]||(o[83]=e=>l.config.xAxis.axisLabel.boundaryGap=e),min:0,max:100,step:1,suffix:"%"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.axisLabel.display.rotate,"onUpdate:modelValue":o[84]||(o[84]=e=>l.config.xAxis.axisLabel.display.rotate=e),min:0,max:360,step:1,suffix:"\u5EA6",inline:"inline",label:"\u65CB\u8F6C"},null,8,["modelValue"]),i(d,{modelValue:l.config.xAxis.axisLabel.display.margin,"onUpdate:modelValue":o[85]||(o[85]=e=>l.config.xAxis.axisLabel.display.margin=e),min:-100,max:100,step:1,suffix:"px",inline:"inline",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u5BF9\u9F50\u65B9\u5F0F"},{default:n(()=>[i(t,{modelValue:l.config.xAxis.axisLabel.align,"onUpdate:modelValue":o[86]||(o[86]=e=>l.config.xAxis.axisLabel.align=e),data:l.hAligns},null,8,["modelValue","data"])]),_:1}),i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.xAxis.axisLabel.textStyle.fontSize,"onUpdate:modelValue":o[87]||(o[87]=e=>l.config.xAxis.axisLabel.textStyle.fontSize=e),min:10,max:100,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.xAxis.axisLabel.textStyle.fontWeight,"onUpdate:modelValue":o[88]||(o[88]=e=>l.config.xAxis.axisLabel.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.xAxis.axisLabel.textStyle.color,"onUpdate:modelValue":o[89]||(o[89]=e=>l.config.xAxis.axisLabel.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u7F51\u683C\u7EBF",modelValue:l.config.xAxis.grid.show,"onUpdate:modelValue":o[96]||(o[96]=e=>l.config.xAxis.grid.show=e),toggle:""},{default:n(()=>[i(a,{label:"\u7EBF\u578B\u6837\u5F0F",flat:""},{default:n(()=>[i(t,{modelValue:l.config.xAxis.grid.line.type,"onUpdate:modelValue":o[91]||(o[91]=e=>l.config.xAxis.grid.line.type=e),data:l.lineStyles,inline:"inline",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(d,{modelValue:l.config.xAxis.grid.line.width,"onUpdate:modelValue":o[92]||(o[92]=e=>l.config.xAxis.grid.line.width=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u7C97\u7EC6"},null,8,["modelValue"]),i(m,{modelValue:l.config.xAxis.grid.line.color,"onUpdate:modelValue":o[93]||(o[93]=e=>l.config.xAxis.grid.line.color=e),inline:"inline-single",label:"\u989C\u8272"},null,8,["modelValue"]),l.config.xAxis.grid.line.type==="dashed"?(g(),V(d,{key:0,modelValue:l.config.xAxis.grid.line.dashedLength,"onUpdate:modelValue":o[94]||(o[94]=e=>l.config.xAxis.grid.line.dashedLength=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u957F\u5EA6"},null,8,["modelValue"])):r("",!0),l.config.xAxis.grid.line.type==="dashed"?(g(),V(d,{key:1,modelValue:l.config.xAxis.grid.line.dashedSpace,"onUpdate:modelValue":o[95]||(o[95]=e=>l.config.xAxis.grid.line.dashedSpace=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u95F4\u8DDD"},null,8,["modelValue"])):r("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),i(f,{label:"\u63D0\u793A\u6846",toggle:"",modelValue:l.config.tooltip.show,"onUpdate:modelValue":o[109]||(o[109]=e=>l.config.tooltip.show=e)},{default:n(()=>[i(a,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.tooltip.textStyle.fontSize,"onUpdate:modelValue":o[98]||(o[98]=e=>l.config.tooltip.textStyle.fontSize=e),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),i(t,{modelValue:l.config.tooltip.textStyle.fontWeight,"onUpdate:modelValue":o[99]||(o[99]=e=>l.config.tooltip.textStyle.fontWeight=e),data:l.fontWeights,inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),i(m,{modelValue:l.config.tooltip.textStyle.color,"onUpdate:modelValue":o[100]||(o[100]=e=>l.config.tooltip.textStyle.color=e),label:"\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u80CC\u666F\u6837\u5F0F",flat:""},{default:n(()=>[i(d,{modelValue:l.config.tooltip.background.padding.h,"onUpdate:modelValue":o[101]||(o[101]=e=>l.config.tooltip.background.padding.h=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u6C34\u5E73\u8FB9\u8DDD"},null,8,["modelValue"]),i(d,{modelValue:l.config.tooltip.background.padding.v,"onUpdate:modelValue":o[102]||(o[102]=e=>l.config.tooltip.background.padding.v=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u5782\u76F4\u8FB9\u8DDD"},null,8,["modelValue"]),i(m,{modelValue:l.config.tooltip.background.color,"onUpdate:modelValue":o[103]||(o[103]=e=>l.config.tooltip.background.color=e),label:"\u80CC\u666F\u989C\u8272",inline:"inline-single"},null,8,["modelValue"])]),_:1}),i(a,{label:"\u8F74\u6307\u793A\u5668",flat:""},{default:n(()=>[i(t,{modelValue:l.config.tooltip.pointer.line.type,"onUpdate:modelValue":o[104]||(o[104]=e=>l.config.tooltip.pointer.line.type=e),data:l.lineStyles,inline:"inline",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),i(d,{modelValue:l.config.tooltip.pointer.line.width,"onUpdate:modelValue":o[105]||(o[105]=e=>l.config.tooltip.pointer.line.width=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u7C97\u7EC6"},null,8,["modelValue"]),l.config.tooltip.pointer.line.type==="dashed"?(g(),V(d,{key:0,modelValue:l.config.tooltip.pointer.line.dashedLength,"onUpdate:modelValue":o[106]||(o[106]=e=>l.config.tooltip.pointer.line.dashedLength=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u957F\u5EA6"},null,8,["modelValue"])):r("",!0),l.config.tooltip.pointer.line.type==="dashed"?(g(),V(d,{key:1,modelValue:l.config.tooltip.pointer.line.dashedSpace,"onUpdate:modelValue":o[107]||(o[107]=e=>l.config.tooltip.pointer.line.dashedSpace=e),min:0,max:100,step:1,suffix:"px",inline:"inline",label:"\u95F4\u8DDD"},null,8,["modelValue"])):r("",!0),i(m,{modelValue:l.config.tooltip.pointer.line.color,"onUpdate:modelValue":o[108]||(o[108]=e=>l.config.tooltip.pointer.line.color=e),inline:"inline-single",label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),i(f,{label:"\u7CFB\u5217"},{default:n(()=>[(g(!0),b(A,null,p(l.config.series,(e,x)=>(g(),b(A,{key:x},[x<l.seriesCount?(g(),b("div",Q,[T("div",Z,[T("span",null,"\u7CFB\u5217"+S(x+1),1)]),i(a,{label:"\u586B\u5145\u7C7B\u578B"},{default:n(()=>[i(k,{modelValue:l.config.series[x].color.type,"onUpdate:modelValue":u=>l.config.series[x].color.type=u,type:"button",size:"mini"},{default:n(()=>[(g(!0),b(A,null,p(l.fillTypes,u=>(g(),V(w,{key:u.value,label:u.value},{default:n(()=>[W(S(u.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024),l.config.series[x].color.type==="solid"?(g(),V(a,{key:0,label:"\u989C\u8272\u914D\u7F6E"},{default:n(()=>[i(m,{modelValue:l.config.series[x].color.value,"onUpdate:modelValue":u=>l.config.series[x].color.value=u},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):(g(),b(A,{key:1},[i(a,{label:"\u5F00\u59CB\u989C\u8272"},{default:n(()=>[i(m,{modelValue:l.config.series[x].color.from,"onUpdate:modelValue":u=>l.config.series[x].color.from=u},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),i(a,{label:"\u7ED3\u675F\u989C\u8272"},{default:n(()=>[i(m,{modelValue:l.config.series[x].color.to,"onUpdate:modelValue":u=>l.config.series[x].color.to=u},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)],64))])):r("",!0)],64))),128))]),_:1})])}var el=E(J,[["render",c]]);export{el as default};
