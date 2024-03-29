/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datasource-get",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)};e.DataSource.Get=e.extend(n,e.DataSource.Local,{_defRequestFn:function(t){var n=this.get("source"),r=this.get("get"),i=e.guid().replace(/\-/g,"_"),s=this.get("generateRequestCallback"),o=t.details[0],u=this;return this._last=i,YUI.Env.DataSource.callbacks[i]=function(n){delete YUI.Env.DataSource.callbacks[i],delete e.DataSource.Local.transactions[t.tId];var r=u.get("asyncMode")!=="ignoreStaleResponses"||u._last===i;r&&(o.data=n,u.fire("data",o))},n+=t.request+s.call(this,i),e.DataSource.Local.transactions[t.tId]=r.script(n,{autopurge:!0,onFailure:function(n){delete YUI.Env.DataSource.callbacks[i],delete e.DataSource.Local.transactions[t.tId],o.error=new Error(n.msg||"Script node data failure"),u.fire("data",o)},onTimeout:function(n){delete YUI.Env.DataSource.callbacks[i],delete e.DataSource.Local.transactions[t.tId],o.error=new Error(n.msg||"Script node data timeout"),u.fire("data",o)}}),t.tId},_generateRequest:function(e){return"&"+this.get("scriptCallbackParam")+"=YUI.Env.DataSource.callbacks."+e}},{NAME:"dataSourceGet",ATTRS:{get:{value:e.Get,cloneDefaultValue:!1},asyncMode:{value:"allowAll"},scriptCallbackParam:{value:"callback"},generateRequestCallback:{value:function(){return this._generateRequest.apply(this,arguments)}}}}),YUI.namespace("Env.DataSource.callbacks")},"3.10.0pr1",{requires:["datasource-local","get"]});
