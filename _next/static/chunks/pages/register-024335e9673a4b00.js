(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{436:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return a(9601)}])},4161:function(e,s,a){"use strict";a.d(s,{Z:function(){return u}});var t=a(5893),i=a(5675),r=a.n(i),l={src:"/mcchub/_next/static/media/mcc.4b878881.svg",height:50,width:407,blurWidth:0,blurHeight:0},n=a(1664),d=a.n(n),c=a(9008),o=a.n(c);function u(e){let{title:s,children:a}=e;return(0,t.jsxs)("div",{className:"h-screen w-screen bg-gradient-radial from-white via-white to-blue-200",children:[(0,t.jsx)(o(),{children:(0,t.jsx)("title",{lang:"en",children:s?"".concat(s," | MCC Hub"):"MCC Hub"},"title")}),(0,t.jsxs)("div",{className:"min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8",children:[(0,t.jsx)("div",{className:"w-full",children:(0,t.jsxs)("div",{children:[(0,t.jsx)(d(),{href:"/",children:(0,t.jsx)(r(),{className:"mx-auto h-12 w-auto px-2",priority:!0,src:l,alt:"MCC Logo"})}),s?(0,t.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:s}):null]})}),a]})]})}},8804:function(e,s,a){"use strict";a.d(s,{Z:function(){return i}});var t=a(5893);function i(e){let{children:s,isLoading:a=!1,props:i={},className:r="",flex:l=!0,full:n=!1,disabled:d=!1,onClick:c}=e;return(0,t.jsxs)("button",{onClick:c,className:"group relative justify-center rounded-md px-3 py-2 text-sm font-semibold text-white hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 "+(r.includes("bg-")?"":"bg-indigo-600 ")+(n?"w-full ":"")+(l?"flex ":"")+r,disabled:a||d,...i,children:[(0,t.jsxs)("svg",{className:"animate-spin h-5 w-5 mr-3"+(a?"":" hidden"),viewBox:"0 0 24 24",children:[(0,t.jsx)("circle",{className:"opacity-25 fill-indigo-600",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,t.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),s]})}},1001:function(e,s,a){"use strict";a.d(s,{Z:function(){return r}});var t=a(5893),i=a(4161);function r(e){let{children:s,title:a="MCC"}=e;return(0,t.jsx)(i.Z,{title:a,children:(0,t.jsx)("div",{className:"max-w-md mx-auto flex",children:(0,t.jsx)("div",{className:"space-y-8 w-full",children:s})})})}},8063:function(e){"use strict";e.exports={currency:"RM",registration_fee:20,bank_details:["Bank","Account Name","Number:1010101010"],firebaseConfig:{apiKey:"AIzaSyC02WuJ5btg2A6iTeGwYi0IDzGKziODv2k",authDomain:"mcc-registration-test.firebaseapp.com",databaseURL:"https://mcc-registration-test-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"mcc-registration-test",storageBucket:"mcc-registration-test.appspot.com",messagingSenderId:"927692212307",appId:"1:927692212307:web:e3cd12ba84a9720b4b9ea6"}}},5696:function(e,s,a){"use strict";a.d(s,{I:function(){return d},db:function(){return c}});var t=a(3977),i=a(1259),r=a(1019),l=a(8063);let n=(0,t.ZF)(l.firebaseConfig),d=(0,i.v0)(n),c=(0,r.N8)(n)},9601:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return h}});var t=a(5893),i=a(1664),r=a.n(i),l=a(7294),n=a(7536),d=a(5696),c=a(1019),o=a(1259),u=a(1163),m=a(8804),x=a(1001);function h(){var e,s,a,i;let h=(0,u.useRouter)();(0,l.useEffect)(()=>{(0,o.Aj)(d.I,e=>{e&&h.push("/dashboard")})},[h]);let[f,p]=(0,l.useState)(!1),[g,b]=(0,l.useState)(""),{register:v,formState:{errors:y},handleSubmit:w}=(0,n.cI)();return(0,t.jsx)(x.Z,{title:"Register for an account",children:(0,t.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:w(e=>{p(!0),(0,o.Xb)(d.I,e.email,e.password).then(async s=>{let a={};a["role/"+s.user.uid]=e.type,a["users/"+s.user.uid+"/email"]=e.email;try{await (0,c.Vx)((0,c.iH)(d.db),a)}catch(e){b("There was a problem creating your account. Please contact us.")}}).catch(e=>{p(!1);let s=e.code;switch(e.message,s){case"auth/email-already-in-use":b("Email already in use.");break;case"auth/invalid-email":b("Invalid email address.");break;default:b("There was an error. Please try again in a few minutes. If the problem persists, please contact us. (Error code: "+s+")")}})}),noValidate:!0,children:[(0,t.jsxs)("div",{className:"-space-y-px rounded-md shadow-sm",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email-address",className:"sr-only",children:"Email Address"}),(0,t.jsx)("input",{...v("email",{required:"Email address is required.",pattern:{value:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,message:"Entered value does not match email format."}}),id:"email-address",type:"email",autoComplete:"email",required:!0,className:"rounded-t-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:"Email Address"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"sr-only",children:"Password"}),(0,t.jsx)("input",{...v("password",{minLength:{value:8,message:"Password must have at least 8 characters."},maxLength:{value:20,message:"Password must have less than 20 characters."},required:"Password is required."}),id:"password",type:"password",autoComplete:"password",required:!0,className:"relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:"Password"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"confirmPassword",className:"sr-only",children:"Confirm Password"}),(0,t.jsx)("input",{...v("confirmPassword",{validate:{validateSamePassword:(e,s)=>e===s.password||"Passwords do not match."}}),id:"confirmPassword",type:"password",autoComplete:"password",required:!0,className:"rounded-b-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:"Confirm Password"})]}),(0,t.jsxs)("div",{className:"space-x-2 p-2 text-sm font-bold",children:[(0,t.jsx)("input",{type:"radio",id:"teacher",...v("type",{required:"Please select your role."}),value:"teacher"}),(0,t.jsx)("label",{htmlFor:"teacher",children:"I am a Teacher"})]}),(0,t.jsxs)("div",{className:"space-x-2 px-2 pb-2 text-sm font-bold",children:[(0,t.jsx)("input",{type:"radio",id:"parent",...v("type",{required:"Please select your role."}),value:"parent"}),(0,t.jsx)("label",{htmlFor:"parent",children:"I am a Parent"})]}),(0,t.jsxs)("div",{className:"space-x-2 px-2 pb-2 text-sm font-bold",children:[(0,t.jsx)("input",{type:"radio",id:"student",...v("type",{required:"Please select if you are a teacher or student."}),value:"student"}),(0,t.jsx)("label",{htmlFor:"student",children:"I am a Student"})]})]}),(0,t.jsxs)("div",{className:"text-red-500",children:[(0,t.jsx)("div",{children:null==y?void 0:null===(e=y.email)||void 0===e?void 0:e.message}),(0,t.jsx)("div",{children:(null==y?void 0:null===(s=y.password)||void 0===s?void 0:s.message)||(null==y?void 0:null===(a=y.confirmPassword)||void 0===a?void 0:a.message)}),(0,t.jsx)("div",{children:null==y?void 0:null===(i=y.type)||void 0===i?void 0:i.message}),(0,t.jsx)("div",{children:g||""})]}),(0,t.jsx)("div",{className:"flex items-center justify-between",children:(0,t.jsx)("div",{className:"text-sm",children:(0,t.jsx)(r(),{href:"./login",className:"font-medium text-indigo-600 hover:text-indigo-500",children:"Already have an account?"})})}),(0,t.jsx)("div",{children:(0,t.jsx)(m.Z,{props:{type:"submit"},isLoading:f,full:!0,children:"Register"})})]})})}}},function(e){e.O(0,[627,257,414,536,888,774,179],function(){return e(e.s=436)}),_N_E=e.O()}]);