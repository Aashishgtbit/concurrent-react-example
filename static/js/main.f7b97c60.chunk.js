(this["webpackJsonpconcurrent-react-overview"]=this["webpackJsonpconcurrent-react-overview"]||[]).push([[0],{24:function(e,a,t){e.exports=t(53)},33:function(e,a,t){},34:function(e,a,t){},35:function(e,a,t){},36:function(e,a,t){},37:function(e,a,t){},38:function(e,a,t){},51:function(e,a,t){},52:function(e,a,t){},53:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(20),s=t.n(c),l=t(13),u=t(8),o=t(5),i=t(10),m=t(3),d=t.n(m),p=t(21),f=t.n(p),v=new Map;function E(e,a){var t=function(e,t){if(!v.has(e)){var n={promise:a(t),status:"pending",value:null};n.promise.then((function(e){n.status="resolved",n.value=e}),(function(e){n.status="error",n.value=e})),v.set(e,n)}};return{read:function(a){var n="".concat(e,":").concat(a);t(n,a);var r=v.get(n);switch(r.status){case"pending":throw r.promise;case"resolved":return r.value;case"error":throw r.value;default:return}},prefetch:function(a){var n="".concat(e,":").concat(a);t(n,a)}}}function h(e){return new Promise((function(a,t){setTimeout((function(){a(e)}),e)}))}var g=function(e){var a,t,n,r=arguments;return d.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:0,c.next=3,d.a.awrap(fetch(e));case 3:return t=c.sent,c.next=6,d.a.awrap(t.json());case 6:return n=c.sent,c.next=9,d.a.awrap(h(a+1e3*Math.random()));case 9:return c.abrupt("return",n);case 10:case"end":return c.stop()}}))};t(33);function b(){return r.a.createElement("div",{className:"wrapper-header"},r.a.createElement("h2",null," Concurrent React Example"))}function w(e){return function(e){var a,t="pending",n=e.then((function(e){t="success",a=e.target}),(function(e){t="error",a=e}));return{read:function(){if("pending"===t)throw n;if("error"===t)throw a;return a}}}(new Promise((function(a){console.log("source :",e);var t=new Image;return t.src=e,t.onload=a,t})))}t(34);function j(){return r.a.createElement("div",{className:" loader"})}t(35);function N(e){var a=Object(n.useState)(w("https://i.pravatar.cc/256?img=".concat(e.userData.id+5))),t=Object(o.a)(a,2),c=t[0];t[1];return r.a.createElement("div",{className:"wrapper-user-cards"},r.a.createElement("div",null,r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",{className:"user-thumbnail"},r.a.createElement(j,null))},r.a.createElement(O,{imgData:c,onClick:function(){e.handleUserData(e.userData.id)}}))),r.a.createElement("div",{className:"user-data"},r.a.createElement("div",null,e.userData.name,r.a.createElement("span",null,e.userData.userName))),r.a.createElement("div",null,e.isPending?r.a.createElement("div",{className:"wrapper-loader"},r.a.createElement(j,null)," "):null))}function O(e){var a=e.imgData,t=e.onClick,n=a.read();return r.a.createElement("img",{className:"user-thumbnail",src:n.src,alt:"user-dp",onClick:t})}t(36),t(37);var D=function(e){var a=e.data.posts.read();return r.a.createElement("div",{className:"wrapper-comments"},a.map((function(e,a){return r.a.createElement("div",{className:"comment-card"},r.a.createElement("div",{className:"comment-data"},e.body),r.a.createElement("div",{className:"comment-by"},e.email))})))},S=(t(38),function(e){var a={posts:E("posts:".concat(e),(function(){return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,d.a.awrap(g("https://jsonplaceholder.typicode.com/comments?postId=".concat(e),600));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))}))};return Object(i.a)({},a)});function x(e){var a=e.userData;console.log("props",e);var t=Object(n.useState)(S(e.userId)),c=Object(o.a)(t,2),s=c[0],l=c[1],u=Object(n.useState)(w("https://i.pravatar.cc/256?img=".concat(e.userId+5))),i=Object(o.a)(u,2),m=i[0],d=i[1];return console.log("id :",e.userId+5),Object(n.useEffect)((function(){d(w("https://i.pravatar.cc/256?img=".concat(e.userId+5))),l(S(e.userId))}),[e.userId]),r.a.createElement("div",{className:"wrapper-user-profile"},r.a.createElement("div",{className:"profile"},r.a.createElement(n.SuspenseList,{revealOrder:"forwards"},r.a.createElement("div",{className:"profile-top-section"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",{className:"user-image"},r.a.createElement(j,null))},r.a.createElement(y,{imageData:m})),r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"loading userDetails....",r.a.createElement(j,null))},r.a.createElement(k,{data:a}))),r.a.createElement("div",{className:"comments-section"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"loading user posts ....",r.a.createElement(j,null))},r.a.createElement(D,{data:s}))))))}function k(e){var a=e.data.user.read();return console.log(a),r.a.createElement("div",{className:"user-details"},r.a.createElement("div",null,"name :",a.name),r.a.createElement("div",null,"email :",a.email),r.a.createElement("div",null,"company :",a.company.name," "))}function y(e){var a=e.imageData.read();return console.log("data : ",a),r.a.createElement("img",{className:"user-image",src:a.src,alt:"user-dp"})}t(39),t(46);var I=function(e){console.log("loading userData... ",e);var a={user:E("user:".concat(e),(function(){return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,d.a.awrap(g("https://jsonplaceholder.typicode.com/users/".concat(e),2e3));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))}))};return Object(i.a)({},a)},C={timeoutMs:3e3},P=Object(u.f)((function(e){var a=M(),t=a.dataSource,c=(a.friendId,t.userListData.read()),s=Object(n.useState)(I(1)),l=Object(o.a)(s,2),u=l[0],i=l[1],m=Object(n.useTransition)(C),d=Object(o.a)(m,2),p=d[0],f=d[1],v=Object(n.useState)(1),E=Object(o.a)(v,2),h=E[0],g=E[1],b=Object(n.useCallback)((function(e){console.log("setUserData id :",e),g(e),p((function(){console.log("startTransition  called "),i(I(e))}))}),[p]);return console.log("isPending",f),console.log("isPending --\x3e re-render:",u),console.log("activeUserId :",h),r.a.createElement("div",{className:"wrapper-user-list"},r.a.createElement("div",{className:"friend-list"},c.map((function(e,a){return r.a.createElement("div",{className:"user-list-item"},r.a.createElement(N,{userData:e,thumbnailUrl:"https://i.pravatar.cc/256?img=".concat(e.id+5),handleUserData:b,isPending:f&&e.id===h}))}))),u&&r.a.createElement(n.Suspense,{fallback:j},r.a.createElement("div",{className:"user-profile-section"},r.a.createElement(x,{userData:u,userId:h}))))})),L=(t(51),Object(n.createContext)(null)),M=function(){return Object(n.useContext)(L)};var U=[{path:"/",component:function(e){var a=Object(n.useState)(1),t=Object(o.a)(a,2),c=t[0],s=(t[1],Object(n.useState)(function(e){var a={userListData:E("userListData",(function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.awrap(g("https://jsonplaceholder.typicode.com/users",0));case 2:return e.t0=6+Math.floor(5*Math.random()),e.abrupt("return",e.sent.slice(0,e.t0));case 4:case"end":return e.stop()}}))}))};return Object(i.a)({},a,{prefetch:function(){a.userListData.prefetch()}})}())),l=Object(o.a)(s,2),u=l[0],m=(l[1],{dataSource:u,friendId:c});return r.a.createElement("div",{className:"app"},r.a.createElement(b,null),r.a.createElement(f.a,{FallbackComponent:function(e){return console.log(e.error),r.a.createElement("div",null," Error loading data ")}},r.a.createElement(L.Provider,{value:m},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null," loading /.....")},r.a.createElement("div",{className:"wrapper-home"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",{className:"loading-users"}," Loading users ...")},r.a.createElement(P,null)))))))},name:"Home Page"},{path:"/:userId",component:x}];function T(){return r.a.createElement(l.a,null,r.a.createElement(u.c,null,U.map((function(e){return r.a.createElement(u.a,{exact:!0,key:e.name,path:e.path,render:function(a){var t=a.history,n=a.match,c=a.location;return r.a.createElement(e.component,{history:t,match:n,location:c})}})}))))}t(52);var J=document.getElementById("root");s.a.createRoot(J).render(r.a.createElement((function(){return r.a.createElement(T,null)}),null))}},[[24,1,2]]]);
//# sourceMappingURL=main.f7b97c60.chunk.js.map