/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-mouseenter",function(e,t){var n=e.Env.evt.dom_wrappers,r=e.DOM.contains,i=e.Array,s=function(){},o={proxyType:"mouseover",relProperty:"fromElement",_notify:function(t,i,s){var o=this._node,u=t.relatedTarget||t[i];o!==u&&!r(o,u)&&s.fire(new e.DOMEventFacade(t,o,n["event:"+e.stamp(o)+t.type]))},on:function(t,n,r){var i=e.Node.getDOMNode(t),s=[this.proxyType,this._notify,i,null,this.relProperty,r];n.handle=e.Event._attach(s,{facade:!1})},detach:function(e,t){t.handle.detach()},delegate:function(t,n,r,i){var o=e.Node.getDOMNode(t),u=[this.proxyType,s,o,null,r];n.handle=e.Event._attach(u,{facade:!1}),n.handle.sub.filter=i,n.handle.sub.relProperty=this.relProperty,n.handle.sub._notify=this._filterNotify},_filterNotify:function(t,n,s){n=n.slice(),this.args&&n.push.apply(n,this.args);var o=e.delegate._applyFilter(this.filter,n,s),u=n[0].relatedTarget||n[0][this.relProperty],a,f,l,c,h;if(o){o=i(o);for(f=0,l=o.length&&(!a||!a.stopped);f<l;++f){h=o[0];if(!r(h,u)){a||(a=new e.DOMEventFacade(n[0],h,s),a.container=e.one(s.el)),a.currentTarget=e.one(h),c=n[1].fire(a);if(c===!1)break}}}return c},detachDelegate:function(e,t){t.handle.detach()}};e.Event.define("mouseenter",o,!0),e.Event.define("mouseleave",e.merge(o,{proxyType:"mouseout",relProperty:"toElement"}),!0)},"3.10.0pr1",{requires:["event-synthetic"]});
