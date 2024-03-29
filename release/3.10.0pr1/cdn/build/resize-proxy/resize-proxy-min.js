/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("resize-proxy",function(e,t){function d(){d.superclass.constructor.apply(this,arguments)}var n="activeHandleNode",r="cursor",i="dragCursor",s="host",o="parentNode",u="proxy",a="proxyNode",f="resize",l="resize-proxy",c="wrapper",h=e.ClassNameManager.getClassName,p=h(f,u);e.mix(d,{NAME:l,NS:u,ATTRS:{proxyNode:{setter:e.one,valueFn:function(){return e.Node.create(this.PROXY_TEMPLATE)}}}}),e.extend(d,e.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+p+'"></div>',initializer:function(){var e=this;e.afterHostEvent("resize:start",e._afterResizeStart),e.beforeHostMethod("_resize",e._beforeHostResize),e.afterHostMethod("_resizeEnd",e._afterHostResizeEnd)},destructor:function(){var e=this;e.get(a).remove(!0)},_afterHostResizeEnd:function(e){var t=this,n=e.dragEvent.target;n.actXY=[],t._syncProxyUI(),t.get(a).hide()},_afterResizeStart:function(){var e=this;e._renderProxy()},_beforeHostResize:function(t){var n=this,r=this.get(s);return r._handleResizeAlignEvent(t.dragEvent),n._syncProxyUI(),new e.Do.Prevent},_renderProxy:function(){var e=this,t=this.get(s),n=e.get(a);n.inDoc()||t.get(c).get(o).append(n.hide())},_syncProxyUI:function(){var e=this,t=this.get(s),o=t.info,u=t.get(n),f=e.get(a),l=u.getStyle(r);f.show().setStyle(r,l),t.delegate.dd.set(i,l),f.sizeTo(o.offsetWidth,o.offsetHeight),f.setXY([o.left,o.top])}}),e.namespace("Plugin"),e.Plugin.ResizeProxy=d},"3.10.0pr1",{requires:["plugin","resize-base"]});
