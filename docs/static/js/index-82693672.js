import{M as x,a as Q}from"./chunk-bin-ui-next-98c8f2d2.js";import{i as re,t as V,m as ue,r as pe,j as he,w as D,k as E,I as _e,S as me,l as be,n as ge,s as fe,p as ve,o as we}from"./index-93a00105.js";import{a as I,t as ye,ax as X,aK as ne,r as R,K as w,b as p,k as W,l as v,v as _,y as L,h as e,q as z,p as h,c as b,F as K,d as M,a1 as te,aI as Z,aJ as ee,a8 as $e,w as ke,e as oe,z as T,A as H,P as se,Q as Ce}from"./vendor-0bcca4c5.js";import{_ as ae}from"./logo-39114ead.js";import{d as xe,s as Ve}from"./database.api-72f7b378.js";import{g as Ie,r as Se}from"./template.api-b2a15b6b.js";import"./chunk-brace-b1f520b9.js";import"./chunk-bin-datav-bdc06cb1.js";import"./chunk-three-06bdd351.js";import"./chunk-gsap-80ac4909.js";import"./chunk-particles.vue3-83a83be1.js";import"./chunk-mockjs-9e1335a8.js";const P={pid:"1",name:"\u7F3A\u7701\u76EE\u5F55",directory:"Y"};function De(){const n=I({selectedPid:P.pid,selectedName:P.name,folderList:[],adding:!1}),g=({id:o,name:a})=>{n.selectedPid=o,n.selectedName=a},S=o=>{if(!n.adding)return;(o.target.value||"").trim()||(n.adding=!1)},$=async o=>{if(!n.adding)return;const a=(o.target.value||"").trim();if(a)try{await re({...P,name:a}),n.adding=!1,r(),x.success("\u65B0\u589E\u6210\u529F\uFF01")}catch(f){V("useModelFolder/addGroup",f)}else n.adding=!1},s=(o,a)=>{if(!a.editing)return;const f=(o.target.value||"").trim();(!f||a.name===f)&&(a.editing=!1)},u=async(o,a)=>{if(!a.editing)return;const f=(o.target.value||"").trim();if(f&&a.name!==f){try{await ue({id:a.id,name:f}),a.name=f,g({id:a.id,name:f}),x.success("\u4FEE\u6539\u6210\u529F\uFF01")}catch(j){V("useModelFolder/editGroup",j)}a.editing=!1}else a.editing=!1},c=({id:o,name:a})=>{Q.confirm({type:"error",title:`\u786E\u5B9A\u8981\u5220\u9664 [ ${a} ] \u5417\uFF1F`}).then(async()=>{try{await pe(o),g({id:P.pid,name:P.name}),r(),x.success("\u5220\u9664\u6210\u529F\uFF01")}catch(f){V("useModelFolder/confirmDeleteGroup",f)}}).catch(()=>{})},r=()=>{he().then(o=>{n.folderList=(o.children||[]).map(a=>({id:a.id,name:a.text}))})};return r(),{...ye(n),toggleProject:g,confirmDeleteGroup:c,onAddInputBlur:S,onEditInputBlur:s,editGroup:u,addGroup:$}}var Ke="/bin-datav-schema/static/png/new-project-b5c06121.png";const y=n=>(Z("data-v-5e6d8473"),n=n(),ee(),n),je=y(()=>e("h2",{class:"title-bar"},"\u9884\u8BBE",-1)),ze={class:"preset-wp"},Be=y(()=>e("i",{class:"b-iconfont b-icon-laptop"},null,-1)),Ne={class:"label-title"},Pe={class:"h2"},Le={class:"h4"},Me={flex:"main:justify",style:{width:"180px"}},Te=y(()=>e("i",{class:"b-iconfont b-icon-mobile"},null,-1)),Fe={class:"label-title"},Ge={class:"h2"},Oe={class:"h4"},Ae={flex:"main:justify",style:{width:"180px"}},Ee=y(()=>e("i",{class:"b-iconfont b-icon-gateway"},null,-1)),Re=y(()=>e("p",{class:"mb-5"},"\u81EA\u5B9A\u4E49\u5927\u5C0F",-1)),qe={class:"custom-input"},Ue=y(()=>e("span",{class:"mr-5"},"W:",-1)),Je=y(()=>e("span",{class:"ml-5 mr-5"},"H:",-1)),Ye=y(()=>e("div",{style:{width:"24px"}},null,-1)),We=y(()=>e("h2",{class:"title-bar"},"\u6A21\u677F",-1)),He={class:"template-list"},Qe=["onClick"],Xe={class:"template-image"},Ze={class:"preview-image"},et=["src"],tt={key:1,src:ae,alt:"default",style:{width:"147px",height:"147px"}},st={class:"tpl-remove"},nt={class:"template-info"},ot=["title"],at={class:"template-size"},lt=y(()=>e("p",null,"\u753B\u5E03\u5C3A\u5BF8",-1)),it={__name:"create-kanban",setup(n,{expose:g}){const S=ne(),$=R(!1),s=I({...xe}),u=I({label:D[0].label,width:D[0].width,height:D[0].height}),c=I({label:E[0].label,width:E[0].width,height:E[0].height}),r=I({width:1920,height:1080}),o=R([]),a=()=>{$.value=!1},f=()=>{s.label=D[0].label,s.width=D[0].width,s.height=D[0].height,s.type="web",s.tpl="",G(),$.value=!0},j=t=>{s.type="tpl",s.tpl=t.id},F=({width:t,height:d})=>{s.label="\u81EA\u5B9A\u4E49",s.width=t,s.height=d,s.tpl=""},q=t=>{u.label=t.label,u.width=t.width,u.height=t.height,s.label=t.label,s.type=t.type,s.width=t.width,s.height=t.height,s.tpl=""},U=t=>{c.label=t.label,c.width=t.width,c.height=t.height,s.label=t.label,s.type=t.type,s.width=t.width,s.height=t.height,s.tpl=""},G=()=>{Ie().then(t=>{o.value=(t.rows||[]).map(d=>{let k={};try{k=JSON.parse(d.content)}catch{k={pageConfig:{}}}return{id:d.id,name:d.name,pageConfig:k.pageConfig}})})},J=t=>{Q.confirm({type:"error",title:"\u786E\u5B9A\u5220\u9664\u5F53\u524D\u6A21\u677F\u5417\uFF1F"}).then(async()=>{try{await Se(t.id),G(),x.success("\u79FB\u9664\u6A21\u677F\u6210\u529F\uFF01")}catch(d){V("create-screen/removeTpl",d)}}).catch(()=>{})},B=t=>{t==="web"?(s.label=u.label,s.width=u.width,s.height=u.height):t==="mobile"?(s.label=c.label,s.width=c.width,s.height=c.height):t==="custom"&&(s.label="\u81EA\u5B9A\u4E49",s.width=r.width,s.height=r.height),s.type=t,s.tpl=""},Y=async()=>{a(),await Ve(s);const t=S.resolve("/schema/screen");window.open(t.href,"_blank")};function i(t){return t.thumbnail||t.bgImage}return g({openCreate:f}),(t,d)=>{const k=w("b-icon"),N=w("b-dropdown-item"),O=w("b-dropdown-menu"),A=w("b-dropdown"),m=w("b-input-number"),C=w("b-button"),de=w("b-modal");return p(),W(de,{modelValue:$.value,"onUpdate:modelValue":d[7]||(d[7]=l=>$.value=l),title:"\u65B0\u5EFA\u770B\u677F",width:"1000px","custom-class":"schema-modal","destroy-on-close":""},{footer:v(()=>[_(C,{onClick:a},{default:v(()=>[L("\u53D6\u6D88")]),_:1}),_(C,{type:"primary",onClick:Y},{default:v(()=>[L("\u5F00\u59CB\u521B\u4F5C")]),_:1})]),default:v(()=>[e("div",null,[je,e("div",ze,[e("div",{class:z(["preset-item web-box",{selected:s.type==="web"}]),onClick:d[0]||(d[0]=l=>B("web"))},[Be,e("div",Ne,[e("div",Pe,h(u.label),1),e("div",Le,h(u.width)+"x"+h(u.height),1)]),_(A,{trigger:"click",placement:"bottom-end",style:{width:"24px",height:"46px","line-height":"46px"},onCommand:q},{dropdown:v(()=>[_(O,null,{default:v(()=>[(p(!0),b(K,null,M(te(D),l=>(p(),W(N,{key:l.label,name:l},{default:v(()=>[e("div",Me,[e("span",null,h(l.label),1),e("span",null,h(l.width)+"x"+h(l.height),1)])]),_:2},1032,["name"]))),128))]),_:1})]),default:v(()=>[_(k,{name:"down",type:"button"})]),_:1})],2),e("div",{class:z(["preset-item mobile-box",{selected:s.type==="mobile"}]),onClick:d[1]||(d[1]=l=>B("mobile"))},[Te,e("div",Fe,[e("div",Ge,h(c.label),1),e("div",Oe,h(c.width)+"x"+h(c.height),1)]),_(A,{trigger:"click",placement:"bottom-end",style:{width:"24px",height:"46px","line-height":"46px"},onCommand:U},{dropdown:v(()=>[_(O,null,{default:v(()=>[(p(!0),b(K,null,M(te(E),l=>(p(),W(N,{key:l.label,name:l},{default:v(()=>[e("div",Ae,[e("span",null,h(l.label),1),e("span",null,h(l.width)+"x"+h(l.height),1)])]),_:2},1032,["name"]))),128))]),_:1})]),default:v(()=>[_(k,{name:"down",type:"button"})]),_:1})],2),e("div",{class:z(["preset-item custom-box",{selected:s.type==="custom"}]),onClick:d[6]||(d[6]=l=>B("custom"))},[Ee,e("div",null,[Re,e("p",qe,[Ue,_(m,{modelValue:r.width,"onUpdate:modelValue":d[2]||(d[2]=l=>r.width=l),min:100,step:1,precision:0,size:"mini",onChange:d[3]||(d[3]=l=>F(r))},null,8,["modelValue"]),Je,_(m,{modelValue:r.height,"onUpdate:modelValue":d[4]||(d[4]=l=>r.height=l),min:100,step:1,precision:0,size:"mini",onChange:d[5]||(d[5]=l=>F(r))},null,8,["modelValue"])])]),Ye],2)]),We,e("div",He,[(p(!0),b(K,null,M(o.value,l=>(p(),b("div",{class:"template-grid",key:l.id},[e("div",{class:z(["template-item",{selected:s.type==="tpl"&&s.tpl===l.id}]),onClick:ce=>j(l)},[e("div",Xe,[e("div",Ze,[i(l.pageConfig)?(p(),b("img",{key:0,src:i(l.pageConfig),alt:""},null,8,et)):(p(),b("img",tt))]),e("div",st,[_(C,{type:"text","text-color":"#f5222d",title:"\u79FB\u9664\u6A21\u677F",icon:"delete",onClick:ce=>J(l)},null,8,["onClick"])])]),e("div",nt,[e("div",{class:"template-name","t-ellipsis":"",title:l.name},h(l.name),9,ot),e("div",at,[lt,e("p",null,h(l.pageConfig.width)+"x"+h(l.pageConfig.height)+"px",1)])])],10,Qe)]))),128))])])]),_:1},8,["modelValue"])}}};var dt=X(it,[["__scopeId","data-v-5e6d8473"]]);const le=n=>(Z("data-v-dcb489d4"),n=n(),ee(),n),ct={class:"kanban-list-wp"},rt=le(()=>e("img",{src:Ke},null,-1)),ut=le(()=>e("span",{class:"text-title ellipsis"},"\u65B0\u5EFA\u770B\u677F",-1)),pt=[rt,ut],ht={class:"list-header"},_t={class:"title"},mt={class:"header-manager"},bt={key:0,class:"list-wrap"},gt={class:"list-item-inner"},ft={class:"list-item-img"},vt={class:"preview-image"},wt=["src"],yt={key:1,src:ae,alt:"default",style:{width:"147px",height:"147px"}},$t={class:"list-item-mask"},kt={class:"action"},Ct={class:"icon-ctrl pt-10"},xt=["onClick"],Vt=["onClick"],It={class:"icon-box"},St=["onClick"],Dt=["onClick"],Kt={class:"list-item-info"},jt=["title"],zt={style:{height:"200px"},flex:"main:center cross:center"},Bt={class:"t-center pb-24"},Nt={__name:"kanban-list",props:{group:{type:Object,default:()=>({})}},setup(n){const g=n,S=ne(),$=$e(),s=R(null);R(null);const u=I({name:"",page:1,size:20}),c=I({rows:[],total:0,loading:!1}),r=I({id:"",pid:"",name:"",directory:"N"}),o=async()=>{try{c.loading=!0;const i=await be({pid:g.group.pid,...u});c.rows=(i.rows||[]).map(t=>{let d={};try{d=JSON.parse(t.layout)}catch{d={}}return{id:t.id,name:t.name,status:t.status,pageConfig:d}}),c.total=i.total}catch(i){V("kanban-list/getSearchList",i)}c.loading=!1},a=async i=>{u.page=i,await o()},f=i=>{let t=S.resolve({path:`/screen/${i.id}`});window.open(t.href,"_blank")};function j(i){return i.thumbnail||i.bgImage}const F=()=>{r.pid="",r.name="",r.directory="N"},q=i=>{let t=S.resolve({path:"/schema/screen",query:{id:i}});window.open(t.href,"_blank")},U=()=>{s.value&&s.value.openCreate()},G=i=>{F(),r.id=i.id,r.pid=i.pid,r.name=i.name,r.directory=i.directory,q(i.id)},J=async i=>{try{const t=await ge(i.id);t.name=`${t.name}_copy`,delete t.id,await fe(t),await o(),x.success("\u590D\u5236\u6210\u529F\uFF01")}catch(t){V("kanban-list/handleCopy",t)}},B=async i=>{if(i.status!=="audited")try{x(`\u6B63\u5728\u53D1\u5E03[${i.name}]`),await ve(i.id),await o(),x.success("\u53D1\u5E03\u6210\u529F\uFF01")}catch(t){V("kanban-list/handlePublish",t)}},Y=i=>{Q.confirm({type:"error",title:"\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D\uFF0C\u786E\u8BA4\u5220\u9664\uFF1F"}).then(async()=>{try{await we(i),await o(),x.success("\u5220\u9664\u6210\u529F\uFF01")}catch(t){V("kanban-list/removeDashboard",t)}}).catch(()=>{})};return ke([()=>g.group,()=>$.path],()=>{u.page=1,o()},{immediate:!0,deep:!0}),(i,t)=>{const d=w("b-input"),k=w("b-button"),N=w("b-tag"),O=w("b-empty"),A=w("b-page");return p(),b(K,null,[e("div",ct,[e("div",{class:"new-box",onClick:U},pt),e("div",ht,[e("div",_t,[e("h2",null,h(n.group?n.group.name:"")+" ("+h(c.total)+")",1)]),e("div",mt,[_(d,{modelValue:u.name,"onUpdate:modelValue":t[0]||(t[0]=m=>u.name=m),size:"small",placeholder:"\u641C\u7D22",search:"",onSearch:o},null,8,["modelValue"])])]),c.loading?oe("",!0):(p(),b("ul",bt,[(p(!0),b(K,null,M(c.rows,m=>(p(),b("li",{key:m.id,class:"base-list-item"},[e("div",gt,[e("div",ft,[e("div",vt,[j(m.pageConfig)?(p(),b("img",{key:0,src:j(m.pageConfig),alt:""},null,8,wt)):(p(),b("img",yt))]),e("div",$t,[e("div",kt,[_(k,{type:"primary",icon:"edit-square",onClick:C=>G(m)},{default:v(()=>[L(" \u7F16\u8F91\u770B\u677F ")]),_:2},1032,["onClick"]),e("div",Ct,[e("i",{class:"b-iconfont b-icon-file-copy",onClick:C=>J(m),title:"\u590D\u5236"},null,8,xt),e("i",{class:"b-iconfont b-icon-delete",onClick:C=>Y(m.id),title:"\u5220\u9664"},null,8,Vt)])]),e("div",It,[e("i",{class:"b-iconfont b-icon-View",onClick:C=>f(m),title:"\u9884\u89C8",style:{"font-size":"18px"}},null,8,St),e("i",{class:"b-iconfont b-icon-send",onClick:C=>B(m),title:"\u53D1\u5E03"},null,8,Dt)])])]),e("div",Kt,[e("div",{class:"item-title","t-ellipsis":"",title:m.name},[_(_e,{icon:m.directory==="Y"?"folder":"linechart",color:m.directory==="Y"?"#fa8c16":"#1089ff"},null,8,["icon","color"]),e("span",null,h(m.name),1)],8,jt),_(N,{type:m.status==="audited"?"success":"primary",dot:"","tag-style":{color:"#999"}},{default:v(()=>[L(h(m.status==="audited"?"\u5DF2\u53D1\u5E03":"\u5F85\u53D1\u5E03"),1)]),_:2},1032,["type"])])])]))),128))])),T(e("div",zt,[_(me,{name:"loading02",width:100})],512),[[H,c.loading]]),T(_(O,null,{default:v(()=>[L("\u8BE5\u5206\u7EC4\u4E0B\u6CA1\u6709\u770B\u677F")]),_:1},512),[[H,!c.loading&&c.rows.length===0]]),T(e("div",Bt,[_(A,{total:c.total,current:u.page,"page-size":u.size,onChange:a},null,8,["total","current","page-size"])],512),[[H,!c.loading&&c.total>u.size]])]),_(dt,{ref_key:"createRef",ref:s},null,512)],64)}}};var Pt=X(Nt,[["__scopeId","data-v-dcb489d4"]]);const Lt={name:"AnalysisDashboard",components:{KanbanList:Pt},setup(){return{...De()}}},ie=n=>(Z("data-v-3c50d5f9"),n=n(),ee(),n),Mt={class:"kanban-wrapper"},Tt={class:"kanban-main"},Ft={class:"folder-manage"},Gt={class:"folder-manage-group"},Ot=ie(()=>e("span",null,"\u770B\u677F\u5206\u7EC4",-1)),At={class:"folder-manage-main"},Et=ie(()=>e("span",null,"\u7F3A\u7701\u76EE\u5F55",-1)),Rt=[Et],qt={key:0,class:"folder-item new-group"},Ut=["onClick"],Jt=["default-value","onBlur","onKeyup"],Yt={class:"folder-name"},Wt={class:"group-btns"},Ht=["onClick"],Qt=["onClick"],Xt={class:"right-list"};function Zt(n,g,S,$,s,u){const c=w("kanban-list"),r=Ce("focus");return p(),b("div",Mt,[e("div",Tt,[e("div",Ft,[e("div",Gt,[Ot,e("i",{class:"b-iconfont b-icon-plus btn-add-icon",title:"\u65B0\u589E\u6587\u4EF6\u5939",onClick:g[0]||(g[0]=o=>n.adding=!0)})]),e("div",At,[e("div",{class:z(["folder-item folder-all",{"folder-item-checked-color":n.selectedPid==="1"}]),onClick:g[1]||(g[1]=o=>n.toggleProject({id:"1",name:"\u7F3A\u7701\u76EE\u5F55"}))},Rt,2),n.adding?(p(),b("div",qt,[T(e("input",{class:"edit-input",onBlur:g[2]||(g[2]=(...o)=>n.onAddInputBlur&&n.onAddInputBlur(...o)),onKeyup:g[3]||(g[3]=se((...o)=>n.addGroup&&n.addGroup(...o),["enter"]))},null,544),[[r]])])):oe("",!0),(p(!0),b(K,null,M(n.folderList,o=>(p(),b("div",{key:o.id,class:z(["folder-item",{"folder-item-checked-color":n.selectedPid===o.id}]),onClick:a=>n.toggleProject(o)},[o.editing?T((p(),b("input",{key:0,"default-value":o.name,class:"edit-input",onBlur:a=>n.onEditInputBlur(a,o),onKeyup:se(a=>n.editGroup(a,o),["enter"])},null,40,Jt)),[[r]]):(p(),b(K,{key:1},[e("span",Yt,h(o.name),1),e("span",Wt,[e("i",{class:"b-iconfont b-icon-edit",title:"\u7F16\u8F91",onClick:a=>o.editing=!0},null,8,Ht),e("i",{class:"b-iconfont b-icon-delete",title:"\u5220\u9664",onClick:a=>n.confirmDeleteGroup(o)},null,8,Qt)])],64))],10,Ut))),128))])]),e("div",Xt,[_(c,{group:{pid:n.selectedPid,name:n.selectedName}},null,8,["group"])])])])}var ps=X(Lt,[["render",Zt],["__scopeId","data-v-3c50d5f9"]]);export{ps as default};
