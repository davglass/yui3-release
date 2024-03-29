/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("io-nodejs",function(e,t){e.IO.request||(e.IO.request=require("request").defaults({jar:!1}));var n=require("http").STATUS_CODES,r=function(e){var t=[];return Object.keys(e).forEach(function(n){t.push(n+": "+e[n])}),t.join("\n")};e.IO.transports.nodejs=function(){return{send:function(t,i,s){s.notify("start",t,s),s.method=s.method||"GET",s.method=s.method.toUpperCase();var o={method:s.method,uri:i};s.data&&(e.Lang.isString(s.data)&&(o.body=s.data),o.body&&o.method==="GET"&&(o.uri+=(o.uri.indexOf("?")>-1?"&":"?")+o.body,o.body="")),s.headers&&(o.headers=s.headers),s.timeout&&(o.timeout=s.timeout),s.request&&e.mix(o,s.request),e.IO.request(o,function(e,i){if(e){t.c=e,s.notify(e.code==="ETIMEDOUT"?"timeout":"failure",t,s);return}i&&(t.c={status:i.statusCode,statusCode:i.statusCode,statusText:n[i.statusCode],headers:i.headers,responseText:i.body||"",responseXML:null,getResponseHeader:function(e){return this.headers[e]},getAllResponseHeaders:function(){return r(this.headers)}}),s.notify("complete",t,s),s.notify(i&&i.statusCode>=200&&i.statusCode<=299?"success":"failure",t,s)});var u={io:t};return u}}},e.IO.defaultTransport("nodejs")},"3.10.0pr1",{requires:["io-base"]});
