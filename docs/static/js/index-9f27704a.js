var V=Object.defineProperty;var v=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var h=(o,a,e)=>a in o?V(o,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[a]=e,y=(o,a)=>{for(var e in a||(a={}))M.call(a,e)&&h(o,e,a[e]);if(v)for(var e of v(a))k.call(a,e)&&h(o,e,a[e]);return o};import{a4 as z,f as w,J as c,o as d,A as i,u as p,w as j,B as n,I as C,a as b,t as T,a8 as B,a9 as E}from"./vendor-0fc4fabe.js";import{a as x}from"./chunk-bin-ui-next-51eb6328.js";import"./chunk-brace-7fd40d4c.js";const U=(o,a)=>{const e=y({allowType:"jpeg|jpg|png",allowSize:2},a);return new RegExp(`\\.(${e.allowType})$`,"i").test(o.name)?o.size/1024/1024>e.allowSize?(x.error(`\u4E0A\u4F20\u56FE\u7247\u7684\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 ${e.allowSize}MB\uFF01`),!1):!0:(x.error(`\u4E0A\u4F20\u56FE\u7247\u7684\u683C\u5F0F\u53EA\u80FD\u662F ${e.allowType} \u4E2D\u7684\u4E00\u79CD\uFF01`),!1)};const A={name:"g-upload-img",props:{modelValue:{type:String,required:!0},allowType:{type:String,default:"jpeg|jpg|png"},size:{type:Number,default:2},label:{type:String,default:""},prefixIcon:{type:String,default:"link"},images:{type:Array,default:()=>[]}},emits:["update:modelValue"],setup(o,a){const e=w(!1),l=w(!1),_=t=>{if(!U(t,{allowType:o.allowType,allowSize:o.size}))return!1;try{const r=new FileReader;r.readAsDataURL(t),r.onload=I=>{const S=I.target.result;s(S)}}catch(r){console.warn(r)}return!1},g=()=>{o.modelValue&&(l.value=!0)},u=()=>{l.value=!1},s=t=>{a.emit("update:modelValue",t)};return{loading:e,visibleCover:l,handleUpload:_,handleMouseEnter:g,handleMouseLeave:u,removeImage:()=>{s(""),l.value=!1},handleInput:s}}},m=o=>(B("data-v-8de77640"),o=o(),E(),o),L={class:"dv-gui g-upload"},N={class:"g-upload-image-content"},R=["src"],D={key:1,class:"g-upload-tip",flex:"dir:top main:center cross:center"},q=m(()=>n("p",null,"\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC\u66F4\u6362",-1)),F={key:0,class:"g-upload-image-cover"},J=m(()=>n("span",null,"\u66F4\u6539",-1)),G=m(()=>n("p",{style:{padding:"0 10px"}},"|",-1)),H={key:0,class:"g-input__caption"};function K(o,a,e,l,_,g){const u=c("b-input"),s=c("b-icon"),f=c("b-upload");return d(),i("div",L,[p(u,{"model-value":e.modelValue,placeholder:"\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740",prefix:e.prefixIcon,size:"small","onUpdate:modelValue":l.handleInput},null,8,["model-value","prefix","onUpdate:modelValue"]),p(f,{action:"","before-upload":l.handleUpload,"show-upload-list":!1},{default:j(()=>[n("div",{class:"g-upload-image-wrap",onMouseenter:a[1]||(a[1]=(...t)=>l.handleMouseEnter&&l.handleMouseEnter(...t)),onMouseleave:a[2]||(a[2]=(...t)=>l.handleMouseLeave&&l.handleMouseLeave(...t))},[n("div",N,[e.modelValue?(d(),i("img",{key:0,src:e.modelValue,alt:""},null,8,R)):(d(),i("div",D,[p(s,{name:"image",size:"52"}),q]))]),l.visibleCover?(d(),i("div",F,[J,G,n("span",{onClick:a[0]||(a[0]=C((...t)=>l.removeImage&&l.removeImage(...t),["stop"]))},"\u5220\u9664")])):b("",!0)],32)]),_:1},8,["before-upload"]),e.label?(d(),i("span",H,T(e.label),1)):b("",!0)])}var Y=z(A,[["render",K],["__scopeId","data-v-8de77640"]]);export{Y as default};