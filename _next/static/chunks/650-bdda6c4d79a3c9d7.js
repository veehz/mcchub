"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[650],{6650:function(e,t,n){n.d(t,{Jt:function(){return en},cF:function(){return es},iH:function(){return er},KV:function(){return et}});var r,s,o,i,a=n(5816),l=n(4444),u=n(740);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let h="firebasestorage.googleapis.com",c="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends l.ZR{constructor(e,t,n=0){super(p(e),`Firebase Storage: ${t} (${p(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return p(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function p(e){return"storage/"+e}function _(){return new d(o.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function f(e){return new d(o.INVALID_ARGUMENT,e)}function g(){return new d(o.APP_DELETED,"The Firebase app was deleted.")}function m(e,t){return new d(o.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function b(e){throw new d(o.INTERNAL_ERROR,"Internal error: "+e)}(r=o||(o={})).UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=w.makeFromUrl(e,t)}catch(t){return new w(e,"")}if(""===n.path)return n;throw new d(o.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null,r="([A-Za-z0-9.\\-_]+)",s=RegExp("^gs://"+r+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),l=RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),u=RegExp(`^https?://${t===h?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),c=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:l,indices:{bucket:1,path:3},postModify:i},{regex:u,indices:{bucket:1,path:2},postModify:i}];for(let t=0;t<c.length;t++){let r=c[t],s=r.regex.exec(e);if(s){let e=s[r.indices.bucket],t=s[r.indices.path];t||(t=""),n=new w(e,t),r.postModify(n);break}}if(null==n)throw new d(o.INVALID_URL,"Invalid URL '"+e+"'.");return n}}class R{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function T(e){return"string"==typeof e||e instanceof String}function E(e){return k()&&e instanceof Blob}function k(){return"undefined"!=typeof Blob&&!(0,l.UG)()}function A(e,t,n,r){if(r<t)throw f(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw f(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function O(e){let t=encodeURIComponent,n="?";for(let r in e)if(e.hasOwnProperty(r)){let s=t(r)+"="+t(e[r]);n=n+s+"&"}return n.slice(0,-1)}(s=i||(i={}))[s.NO_ERROR=0]="NO_ERROR",s[s.NETWORK_ERROR=1]="NETWORK_ERROR",s[s.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e,t,n,r,s,o,i,a,l,u,h,c=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{if(t){e(!1,new U(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===i.NO_ERROR,s=n.getStatus();if(!t||/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let n=-1!==[408,429].indexOf(e),r=-1!==t.indexOf(e);return e>=500&&e<600||n||r}(s,this.additionalRetryCodes_)&&this.retry){let t=n.getErrorCode()===i.ABORT;e(!1,new U(!1,null,t));return}let o=-1!==this.successCodes_.indexOf(s);e(!0,new U(o,n))})},t=(e,t)=>{let n=this.resolve_,r=this.reject_,s=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(s,s.getResponse());void 0!==e?n(e):n()}catch(e){r(e)}else if(null!==s){let e=_();e.serverResponse=s.getErrorText(),r(this.errorCallback_?this.errorCallback_(s,e):e)}else if(t.canceled){let e=this.appDelete_?g():new d(o.CANCELED,"User canceled the upload/download.");r(e)}else{let e=new d(o.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.");r(e)}};this.canceled_?t(!1,new U(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,n){let r=1,s=null,o=null,i=!1,a=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){s=setTimeout(()=>{s=null,e(d,2===a)},t)}function c(){o&&clearTimeout(o)}function d(e,...t){let n;if(l){c();return}if(e){c(),u.call(null,e,...t);return}let s=2===a||i;if(s){c(),u.call(null,e,...t);return}r<64&&(r*=2),1===a?(a=2,n=0):n=(r+Math.random())*1e3,h(n)}let p=!1;function _(e){!p&&(p=!0,c(),!l&&(null!==s?(e||(a=2),clearTimeout(s),h(0)):e||(a=1)))}return h(0),o=setTimeout(()=>{i=!0,_(!0)},n),_}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class U{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function I(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(k())return new Blob(e);throw new d(o.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let v={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class C{constructor(e,t){this.data=e,this.contentType=t||null}}function x(e){let t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if((64512&r)==55296){let s=n<e.length-1&&(64512&e.charCodeAt(n+1))==56320;if(s){let s=r,o=e.charCodeAt(++n);r=65536|(1023&s)<<10|1023&o,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else(64512&r)==56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function D(e,t){let n;switch(e){case v.BASE64:{let n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw m(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case v.BASE64URL:{let n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r)throw m(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{n=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new d(o.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw m(e,"Invalid character found")}let r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}class L{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(null===t)throw m(v.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let n=t[1]||null;null!=n&&(this.base64=function(e,t){let n=e.length>=t.length;return!!n&&e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e,t){let n=0,r="";E(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(E(this.data_)){let n=this.data_,r=n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null;return null===r?null:new P(r)}{let n=new Uint8Array(this.data_.buffer,e,t-e);return new P(n,!0)}}static getBlob(...e){if(k()){let t=e.map(e=>e instanceof P?e.data_:e);return new P(I.apply(null,t))}{let t=e.map(e=>T(e)?function(e,t){switch(e){case v.RAW:return new C(x(t));case v.BASE64:case v.BASE64URL:return new C(D(e,t));case v.DATA_URL:return new C(function(e){let t=new L(e);return t.base64?D(v.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw m(v.DATA_URL,"Malformed data URL.")}return x(t)}(t.rest)}(t),function(e){let t=new L(e);return t.contentType}(t))}throw _()}(v.RAW,e).data:e.data_),n=0;t.forEach(e=>{n+=e.byteLength});let r=new Uint8Array(n),s=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[s++]=e[t]}),new P(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e){var t;let n;try{n=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=n)||Array.isArray(t)?null:n}function B(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e,t){return t}class M{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||F}}let V=null;function $(){if(V)return V;let e=[];e.push(new M("bucket")),e.push(new M("generation")),e.push(new M("metageneration")),e.push(new M("name","fullPath",!0));let t=new M("name");t.xform=function(e,t){return!T(t)||t.length<2?t:B(t)},e.push(t);let n=new M("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new M("timeCreated")),e.push(new M("updated")),e.push(new M("md5Hash",null,!0)),e.push(new M("cacheControl",null,!0)),e.push(new M("contentDisposition",null,!0)),e.push(new M("contentEncoding",null,!0)),e.push(new M("contentLanguage",null,!0)),e.push(new M("contentType",null,!0)),e.push(new M("metadata","customMetadata",!0)),V=e}function q(e,t,n){let r=S(t);return null===r?null:function(e,t,n){let r={};r.type="file";let s=n.length;for(let e=0;e<s;e++){let s=n[e];r[s.local]=s.xform(r,t[s.server])}return Object.defineProperty(r,"ref",{get:function(){let t=r.bucket,n=r.fullPath,s=new w(t,n);return e._makeStorageReference(s)}}),r}(e,r,n)}class j{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e){if(!e)throw _()}function H(e){return function(t,n){var r,s;let i;return 401===t.getStatus()?i=t.getErrorText().includes("Firebase App Check token is invalid")?new d(o.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new d(o.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(r=e.bucket,i=new d(o.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(s=e.path,i=new d(o.UNAUTHORIZED,"User does not have permission to access '"+s+"'.")):i=n,i.status=t.getStatus(),i.serverResponse=n.serverResponse,i}}class K{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=i.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=i.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=i.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw b("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(let e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw b("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw b("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw b("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw b("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class W extends K{initXhr(){this.xhr_.responseType="text"}}function X(){return new W}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this._service=e,t instanceof w?this._location=t:this._location=w.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Z(e,t)}get root(){let e=new w(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return B(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");if(-1===t)return"";let n=e.slice(0,t);return n}(this._location.path);if(null===e)return null;let t=new w(this._location.bucket,e);return new Z(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new d(o.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function G(e,t){let n=null==t?void 0:t[c];return null==n?null:w.makeFromBucketSpec(n,e)}class J{constructor(e,t,n,r,s){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._bucket=null,this._host=h,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=w.makeFromBucketSpec(r,this._host):this._bucket=G(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=w.makeFromBucketSpec(this._url,e):this._bucket=G(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){A("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){A("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Z(this,e)}_makeRequest(e,t,n,r,s=!0){if(this._deleted)return new R(g());{let o=function(e,t,n,r,s,o,i=!0){var a,l,u;let h=O(e.urlParams),c=e.url+h,d=Object.assign({},e.headers);return a=d,t&&(a["X-Firebase-GMPID"]=t),l=d,null!==n&&n.length>0&&(l.Authorization="Firebase "+n),d["X-Firebase-Storage-Version"]="webjs/"+(null!=o?o:"AppManager"),u=d,null!==r&&(u["X-Firebase-AppCheck"]=r),new N(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,i)}(e,this._appId,n,r,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}let Y="@firebase/storage",Q="0.11.2",ee="storage";function et(e,t,n){return function(e,t,n){e._throwIfRoot("uploadBytes");let r=function(e,t,n,r,s){let i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},l=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+l;let u=function(e,t,n){let r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),!r.contentType&&(r.contentType=t&&t.type()||"application/octet-stream"),r}(t,r,s),h=function(e,t){let n={},r=t.length;for(let s=0;s<r;s++){let r=t[s];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}(u,n),c="--"+l+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+h+"\r\n--"+l+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",p=P.getBlob(c,r,"\r\n--"+l+"--");if(null===p)throw new d(o.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");let _={name:u.fullPath},f=y(i,e.host,e._protocol),g=e.maxUploadRetryTime,m=new j(f,"POST",function(t,r){let s=q(e,r,n);return z(null!==s),s},g);return m.urlParams=_,m.headers=a,m.body=p.uploadData(),m.errorHandler=H(t),m}(e.storage,e._location,$(),new P(t,!0),n);return e.storage.makeRequestWithTokens(r,X).then(t=>({metadata:t,ref:e}))}(e=(0,l.m9)(e),t,n)}function en(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,n){let r=t.fullServerUrl(),s=y(r,e.host,e._protocol),i=e.maxOperationRetryTime,a=new j(s,"GET",function(t,r){let s=q(e,r,n);return z(null!==s),function(e,t,n,r){let s=S(t);if(null===s||!T(s.downloadTokens))return null;let o=s.downloadTokens;if(0===o.length)return null;let i=encodeURIComponent,a=o.split(","),l=a.map(t=>{let s=e.bucket,o=e.fullPath,a="/b/"+i(s)+"/o/"+i(o),l=y(a,n,r),u=O({alt:"media",token:t});return l+u});return l[0]}(s,r,e.host,e._protocol)},i);return a.errorHandler=function(e){let t=H(e);return function(n,r){let s=t(n,r);if(404===n.getStatus()){var i;i=e.path,s=new d(o.OBJECT_NOT_FOUND,"Object '"+i+"' does not exist.")}return s.serverResponse=r.serverResponse,s}}(t),a}(e.storage,e._location,$());return e.storage.makeRequestWithTokens(t,X).then(e=>{if(null===e)throw new d(o.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,l.m9)(e))}function er(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,n){if(t instanceof J){if(null==t._bucket)throw new d(o.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+c+"' property when initializing the app?");let r=new Z(t,t._bucket);return null!=n?e(r,n):r}return void 0!==n?function(e,t){let n=function(e,t){let n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new w(e._location.bucket,n);return new Z(e.storage,r)}(t,n):t}(e,t);if(e instanceof J)return new Z(e,t);throw f("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,l.m9)(e),t)}function es(e=(0,a.Mq)(),t){e=(0,l.m9)(e);let n=(0,a.qX)(e,ee),r=n.getImmediate({identifier:t}),s=(0,l.P0)("storage");return s&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:s}=r;s&&(e._overrideAuthToken="string"==typeof s?s:(0,l.Sg)(s,e.app.options.projectId))}(e,t,n,r)}(r,...s),r}(0,a.Xd)(new u.wA(ee,function(e,{instanceIdentifier:t}){let n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new J(n,r,s,t,a.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,a.KN)(Y,Q,""),(0,a.KN)(Y,Q,"esm2017")}}]);