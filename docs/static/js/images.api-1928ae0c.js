import{g as y,b as i,u as p,f}from"./index-435da3e0.js";import{ab as w,az as n}from"./vendor-302fa4a4.js";const g=[{key:"bg",value:"\u80CC\u666F\u56FE"},{key:"header",value:"\u5934\u90E8"},{key:"box",value:"\u8FB9\u6846"},{key:"decoration",value:"\u88C5\u9970\u5668"},{key:"widget",value:"\u5C0F\u90E8\u4EF6"}],G=g.map(a=>a.key);async function h(a){try{const t=y(`/${a}/index.json`);return(await w.get(t)).data.map(r=>({...r,group:a,src:y(`/${a}/${r.src}`)}))}catch{return[]}}const d="IMAGES_GROUP",m="IMAGES_LIB",c=async()=>n.getItem(d),o=async a=>n.setItem(d,i(a)),l=async()=>n.getItem(m),u=async a=>n.setItem(m,i(a));async function x(){try{const a=await c();if(a)return a;const t=i(g);return await o(t),t}catch{return[]}}async function _(a){try{const t=await c();return t?(t.push(a),await o(t),!0):!1}catch{return!1}}async function b(a){try{const t=await c();if(t){const e=f(t,a.key,"key");return t[e].value=a.value,await o(t),a.key}return!1}catch{return!1}}async function L(a){try{const t=await c();if(t){const e=f(t,a,"key");return t.splice(e,1),await o(t),!0}return!1}catch{return!1}}async function A(a){try{if(G.includes(a))return await h(a);const t=await l();return t?t.filter(e=>e.group===a).reverse():[]}catch{return[]}}async function E(a){try{const t=a.map(s=>({id:p(),...s})),e=await l();if(e){const s=e.concat(t);return await u(s),!0}return await u(t),!1}catch{return!1}}async function M(a,t){try{const e=await l();if(e){const s=e.filter(I=>I.group===a),r=f(s,t);return s.splice(r,1),await u(s),!0}return!1}catch{return!1}}export{A as a,L as b,_ as c,G as d,x as g,b as m,M as r,E as u};
