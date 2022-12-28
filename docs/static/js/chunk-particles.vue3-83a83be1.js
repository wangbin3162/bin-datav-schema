import{a5 as d,c as u,a6 as f,s as h,a7 as c,b as P}from"./vendor-0bcca4c5.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function _(s,t,e,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,t,e,i);else for(var l=s.length-1;l>=0;l--)(o=s[l])&&(r=(n<3?o(r):n>3?o(t,e,r):o(t,e))||r);return n>3&&r&&Object.defineProperty(t,e,r),r}let a=class extends f{mounted(){h(()=>{var t;if(!this.id)throw new Error("Prop 'id' is required!");c.init(),this.particlesInit&&this.particlesInit(c);const e=i=>{this.container=i,this.particlesLoaded&&i&&this.particlesLoaded(i)};this.url?c.loadJSON(this.id,this.url).then(e):c.load(this.id,(t=this.options)!==null&&t!==void 0?t:{}).then(e)})}beforeDestroy(){this.container&&this.container.destroy()}};a=_([d({props:{id:{type:String,required:!0},options:{type:Object},url:{type:String},particlesLoaded:{type:Function},particlesInit:{type:Function}}})],a);var p=a;const b=["id"];function v(s,t,e,i,n,r){return P(),u("div",{id:s.id},null,8,b)}p.render=v;p.__file="src/Particles/Particles.vue";export{p as s};
