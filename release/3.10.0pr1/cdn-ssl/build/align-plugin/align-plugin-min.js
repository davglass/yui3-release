/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("align-plugin",function(e,t){function s(e){e.host&&(this._host=e.host)}var n="offsetWidth",r="offsetHeight",i=i;s.prototype={to:function(t,o,u,a){this._syncArgs=e.Array(arguments),t.top===i&&(t=e.one(t).get("region"));if(t){var f=[t.left,t.top],l=[t.width,t.height],c=s.points,h=this._host,p=null,d=h.getAttrs([r,n]),v=[0-d[n],0-d[r]],m=o?c[o.charAt(0)]:p,g=o&&o!=="cc"?c[o.charAt(1)]:p,y=u?c[u.charAt(0)]:p,b=u&&u!=="cc"?c[u.charAt(1)]:p;m&&(f=m(f,l,o)),g&&(f=g(f,l,o)),y&&(f=y(f,v,u)),b&&(f=b(f,v,u)),f&&h&&h.setXY(f),this._resize(a)}return this},sync:function(){return this.to.apply(this,this._syncArgs),this},_resize:function(t){var n=this._handle;t&&!n?this._handle=e.on("resize",this._onresize,window,this):!t&&n&&n.detach()},_onresize:function(){var e=this;setTimeout(function(){e.sync()})},center:function(e,t){return this.to(e,"cc","cc",t),this},destroy:function(){var e=this._handle;e&&e.detach()}},s.points={t:function(e,t){return e},r:function(e,t){return[e[0]+t[0],e[1]]},b:function(e,t){return[e[0],e[1]+t[1]]},l:function(e,t){return e},c:function(e,t,n){var r=n[0]==="t"||n[0]==="b"?0:1,i,s;return n==="cc"?i=[e[0]+t[0]/2,e[1]+t[1]/2]:(s=e[r]+t[r]/2,i=r?[e[0],s]:[s,e[1]]),i}},s.NAME="Align",s.NS="align",s.prototype.constructor=s,e.namespace("Plugin"),e.Plugin.Align=s},"3.10.0pr1",{requires:["node-screen","node-pluginhost"]});
