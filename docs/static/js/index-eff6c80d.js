import{a as E}from"./chunk-bin-ui-next-b686a83e.js";import{cL as M,cw as T,cU as N,K as u,b as m,c as p,h as i,F as y,d as H,y as S,p as f,v,l as C,e as P,n as D,cS as L,cT as W,r as k,f as z,o as B,q as I,k as R,m as j}from"./vendor-4c8a7a86.js";import{e as F,h as $,a as A}from"./index-0b9505b3.js";import{_ as V}from"./logo-39114ead.js";import"./chunk-echarts-cf4087a0.js";import"./chunk-brace-b1f520b9.js";import"./chunk-bin-datav-cf728ffc.js";import"./chunk-particles.vue3-9bc75d83.js";import"./chunk-mockjs-9e1335a8.js";var q="/bin-datav-schema/static/jpeg/avatar05-2e078c6d.jpeg";const X={name:"NavHeader",props:{isFixed:{type:Boolean,default:!1}},setup(){const l=T(),e=N(),{userStore:s}=F();function t(n){n==="userCenter"&&e.push("/userCenter"),n==="logout"&&E.confirm({type:"warning",title:"\u786E\u8BA4\u9000\u51FA\u767B\u5F55\u5417\uFF1F"}).then(()=>{s.clearToken(),e.push(`/login?redirect=${l.fullPath}`)}).catch(o=>{console.log(o)})}return{handleClick:t,welcome:"Welcome to the data analysis system",version:$.version,title:$.description,userStore:s}}},w=l=>(L("data-v-dc3abeca"),l=l(),W(),l),G={class:"logo"},U={class:"top-tip"},K=w(()=>i("strong",{class:"tip-strong"},"\u516C\u544A",-1)),J={class:"dv-marquee"},O={class:"content"},Q=w(()=>i("span",{class:"content-space"},null,-1)),Y={class:"user"},Z={class:"header-item"},tt={class:"user-link-wrap"},et=w(()=>i("img",{src:q,class:"avatar",alt:"avatar"},null,-1)),nt={key:0,class:"user-link"},st={flex:"cross:center"},at=w(()=>i("span",{class:"ml-5"},"\u6CE8\u9500\u767B\u5F55",-1)),ot={class:"dv-nav"},it={class:"header-img"},rt={class:"nav-img-text"},ct=w(()=>i("img",{src:V,alt:"logo"},null,-1)),dt={class:"nav-welcome"},lt=w(()=>i("div",{class:"nav-img"},null,-1));function ht(l,e,s,t,n,o){const a=u("weather"),r=u("b-icon"),c=u("b-dropdown-item"),d=u("b-dropdown-menu"),b=u("b-dropdown");return m(),p("div",null,[i("div",{class:"dv-header",style:D({background:s.isFixed?"#171b22":""})},[i("div",G,[i("div",U,[K,i("div",J,[i("span",O,[(m(),p(y,null,H(2,h=>(m(),p(y,{key:h},[S(" \u6B22\u8FCE\u4F7F\u7528"+f(t.title)+"\uFF0C \u7248\u672C\u53F7\uFF1AV"+f(t.version)+"\uFF0C\u672C\u7CFB\u7EDF\u652F\u6301Chrome\u3001Edge\u3001Firefox\u7B49\u4E3B\u6D41\u6D4F\u89C8\u5668\u3002 ",1),Q],64))),64))])])])]),i("div",Y,[v(a),i("div",Z,[v(b,{onCommand:t.handleClick,"append-to-body":""},{dropdown:C(()=>[v(d,{style:{width:"120px"}},{default:C(()=>[v(c,{name:"logout"},{default:C(()=>[i("div",st,[v(r,{name:"logout",size:"16"}),at])]),_:1})]),_:1})]),default:C(()=>[i("div",tt,[et,t.userStore.userInfo?(m(),p("span",nt,[S(f(t.userStore.userInfo.realName)+" ",1),v(r,{name:"down"})])):P("",!0)])]),_:1},8,["onCommand"])])])],4),i("div",ot,[i("div",it,[i("div",rt,[ct,i("div",dt,[i("h2",null,f(t.title),1),i("h4",null,f(t.welcome),1)])]),lt])])])}var _t=M(X,[["render",ht],["__scopeId","data-v-dc3abeca"]]);class vt{constructor(e,s,t=0){this.j=.85,this.k=10,this.l=4,this.pattern=null,this.tabHeight=0,this.tabWidthList=[],this.opt={currentIndex:0,nextIndex:1,speed:1,timer:0,width:200,height:100,animating:!1,curDisX:0,distance:0},this.canvas=document.getElementById(e),this.tabs=document.querySelectorAll(s);const{opt:n}=this;this.calcTabs(),this.initCanvas(this.canvas,n.width,n.height),this.createPattern(this.canvas),this.startDraw(0),this.toggle(t)}calcTabs(){const{opt:e,tabs:s}=this,t=[];let n=0;s.forEach(o=>{t.push(n),n+=o.offsetWidth}),t[0]=-20,t.push(n),this.tabWidthList=t,this.tabHeight=s[0].offsetHeight+0,e.height=this.tabHeight+20,e.width=window.innerWidth}initCanvas(e,s,t){const n=e.getContext("2d"),{devicePixelRatio:o}=window;e.width=s*o,e.height=t*o,e.style.width=`${s}px`,e.style.height=`${t}px`,n.scale(o,o)}createPattern(e){const o=document.createElement("canvas");o.width=140,o.height=63,o.style.width=`${140/1}px`,o.style.height=`${63/1}px`;const a=o.getContext("2d");a.scale(1,1),a.lineWidth=.4;for(let r=3,c=.8,d=1;30>d;d++)a.strokeStyle=`RGBA(22, 120, 160, ${c})`,a.beginPath(),a.moveTo(0,d*r),a.lineTo(140,d*r),a.stroke(),a.closePath(),10<d&&(c-=.1);this.pattern=e.getContext("2d").createPattern(o,"repeat-x")}calcAVGSpeed(e){const{l:s,j:t,k:n}=this;let o=(s*t*e+n*(1-t)*e)/(n*s*20);return o=Math.max(Math.abs(o),2.5)*Math.sign(o),o}getCurSpeed(e,s){const{l:t,j:n,k:o,opt:a}=this;return Math.abs(e)>Math.abs(n*s)?t*a.speed:o*a.speed}calCurve(e,s,t,n,o,a){e.bezierCurveTo(s+a,t,n-a,o,n,o)}drawHightlight(e){const{opt:s}=this,t=this.canvas.getContext("2d"),n=.3;t.clearRect(0,0,2*s.width,2*s.height),t.shadowColor="rgba(36, 131, 255, 1)",t.shadowBlur=5,t.strokeStyle="#004CB3",t.lineWidth=.8,t.fillStyle="none",this.draw(t,!1);const o=t.createLinearGradient(0,0,s.width,s.height),a=e-n;o.addColorStop(Math.min(1,Math.max(0,0+a)),"rgba(0,0,0,0)"),o.addColorStop(Math.min(1,Math.max(0,0+a+.1)),"#8ed6ff"),o.addColorStop(Math.min(1,0+a+n),"#8ed6ff"),o.addColorStop(Math.min(1,0+a+n+.1),"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,0)"),t.lineWidth=1.5,t.strokeStyle=o,t.fillStyle=this.pattern,this.draw(t,!0)}startDraw(e){this.drawHightlight(e),this.opt.timer=requestAnimationFrame(()=>{this.startDraw((e+.005)%1.6)})}draw(e,s){const{opt:t,tabWidthList:n,tabHeight:o}=this,a=t.currentIndex,r=o,c=0,d=40,b=20,h=.5,x=2.5;let _=0;if(e.beginPath(),e.moveTo(-50,t.height+10),e.lineTo(-50,r+h),t.animating){const g=this.getCurSpeed(t.curDisX,t.distance);_=Math.min(Math.abs(t.distance),Math.abs(t.curDisX+g))*Math.sign(g)}if(e.lineTo(c+n[a]+_-d/2,r+h),this.calCurve(e,c+n[a]+_-d/2,r+h,c+n[a]+_+d/2,x+h,b),t.animating){const g=n[t.nextIndex+1]-n[t.nextIndex];e.lineTo(c+n[a]+g+_-d/2,x+h),this.calCurve(e,c+n[a]+g+_-d/2,x+h,c+n[a]+g+_+d/2,r+h,b)}else e.lineTo(c+n[a+1]+_-d/2,x+h),this.calCurve(e,c+n[a+1]+_-d/2,x+h,c+n[a+1]+_+d/2,r+h,b);e.lineTo(t.width+10,r+h),e.lineTo(t.width+10,t.height+10),e.closePath(),e.stroke(),s&&e.fill(),s&&t.animating&&(t.curDisX=_,Math.abs(_)>=Math.abs(t.distance)&&(t.animating=!1,t.currentIndex=t.nextIndex))}toggle(e){const{opt:s,tabWidthList:t}=this;e!==s.currentIndex&&t&&t.length&&(!s.animating||e!==s.nextIndex)&&(s.animating=!0,s.distance=t[e]-t[s.currentIndex],s.speed=this.calcAVGSpeed(s.distance),s.curDisX=0,s.nextIndex=e)}resize(){const{opt:e}=this;e.timer&&cancelAnimationFrame(e.timer),this.calcTabs(),this.initCanvas(this.canvas,e.width,e.height),this.startDraw(0)}}const mt={name:"nav-main",props:{navs:{type:Array,required:!0}},emits:["change"],setup(l,{emit:e}){const s=T(),t=k(0);let n=null;const o=(r,c)=>{n&&(t.value=c,n.toggle(c),e("change",r))},a=A(()=>{n&&n.resize()},500);return z(()=>{const r=l.navs.findIndex(c=>c.name===s.name);t.value=r>-1?r:0,n=new vt("nav-canvas",".nav-main .nav-span",t.value),window.addEventListener("resize",a)}),B(()=>{window.removeEventListener("resize",a)}),{toggleNav:o,activeNav:t}}},ut=l=>(L("data-v-8cea7a48"),l=l(),W(),l),pt={class:"nav-main"},gt=ut(()=>i("canvas",{id:"nav-canvas",style:{position:"absolute","z-index":"-1",left:"0"}},null,-1)),ft=["onClick"];function wt(l,e,s,t,n,o){return m(),p("div",pt,[gt,(m(!0),p(y,null,H(s.navs,(a,r)=>(m(),p("span",{key:a.name,class:"nav-span"},[i("a",{class:I(["nav-link",{"nav-active":t.activeNav===r}]),onClick:c=>t.toggleNav(a,r)},[i("i",{class:I(`b-iconfont b-icon-${a.icon} nav-icon`)},null,2),S(f(a.title),1)],10,ft)]))),128))])}var bt=M(mt,[["render",wt],["__scopeId","data-v-8cea7a48"]]);const xt={name:"Home",components:{NavMain:bt,NavHeader:_t},setup(){const l=k(null),e=k(!1),s=N(),{menuStore:t}=F(),n=()=>{e.value=l.value.$el.offsetTop>200},o=a=>{s.push({name:a.name})};return z(()=>{window.addEventListener("scroll",n)}),B(()=>{window.removeEventListener("scroll",n)}),{navMainRef:l,menuStore:t,isFixed:e,onNavChange:o}}},Ct={class:"dv-home"},yt=i("div",{class:"nav-shadow"},null,-1),St={class:"dv-main"},kt={class:"dv-content"};function Mt(l,e,s,t,n,o){const a=u("nav-header"),r=u("nav-main"),c=u("router-view");return m(),p("div",Ct,[v(a,{"is-fixed":t.isFixed},null,8,["is-fixed"]),v(r,{ref:"navMainRef",navs:t.menuStore.menu,style:D({background:t.isFixed?"#171b22":""}),onChange:t.onNavChange},null,8,["navs","style","onChange"]),yt,i("div",St,[i("div",kt,[v(c,null,{default:C(({Component:d})=>[(m(),R(j(d)))]),_:1})])])])}var Bt=M(xt,[["render",Mt]]);export{Bt as default};
