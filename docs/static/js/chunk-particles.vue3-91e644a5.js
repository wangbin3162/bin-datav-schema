import{a8 as d,b as u,c as f,a9 as h,s as P,aa as c}from"./vendor-c1103bdb.js";/*! *****************************************************************************
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
***************************************************************************** */function _(s,t,e,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(r=(n<3?o(r):n>3?o(t,e,r):o(t,e))||r);return n>3&&r&&Object.defineProperty(t,e,r),r}let l=class extends h{mounted(){P(()=>{var t;if(!this.id)throw new Error("Prop 'id' is required!");c.init(),this.particlesInit&&this.particlesInit(c);const e=i=>{this.container=i,this.particlesLoaded&&i&&this.particlesLoaded(i)};this.url?c.loadJSON(this.id,this.url).then(e):c.load(this.id,(t=this.options)!==null&&t!==void 0?t:{}).then(e)})}beforeDestroy(){this.container&&this.container.destroy()}};l=_([d({props:{id:{type:String,required:!0},options:{type:Object},url:{type:String},particlesLoaded:{type:Function},particlesInit:{type:Function}}})],l);var p=l;const b=["id"];function v(s,t,e,i,n,r){return u(),f("div",{id:s.id},null,8,b)}p.render=v;p.__file="src/Particles/Particles.vue";export{p as s};
