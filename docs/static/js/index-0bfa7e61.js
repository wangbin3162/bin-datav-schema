import{as as v,J as i,o as a,A as t,u as y,w as u,F as c,K as _,c as p,B as b,t as r,a as C,D as V}from"./vendor-95729a87.js";import"./chunk-brace-269ffce0.js";const B={name:"GGroupSelect",props:{modelValue:{type:[String,Number],default:0},data:{type:Array,default:()=>[]},label:{type:String,default:""},size:{type:String,default:"small"},inline:{type:[Boolean,String],default:!1},disabled:Boolean},emits:["update:modelValue","change"],setup(g,o){return{handleInput:n=>{o.emit("update:modelValue",n)},handleChange:n=>{o.emit("change",n)}}}},k={style:{float:"right",color:"#666"}},x={key:0,class:"g-input__caption"};function S(g,o,e,s,n,z){const m=i("b-option"),h=i("b-option-group"),f=i("b-select");return a(),t("div",{class:V(["dv-gui g-select",[{"is-inline":!!e.inline,"is-single":e.inline==="inline-single","is-disabled":e.disabled}]])},[y(f,{"model-value":e.modelValue,size:e.size,disabled:e.disabled,"onUpdate:modelValue":s.handleInput,onChange:s.handleChange},{default:u(()=>[(a(!0),t(c,null,_(e.data,d=>(a(),p(h,{key:d.group,label:d.group},{default:u(()=>[(a(!0),t(c,null,_(d.data,l=>(a(),p(m,{key:l.value,label:l.label,value:l.value},{default:u(()=>[b("span",null,r(l.label),1),b("span",k,r(l.value),1)]),_:2},1032,["label","value"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["model-value","size","disabled","onUpdate:modelValue","onChange"]),e.label?(a(),t("span",x,r(e.label),1)):C("",!0)],2)}var w=v(B,[["render",S],["__scopeId","data-v-0ef344bb"]]);export{w as default};
