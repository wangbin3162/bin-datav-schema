var he=Object.defineProperty,ue=Object.defineProperties;var _e=Object.getOwnPropertyDescriptors;var ne=Object.getOwnPropertySymbols;var me=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var oe=(t,l,g)=>l in t?he(t,l,{enumerable:!0,configurable:!0,writable:!0,value:g}):t[l]=g,N=(t,l)=>{for(var g in l||(l={}))me.call(l,g)&&oe(t,g,l[g]);if(ne)for(var g of ne(l))be.call(l,g)&&oe(t,g,l[g]);return t},W=(t,l)=>ue(t,_e(l));import{M as S,a as Z}from"./chunk-bin-ui-next-663f6350.js";import{h as ge,t as V,m as ve,r as fe,i as we,w as I,j as U,k as ye,l as $e,s as ke,p as Ce,n as xe}from"./index-1ea4dda2.js";import{B as D,G as Ve,at as ee,aE as le,m as X,H as $,o as b,f as Y,w as y,c as m,b as e,g as K,t as _,a as w,O as G,a1 as ae,F as B,aA as te,aB as se,e as F,s as De,j as de,k as M,v as Q,N as Ie,L as ie}from"./vendor-471160ad.js";import{_ as Se}from"./logo-39114ead.js";import{d as Be,s as je}from"./database.api-ddbb9f0d.js";import{g as Ne,r as Ke}from"./template.api-580b98df.js";import"./chunk-brace-269ffce0.js";const z={pid:"1",name:"\u7F3A\u7701\u76EE\u5F55",directory:"Y"};function Le(){const t=D({selectedPid:z.pid,selectedName:z.name,folderList:[],adding:!1}),l=({id:n,name:a})=>{t.selectedPid=n,t.selectedName=a},g=n=>{if(!t.adding)return;(n.target.value||"").trim()||(t.adding=!1)},k=async n=>{if(!t.adding)return;const a=(n.target.value||"").trim();if(a)try{await ge(W(N({},z),{name:a})),t.adding=!1,h(),S.success("\u65B0\u589E\u6210\u529F\uFF01")}catch(f){V("useModelFolder/addGroup",f)}else t.adding=!1},s=(n,a)=>{if(!a.editing)return;const f=(n.target.value||"").trim();(!f||a.name===f)&&(a.editing=!1)},r=async(n,a)=>{if(!a.editing)return;const f=(n.target.value||"").trim();if(f&&a.name!==f){try{await ve({id:a.id,name:f}),a.name=f,l({id:a.id,name:f}),S.success("\u4FEE\u6539\u6210\u529F\uFF01")}catch(L){V("useModelFolder/editGroup",L)}a.editing=!1}else a.editing=!1},u=({id:n,name:a})=>{Z.confirm({type:"error",title:`\u786E\u5B9A\u8981\u5220\u9664 [ ${a} ] \u5417\uFF1F`}).then(async()=>{try{await fe(n),l({id:z.pid,name:z.name}),h(),S.success("\u5220\u9664\u6210\u529F\uFF01")}catch(f){V("useModelFolder/confirmDeleteGroup",f)}}).catch(()=>{})},h=()=>{we().then(n=>{t.folderList=(n.children||[]).map(a=>({id:a.id,name:a.text}))})};return h(),W(N({},Ve(t)),{toggleProject:l,confirmDeleteGroup:u,onAddInputBlur:g,onEditInputBlur:s,editGroup:r,addGroup:k})}var Pe="/bin-datav-schema/static/png/new-project-b5c06121.png";const C=t=>(te("data-v-5bde0b16"),t=t(),se(),t),ze=C(()=>e("h2",{class:"title-bar"},"\u9884\u8BBE",-1)),Ge={class:"preset-wp"},Me=C(()=>e("i",{class:"b-iconfont b-icon-laptop"},null,-1)),Fe={class:"label-title"},Te={class:"h2"},Oe={class:"h4"},Ee={flex:"main:justify",style:{width:"180px"}},Ae=C(()=>e("i",{class:"b-iconfont b-icon-mobile"},null,-1)),Re={class:"label-title"},Ue={class:"h2"},qe={class:"h4"},He={flex:"main:justify",style:{width:"180px"}},Je=C(()=>e("i",{class:"b-iconfont b-icon-gateway"},null,-1)),We=C(()=>e("p",{class:"mb-5"},"\u81EA\u5B9A\u4E49\u5927\u5C0F",-1)),Ye={class:"custom-input"},Qe=C(()=>e("span",{class:"mr-5"},"W:",-1)),Xe=C(()=>e("span",{class:"ml-5 mr-5"},"H:",-1)),Ze=C(()=>e("div",{style:{width:"24px"}},null,-1)),et=C(()=>e("h2",{class:"title-bar"},"\u6A21\u677F",-1)),tt={class:"template-list"},st=["onClick"],nt={class:"template-image"},ot={class:"preview-image"},at=["src"],it={class:"tpl-remove"},lt={class:"template-info"},dt={class:"template-name"},ct={class:"template-size"},rt=C(()=>e("p",null,"\u753B\u5E03\u5C3A\u5BF8",-1)),pt=F("\u53D6\u6D88"),ht=F("\u5F00\u59CB\u521B\u4F5C"),ut={__name:"create-kanban",setup(t,{expose:l}){const g=le(),k=X(!1),s=D(N({},Be)),r=D({label:I[0].label,width:I[0].width,height:I[0].height}),u=D({label:U[0].label,width:U[0].width,height:U[0].height}),h=D({width:1920,height:1080}),n=X([]),a=()=>{k.value=!1},f=()=>{s.label=I[0].label,s.width=I[0].width,s.height=I[0].height,s.type="web",s.tpl="",O(),k.value=!0},L=o=>{s.type="tpl",s.tpl=o.id},T=({width:o,height:c})=>{s.label="\u81EA\u5B9A\u4E49",s.width=o,s.height=c,s.tpl=""},q=o=>{r.label=o.label,r.width=o.width,r.height=o.height,s.label=o.label,s.type=o.type,s.width=o.width,s.height=o.height,s.tpl=""},H=o=>{u.label=o.label,u.width=o.width,u.height=o.height,s.label=o.label,s.type=o.type,s.width=o.width,s.height=o.height,s.tpl=""},O=()=>{Ne().then(o=>{n.value=(o.rows||[]).map(c=>{let x={};try{x=JSON.parse(c.content)}catch{x={pageConfig:{}}}return{id:c.id,name:c.name,pageConfig:x.pageConfig}})})},J=o=>{Z.confirm({type:"error",title:"\u786E\u5B9A\u5220\u9664\u5F53\u524D\u6A21\u677F\u5417\uFF1F"}).then(async()=>{try{await Ke(o.id),O(),S.success("\u79FB\u9664\u6A21\u677F\u6210\u529F\uFF01")}catch(c){V("create-screen/removeTpl",c)}}).catch(()=>{})},d=o=>{o==="web"?(s.label=r.label,s.width=r.width,s.height=r.height):o==="mobile"?(s.label=u.label,s.width=u.width,s.height=u.height):o==="custom"&&(s.label="\u81EA\u5B9A\u4E49",s.width=h.width,s.height=h.height),s.type=o,s.tpl=""},p=async()=>{a(),await je(s),await g.push({path:"/schema/screen"})};return l({openCreate:f}),(o,c)=>{const x=$("b-icon"),P=$("b-dropdown-item"),E=$("b-dropdown-menu"),A=$("b-dropdown"),R=$("b-input-number"),v=$("b-button"),j=$("b-modal");return b(),Y(j,{modelValue:k.value,"onUpdate:modelValue":c[7]||(c[7]=i=>k.value=i),title:"\u521B\u5EFA\u770B\u677F",width:"1000px","custom-class":"schema-modal","destroy-on-close":""},{footer:y(()=>[m(v,{onClick:a},{default:y(()=>[pt]),_:1}),m(v,{type:"primary",onClick:p},{default:y(()=>[ht]),_:1})]),default:y(()=>[e("div",null,[ze,e("div",Ge,[e("div",{class:K(["preset-item web-box",{selected:s.type==="web"}]),onClick:c[0]||(c[0]=i=>d("web"))},[Me,e("div",Fe,[e("div",Te,_(r.label),1),e("div",Oe,_(r.width)+"x"+_(r.height),1)]),m(A,{trigger:"click",placement:"bottom-end",style:{width:"24px",height:"46px","line-height":"46px"},onCommand:q},{dropdown:y(()=>[m(E,null,{default:y(()=>[(b(!0),w(B,null,G(ae(I),i=>(b(),Y(P,{key:i.label,name:i},{default:y(()=>[e("div",Ee,[e("span",null,_(i.label),1),e("span",null,_(i.width)+"x"+_(i.height),1)])]),_:2},1032,["name"]))),128))]),_:1})]),default:y(()=>[m(x,{name:"down",type:"button"})]),_:1})],2),e("div",{class:K(["preset-item mobile-box",{selected:s.type==="mobile"}]),onClick:c[1]||(c[1]=i=>d("mobile"))},[Ae,e("div",Re,[e("div",Ue,_(u.label),1),e("div",qe,_(u.width)+"x"+_(u.height),1)]),m(A,{trigger:"click",placement:"bottom-end",style:{width:"24px",height:"46px","line-height":"46px"},onCommand:H},{dropdown:y(()=>[m(E,null,{default:y(()=>[(b(!0),w(B,null,G(ae(U),i=>(b(),Y(P,{key:i.label,name:i},{default:y(()=>[e("div",He,[e("span",null,_(i.label),1),e("span",null,_(i.width)+"x"+_(i.height),1)])]),_:2},1032,["name"]))),128))]),_:1})]),default:y(()=>[m(x,{name:"down",type:"button"})]),_:1})],2),e("div",{class:K(["preset-item custom-box",{selected:s.type==="custom"}]),onClick:c[6]||(c[6]=i=>d("custom"))},[Je,e("div",null,[We,e("p",Ye,[Qe,m(R,{modelValue:h.width,"onUpdate:modelValue":c[2]||(c[2]=i=>h.width=i),min:100,step:1,precision:0,size:"mini",onChange:c[3]||(c[3]=i=>T(h))},null,8,["modelValue"]),Xe,m(R,{modelValue:h.height,"onUpdate:modelValue":c[4]||(c[4]=i=>h.height=i),min:100,step:1,precision:0,size:"mini",onChange:c[5]||(c[5]=i=>T(h))},null,8,["modelValue"])])]),Ze],2)]),et,e("div",tt,[(b(!0),w(B,null,G(n.value,i=>(b(),w("div",{class:"template-grid",key:i.id},[e("div",{class:K(["template-item",{selected:s.type==="tpl"&&s.tpl===i.id}]),onClick:pe=>L(i)},[e("div",nt,[e("div",ot,[e("img",{src:i.pageConfig.bgImage,alt:""},null,8,at)]),e("div",it,[m(v,{type:"text","text-color":"#f5222d",title:"\u79FB\u9664\u6A21\u677F",icon:"delete",onClick:pe=>J(i)},null,8,["onClick"])])]),e("div",lt,[e("div",dt,_(i.name),1),e("div",ct,[rt,e("p",null,_(i.pageConfig.width)+"x"+_(i.pageConfig.height)+"px",1)])])],10,st)]))),128))])])]),_:1},8,["modelValue"])}}};var _t=ee(ut,[["__scopeId","data-v-5bde0b16"]]);const ce=t=>(te("data-v-3752c0b1"),t=t(),se(),t),mt={class:"kanban-list-wp"},bt=ce(()=>e("img",{src:Pe},null,-1)),gt=ce(()=>e("span",{class:"text-title ellipsis"},"\u65B0\u5EFA\u770B\u677F",-1)),vt=[bt,gt],ft={class:"list-header"},wt={class:"title"},yt={class:"header-manager"},$t={key:0,class:"list-wrap"},kt={class:"list-item-inner"},Ct={class:"list-item-img"},xt={class:"preview-image"},Vt=["src"],Dt={key:1,src:Se,alt:"default",style:{width:"147px",height:"147px"}},It={class:"list-item-mask"},St={class:"action"},Bt=F("\u7F16\u8F91\u770B\u677F"),jt={class:"icon-ctrl pt-10"},Nt=["onClick"],Kt=["onClick"],Lt={class:"icon-box"},Pt=["onClick"],zt=["onClick"],Gt={class:"list-item-info"},Mt={class:"item-title","t-ellipsis":""},Ft={style:{height:"200px"},flex:"main:center cross:center"},Tt=F("\u8BE5\u5206\u7EC4\u4E0B\u6CA1\u6709\u770B\u677F"),Ot={class:"t-center pb-24"},Et={__name:"kanban-list",props:{group:{type:Object,default:()=>({})}},setup(t){const l=t,g=le(),k=X(null),s=D({name:"",page:1,size:20}),r=D({rows:[],total:0,loading:!1}),u=D({id:"",pid:"",name:"",directory:"N"}),h=async()=>{try{r.loading=!0;const d=await ye(N({pid:l.group.pid},s));r.rows=(d.rows||[]).map(p=>{let o={};try{o=JSON.parse(p.layout)}catch{o={}}return{id:p.id,name:p.name,status:p.status,pageConfig:o}}),r.total=d.total}catch(d){V("kanban-list/getSearchList",d)}r.loading=!1},n=async d=>{s.page=d,await h()},a=d=>{let p=g.resolve({path:`/screen/${d.id}`});window.open(p.href,"_blank")},f=()=>{u.pid="",u.name="",u.directory="N"},L=d=>{let p=g.resolve({path:"/schema/screen",query:{id:d}});window.open(p.href,"_blank")},T=()=>{k.value&&k.value.openCreate()},q=d=>{f(),u.id=d.id,u.pid=d.pid,u.name=d.name,u.directory=d.directory,L(d.id)},H=async d=>{try{const p=await $e(d.id);p.name=`${p.name}_copy`,delete p.id,await ke(p),await h(),S.success("\u590D\u5236\u6210\u529F\uFF01")}catch(p){V("kanban-list/handleCopy",p)}},O=async d=>{if(d.status!=="audited")try{await Ce(d.id),await h(),S.success("\u53D1\u5E03\u6210\u529F\uFF01")}catch(p){V("kanban-list/handlePublish",p)}},J=d=>{Z.confirm({type:"error",title:"\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D\uFF0C\u786E\u8BA4\u5220\u9664\uFF1F"}).then(async()=>{try{await xe(d),await h(),S.success("\u5220\u9664\u6210\u529F\uFF01")}catch(p){V("kanban-list/removeDashboard",p)}}).catch(()=>{})};return De(()=>l.group,()=>{s.page=1,h()},{immediate:!0,deep:!0}),(d,p)=>{const o=$("b-input"),c=$("b-button"),x=$("iconfont"),P=$("b-tag"),E=$("svg-loading"),A=$("b-empty"),R=$("b-page");return b(),w(B,null,[e("div",mt,[e("div",{class:"new-box",onClick:T},vt),e("div",ft,[e("div",wt,[e("h2",null,_(t.group?t.group.name:"")+" ("+_(r.total)+")",1)]),e("div",yt,[m(o,{modelValue:s.name,"onUpdate:modelValue":p[0]||(p[0]=v=>s.name=v),size:"small",placeholder:"\u641C\u7D22",search:"",onSearch:h},null,8,["modelValue"])])]),r.loading?de("",!0):(b(),w("ul",$t,[(b(!0),w(B,null,G(r.rows,v=>(b(),w("li",{key:v.id,class:"base-list-item"},[e("div",kt,[e("div",Ct,[e("div",xt,[v.pageConfig.bgImage?(b(),w("img",{key:0,src:v.pageConfig.bgImage,alt:""},null,8,Vt)):(b(),w("img",Dt))]),e("div",It,[e("div",St,[m(c,{type:"primary",icon:"edit-square",onClick:j=>q(v)},{default:y(()=>[Bt]),_:2},1032,["onClick"]),e("div",jt,[e("i",{class:"b-iconfont b-icon-file-copy",onClick:j=>H(v),title:"\u590D\u5236"},null,8,Nt),e("i",{class:"b-iconfont b-icon-delete",onClick:j=>J(v.id),title:"\u5220\u9664"},null,8,Kt)])]),e("div",Lt,[e("i",{class:"b-iconfont b-icon-View",onClick:j=>a(v),title:"\u9884\u89C8"},null,8,Pt),e("i",{class:"b-iconfont b-icon-send",onClick:j=>O(v),title:"\u53D1\u5E03"},null,8,zt)])])]),e("div",Gt,[e("div",Mt,[m(x,{icon:"linechart"}),e("span",null,_(v.name),1)]),m(P,{type:v.status==="audited"?"success":"primary",dot:"","tag-style":{color:"#999"}},{default:y(()=>[F(_(v.status==="audited"?"\u5DF2\u53D1\u5E03":"\u5F85\u53D1\u5E03"),1)]),_:2},1032,["type"])])])]))),128))])),M(e("div",Ft,[m(E,{name:"loading02",width:100})],512),[[Q,r.loading]]),M(m(A,null,{default:y(()=>[Tt]),_:1},512),[[Q,!r.loading&&r.rows.length===0]]),M(e("div",Ot,[m(R,{total:r.total,current:s.page,"page-size":s.size,onChange:n},null,8,["total","current","page-size"])],512),[[Q,!r.loading&&r.total>s.size]])]),m(_t,{ref_key:"createRef",ref:k},null,512)],64)}}};var At=ee(Et,[["__scopeId","data-v-3752c0b1"]]);const Rt={name:"AnalysisDashboard",components:{KanbanList:At},setup(){return N({},Le())}},re=t=>(te("data-v-abf4d4dc"),t=t(),se(),t),Ut={class:"kanban-wrapper"},qt={class:"kanban-main"},Ht={class:"folder-manage"},Jt={class:"folder-manage-group"},Wt=re(()=>e("span",null,"\u770B\u677F\u5206\u7EC4",-1)),Yt={class:"folder-manage-main"},Qt=re(()=>e("span",null,"\u7F3A\u7701\u76EE\u5F55",-1)),Xt=[Qt],Zt={key:0,class:"folder-item new-group"},es=["onClick"],ts=["default-value","onBlur","onKeyup"],ss={class:"folder-name"},ns={class:"group-btns"},os=["onClick"],as=["onClick"],is={class:"right-list"};function ls(t,l,g,k,s,r){const u=$("kanban-list"),h=Ie("focus");return b(),w("div",Ut,[e("div",qt,[e("div",Ht,[e("div",Jt,[Wt,e("i",{class:"b-iconfont b-icon-plus btn-add-icon",title:"\u65B0\u589E\u6587\u4EF6\u5939",onClick:l[0]||(l[0]=n=>t.adding=!0)})]),e("div",Yt,[e("div",{class:K(["folder-item folder-all",{"folder-item-checked-color":t.selectedPid==="1"}]),onClick:l[1]||(l[1]=n=>t.toggleProject({id:"1",name:"\u7F3A\u7701\u76EE\u5F55"}))},Xt,2),t.adding?(b(),w("div",Zt,[M(e("input",{class:"edit-input",onBlur:l[2]||(l[2]=(...n)=>t.onAddInputBlur&&t.onAddInputBlur(...n)),onKeyup:l[3]||(l[3]=ie((...n)=>t.addGroup&&t.addGroup(...n),["enter"]))},null,544),[[h]])])):de("",!0),(b(!0),w(B,null,G(t.folderList,n=>(b(),w("div",{key:n.id,class:K(["folder-item",{"folder-item-checked-color":t.selectedPid===n.id}]),onClick:a=>t.toggleProject(n)},[n.editing?M((b(),w("input",{key:0,"default-value":n.name,class:"edit-input",onBlur:a=>t.onEditInputBlur(a,n),onKeyup:ie(a=>t.editGroup(a,n),["enter"])},null,40,ts)),[[h]]):(b(),w(B,{key:1},[e("span",ss,_(n.name),1),e("span",ns,[e("i",{class:"b-iconfont b-icon-edit",title:"\u7F16\u8F91",onClick:a=>n.editing=!0},null,8,os),e("i",{class:"b-iconfont b-icon-delete",title:"\u5220\u9664",onClick:a=>t.confirmDeleteGroup(n)},null,8,as)])],64))],10,es))),128))])]),e("div",is,[m(u,{group:{pid:t.selectedPid,name:t.selectedName}},null,8,["group"])])])])}var bs=ee(Rt,[["render",ls],["__scopeId","data-v-abf4d4dc"]]);export{bs as default};
