(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[432],{7057:function(a,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile/bind-nric",function(){return i(3317)}])},88:function(a,n,i){"use strict";i.d(n,{Z:function(){return s}});var e=i(5893);function s(a){let{children:n,id:i,disabled:s=!1,hook:r={},value:t}=a;return(0,e.jsxs)("div",{className:"flex space-x-2 p-1 text-sm font-bold "+(s?" text-gray-400":""),children:[(0,e.jsx)("input",{disabled:s,type:"radio",id:i,...r,className:"inline-block",value:void 0===t?i:t}),(0,e.jsx)("label",{className:"inline-block w-full",htmlFor:i,children:n})]})}},821:function(a,n,i){"use strict";i.d(n,{Z:function(){return s}});var e=i(5893);function s(a){let{title:n,children:i,errorMsg:s}=a;return(0,e.jsxs)("div",{className:"space-y-0",children:[(0,e.jsxs)("div",{className:"px-2 py-1",children:[n," ",(0,e.jsx)("span",{className:"text-sm text-red-500",children:s})]}),i]})}},1325:function(a){"use strict";a.exports=["Afghan","Albanian","Algerian","American","Andorran","Angolan","Anguillan","Citizen of Antigua and Barbuda","Argentine","Armenian","Australian","Austrian","Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Belarusian","Belgian","Belizean","Beninese","Bermudian","Bhutanese","Bolivian","Citizen of Bosnia and Herzegovina","Botswanan","Brazilian","British","British Virgin Islander","Bruneian","Bulgarian","Burkinan","Burmese","Burundian","Cambodian","Cameroonian","Canadian","Cape Verdean","Cayman Islander","Central African","Chadian","Chilean","Chinese","Colombian","Comoran","Congolese (Congo)","Congolese (DRC)","Cook Islander","Costa Rican","Croatian","Cuban","Cymraes","Cymro","Cypriot","Czech","Danish","Djiboutian","Dominican","Citizen of the Dominican Republic","Dutch","East Timorese","Ecuadorean","Egyptian","Emirati","English","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Faroese","Fijian","Filipino","Finnish","French","Gabonese","Gambian","Georgian","German","Ghanaian","Gibraltarian","Greek","Greenlandic","Grenadian","Guamanian","Guatemalan","Citizen of Guinea-Bissau","Guinean","Guyanese","Haitian","Honduran","Hong Konger","Hungarian","Icelandic","Indian","Indonesian","Iranian","Iraqi","Irish","Israeli","Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakh","Kenyan","Kittitian","Citizen of Kiribati","Kosovan","Kuwaiti","Kyrgyz","Lao","Latvian","Lebanese","Liberian","Libyan","Liechtenstein citizen","Lithuanian","Luxembourger","Macanese","Macedonian","Malagasy","Malawian","Malaysian","Maldivian","Malian","Maltese","Marshallese","Martiniquais","Mauritanian","Mauritian","Mexican","Micronesian","Moldovan","Monegasque","Mongolian","Montenegrin","Montserratian","Moroccan","Mosotho","Mozambican","Namibian","Nauruan","Nepalese","New Zealander","Nicaraguan","Nigerian","Nigerien","Niuean","North Korean","Northern Irish","Norwegian","Omani","Pakistani","Palauan","Palestinian","Panamanian","Papua New Guinean","Paraguayan","Peruvian","Pitcairn Islander","Polish","Portuguese","Prydeinig","Puerto Rican","Qatari","Romanian","Russian","Rwandan","Salvadorean","Sammarinese","Samoan","Sao Tomean","Saudi Arabian","Scottish","Senegalese","Serbian","Citizen of Seychelles","Sierra Leonean","Singaporean","Slovak","Slovenian","Solomon Islander","Somali","South African","South Korean","South Sudanese","Spanish","Sri Lankan","St Helenian","St Lucian","Stateless","Sudanese","Surinamese","Swazi","Swedish","Swiss","Syrian","Taiwanese","Tajik","Tanzanian","Thai","Togolese","Tongan","Trinidadian","Tristanian","Tunisian","Turkish","Turkmen","Turks and Caicos Islander","Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbek","Vatican citizen","Citizen of Vanuatu","Venezuelan","Vietnamese","Vincentian","Wallisian","Welsh","Yemeni","Zambian","Zimbabwean"]},3317:function(a,n,i){"use strict";i.r(n),i.d(n,{default:function(){return g}});var e=i(5893),s=i(5138),r=i(8472),t=i(7294),l=i(7536),o=i(9525),u=i(1019),d=i(1259),c=i(6864),h=i(821),m=i(88),y=i(1325),b=i.n(y),f=i(4623),p=i(1163);function g(){var a;let{register:n,handleSubmit:i,setValue:y,formState:{errors:g},watch:x}=(0,l.cI)(),[v,N]=(0,t.useState)(!1),[C,S]=(0,t.useState)(!1),[M,j]=(0,t.useState)(!1),[k,w]=(0,t.useState)(""),I=x("isMalaysian","null"),[P,B]=(0,t.useState)(!1),[z,T]=(0,t.useReducer)(f.I,{}),A={title:"Error.",icon:"error",children:"There was an error. Please contact us if problem persists.",hidden:!1,mainText:"OK",mainColors:"bg-red-600",mainOnClick:()=>{T({hidden:!0})},secondaryShow:!1},E=(0,p.useRouter)(),G=async a=>{j(!0),S(!1);let n=a.nric?a.nric.trim():"",i=a.nationality?a.nationality.trim():"",e=a.passport?a.passport.trim():"";if("null"===I){T({...A,children:"Please select your nationality."}),j(!1),S(!0);return}if("true"===I&&0===n.length){T({...A,children:"Please enter your NRIC."}),j(!1),S(!0);return}if("false"===I&&0===i.length){T({...A,children:"Please select your nationality."}),j(!1),S(!0);return}if("false"===I&&0===e.length){T({...A,children:"Please enter your passport number."}),j(!1),S(!0);return}let s="true"===I?n:e;(0,u.jM)((0,u.iH)(o.db,"nric/"+s+"/student"),async a=>{if(a.val()){T({...A,children:"NRIC/Passport Number is already taken. Please contact us if this is a mistake."}),j(!1);return}B(!0);try{var n,e,r;await (0,u.t8)((0,u.iH)(o.db,"users/"+(null===(n=o.I.currentUser)||void 0===n?void 0:n.uid)+"/nationality"),"true"===I?"Malaysian":i),await (0,u.t8)((0,u.iH)(o.db,"users/"+(null===(e=o.I.currentUser)||void 0===e?void 0:e.uid)+"/nric"),s),await (0,u.t8)((0,u.iH)(o.db,"nric/"+s+"/student"),null===(r=o.I.currentUser)||void 0===r?void 0:r.uid),T({title:"Success!",icon:"checkmark",children:"Profile is successfully bound.",hidden:!1,mainText:"OK",mainColors:"bg-green-600",mainOnClick:()=>{T({hidden:!0}),E.push("/dashboard")},secondaryShow:!1}),j(!1),S(!1)}catch(a){T({...A,children:"There was an error. Please contact us if problem persists."}),j(!1),S(!0);return}})};return(0,d.Aj)(o.I,async a=>{P||!a||v||(N(!0),(0,u.jM)((0,u.iH)(o.db,"users/"+a.uid+"/nric"),n=>{let i=n.val();i?(0,u.jM)((0,u.iH)(o.db,"users/"+a.uid+"/nationality"),a=>{let n="Malaysian"===a.val();y("isMalaysian",n?"true":"false"),n?y("nric",i):y("passport",i),w(["An indentification is already bound to your account.","If you want to change your identification, please contact us."])},{onlyOnce:!0}):(0,u.jM)((0,u.iH)(o.db,"role/"+a.uid),a=>{"student"===a.val()?(S(!0),w(["You can bind your identification only once.","Please check before submitting."])):w(["You are not a student. You don't have to bind your IC number.","Please contact us if this is a mistake."])})},{onlyOnce:!0}))}),(0,e.jsxs)(r.Z,{title:"Bind Identification",children:[(0,e.jsx)("div",{className:"flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8",children:(0,e.jsxs)("div",{className:"w-full space-y-8 max-w-md",children:[(0,e.jsx)("div",{children:(0,e.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:"Bind NRIC/Passport Number"})}),(0,e.jsx)("div",{className:"text-center text-sm",children:"string"==typeof k?k:k.map((a,n)=>(0,e.jsx)("p",{children:a},n))}),(0,e.jsxs)(h.Z,{children:[(0,e.jsx)(m.Z,{id:"malaysian",value:"true",hook:n("isMalaysian"),disabled:!C,children:"Malaysian"}),(0,e.jsx)(m.Z,{id:"nonmalaysian",value:"false",hook:n("isMalaysian"),disabled:!C,children:"Non-Malaysian"})]}),(0,e.jsx)("form",{className:"space-y-6 w-full",onSubmit:i(G),noValidate:!0,children:(0,e.jsxs)("div",{className:"space-y-2",children:["false"===I?(0,e.jsxs)("div",{className:"w-full",children:[(0,e.jsx)("div",{className:"px-2 py-1",children:(0,e.jsx)("label",{children:"Nationality"})}),(0,e.jsxs)("select",{className:"rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-75 disabled:bg-slate-100",disabled:!1,id:"nationality",defaultValue:"select-one",children:[(0,e.jsx)("option",{value:"select-one",disabled:!0,children:"Select your nationality"}),b().filter(a=>"Malaysian"!=a).map((a,i)=>(0,e.jsx)("option",{value:a,...n("nationality",{validate:{notEmpty:a=>"select-one"!=a||"Please select your nationality"}}),children:a},i))]})]}):null,"true"===I?(0,c.Z)({hook:n("nric",{pattern:{value:/[0-9]{2}[0-1][0-9][0-3][0-9]-[0-1][0-9]-[0-9]{4}/,message:"Invalid NRIC format."}}),id:"nric",inputName:"NRIC",placeholder:"NRIC with dashes (e.g. 031231-14-1234)",disabled:!C,errorMsg:null==g?void 0:null===(a=g.nric)||void 0===a?void 0:a.message}):null,"false"===I?(0,c.Z)({hook:n("passport"),id:"nric",inputName:"Passport Number",placeholder:"Passport Number",disabled:!C}):null,(0,e.jsx)(s.Z,{full:!0,props:{type:"submit"},isLoading:M,disabled:!C,children:"Bind NRIC"})]})})]})}),(0,f.Z)(z)]})}}},function(a){a.O(0,[627,737,414,536,337,774,888,179],function(){return a(a.s=7057)}),_N_E=a.O()}]);