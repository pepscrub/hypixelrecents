(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{27:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),r=c(11),s=c.n(r),o=c(2),i=c.n(o),l=c(5),d=c(3),h=c(4),u=c.n(h),j=c(7),b=c.n(j),m=c(6),p=c.n(m),O=c(0);function x(e){return void 0===e?e:e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}var f=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),c=t[0],a=t[1],r=Object(n.useState)(!1),s=Object(d.a)(r,2),o=s[0],h=s[1],j=Object(n.useState)(null),f=Object(d.a)(j,2),v=f[0],g=f[1],y=Object(n.useState)(!1),w=Object(d.a)(y,2),S=w[0],N=w[1],T=Object(n.useState)(null),k=Object(d.a)(T,2),A=k[0],C=k[1],q=Object(n.useState)(0),_=Object(d.a)(q,2),D=_[0],E=_[1],L="localhost"===window.location.hostname?":8080":"",F="".concat(window.location.protocol,"//").concat(window.location.hostname).concat(L,"/api/v1/");return Object(n.useEffect)((function(){function e(){return(e=Object(l.a)(i.a.mark((function e(){var t,c,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(F,"searches")).then((function(e){return e.ok?e.json():{error:"Too many requests"}})).then((function(e){return e.error?a("Cannot connect to DB"):(h(!0),e)}),(function(e){console.table(e),h(!0),a(e.message)}));case 2:t=e.sent,fetch("".concat(F,"reaction")).then((function(e){return e.json()})).then((function(e){C(e)})),c=document.querySelectorAll(".chips"),u.a.Chips.init(c,{placeholder:"Name / UUID",secondaryPlaceholder:"+ 1 more",autocompleteOptions:{data:t,limit:5,minLength:1},onChipSelect:function(){var e=Object(l.a)(i.a.mark((function e(t,c){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelectorAll(".chip").forEach((function(e){return e.style=""})),c.style="background-color: #4f4f5c";case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),onChipAdd:function(){var e=Object(l.a)(i.a.mark((function e(c,n){var a,r,s,o,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.style="",a=document.querySelectorAll(".chip").length,r=document.querySelectorAll(".chip")[a-1],a>=2&&(c[0].querySelector("input").setAttribute("disabled",""),c[0].querySelector("input").setAttribute("style","height: 0;width: 0;display: flex;")),!(a>=3)){e.next=6;break}return e.abrupt("return",r.remove());case 6:if(s=n.innerText.split("\n")[0],void 0===t[s]){e.next=11;break}e.t0=t[s],e.next=14;break;case 11:return e.next=13,fetch("".concat(window.location.protocol,"//").concat(window.location.hostname).concat(L,"/api/v1/head/").concat(s)).then((function(e){return e.json()})).then((function(e){return e.error?e:"data:image/jpg;base64,"+btoa(String.fromCharCode.apply(null,e.blob.data))}));case 13:e.t0=e.sent;case 14:if(o=e.t0){e.next=19;break}return c[0].querySelector("input").removeAttribute("disabled",""),c[0].querySelector("input").removeAttribute("style",""),e.abrupt("return",r.remove());case 19:if(!o.error){e.next=24;break}return c[0].querySelector("input").removeAttribute("disabled",""),c[0].querySelector("input").removeAttribute("style",""),window.M.toast({html:"This account does not exist"}),e.abrupt("return",r.remove());case 24:l='<img src="'.concat(o,'"/>'),r.classList.add("waves-effect"),r.classList.add("waves-light"),r.innerHTML+=l;case 28:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),onChipDelete:function(){var e=Object(l.a)(i.a.mark((function e(t,c){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelectorAll(".chip").length<=2&&(t[0].querySelector("input").removeAttribute("disabled",""),t[0].querySelector("input").removeAttribute("style",""));case 2:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}()}),n=document.querySelectorAll(".modal"),u.a.Modal.init(n,{}),r=document.querySelectorAll(".collapsible"),u.a.Collapsible.init(r,{});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[F]),c?Object(O.jsxs)("div",{className:"center",children:[Object(O.jsx)("h1",{className:"teal-text text-accent-3",children:"(\xb4\u2212\uff40)\uff9d"}),Object(O.jsx)("h4",{className:"grey-text text-darken-1",children:"I don't really know what happened..."}),Object(O.jsxs)("p",{children:["Error: ",Object(O.jsx)("span",{className:"red-text text-accent-2",children:c})]})]}):o?Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"chips chips-autocomplete col s12"}),Object(O.jsx)("a",{onClick:function(){E(document.querySelectorAll(".chip").length),g(!0);var e=document.querySelectorAll(".chip"),t="";e.forEach((function(e){var c=e.innerText.split("\n")[0];t+="/".concat(c)})),N(!0);var c="".concat(F,"player").concat(t);fetch(c).then((function(e){if(e.ok)return e.json();u.a.toast({html:"HTTP ".concat(e.status," ").concat(e.statusText)})})).then((function(e){g(e),N(!1)})).catch((function(e){u.a.toast({html:"".concat(e)})}))},className:"waves-effect waves-light btn col s12 modal-trigger",href:"#main-modal",children:"Search"}),Object(O.jsx)("div",{id:"main-modal",className:"modal bottom-sheet",children:Object(O.jsxs)("div",{className:"modal-content container",children:[Object(O.jsx)("a",{href:"#!",className:"modal-close waves-effect waves-red btn-flat right",children:Object(O.jsx)("span",{className:"material-icons",children:"close"})}),Object(O.jsxs)("h4",{children:["Games on Hypixel ",D>1?"Together":""]}),S?Object(O.jsx)("ul",{className:"collapsible",style:{border:0,boxShadow:"none"},children:Object(O.jsx)(m.SkeletonTheme,{color:"#202020",highlightColor:"#444",children:Object(O.jsx)(p.a,{count:4,height:45})})}):v&&v[0]?Object(O.jsxs)("ul",{className:"collapsible",children:[v.map((function(e,t){return Object(O.jsxs)("li",{children:[Object(O.jsxs)("div",{className:"collapsible-header",children:[function(){switch(t){case 0:return Object(O.jsxs)("span",{className:"valign-wrapper",children:[Object(O.jsx)("i",{className:"material-icons",children:"fiber_manual_record"},-1)," Currently playing..."]});case 1:return Object(O.jsxs)("span",{children:[Object(O.jsx)("i",{className:"material-icons",children:"king_bed"},-1)," Bedwars"]});case 2:return Object(O.jsxs)("span",{children:[Object(O.jsx)("i",{className:"material-icons",children:"smart_toy"},-2)," Arcade"]});case 3:return Object(O.jsxs)("span",{children:[Object(O.jsx)("i",{className:"material-icons",children:"feed"},-3)," Other"]});default:return Object(O.jsx)("i",{children:A?A.face:".-."},t)}}(),Object(O.jsx)("span",{className:"badge",children:e.length})]}),Object(O.jsxs)("div",{className:"collapsible-body",children:[0===e.length?Object(O.jsxs)("span",{children:[Object(O.jsx)("h1",{className:"col s12 center",children:A?A.face:".-."}),Object(O.jsx)("p",{className:"center",children:A?A.reaction:"huh"})]}):"",e.map((function(e,c){var n=e.date,a=void 0===n?Date.now():n,r=e.gameType,s=void 0===r?"oop Something happened":r,o=e.mode,i=void 0===o?"oop Something happened":o,l=e.map,d=void 0===l?"oop Something happened":l,h=e.ended,u=void 0===h?Date.now():h,j=void 0!==s?x(s.replace("_"," ")):void 0,b=e.active?"".concat(e.name):d||j,m=(u-a)/1e3,p=Math.floor(m/3600%24),f=Math.floor(m/60%60),v=Math.floor(m%60),g="".concat(p?"".concat(p,"hr").concat(p>1?"s":""):""," \n                                            ").concat(f?"".concat(f,"min").concat(f>1?"s":""):""," \n                                            ").concat(v?"".concat(v,"sec").concat(v>1?"s":""):""),y=function(){switch(e.active?e.active.mode?e.active.mode:e.active.online?"Online":"Offline":i){case"Online":return"Online";case"Offline":return"Offline";case"EIGHT_ONE":return"1v1v1v1...";case"EIGHT_TWO":return"2v2v2v2...";case"FOUR_THREE":return"3v3v3v3";case"THREE_FOUR":return"4v4v4";case"FOUR_FOUR":return"4v4v4v4";case"LOBBY":return"Lobby";case"PIT":return"Pit";case"TWO_V_TWO":return"2v2";case"CTF":return"Capture the Flag";case"TDM":return"Team Death Match";case"SOLO":return"Smash Heros";case"DOM":return"Dominate";case"PARTY":case null:return"";case"solo_normal":return"Skywars Solo Normal";case"ONE_V_JUAN":return"One v Juan";case"solo_insane":return"Skywars Solo Insane";default:return"Well, how did i get here?"}},w=new Date(a),S=new Date(u);return Object(O.jsxs)("div",{className:"card",children:[Object(O.jsx)("div",{className:"card-image waves-effect waves-block waves-light",children:1===t&&d?Object(O.jsx)("img",{alt:d,className:"activator",src:"imgs/bedwars/".concat(d.replace(" ","_"),".png")}):""}),Object(O.jsxs)("div",{className:"card-content",children:[Object(O.jsxs)("span",{className:"card-title activator",children:[b,Object(O.jsxs)("i",{className:"blue-text text-darken-1",children:[" ",y()," "]}),Object(O.jsx)("i",{className:"material-icons right",children:"more_vert"})]}),Object(O.jsx)("p",{children:g})]}),Object(O.jsxs)("div",{className:"card-reveal",children:[Object(O.jsx)("span",{className:"card-title",children:Object(O.jsx)("i",{className:"material-icons right waves-effect waves-red",children:"close"})}),0===t?Object(O.jsx)("span",{children:Object(O.jsxs)("p",{children:[e.active?x(e.active.gameType):e.active," ",y()]})}):Object(O.jsxs)("span",{children:[Object(O.jsx)("div",{}),Object(O.jsxs)("table",{className:"responsive-table",children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:b}),Object(O.jsx)("th",{children:"Time"}),Object(O.jsx)("th",{children:"Date"})]})}),Object(O.jsxs)("tbody",{children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Game Started"}),Object(O.jsx)("td",{children:w.toLocaleTimeString()}),Object(O.jsx)("td",{children:w.toLocaleDateString()})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Game Ended"}),Object(O.jsx)("td",{children:S.toLocaleTimeString()}),Object(O.jsx)("td",{children:S.toLocaleDateString()})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Duration"}),Object(O.jsx)("td",{children:g}),Object(O.jsx)("td",{})]})]})]})]})]})]})}))]})]},t.toString())})),Object(O.jsx)(b.a.Google,{client:"ca-pub-5211251535508566",slot:"7528515664",style:{display:"block"},layout:"in-article",format:"auto",responsive:"true"})]}):Object(O.jsxs)("ul",{className:"collapsible",style:{border:0,boxShadow:"none"},children:[Object(O.jsx)("h1",{className:"col s12 center",children:A?A.face:".-."}),Object(O.jsx)("p",{className:"center",children:A?A.reaction:"huh"})]})]})})]}):Object(O.jsx)(m.SkeletonTheme,{color:"#202020",highlightColor:"#444",children:Object(O.jsx)(p.a,{count:2,height:45})})};var v=function(){return Object(O.jsx)("h1",{className:"center",children:"Hypixel Recents"})},g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,28)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),a(e),r(e),s(e)}))};var y=function(){return Object(O.jsx)(b.a.Google,{client:"ca-pub-5211251535508566",slot:"7528515664",style:{display:"block"},layout:"in-article",format:"auto",responsive:"true"})};s.a.render(Object(O.jsxs)(a.a.StrictMode,{children:[Object(O.jsx)(v,{}),Object(O.jsx)(f,{}),Object(O.jsx)(y,{})]}),document.getElementById("root")),g()}},[[27,1,2]]]);
//# sourceMappingURL=main.78976f4e.chunk.js.map