(this.webpackJsonpsocial_media_ui=this.webpackJsonpsocial_media_ui||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(5),s=n.n(c),r=(n(13),n(7)),l=n(1);function i(e,t,n,o){var a;o&&(a=JSON.stringify(o));var c=new XMLHttpRequest,s="http://localhost:8000/posts/"+t;console.log(s),c.responseType="json",c.open(e,s),c.setRequestHeader("Content-Type","application/json"),c.onload=function(){console.log(c.response),console.log(c.status),n(c.response,c.status)},console.log(a),c.send(a)}function u(e,t){var n="";t&&(n="user/".concat(t)),i("GET",n,e)}function m(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";i("POST","action",n,""!==o?{id:e,action:t,content:o}:{id:e,action:t})}var p=n(2);function d(e){var t,n=Object(o.useState)([]),c=Object(l.a)(n,2),s=c[0],r=c[1],i=Object(o.useState)([]),m=Object(l.a)(i,2),d=m[0],f=m[1],v=Object(o.useState)(!1),E=Object(l.a)(v,2),g=E[0],h=E[1];e.username&&(t=e.username);var y=function(e,t){console.log(t),200===t?(console.log(e),r(e),f(e)):400===t&&alert(e.message)};Object(o.useEffect)((function(){var t=Object(p.a)(e.newPosts).concat(s);t.length!==d.length&&f(t)}),[e.newPosts,d,s]),Object(o.useEffect)((function(){!1===g&&(t?u(y,t):u(y),h(!0))}),[t]);var O=function(e){if(e){var t=Object(p.a)(s);t.unshift(e),r(t);var n=Object(p.a)(d);n.unshift(d),f(n)}else u(y)};return a.a.createElement("div",{className:"col-md-10 mx-auto col-12 text-center"},d.map((function(e,t){return a.a.createElement(b,{didRepost:O,post:e,key:t})})))}function f(e){var t=e.post,n=e.action,o=e.didPerformAction,c=t.likes?t.likes:0,s=n.display?n.display:"Action",r="like"===n.type?"btn btn-outline-success mt-3 btn-sm":"unlike"===n.type?"btn btn-outline-secondary mt-3 btn-sm":"btn btn-outline-info mt-3 btn-sm",l=function(e,t){console.log(t,e),200!==t&&201!==t||!o||o(e,t)},i="like"===n.type?"".concat(c," ").concat(s):"".concat(s);return a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{className:r,onClick:function(e){e.preventDefault(),"repost"===n.type?(m(t.id,n.type,l,"Repost"),window.location.reload(!0)):m(t.id,n.type,l)}},i))}function b(e){var t=e.didRepost,n=e.isRepost,c=(e.refreshPosts,Object(o.useState)(e.post?e.post:null)),s=Object(l.a)(c,2),i=s[0],u=s[1],m=Object(o.useState)(e.post?e.post:null),p=Object(l.a)(m,2),d=p[0],v=p[1],E=window.location.pathname,g=Object(r.a)(/([0-9]+)/,{postid:1}),h=E.match(g),y=h?h.groups.postid:-1,O="".concat(y)==="".concat(i.id),j=function(e,n){200===n?v(e):201===n&&(v(e),t(e))},w=function(e){e.preventDefault(),window.location.href="".concat(i.id)};Object(o.useEffect)((function(){u(d)}),[i,d]);var P="border p-5 m-5  post";return P=void 0==n?"border p-2 m-2 mt-5 post":"border p-3 m-2 mt-3 mb-3 post",a.a.createElement("div",{className:P},a.a.createElement("h5",null," ",a.a.createElement("span",{id:i.id}," ",i.text," ")," "),a.a.createElement("h5",null,a.a.createElement("span",null,i.parent&&a.a.createElement(b,{post:i.parent,isRepost:!1}))),void 0==n?a.a.createElement("div",{className:"btn btn-group"},a.a.createElement(f,{post:i,didPerformAction:j,action:{type:"like",display:"Likes"}}),a.a.createElement(f,{post:i,didPerformAction:j,action:{type:"unlike",display:"Unlike"}}),a.a.createElement(f,{post:i,didPerformAction:j,action:{type:"repost",display:"Repost"}}),!0===O?null:a.a.createElement("button",{className:"btn btn-outline-dark mt-3 btn-sm",onClick:w},"View Post")):a.a.createElement("div",{className:"btn btn-group"},!0===O?null:a.a.createElement("button",{className:"btn btn-outline-dark mt-3 btn-sm",onClick:w},"View Post")))}function v(e){var t=e.username,n=e.personal,c=e.canPost,s=Object(o.useState)([]),r=Object(l.a)(s,2),u=r[0],m=r[1],f=function(e){e.preventDefault();var t,n,o=b.current.value,a=Object(p.a)(u);t=o,n=function(e,t){201===t?(console.log(e),a.unshift(e),m(a)):alert("Something's not right. Please try again.")},console.log(t),i("POST","create",n,{text:t}),b.current.value=""},b=a.a.createRef();return 1==n?a.a.createElement("div",{className:"col-md-10 mx-auto col-12 text-center"},a.a.createElement("h3",null,t),"true"==c&&a.a.createElement("div",{className:"mt-5 col-md-8 mx-auto col-10 text-center"},a.a.createElement("form",{onSubmit:f,className:"form-group mt-3"},a.a.createElement("textarea",{required:!0,ref:b,placeholder:"Your Post!",className:"form-control",name:"post",cols:"10",rows:"8"}),a.a.createElement("button",{type:"submit",className:"btn btn-success colorme my-3"},"Post"))),a.a.createElement(d,{newPosts:u,username:t})," :"):a.a.createElement("div",{className:"col-md-10 mx-auto col-12 text-center"},a.a.createElement("h3",null,t),"true"==c&&a.a.createElement("div",{className:"mt-5 col-md-8 mx-auto col-10 text-center"},a.a.createElement("form",{onSubmit:f,className:"form-group mt-3"},a.a.createElement("textarea",{required:!0,ref:b,placeholder:"Your Post!",className:"form-control",name:"post",cols:"10",rows:"8"}),a.a.createElement("button",{type:"submit",className:"btn btn-success colorme my-3"},"Post"))),a.a.createElement(d,{newPosts:u}))}function E(e){var t=e.postid;console.log("Post Id: ",t);var n=Object(o.useState)(!1),c=Object(l.a)(n,2),s=c[0],r=c[1],u=Object(o.useState)(null),m=Object(l.a)(u,2),p=m[0],d=m[1],f=function(e,t){console.log(e),200===t||201===t?d(e):alert("The requested Post acannot be fetched. Try again later.")};return Object(o.useEffect)((function(){!1===s&&(!function(e,t){i("GET","".concat(t),e)}(f,t),r(!0))}),[t,s,r]),null===p?null:a.a.createElement(b,{post:p})}n(14);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=a.a.createElement,h=document.getElementById("page-root");h&&s.a.render(g(v,h.dataset),h);var y=document.querySelectorAll(".rootdetail");console.log(y),y.forEach((function(e){s.a.render(g(E,e.dataset),e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.0b6d172e.chunk.js.map