/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("autocomplete-sources",function(e,t){var n=e.AutoCompleteBase,r=e.Lang,i="_sourceSuccess",s="maxResults",o="requestTemplate",u="resultListLocator";e.mix(n.prototype,{_YQL_SOURCE_REGEX:/^(?:select|set|use)\s+/i,_beforeCreateObjectSource:function(t){return t instanceof e.Node&&t.get("nodeName").toLowerCase()==="select"?this._createSelectSource(t):e.JSONPRequest&&t instanceof e.JSONPRequest?this._createJSONPSource(t):this._createObjectSource(t)},_createIOSource:function(t){function a(n){var o=n.request;if(r._cache&&o in r._cache){r[i](r._cache[o],n);return}s&&s.isInProgress()&&s.abort(),s=e.io(r._getXHRUrl(t,n),{on:{success:function(t,s){var u;try{u=e.JSON.parse(s.responseText)}catch(a){e.error("JSON parse error",a)}u&&(r._cache&&(r._cache[o]=u),r[i](u,n))}}})}var n={type:"io"},r=this,s,o,u;return n.sendRequest=function(t){o=t;if(u)return;u=!0,e.use("io-base","json-parse",function(){n.sendRequest=a,a(o)})},n},_createJSONPSource:function(t){function u(e){var n=e.request,s=e.query;if(r._cache&&n in r._cache){r[i](r._cache[n],e);return}t._config.on.success=function(t){r._cache&&(r._cache[n]=t),r[i](t,e)},t.send(s)}var n={type:"jsonp"},r=this,s,o;return n.sendRequest=function(i){s=i;if(o)return;o=!0,e.use("jsonp",function(){t instanceof e.JSONPRequest||(t=new e.JSONPRequest(t,{format:e.bind(r._jsonpFormatter,r)})),n.sendRequest=u,u(s)})},n},_createSelectSource:function(e){var t=this;return{type:"select",sendRequest:function(n){var r=[];e.get("options").each(function(e){r.push({html:e.get("innerHTML"),index:e.get("index"),node:e,selected:e.get("selected"),text:e.get("text"),value:e.get("value")})}),t[i](r,n)}}},_createStringSource:function(e){return this._YQL_SOURCE_REGEX.test(e)?this._createYQLSource(e):e.indexOf("{callback}")!==-1?this._createJSONPSource(e):this._createIOSource(e)},_createYQLSource:function(t){function c(o){var u=o.query,a=n.get("yqlEnv"),f=n.get(s),c,h,p;p=r.sub(t,{maxResults:f>0?f:1e3,request:o.request,query:u});if(n._cache&&p in n._cache){n[i](n._cache[p],o);return}c=function(e){n._cache&&(n._cache[p]=e),n[i](e,o)},h={proto:n.get("yqlProtocol")},l?(l._callback=c,l._opts=h,l._params.q=p,a&&(l._params.env=a)):l=new e.YQLRequest(p,{on:{success:c},allowCache:!1},a?{env:a}:null,h),l.send()}var n=this,o={type:"yql"},a,f,l;return n.get(u)||n.set(u,n._defaultYQLLocator),o.sendRequest=function(t){a=t,f||(f=!0,e.use("yql",function(){o.sendRequest=c,c(a)}))},o},_defaultYQLLocator:function(t){var n=t&&t.query&&t.query.results,i;return n&&r.isObject(n)?(i=e.Object.values(n)||[],n=i.length===1?i[0]:i,r.isArray(n)||(n=[n])):n=[],n},_getXHRUrl:function(e,t){var n=this.get(s);return t.query!==t.request&&(e+=t.request),r.sub(e,{maxResults:n>0?n:1e3,query:encodeURIComponent(t.query)})},_jsonpFormatter:function(e,t,n){var i=this.get(s),u=this.get(o);return u&&(e+=u(n)),r.sub(e,{callback:t,maxResults:i>0?i:1e3,query:encodeURIComponent(n)})}}),e.mix(n.ATTRS,{yqlEnv:{value:null},yqlProtocol:{value:"http"}}),e.mix(n.SOURCE_TYPES,{io:"_createIOSource",jsonp:"_createJSONPSource",object:"_beforeCreateObjectSource",select:"_createSelectSource",string:"_createStringSource",yql:"_createYQLSource"},!0)},"3.10.0pr1",{optional:["io-base","json-parse","jsonp","yql"],requires:["autocomplete-base"]});
