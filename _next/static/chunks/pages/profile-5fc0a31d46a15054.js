(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[283],{9813:function(e,i,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return l(7078)}])},8945:function(e,i,l){"use strict";l.d(i,{Z:function(){return n}});var r=l(5893);function n(e){let{id:i,inputName:l,placeholder:n,hook:d,disabled:s=!1,errorMsg:o,props:t}=e;return(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsx)("div",{className:"px-2 py-1",children:(0,r.jsx)("label",{htmlFor:i,children:void 0===l?n:l||null})}),(0,r.jsx)("input",{type:"date",className:"rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-75 disabled:bg-slate-100"+(o?" ring-red-500":""),disabled:s,id:i,placeholder:n,...t,...d}),(0,r.jsx)("div",{className:"px-2 py-1",children:(0,r.jsx)("div",{className:"text-sm text-red-500",children:o})})]})}l(7294)},3758:function(e,i,l){"use strict";l.d(i,{Z:function(){return n}});var r=l(5893);function n(e){let{title:i,hidden:l=!1,children:n,props:d}=e;return(0,r.jsxs)("div",{hidden:l,className:"space-y-2 rounded-md p-4 border-solid border-2 border-indigo-600",...d,children:[(0,r.jsx)("div",{className:"font-bold text-center text-xl",children:i}),n]})}},1454:function(e,i,l){"use strict";l.d(i,{Z:function(){return n}});var r=l(5893);function n(e){let{children:i,id:l,disabled:n=!1,hook:d={},value:s}=e;return(0,r.jsxs)("div",{className:"flex space-x-2 p-1 text-sm font-bold "+(n?" text-gray-400":""),children:[(0,r.jsx)("input",{disabled:n,type:"radio",id:l,...d,className:"inline-block",value:void 0===s?l:s}),(0,r.jsx)("label",{className:"inline-block w-full",htmlFor:l,children:i})]})}},3706:function(e,i,l){"use strict";l.d(i,{Z:function(){return n}});var r=l(5893);function n(e){let{title:i,children:l,errorMsg:n}=e;return(0,r.jsxs)("div",{className:"space-y-0",children:[(0,r.jsxs)("div",{className:"px-2 py-1",children:[i," ",(0,r.jsx)("span",{className:"text-sm text-red-500",children:n})]}),l]})}},7078:function(e,i,l){"use strict";l.r(i),l.d(i,{default:function(){return y}});var r=l(5893),n=l(8804),d=l(7312),s=l(7294),o=l(7536),t=l(5696),a=l(1019),c=l(1259),u=l(3758),h=l(1758),m=l(1454),f=l(3706),g=l(8945),x=l(1664),p=l.n(x),v=l(1365),b=l(1163);function y(){var e,i,l,x,y,j,N;let{register:k,formState:{errors:S},handleSubmit:w,setValue:Z}=(0,o.cI)(),[A,C]=(0,s.useState)(!1),[I,M]=(0,s.useState)(!1),[P,_]=(0,s.useState)(""),O=(0,b.useRouter)(),[F,L]=(0,s.useReducer)(v.I,{}),[E,U]=(0,s.useState)({}),[B,T]=(0,s.useState)(!1);(0,s.useEffect)(()=>{(0,c.Aj)(t.I,async e=>{if(e){var i,l;B||(T(!0),(0,a.jM)((0,a.iH)(t.db,"role/"+(null===(i=t.I.currentUser)||void 0===i?void 0:i.uid)),e=>{_(e.val())},{onlyOnce:!0}),(0,a.jM)((0,a.iU)((0,a.iH)(t.db),"users/"+(null===(l=t.I.currentUser)||void 0===l?void 0:l.uid)),e=>{for(let i in U(e.val()),console.log(e.val()),e.val())Z(i,e.val()[i]);C(!0)},{onlyOnce:!0}))}})});let D=e=>{let{hook:i,id:l,inputName:n,placeholder:d,children:s,errorMsg:o}=e;return(0,r.jsx)(h.Z,{hook:i,id:l,inputName:n,placeholder:d,disabled:!A,errorMsg:o,children:s})};return(0,r.jsxs)(d.Z,{title:"Profile",children:[(0,r.jsx)("div",{className:"flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"w-full space-y-8 max-w-md",children:[(0,r.jsx)("div",{children:(0,r.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:"Your Profile"})}),(0,r.jsxs)("form",{className:"mt-8 space-y-6 w-full",onSubmit:w(e=>{var i;M(!0),C(!1);let l={};for(let i in e)if("nric"!=i&&(e[i]||"")!==(E[i]||"")){let r=e[i];l[i]=r||""}(0,a.Vx)((0,a.iU)((0,a.iH)(t.db),"users/"+(null===(i=t.I.currentUser)||void 0===i?void 0:i.uid)),l).then(()=>{M(!1),C(!0),L({hidden:!1,title:"Profile Updated Successfully",children:"",icon:"checkmark",mainText:"OK",mainOnClick:()=>{L({hidden:!0}),O.push("/dashboard")},mainColors:"bg-green-600",secondaryShow:!1})}).catch(e=>{console.log(e),M(!1),C(!0),L({hidden:!1,title:"Error",children:"An error occurred. Please try again later. If problem persists, please contact us.",icon:"error",mainText:"OK",mainOnClick:()=>{L({hidden:!0})},mainColors:"bg-red-600",secondaryShow:!1})})}),noValidate:!0,children:["student"==P&&Object.keys(E).length&&!E.nric?(0,r.jsx)(p(),{href:"/profile/bind-nric",children:(0,r.jsx)(n.Z,{full:!0,children:"Bind your account to an NRIC Number/Passport Number"})}):null,(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)(u.Z,{title:"Personal Information",children:[D({hook:k("name",{required:"Full name is required."}),id:"name",placeholder:"Full Name",errorMsg:null==S?void 0:null===(e=S.name)||void 0===e?void 0:e.message}),(0,r.jsxs)(f.Z,{title:"Gender",errorMsg:null==S?void 0:null===(i=S.gender)||void 0===i?void 0:i.message,children:[(0,r.jsx)(m.Z,{id:"male",hook:k("gender"),disabled:!A,children:"I am a Male"}),(0,r.jsx)(m.Z,{id:"female",hook:k("gender"),disabled:!A,children:"I am a Female"}),(0,r.jsx)(m.Z,{id:"undisclosed",hook:k("gender"),disabled:!A,children:"I am non-binary/I do not wish to disclose my gender"})]})]}),(0,r.jsxs)(u.Z,{title:"Student Information",hidden:"student"!=P,children:[D({hook:k("school"),id:"school",placeholder:"School",errorMsg:null==S?void 0:null===(l=S.school)||void 0===l?void 0:l.message}),(0,r.jsx)(g.Z,{hook:k("dob",{validate:e=>"student"!=P||(!e||e.length<1?"Please fill in your Date of Birth.":void 0)}),id:"dob",inputName:"Date of Birth",placeholder:"Date of Birth",errorMsg:null==S?void 0:null===(x=S.dob)||void 0===x?void 0:x.message}),D({hook:k("form",{validate:e=>"student"!=P||(!e||e.length<1?"Please fill in your form/year.":void 0)}),id:"name",inputName:"Form/Year",placeholder:"Form/Year (e.g. Form 4, Standard 6)",errorMsg:null==S?void 0:null===(y=S.form)||void 0===y?void 0:y.message}),D({hook:k("state"),id:"state",inputName:"State",placeholder:"State (e.g. Kuala Lumpur)",errorMsg:null==S?void 0:null===(j=S.state)||void 0===j?void 0:j.message}),D({hook:k("country",{validate:e=>"student"!=P||(!e||e.length<1?"Please fill in your country.":void 0)}),id:"country",inputName:"Country",placeholder:"Country (e.g. Malaysia)",errorMsg:null==S?void 0:null===(N=S.country)||void 0===N?void 0:N.message})]}),(0,r.jsxs)(u.Z,{title:"Billing Information",hidden:"teacher"!=P&&"parent"!=P,children:[(0,r.jsx)("div",{className:"text-sm text-center",children:"This will be written on your receipt."}),D({hook:k("billingMobileNumber"),id:"billingMobileNumber",placeholder:"Mobile Number"}),D({hook:k("billingAddressLine1"),id:"billingAddressLine1",placeholder:"Address Line 1"}),D({hook:k("billingAddressLine2"),id:"billingAddressLine2",placeholder:"Address Line 2"}),D({hook:k("billingAddressPostcode"),id:"billingAddressPostcode",placeholder:"Postcode"}),D({hook:k("billingAddressCity"),id:"billingAddressCity",placeholder:"City"}),D({hook:k("billingAddressState"),id:"billingAddressState",placeholder:"State"}),D({hook:k("billingAddressCountry"),id:"billingAddressCountry",placeholder:"Country"})]}),(0,r.jsx)(n.Z,{props:{type:"submit"},isLoading:I,full:!0,children:"Update Details"})]})]})]})}),(0,v.Z)(F)]})}}},function(e){e.O(0,[627,257,414,536,634,888,774,179],function(){return e(e.s=9813)}),_N_E=e.O()}]);