import{ax as y,ay as v,aL as w,c as x,v as s,h as r,p as k,l as n,a9 as L,K as i,b as V,P as u,y as q,aI as I,aJ as K}from"./vendor-0bcca4c5.js";import{h as S,x as z,t as _,y as C}from"./index-bf286ad8.js";import{_ as T}from"./logo-39114ead.js";import"./chunk-brace-b1f520b9.js";import"./chunk-bin-ui-next-98c8f2d2.js";import"./chunk-bin-datav-bdc06cb1.js";import"./chunk-three-66e2f152.js";import"./chunk-particles.vue3-83a83be1.js";import"./chunk-mockjs-9e1335a8.js";const B={name:"Login",components:{BackgroundParticles:v(()=>L(()=>import("./index-bf286ad8.js").then(function(e){return e.a4}),["static/js/index-bf286ad8.js","static/css/index-1c17caf9.css","static/js/vendor-0bcca4c5.js","static/js/chunk-brace-b1f520b9.js","static/js/chunk-bin-ui-next-98c8f2d2.js","static/css/chunk-bin-ui-next-233b4550.css","static/js/chunk-bin-datav-bdc06cb1.js","static/css/chunk-bin-datav-b06db975.css","static/js/chunk-three-66e2f152.js","static/js/chunk-particles.vue3-83a83be1.js","static/js/chunk-mockjs-9e1335a8.js"]))},data(){return{formLogin:{username:"admin",password:"123456",verycode:"",uuid:""},loading:!1,rules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],verycode:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]},title:S.description}},methods:{...w(C,["setToken"]),submit(){this.$refs.loginForm.validate(async e=>{if(e){try{this.loading=!0;const{data:o}=await z(this.formLogin);await this.loginSuccess(o)}catch(o){_("login/requestFailed",o)}this.loading=!1}})},async loginSuccess(e){if(e.code==="00"){const o=e.data.accessToken;await this.setToken(o);const c=this.$route.query.redirect||"/";await this.$router.push({path:c})}else _("login/requestFailed",e)}}},g=e=>(I("data-v-78927c7a"),e=e(),K(),e),E={class:"page-login"},F={class:"layer"},P={class:"content",flex:"dir:top main:center cross:center"},A={class:"main",flex:"dir:top main:center cross:center"},N={class:"page-login--logo"},U=g(()=>r("img",{src:T,alt:"logo"},null,-1)),D={class:"form"},J=g(()=>r("div",{class:"footer"},null,-1));function O(e,o,c,R,t,a){const f=i("background-particles"),d=i("b-icon"),m=i("b-input"),p=i("b-form-item"),h=i("b-button"),b=i("b-form");return V(),x("div",E,[s(f),r("div",F,[r("div",P,[r("div",A,[r("div",N,[U,r("span",null,k(t.title),1)]),r("div",D,[s(b,{ref:"loginForm","label-position":"top",rules:t.rules,model:t.formLogin},{default:n(()=>[s(p,{prop:"username"},{default:n(()=>[s(m,{type:"text",modelValue:t.formLogin.username,"onUpdate:modelValue":o[0]||(o[0]=l=>t.formLogin.username=l),placeholder:"\u6D4B\u8BD5\u7528\u6237\u540D\uFF1Aadmin",size:"large",onKeydown:u(a.submit,["enter"])},{prefix:n(()=>[s(d,{name:"user",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(p,{prop:"password"},{default:n(()=>[s(m,{type:"password",modelValue:t.formLogin.password,"onUpdate:modelValue":o[1]||(o[1]=l=>t.formLogin.password=l),placeholder:"\u6D4B\u8BD5\u5BC6\u7801\uFF1A123456",size:"large",onKeydown:u(a.submit,["enter"])},{prefix:n(()=>[s(d,{name:"lock",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),s(h,{onClick:a.submit,loading:t.loading,type:"primary",class:"button-login",size:"large"},{default:n(()=>[q(" \u767B\u5F55 ")]),_:1},8,["onClick","loading"])]),_:1},8,["rules","model"])])]),J])])])}var $=y(B,[["render",O],["__scopeId","data-v-78927c7a"]]);export{$ as default};
