(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[717],{5414:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/students/add",function(){return n(3376)}])},9937:function(e,s,n){"use strict";n.d(s,{Z:function(){return r}});var t=n(5893);function r(e){let{title:s,hidden:n=!1,children:r,props:i}=e;return(0,t.jsxs)("div",{hidden:n,className:"space-y-2 rounded-md p-4 border-solid border-2 border-indigo-600",...i,children:[(0,t.jsx)("div",{className:"font-bold text-center text-xl",children:s}),r]})}},88:function(e,s,n){"use strict";n.d(s,{Z:function(){return r}});var t=n(5893);function r(e){let{children:s,id:n,disabled:r=!1,hook:i={},value:a}=e;return(0,t.jsxs)("div",{className:"flex space-x-2 p-1 text-sm font-bold "+(r?" text-gray-400":""),children:[(0,t.jsx)("input",{disabled:r,type:"radio",id:n,...i,className:"inline-block",value:void 0===a?n:a}),(0,t.jsx)("label",{className:"inline-block w-full",htmlFor:n,children:s})]})}},821:function(e,s,n){"use strict";n.d(s,{Z:function(){return r}});var t=n(5893);function r(e){let{title:s,children:n,errorMsg:r}=e;return(0,t.jsxs)("div",{className:"space-y-0",children:[(0,t.jsxs)("div",{className:"px-2 py-1",children:[s," ",(0,t.jsx)("span",{className:"text-sm text-red-500",children:r})]}),n]})}},3376:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return x}});var t=n(5893),r=n(5138),i=n(8472),a=n(7294),l=n(7536),d=n(9525),c=n(1019),u=n(6864),o=n(821),h=n(88),m=n(1163),f=n(9937),p=n(4623);function x(){var e;let{register:s,handleSubmit:n,setValue:x,formState:{errors:b},watch:N}=(0,l.cI)({defaultValues:{isMalaysian:"true"}}),[y,v]=(0,a.useState)(!0),[j,g]=(0,a.useState)(!1),w=N("isMalaysian","true"),[k,Z]=(0,a.useReducer)(p.I,{}),_={title:"Error.",icon:"error",children:"There was an error. Please contact us if problem persists.",hidden:!1,mainText:"OK",mainColors:"bg-red-600",mainOnClick:()=>{Z({hidden:!0})},secondaryShow:!1},I=(0,m.useRouter)(),P=async e=>{g(!0),v(!1);let s=e.nric?e.nric.trim():"",n=e.passport?e.passport.trim():"",t="true"===w?s:n;if("true"===w&&0===s.length){Z({..._,children:"Please enter your NRIC."}),g(!1),v(!0);return}if("false"===w&&0===n.length){Z({..._,children:"Please enter your passport number."}),g(!1),v(!0);return}(0,c.jM)((0,c.iH)(d.db,"nric/"+t+"/manager"),async e=>{if(e.val()){Z({..._,children:"NRIC/Passport Number is already taken. Please contact us if this is a mistake."}),g(!1);return}try{await (0,c.t8)((0,c.iH)(d.db,"managedStudents/"+d.I.currentUser.uid+"/"+t),!0),await (0,c.t8)((0,c.iH)(d.db,"nric/"+t+"/manager"),d.I.currentUser.uid),I.push("/students")}catch(e){console.log(e),Z({..._,children:"There was an error. Please contact us if problem persists."}),g(!1),v(!0)}},{onlyOnce:!0})};return(0,t.jsxs)(i.Z,{title:"Add Student",children:[(0,t.jsx)("div",{className:"flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"w-full space-y-8 max-w-md",children:[(0,t.jsx)("div",{children:(0,t.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:"Add Student"})}),(0,t.jsxs)("form",{className:"space-y-6 w-full",onSubmit:n(P),noValidate:!0,children:[(0,t.jsxs)(f.Z,{title:"Identification",children:[(0,t.jsxs)(o.Z,{children:[(0,t.jsx)(h.Z,{id:"malaysian",value:"true",hook:s("isMalaysian"),disabled:!y,children:"Malaysian"}),(0,t.jsx)(h.Z,{id:"nonmalaysian",value:"false",hook:s("isMalaysian"),disabled:!y,children:"Non-Malaysian"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:["true"===w?(0,u.Z)({hook:s("nric",{pattern:{value:/[0-9]{2}[0-1][0-9][0-3][0-9]-[0-1][0-9]-[0-9]{4}/,message:"Invalid NRIC format."}}),id:"nric",inputName:"NRIC",placeholder:"NRIC with dashes (e.g. 031231-14-1234)",disabled:!y,errorMsg:null==b?void 0:null===(e=b.nric)||void 0===e?void 0:e.message}):null,"false"===w?(0,u.Z)({hook:s("passport"),id:"nric",inputName:"Passport Number",placeholder:"Passport Number",disabled:!y}):null]})]}),(0,t.jsx)(r.Z,{full:!0,props:{type:"submit"},isLoading:j,disabled:!y,children:"Add Student"})]})]})}),(0,p.Z)(k)]})}}},function(e){e.O(0,[627,737,414,536,337,774,888,179],function(){return e(e.s=5414)}),_N_E=e.O()}]);