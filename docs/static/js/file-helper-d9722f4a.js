function l(a,n){const o={pdf:"application/pdf",doc:"application/vnd.ms-word",docx:"application/vnd.ms-word",xls:"application/vnd.ms-excel",xlsx:"application/vnd.ms-excel",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.ms-powerpoint",js:"application/x-javascript",json:"application/json",zip:"application/zip",mp3:"audio/mpeg",gif:"image/gif",jpeg:"image/jpeg",jpg:"image/jpeg",png:"image/png",txt:"text/plain",xml:"image/text/xml"},t=n.split(".").pop().toLocaleLowerCase()||"",i=new Blob([a],{type:o[t]});if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(i,n);else{const e=document.createElement("a");e.href=window.URL.createObjectURL(i),e.setAttribute("download",n),document.body.appendChild(e),e.click(),document.body.removeChild(e),window.URL.revokeObjectURL(e.href)}}function r(a){return new Promise((n,o)=>{try{let t=new FileReader;t.onload=i=>{const e=i.target.result;n(e)},t.readAsText(a,"UTF-8")}catch(t){o(t)}})}function d(a){return new Promise((n,o)=>{try{let t=new FileReader;t.onload=i=>{const e=i.target.result,p=new Image;p.src=e,p.onload=()=>{n({name:a.name,width:p.width,height:p.height,image:e,file:a})}},t.readAsDataURL(a)}catch(t){o(t)}})}function c(a,n){let o=a.split(","),t=o[0].match(/:(.*?);/)[1],i=atob(o[1]),e=i.length,p=new Uint8Array(e);for(;e--;)p[e]=i.charCodeAt(e);return new File([p],n,{type:t})}export{r as a,c as b,l as d,d as r};
