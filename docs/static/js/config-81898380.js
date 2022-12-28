import{d as f,t as C,b as A,h as B,l as G,o as q,c as E,i as I}from"./select-options-04fab100.js";import{j as N,K as b,b as V,c as r,v as t,l as i,a1 as l,h as L,k as g,e as U,F as S,d as w,y as j,p as k}from"./vendor-4c8a7a86.js";import"./chunk-echarts-cf4087a0.js";import"./chunk-brace-b1f520b9.js";const K={class:"setting-panel-gui"},O={class:"pt-5"},X={class:"pt-5"},Y={key:0},H={class:"series-title"},Z={__name:"config",props:{data:{type:Object,required:!0}},setup(D){const T=D,e=N(()=>T.data.config),F=N(()=>T.data.apiData.config.seriesCount);return(J,o)=>{const n=b("g-input-number"),d=b("g-field"),y=b("g-input"),u=b("g-select"),s=b("g-field-collapse"),W=b("b-switch"),m=b("g-color-picker"),v=b("b-radio"),z=b("b-radio-group");return V(),r("div",K,[t(s,{label:"\u5168\u5C40",modal:""},{default:i(()=>[t(d,{label:"\u8FB9\u8DDD",flat:""},{default:i(()=>[t(n,{modelValue:l(e).global.margin.top,"onUpdate:modelValue":o[0]||(o[0]=a=>l(e).global.margin.top=a),min:0,max:300,step:1,suffix:"px",inline:"",label:"\u9876\u90E8"},null,8,["modelValue"]),t(n,{modelValue:l(e).global.margin.bottom,"onUpdate:modelValue":o[1]||(o[1]=a=>l(e).global.margin.bottom=a),min:0,max:300,step:1,suffix:"px",inline:"",label:"\u5E95\u90E8"},null,8,["modelValue"]),t(n,{modelValue:l(e).global.margin.left,"onUpdate:modelValue":o[2]||(o[2]=a=>l(e).global.margin.left=a),min:0,max:300,step:1,suffix:"px",inline:"",label:"\u5DE6\u4FA7"},null,8,["modelValue"]),t(n,{modelValue:l(e).global.margin.right,"onUpdate:modelValue":o[3]||(o[3]=a=>l(e).global.margin.right=a),min:0,max:300,step:1,suffix:"px",inline:"",label:"\u53F3\u4FA7"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u76D2\u5B50\u5BBD\u5EA6",flat:""},{default:i(()=>[t(y,{modelValue:l(e).global.boxWidth[0],"onUpdate:modelValue":o[4]||(o[4]=a=>l(e).global.boxWidth[0]=a),inline:"",label:"\u6700\u5C0F\u503C"},null,8,["modelValue"]),t(y,{modelValue:l(e).global.boxWidth[1],"onUpdate:modelValue":o[5]||(o[5]=a=>l(e).global.boxWidth[1]=a),inline:"",label:"\u6700\u5927\u503C"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u56FE\u5F62",flat:""},{default:i(()=>[t(n,{modelValue:l(e).global.itemStyle.borderWidth,"onUpdate:modelValue":o[6]||(o[6]=a=>l(e).global.itemStyle.borderWidth=a),min:0,max:5,step:1,inline:"",label:"\u63CF\u8FB9\u7EBF\u5BBD"},null,8,["modelValue"]),t(u,{modelValue:l(e).global.itemStyle.borderType,"onUpdate:modelValue":o[7]||(o[7]=a=>l(e).global.itemStyle.borderType=a),data:l(f),inline:"",label:"\u63CF\u8FB9\u7C7B\u578B"},null,8,["modelValue","data"])]),_:1})]),_:1}),t(s,{label:"X\u8F74",modal:"",toggle:"",modelValue:l(e).xAxis.show,"onUpdate:modelValue":o[38]||(o[38]=a=>l(e).xAxis.show=a)},{default:i(()=>[t(d,{label:"\u5206\u9694\u533A\u57DF"},{default:i(()=>[L("div",O,[t(W,{modelValue:l(e).xAxis.splitArea.show,"onUpdate:modelValue":o[8]||(o[8]=a=>l(e).xAxis.splitArea.show=a),size:"small"},null,8,["modelValue"])])]),_:1}),t(s,{label:"\u8F74\u6807\u9898",modelValue:l(e).xAxis.title.show,"onUpdate:modelValue":o[16]||(o[16]=a=>l(e).xAxis.title.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u6807\u9898\u663E\u793A"},{default:i(()=>[t(y,{modelValue:l(e).xAxis.title.name,"onUpdate:modelValue":o[9]||(o[9]=a=>l(e).xAxis.title.name=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u4F4D\u7F6E"},{default:i(()=>[t(u,{modelValue:l(e).xAxis.title.location,"onUpdate:modelValue":o[10]||(o[10]=a=>l(e).xAxis.title.location=a),data:l(C)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).xAxis.title.display.rotate,"onUpdate:modelValue":o[11]||(o[11]=a=>l(e).xAxis.title.display.rotate=a),min:0,max:360,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),t(n,{modelValue:l(e).xAxis.title.display.offset,"onUpdate:modelValue":o[12]||(o[12]=a=>l(e).xAxis.title.display.offset=a),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).xAxis.title.textStyle.fontSize,"onUpdate:modelValue":o[13]||(o[13]=a=>l(e).xAxis.title.textStyle.fontSize=a),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).xAxis.title.textStyle.fontWeight,"onUpdate:modelValue":o[14]||(o[14]=a=>l(e).xAxis.title.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).xAxis.title.textStyle.color,"onUpdate:modelValue":o[15]||(o[15]=a=>l(e).xAxis.title.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u7EBF",modelValue:l(e).xAxis.axisLine.show,"onUpdate:modelValue":o[20]||(o[20]=a=>l(e).xAxis.axisLine.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u8F74\u7EBF\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).xAxis.axisLine.width,"onUpdate:modelValue":o[17]||(o[17]=a=>l(e).xAxis.axisLine.width=a),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(u,{modelValue:l(e).xAxis.axisLine.type,"onUpdate:modelValue":o[18]||(o[18]=a=>l(e).xAxis.axisLine.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).xAxis.axisLine.color,"onUpdate:modelValue":o[19]||(o[19]=a=>l(e).xAxis.axisLine.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u523B\u5EA6",modelValue:l(e).xAxis.axisTick.show,"onUpdate:modelValue":o[24]||(o[24]=a=>l(e).xAxis.axisTick.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u523B\u5EA6\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).xAxis.axisTick.width,"onUpdate:modelValue":o[21]||(o[21]=a=>l(e).xAxis.axisTick.width=a),inline:"",min:0,max:5,label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(u,{modelValue:l(e).xAxis.axisTick.type,"onUpdate:modelValue":o[22]||(o[22]=a=>l(e).xAxis.axisTick.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).xAxis.axisTick.color,"onUpdate:modelValue":o[23]||(o[23]=a=>l(e).xAxis.axisTick.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u6807\u7B7E",modelValue:l(e).xAxis.axisLabel.show,"onUpdate:modelValue":o[31]||(o[31]=a=>l(e).xAxis.axisLabel.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u5355\u4F4D"},{default:i(()=>[t(y,{modelValue:l(e).xAxis.axisLabel.formatter,"onUpdate:modelValue":o[25]||(o[25]=a=>l(e).xAxis.axisLabel.formatter=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u95F4\u9694",tooltip:"\u9ED8\u8BA4\u4F1A\u91C7\u7528\u6807\u7B7E\u4E0D\u91CD\u53E0\u7684\u7B56\u7565\u95F4\u9694\u663E\u793A\u6807\u7B7E\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u6210 0 \u5F3A\u5236\u663E\u793A\u6240\u6709\u6807\u7B7E\u3002"},{default:i(()=>[t(y,{modelValue:l(e).xAxis.axisLabel.interval,"onUpdate:modelValue":o[26]||(o[26]=a=>l(e).xAxis.axisLabel.interval=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5BF9\u9F50\u65B9\u5F0F"},{default:i(()=>[t(u,{modelValue:l(e).xAxis.axisLabel.align,"onUpdate:modelValue":o[27]||(o[27]=a=>l(e).xAxis.axisLabel.align=a),data:l(B)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).xAxis.axisLabel.textStyle.fontSize,"onUpdate:modelValue":o[28]||(o[28]=a=>l(e).xAxis.axisLabel.textStyle.fontSize=a),min:10,max:100,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).xAxis.axisLabel.textStyle.fontWeight,"onUpdate:modelValue":o[29]||(o[29]=a=>l(e).xAxis.axisLabel.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).xAxis.axisLabel.textStyle.color,"onUpdate:modelValue":o[30]||(o[30]=a=>l(e).xAxis.axisLabel.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u7F51\u683C\u7EBF",modelValue:l(e).xAxis.grid.show,"onUpdate:modelValue":o[37]||(o[37]=a=>l(e).xAxis.grid.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u7EBF\u578B\u6837\u5F0F",flat:""},{default:i(()=>[t(u,{modelValue:l(e).xAxis.grid.line.type,"onUpdate:modelValue":o[32]||(o[32]=a=>l(e).xAxis.grid.line.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(n,{modelValue:l(e).xAxis.grid.line.width,"onUpdate:modelValue":o[33]||(o[33]=a=>l(e).xAxis.grid.line.width=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(m,{modelValue:l(e).xAxis.grid.line.color,"onUpdate:modelValue":o[34]||(o[34]=a=>l(e).xAxis.grid.line.color=a),label:"\u989C\u8272"},null,8,["modelValue"]),l(e).xAxis.grid.line.type==="dashed"?(V(),g(n,{key:0,modelValue:l(e).xAxis.grid.line.dashedLength,"onUpdate:modelValue":o[35]||(o[35]=a=>l(e).xAxis.grid.line.dashedLength=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u957F\u5EA6"},null,8,["modelValue"])):U("",!0),l(e).xAxis.grid.line.type==="dashed"?(V(),g(n,{key:1,modelValue:l(e).xAxis.grid.line.dashedSpace,"onUpdate:modelValue":o[36]||(o[36]=a=>l(e).xAxis.grid.line.dashedSpace=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u95F4\u8DDD"},null,8,["modelValue"])):U("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),t(s,{label:"Y\u8F74",modal:"",toggle:"",modelValue:l(e).yAxis.show,"onUpdate:modelValue":o[70]||(o[70]=a=>l(e).yAxis.show=a)},{default:i(()=>[t(d,{label:"\u5206\u9694\u533A\u57DF"},{default:i(()=>[L("div",X,[t(W,{modelValue:l(e).yAxis.splitArea.show,"onUpdate:modelValue":o[39]||(o[39]=a=>l(e).yAxis.splitArea.show=a),size:"small"},null,8,["modelValue"])])]),_:1}),t(s,{label:"\u8F74\u6807\u9898",modelValue:l(e).yAxis.title.show,"onUpdate:modelValue":o[47]||(o[47]=a=>l(e).yAxis.title.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u6807\u9898\u663E\u793A"},{default:i(()=>[t(y,{modelValue:l(e).yAxis.title.name,"onUpdate:modelValue":o[40]||(o[40]=a=>l(e).yAxis.title.name=a)},null,8,["modelValue"])]),_:1}),t(d,{label:"\u4F4D\u7F6E"},{default:i(()=>[t(u,{modelValue:l(e).yAxis.title.location,"onUpdate:modelValue":o[41]||(o[41]=a=>l(e).yAxis.title.location=a),data:l(C)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.title.display.rotate,"onUpdate:modelValue":o[42]||(o[42]=a=>l(e).yAxis.title.display.rotate=a),min:0,max:360,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),t(n,{modelValue:l(e).yAxis.title.display.offset,"onUpdate:modelValue":o[43]||(o[43]=a=>l(e).yAxis.title.display.offset=a),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.title.textStyle.fontSize,"onUpdate:modelValue":o[44]||(o[44]=a=>l(e).yAxis.title.textStyle.fontSize=a),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).yAxis.title.textStyle.fontWeight,"onUpdate:modelValue":o[45]||(o[45]=a=>l(e).yAxis.title.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).yAxis.title.textStyle.color,"onUpdate:modelValue":o[46]||(o[46]=a=>l(e).yAxis.title.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u7EBF",modelValue:l(e).yAxis.axisLine.show,"onUpdate:modelValue":o[51]||(o[51]=a=>l(e).yAxis.axisLine.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u8F74\u7EBF\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.axisLine.width,"onUpdate:modelValue":o[48]||(o[48]=a=>l(e).yAxis.axisLine.width=a),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(u,{modelValue:l(e).yAxis.axisLine.type,"onUpdate:modelValue":o[49]||(o[49]=a=>l(e).yAxis.axisLine.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).yAxis.axisLine.color,"onUpdate:modelValue":o[50]||(o[50]=a=>l(e).yAxis.axisLine.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u523B\u5EA6",modelValue:l(e).yAxis.axisTick.show,"onUpdate:modelValue":o[55]||(o[55]=a=>l(e).yAxis.axisTick.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u523B\u5EA6\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.axisTick.width,"onUpdate:modelValue":o[52]||(o[52]=a=>l(e).yAxis.axisTick.width=a),min:0,max:5,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(u,{modelValue:l(e).yAxis.axisTick.type,"onUpdate:modelValue":o[53]||(o[53]=a=>l(e).yAxis.axisTick.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).yAxis.axisTick.color,"onUpdate:modelValue":o[54]||(o[54]=a=>l(e).yAxis.axisTick.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u8F74\u6807\u7B7E",modelValue:l(e).yAxis.axisLabel.show,"onUpdate:modelValue":o[63]||(o[63]=a=>l(e).yAxis.axisLabel.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u4E24\u7AEF\u95F4\u8DDD"},{default:i(()=>[t(n,{modelValue:l(e).yAxis.axisLabel.boundaryGap,"onUpdate:modelValue":o[56]||(o[56]=a=>l(e).yAxis.axisLabel.boundaryGap=a),min:0,max:100,step:1,suffix:"%"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5C55\u793A\u65B9\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.axisLabel.display.rotate,"onUpdate:modelValue":o[57]||(o[57]=a=>l(e).yAxis.axisLabel.display.rotate=a),min:0,max:360,step:1,suffix:"\u5EA6",inline:"",label:"\u65CB\u8F6C"},null,8,["modelValue"]),t(n,{modelValue:l(e).yAxis.axisLabel.display.margin,"onUpdate:modelValue":o[58]||(o[58]=a=>l(e).yAxis.axisLabel.display.margin=a),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u504F\u79FB"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u5BF9\u9F50\u65B9\u5F0F"},{default:i(()=>[t(u,{modelValue:l(e).yAxis.axisLabel.align,"onUpdate:modelValue":o[59]||(o[59]=a=>l(e).yAxis.axisLabel.align=a),data:l(B)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).yAxis.axisLabel.textStyle.fontSize,"onUpdate:modelValue":o[60]||(o[60]=a=>l(e).yAxis.axisLabel.textStyle.fontSize=a),min:10,max:100,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).yAxis.axisLabel.textStyle.fontWeight,"onUpdate:modelValue":o[61]||(o[61]=a=>l(e).yAxis.axisLabel.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).yAxis.axisLabel.textStyle.color,"onUpdate:modelValue":o[62]||(o[62]=a=>l(e).yAxis.axisLabel.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u7F51\u683C\u7EBF",modelValue:l(e).yAxis.grid.show,"onUpdate:modelValue":o[69]||(o[69]=a=>l(e).yAxis.grid.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u7EBF\u578B\u6837\u5F0F",flat:""},{default:i(()=>[t(u,{modelValue:l(e).yAxis.grid.line.type,"onUpdate:modelValue":o[64]||(o[64]=a=>l(e).yAxis.grid.line.type=a),data:l(f),inline:"",label:"\u7C7B\u578B"},null,8,["modelValue","data"]),t(n,{modelValue:l(e).yAxis.grid.line.width,"onUpdate:modelValue":o[65]||(o[65]=a=>l(e).yAxis.grid.line.width=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u7C97\u7EC6"},null,8,["modelValue"]),t(m,{modelValue:l(e).yAxis.grid.line.color,"onUpdate:modelValue":o[66]||(o[66]=a=>l(e).yAxis.grid.line.color=a),label:"\u989C\u8272"},null,8,["modelValue"]),l(e).yAxis.grid.line.type==="dashed"?(V(),g(n,{key:0,modelValue:l(e).yAxis.grid.line.dashedLength,"onUpdate:modelValue":o[67]||(o[67]=a=>l(e).yAxis.grid.line.dashedLength=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u957F\u5EA6"},null,8,["modelValue"])):U("",!0),l(e).yAxis.grid.line.type==="dashed"?(V(),g(n,{key:1,modelValue:l(e).yAxis.grid.line.dashedSpace,"onUpdate:modelValue":o[68]||(o[68]=a=>l(e).yAxis.grid.line.dashedSpace=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u95F4\u8DDD"},null,8,["modelValue"])):U("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),t(s,{label:"\u63D0\u793A\u6846",modal:"",toggle:"",modelValue:l(e).tooltip.show,"onUpdate:modelValue":o[77]||(o[77]=a=>l(e).tooltip.show=a)},{default:i(()=>[t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).tooltip.textStyle.fontSize,"onUpdate:modelValue":o[71]||(o[71]=a=>l(e).tooltip.textStyle.fontSize=a),min:10,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).tooltip.textStyle.fontWeight,"onUpdate:modelValue":o[72]||(o[72]=a=>l(e).tooltip.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).tooltip.textStyle.color,"onUpdate:modelValue":o[73]||(o[73]=a=>l(e).tooltip.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),t(d,{label:"\u80CC\u666F\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).tooltip.background.padding.h,"onUpdate:modelValue":o[74]||(o[74]=a=>l(e).tooltip.background.padding.h=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u6C34\u5E73\u8FB9\u8DDD"},null,8,["modelValue"]),t(n,{modelValue:l(e).tooltip.background.padding.v,"onUpdate:modelValue":o[75]||(o[75]=a=>l(e).tooltip.background.padding.v=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u5782\u76F4\u8FB9\u8DDD"},null,8,["modelValue"]),t(m,{modelValue:l(e).tooltip.background.color,"onUpdate:modelValue":o[76]||(o[76]=a=>l(e).tooltip.background.color=a),label:"\u80CC\u666F\u989C\u8272"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),t(s,{label:"\u56FE\u4F8B",modal:"",toggle:"",modelValue:l(e).legend.show,"onUpdate:modelValue":o[88]||(o[88]=a=>l(e).legend.show=a)},{default:i(()=>[t(d,{label:"\u4F4D\u7F6E"},{default:i(()=>[t(u,{modelValue:l(e).legend.position,"onUpdate:modelValue":o[78]||(o[78]=a=>l(e).legend.position=a),data:l(G)},null,8,["modelValue","data"])]),_:1}),t(d,{label:"\u5E03\u5C40\u65B9\u5F0F"},{default:i(()=>[t(z,{modelValue:l(e).legend.orient,"onUpdate:modelValue":o[79]||(o[79]=a=>l(e).legend.orient=a),type:"button",size:"mini"},{default:i(()=>[(V(!0),r(S,null,w(l(q),a=>(V(),g(v,{key:a.value,label:a.value},{default:i(()=>[j(k(a.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(d,{label:"\u6587\u672C\u6837\u5F0F",flat:""},{default:i(()=>[t(n,{modelValue:l(e).legend.textStyle.fontSize,"onUpdate:modelValue":o[80]||(o[80]=a=>l(e).legend.textStyle.fontSize=a),min:0,max:24,step:1,suffix:"px",inline:"",label:"\u5B57\u53F7"},null,8,["modelValue"]),t(u,{modelValue:l(e).legend.textStyle.fontWeight,"onUpdate:modelValue":o[81]||(o[81]=a=>l(e).legend.textStyle.fontWeight=a),data:l(A),inline:"",label:"\u5B57\u4F53\u7C97\u7EC6"},null,8,["modelValue","data"]),t(m,{modelValue:l(e).legend.textStyle.color,"onUpdate:modelValue":o[82]||(o[82]=a=>l(e).legend.textStyle.color=a),label:"\u989C\u8272"},null,8,["modelValue"])]),_:1}),t(s,{label:"\u56FE\u5F62",modelValue:l(e).legend.symbol.show,"onUpdate:modelValue":o[87]||(o[87]=a=>l(e).legend.symbol.show=a),toggle:""},{default:i(()=>[t(d,{label:"\u56FE\u4F8B",flat:""},{default:i(()=>[t(n,{modelValue:l(e).legend.symbol.width,"onUpdate:modelValue":o[83]||(o[83]=a=>l(e).legend.symbol.width=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u5BBD\u5EA6"},null,8,["modelValue"]),t(n,{modelValue:l(e).legend.symbol.height,"onUpdate:modelValue":o[84]||(o[84]=a=>l(e).legend.symbol.height=a),min:0,max:100,step:1,suffix:"px",inline:"",label:"\u9AD8\u5EA6"},null,8,["modelValue"]),t(n,{modelValue:l(e).legend.symbol.gap,"onUpdate:modelValue":o[85]||(o[85]=a=>l(e).legend.symbol.gap=a),min:-100,max:100,step:1,suffix:"px",inline:"",label:"\u95F4\u9694"},null,8,["modelValue"]),t(u,{modelValue:l(e).legend.symbol.icon,"onUpdate:modelValue":o[86]||(o[86]=a=>l(e).legend.symbol.icon=a),data:l(E),inline:"",label:"\u5F62\u72B6"},null,8,["modelValue","data"])]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),t(s,{label:"\u7CFB\u5217",modal:""},{default:i(()=>[(V(!0),r(S,null,w(l(e).series,(a,x)=>(V(),r(S,{key:x},[x<l(F)?(V(),r("div",Y,[L("div",H,[L("span",null,"\u7CFB\u5217"+k(x+1),1)]),t(d,{label:"\u63CF\u8FB9\u989C\u8272"},{default:i(()=>[t(m,{modelValue:l(e).series[x].borderColor,"onUpdate:modelValue":p=>l(e).series[x].borderColor=p},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(d,{label:"\u586B\u5145\u7C7B\u578B"},{default:i(()=>[t(z,{modelValue:l(e).series[x].color.type,"onUpdate:modelValue":p=>l(e).series[x].color.type=p,type:"button",size:"mini"},{default:i(()=>[(V(!0),r(S,null,w(l(I),p=>(V(),g(v,{key:p.value,label:p.value},{default:i(()=>[j(k(p.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(e).series[x].color.type==="solid"?(V(),g(d,{key:0,label:"\u989C\u8272\u914D\u7F6E"},{default:i(()=>[t(m,{modelValue:l(e).series[x].color.value,"onUpdate:modelValue":p=>l(e).series[x].color.value=p},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)):(V(),r(S,{key:1},[t(d,{label:"\u5F00\u59CB\u989C\u8272"},{default:i(()=>[t(m,{modelValue:l(e).series[x].color.from,"onUpdate:modelValue":p=>l(e).series[x].color.from=p},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(d,{label:"\u7ED3\u675F\u989C\u8272"},{default:i(()=>[t(m,{modelValue:l(e).series[x].color.to,"onUpdate:modelValue":p=>l(e).series[x].color.to=p},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)],64))])):U("",!0)],64))),128))]),_:1})])}}};export{Z as default};
