var y=Object.defineProperty;var d=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var m=(i,t,e)=>t in i?y(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,b=(i,t)=>{for(var e in t||(t={}))g.call(t,e)&&m(i,e,t[e]);if(d)for(var e of d(t))k.call(t,e)&&m(i,e,t[e]);return i};import{a4 as C,J as a,o as p,c as v,w as o,B as h,u as l,q as c,t as B,A as S,D as x,E as z,a as N,r as P,M as w}from"./vendor-0fc4fabe.js";const A={name:"ActionButton",props:{buttonProps:{type:Object},popperWidth:{type:Number,default:260},message:{type:String,default:"\u786E\u5B9A\u5220\u9664\u672C\u6761\u6570\u636E\u5417\uFF1F"},disabled:Boolean,confirm:Boolean,tooltip:String,icon:String,type:String,color:String,isIcon:Boolean,loading:Boolean,iconStyle:{type:Object,default:()=>({fontSize:"18px"})}},data(){return{visible:!1}},emits:["cancel","click"],computed:{btnProps(){return b({type:this.type,textColor:this.color,disabled:this.disabled,loading:this.loading},this.buttonProps)}},methods:{handleCancel(){this.visible=!1,this.$emit("cancel")},handleOk(){this.visible=!1,this.$emit("click")},handleClick(){this.confirm||this.$emit("click")}}},O={style:{"line-height":"22px","margin-bottom":"8px"}},V={style:{"text-align":"right",margin:"0"}},j=c("\u53D6\u6D88"),q=c("\u786E\u8BA4");function D(i,t,e,E,r,n){const s=a("b-button"),u=a("b-icon"),_=a("b-popover");return p(),v(_,{visible:r.visible,"onUpdate:visible":t[0]||(t[0]=f=>r.visible=f),width:e.popperWidth,disabled:!e.confirm},{content:o(()=>[h("p",O,[l(u,{name:"question-circle",size:"16",color:"#fa8c16"}),c(" "+B(e.message),1)]),h("div",V,[l(s,{size:"mini",type:"text",onClick:n.handleCancel},{default:o(()=>[j]),_:1},8,["onClick"]),l(s,{type:"primary",size:"mini",onClick:n.handleOk},{default:o(()=>[q]),_:1},8,["onClick"])])]),default:o(()=>[l(s,w(n.btnProps,{onClick:n.handleClick,title:e.tooltip}),{default:o(()=>[e.icon?(p(),S("i",{key:0,class:x(`b-iconfont b-icon-${e.icon}`),style:z(e.iconStyle)},null,6)):N("",!0),P(i.$slots,"default")]),_:3},16,["onClick","title"])]),_:3},8,["visible","width","disabled"])}var J=C(A,[["render",D]]);export{J as A};
