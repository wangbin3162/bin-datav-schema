import{ad as c,j as y,r as b,w as g,R as x,b as u,c as i,M as V,p as m,e as o,h as r,z as _,a1 as w,O as S,q as h}from"./vendor-c1103bdb.js";import"./chunk-brace-0dab6832.js";const B={key:0,class:"g-input__caption"},N={key:1,class:"g-input__caption-input"},I={class:"g-input-number__number"},k={key:0,class:"g-input-number__suffix"},z=Object.assign({name:"GSlider"},{__name:"index",props:{modelValue:{type:[String,Number],default:""},label:{type:String,default:""},size:{type:String,default:"small"},inputSize:{type:String,default:"small"},min:{type:Number,default:-1/0},max:{type:Number,default:1/0},step:{type:Number,default:1},inline:{type:Boolean,default:!1},showInput:{type:Boolean,default:!0},suffix:String,disabled:Boolean},emits:["update:modelValue","change"],setup(e,{emit:p}){const f=p,d=e,l=y({get:()=>d.modelValue,set:s=>f("update:modelValue",s)}),a=b(0);return g(()=>d.modelValue,s=>{a.value=s},{immediate:!0}),(s,t)=>{const v=x("b-slider");return u(),i("div",{class:h(["dv-gui g-slider",{inline:e.inline,"show-input":e.showInput}])},[V(v,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=n=>l.value=n),min:e.min,max:e.max,step:e.step,"show-tooltip":!1},null,8,["modelValue","min","max","step"]),e.label?(u(),i("span",B,m(e.label),1)):o("",!0),e.showInput?(u(),i("div",N,[r("span",I,[_(r("input",{"onUpdate:modelValue":t[1]||(t[1]=n=>a.value=n),type:"number",onKeyup:t[2]||(t[2]=S(n=>l.value=a.value,["enter"])),onBlur:t[3]||(t[3]=n=>l.value=a.value)},null,544),[[w,a.value]])]),e.suffix?(u(),i("span",k,m(e.suffix),1)):o("",!0)])):o("",!0)],2)}}});var D=c(z,[["__scopeId","data-v-4367e138"]]);export{D as default};
