import{cL as v,r as _,K as y,b as w,c as h,h as u,i as x,v as T,D as r}from"./vendor-4c8a7a86.js";import{M as c}from"./chunk-bin-ui-next-b686a83e.js";import{r as z}from"./file-helper-e95db66d.js";import"./chunk-echarts-cf4087a0.js";import"./chunk-brace-b1f520b9.js";const D=(a,s)=>{const t={allowType:"jpeg|jpg|png",allowSize:2,...s};return new RegExp(`\\.(${t.allowType})$`,"i").test(a.name)?a.size/1024/1024>t.allowSize?(c.error(`\u4E0A\u4F20\u56FE\u7247\u7684\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 ${t.allowSize}MB\uFF01`),!1):!0:(c.error(`\u4E0A\u4F20\u56FE\u7247\u7684\u683C\u5F0F\u53EA\u80FD\u662F ${t.allowType} \u4E2D\u7684\u4E00\u79CD\uFF01`),!1)};const k=["onDrop"],B=["multiple","accept"],I={class:"g-upload-image-wrap"},S={__name:"index",props:{allowType:{type:String,default:"jpeg|jpg|png|svg|gif"},size:{type:Number,default:2},multiple:{type:Boolean,default:!1}},emits:["upload"],setup(a,{emit:s}){const t=a,n=_(null);function f(){n.value.click()}function d(l){const e=l.target.files;!e||(i(e),n.value.value=null)}function m(l){l.preventDefault(),i(l.dataTransfer.files)}function i(l){let e=Array.prototype.slice.call(l);t.multiple||(e=e.slice(0,1));const o=[];e.forEach(p=>{D(p,{allowType:t.allowType,allowSize:t.size})&&o.push(p)}),g(o)}function g(l){const e=l.map(o=>z(o));Promise.all(e).then(o=>{s("upload",o)})}return(l,e)=>{const o=y("b-icon");return w(),h("div",{class:"dv-gui g-upload",onClick:f,onDrop:r(m,["prevent"]),onDragover:e[0]||(e[0]=r(()=>{},["prevent"])),onDragleave:e[1]||(e[1]=r(()=>{},["prevent"]))},[u("input",{ref_key:"fileInputRef",ref:n,type:"file",class:"custom-file-input",multiple:a.multiple,accept:a.allowType,onChange:d},null,40,B),x(l.$slots,"default",{},()=>[u("div",I,[T(o,{name:"plus"})])],!0)],40,k)}}};var F=v(S,[["__scopeId","data-v-129847ad"]]);export{F as default};
