import{a4 as l,f as i,n as c,J as u,o as m,A as h,u as p}from"./vendor-0fc4fabe.js";import"./chunk-brace-7fd40d4c.js";const _={name:"data-editor",props:{modelValue:{type:String,default:""},height:{type:String,default:"260px"}},emits:["update:modelValue","change"],setup(r,t){const a=i(""),o=()=>{try{const n=JSON.parse(a.value),e=JSON.stringify(n);t.emit("update:modelValue",e),t.emit("change",e)}catch(n){}};return c(()=>r.modelValue,n=>{try{const e=JSON.parse(n);a.value=JSON.stringify(e,null,2)}catch(e){}},{immediate:!0,deep:!0}),{jsonData:a,handleChange:o}}},f={class:"data-editor"};function g(r,t,a,o,n,e){const d=u("b-ace-editor");return m(),h("div",f,[p(d,{modelValue:o.jsonData,"onUpdate:modelValue":t[0]||(t[0]=s=>o.jsonData=s),theme:"tomorrow_night",wrap:"",styles:{border:"none"},height:a.height,onBlur:o.handleChange},null,8,["modelValue","height","onBlur"])])}var V=l(_,[["render",g]]);export{V as default};
