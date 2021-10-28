import{l as y,t as _,f as v}from"./index-89bf360d.js";import{a4 as x,J as i,o as g,A as f,B as o,F as V,K as k,t as L,u as t,w as r,H as p,a8 as K,a9 as q,q as F}from"./vendor-0fc4fabe.js";import"./chunk-bin-ui-next-51eb6328.js";import"./chunk-brace-7fd40d4c.js";var S="/bin-datav-schema/static/png/login-code-8c841f1c.png";const j={name:"Login",data(){return{formLogin:{username:"admin",password:"admin",captcha:"v9am"},loading:!1,rules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],captcha:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]}}},methods:{submit(){this.$refs.loginForm.validate(async s=>{if(s){try{this.loading=!0;const{data:e}=await y(this.formLogin);await this.loginSuccess(e)}catch(e){_("login/requestFailed",e)}this.loading=!1}})},async loginSuccess(s){if(s.code==="00"){const e=s.data.accessToken;await this.$store.dispatch("user/setToken",e);const u=this.$route.query.redirect||"/";await this.$router.push({path:u})}else _("login/requestFailed",s)}}},h=s=>(K("data-v-64823562"),s=s(),q(),s),z={class:"page-login"},B={class:"layer area"},C={class:"circles"},I={class:"layer"},N={class:"content",flex:"dir:top main:center cross:center"},T={class:"main",flex:"dir:top main:center cross:center"},U={class:"page-login--logo"},E=h(()=>o("img",{src:v,alt:"logo"},null,-1)),A={class:"form"},D=h(()=>o("span",{class:"login-code"},[o("img",{src:S,alt:"code"})],-1)),H=F(" \u767B\u5F55 ");function J(s,e,u,G,n,l){const c=i("b-icon"),d=i("b-input"),m=i("b-form-item"),b=i("b-button"),w=i("b-form");return g(),f("div",z,[o("div",B,[o("ul",C,[(g(),f(V,null,k(10,a=>o("li",{key:a})),64))])]),o("div",I,[o("div",N,[o("div",T,[o("div",U,[E,o("span",null,L(s.$store.state.app.projectName),1)]),o("div",A,[t(w,{ref:"loginForm","label-position":"top",rules:n.rules,model:n.formLogin,size:"large"},{default:r(()=>[t(m,{prop:"username"},{default:r(()=>[t(d,{type:"text",modelValue:n.formLogin.username,"onUpdate:modelValue":e[0]||(e[0]=a=>n.formLogin.username=a),placeholder:"\u7528\u6237\u540D[admin,wang]",onKeydown:p(l.submit,["enter"])},{prefix:r(()=>[t(c,{name:"user",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),t(m,{prop:"password"},{default:r(()=>[t(d,{type:"password",modelValue:n.formLogin.password,"onUpdate:modelValue":e[1]||(e[1]=a=>n.formLogin.password=a),placeholder:"\u5BC6\u7801[admin,123456]",onKeydown:p(l.submit,["enter"])},{prefix:r(()=>[t(c,{name:"lock",size:"16"})]),_:1},8,["modelValue","onKeydown"])]),_:1}),t(m,{prop:"captcha"},{default:r(()=>[t(d,{type:"text",modelValue:n.formLogin.captcha,"onUpdate:modelValue":e[2]||(e[2]=a=>n.formLogin.captcha=a),placeholder:"- - - -",style:{width:"68%"},onKeydown:p(l.submit,["enter"])},{prefix:r(()=>[t(c,{name:"bulb",size:"16"})]),_:1},8,["modelValue","onKeydown"]),D]),_:1}),t(b,{onClick:l.submit,loading:n.loading,type:"primary",class:"button-login",size:"large"},{default:r(()=>[H]),_:1},8,["onClick","loading"])]),_:1},8,["rules","model"])])])])])])}var R=x(j,[["render",J],["__scopeId","data-v-64823562"]]);export{R as default};
