import{j as k,R as s,b as a,c as n,M as B,l as u,F as p,d as b,k as m,h as g,p as d,e as S}from"./vendor-c1103bdb.js";import"./chunk-brace-0dab6832.js";const x={class:"dv-gui g-select"},C={style:{float:"right",color:"var(--s-text-color-2)"}},z={key:0,class:"g-input__caption"},F=Object.assign({name:"GGroupSelect"},{__name:"index",props:{modelValue:{type:[String,Number],default:0},data:{type:Array,default:()=>[]},label:{type:String,default:""},size:{type:String,default:"small"},inline:{type:[Boolean,String],default:!1},disabled:Boolean},emits:["update:modelValue","change"],setup(e,{emit:_}){const r=_,f=e,c=k({get:()=>f.modelValue,set:o=>r("update:modelValue",o)}),v=o=>{r("change",o)};return(o,i)=>{const y=s("b-option"),V=s("b-option-group"),h=s("b-select");return a(),n("div",x,[B(h,{modelValue:c.value,"onUpdate:modelValue":i[0]||(i[0]=t=>c.value=t),size:e.size,disabled:e.disabled,onChange:v},{default:u(()=>[(a(!0),n(p,null,b(e.data,t=>(a(),m(V,{key:t.group,label:t.group},{default:u(()=>[(a(!0),n(p,null,b(t.data,l=>(a(),m(y,{key:l.value,label:l.label,value:l.value},{default:u(()=>[g("span",null,d(l.label),1),g("span",C,d(l.value),1)]),_:2},1032,["label","value"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","size","disabled"]),e.label?(a(),n("span",z,d(e.label),1)):S("",!0)])}}});export{F as default};
