(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[742],{7627:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forgot-password",function(){return s(3254)}])},8038:function(e,t,s){"use strict";s.d(t,{Z:function(){return u}});var i=s(5893),a=s(5675),r=s.n(a),n={src:"/mcchub/_next/static/media/mcc.4b878881.svg",height:50,width:407,blurWidth:0,blurHeight:0},l=s(1664),c=s.n(l),d=s(9008),o=s.n(d);function u(e){let{title:t,children:s}=e;return(0,i.jsxs)("div",{className:"h-screen w-screen bg-gradient-radial from-white via-white to-blue-200",children:[(0,i.jsx)(o(),{children:(0,i.jsx)("title",{lang:"en",children:t?"".concat(t," | MCC Hub"):"MCC Hub"},"title")}),(0,i.jsxs)("div",{className:"min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8",children:[(0,i.jsx)("div",{className:"w-full",children:(0,i.jsxs)("div",{children:[(0,i.jsx)(c(),{href:"/",children:(0,i.jsx)(r(),{className:"mx-auto h-12 w-auto px-2",priority:!0,src:n,alt:"MCC Logo"})}),t?(0,i.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:t}):null]})}),s]})]})}},5138:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});var i=s(5893);function a(e){let{children:t,isLoading:s=!1,props:a={},className:r="",flex:n=!0,full:l=!1,disabled:c=!1,onClick:d}=e;return(0,i.jsxs)("button",{onClick:d,className:"group relative justify-center rounded-md px-3 py-2 text-sm font-semibold text-white hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 "+(r.includes("bg-")?"":"bg-indigo-600 ")+(l?"w-full ":"")+(n?"flex ":"")+r,disabled:s||c,...a,children:[(0,i.jsxs)("svg",{className:"animate-spin h-5 w-5 mr-3"+(s?"":" hidden"),viewBox:"0 0 24 24",children:[(0,i.jsx)("circle",{className:"opacity-25 fill-indigo-600",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,i.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),t]})}},6055:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});var i=s(5893),a=s(8038);function r(e){let{children:t,title:s="MCC"}=e;return(0,i.jsx)(a.Z,{title:s,children:(0,i.jsx)("div",{className:"max-w-md mx-auto flex",children:(0,i.jsx)("div",{className:"space-y-8 w-full",children:t})})})}},9525:function(e,t,s){"use strict";s.d(t,{I:function(){return l},db:function(){return c}});var i=s(3977),a=s(1259),r=s(1019);let n=(0,i.ZF)({apiKey:"AIzaSyC02WuJ5btg2A6iTeGwYi0IDzGKziODv2k",authDomain:"mcc-registration-test.firebaseapp.com",databaseURL:"https://mcc-registration-test-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"mcc-registration-test",storageBucket:"mcc-registration-test.appspot.com",messagingSenderId:"927692212307",appId:"1:927692212307:web:e3cd12ba84a9720b4b9ea6"}),l=(0,a.v0)(n),c=(0,r.N8)(n)},3254:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var i=s(5893),a=s(7294),r=s(7536),n=s(9525),l=s(1259),c=s(1163),d=s(5138),o=s(6055);function u(){var e;let t=(0,c.useRouter)();(0,a.useEffect)(()=>{(0,l.Aj)(n.I,e=>{e&&t.push("/dashboard")})},[t]);let[s,u]=(0,a.useState)(!1),[x,m]=(0,a.useState)(""),{register:f,formState:{errors:h},handleSubmit:p}=(0,r.cI)();return(0,i.jsx)(o.Z,{title:"Forgot Password",children:(0,i.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:p(e=>{u(!0),(0,l.LS)(n.I,e.email).then(()=>{u(!1)}).catch(e=>{u(!1);let t=e.code;(e.message,"auth/invalid-email"===t)?m("Invalid email address."):m("There was an error. Please try again in a few minutes. If the problem persists, please contact us. (Error code: "+t+")")})}),noValidate:!0,children:[(0,i.jsx)("div",{className:"-space-y-px rounded-md shadow-sm",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"email-address",className:"sr-only",children:"Email Address"}),(0,i.jsx)("input",{...f("email",{required:"Email address is required.",pattern:{value:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,message:"Entered value does not match email format."}}),id:"email-address",type:"email",autoComplete:"email",required:!0,className:"rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:"Email Address"})]})}),(0,i.jsxs)("div",{className:"text-red-500",children:[(0,i.jsx)("div",{children:null==h?void 0:null===(e=h.email)||void 0===e?void 0:e.message}),(0,i.jsx)("div",{children:x||""})]}),(0,i.jsx)("div",{children:(0,i.jsx)(d.Z,{full:!0,props:{type:"submit"},isLoading:s,children:"Reset Password"})})]})})}}},function(e){e.O(0,[627,737,414,536,774,888,179],function(){return e(e.s=7627)}),_N_E=e.O()}]);