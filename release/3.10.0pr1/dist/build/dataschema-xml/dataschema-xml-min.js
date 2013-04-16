/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("dataschema-xml",function(e,t){var n=e.Lang,r={1:!0,9:!0,11:!0},i;i={apply:function(e,t){var n=t,s={results:[],meta:{}};return n&&r[n.nodeType]&&e?(s=i._parseResults(e,n,s),s=i._parseMeta(e.metaFields,n,s)):s.error=new Error("XML schema parse failure"),s},_getLocationValue:function(t,n){var r=t.locator||t.key||t,s=n.ownerDocument||n,o,u,a=null;try{o=i._getXPathResult(r,n,s);while(u=o.iterateNext())a=u.textContent||u.value||u.text||u.innerHTML||u.innerText||null;return e.DataSchema.Base.parse.call(this,a,t)}catch(f){}return null},_getXPathResult:function(t,r,i){if(!n.isUndefined(i.evaluate))return i.evaluate(t,r,i.createNSResolver(r.ownerDocument?r.ownerDocument.documentElement:r.documentElement),0,null);var s=[],o=t.split(/\b\/\b/),u=0,a=o.length,f,l,c,h;try{try{i.setProperty("SelectionLanguage","XPath")}catch(p){}s=r.selectNodes(t)}catch(p){for(;u<a&&r;u++){f=o[u];if(f.indexOf("[")>-1&&f.indexOf("]")>-1)l=f.slice(f.indexOf("[")+1,f.indexOf("]")),l--,r=r.children[l],h=!0;else if(f.indexOf("@")>-1)l=f.substr(f.indexOf("@")),r=l?r.getAttribute(l.replace("@","")):r;else if(-1<f.indexOf("//"))l=r.getElementsByTagName(f.substr(2)),r=l.length?l[l.length-1]:null;else if(a!=u+1)for(c=r.childNodes.length-1;0<=c;c-=1)f===r.childNodes[c].tagName&&(r=r.childNodes[c],c=-1)}r&&(n.isString(r)?s[0]={value:r}:h?s[0]={value:r.innerHTML}:s=e.Array(r.childNodes,0,!0))}return{index:0,iterateNext:function(){if(this.index>=this.values.length)return undefined;var e=this.values[this.index];return this.index+=1,e},values:s}},_parseField:function(e,t,n){var r=e.key||e,s;e.schema?(s={results:[],meta:{}},s=i._parseResults(e.schema,n,s),t[r]=s.results):t[r]=i._getLocationValue(e,n)},_parseMeta:function(e,t,r){if(n.isObject(e)){var s,o=t.ownerDocument||t;for(s in e)e.hasOwnProperty(s)&&(r.meta[s]=i._getLocationValue(e[s],o))}return r},_parseResult:function(e,t){var n={},r;for(r=e.length-1;0<=r;r--)i._parseField(e[r],n,t);return n},_parseResults:function(e,t,r){if(e.resultListLocator&&n.isArray(e.resultFields)){var s=t.ownerDocument||t,o=e.resultFields,u=[],a,f,l=0;if(e.resultListLocator.match(/^[:\-\w]+$/)){f=t.getElementsByTagName(e.resultListLocator);for(l=f.length-1;l>=0;--l)u[l]=i._parseResult(o,f[l])}else{f=i._getXPathResult(e.resultListLocator,t,s);while(a=f.iterateNext())u[l]=i._parseResult(o,a),l+=1}u.length?r.results=u:r.error=new Error("XML schema result nodes retrieval failure")}return r}},e.DataSchema.XML=e.mix(i,e.DataSchema.Base)},"3.10.0pr1",{requires:["dataschema-base"]});
