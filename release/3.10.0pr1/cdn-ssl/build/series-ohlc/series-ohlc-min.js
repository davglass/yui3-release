/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-ohlc",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}n.NAME="ohlcSeries",n.ATTRS={type:{value:"ohlc"},graphic:{lazyAdd:!1,setter:function(e){return this.get("rendered")||this.set("rendered",!0),this.set("upmarker",e.addShape({type:"path"})),this.set("downmarker",e.addShape({type:"path"})),e}},upmarker:{},downmarker:{}},e.extend(n,e.RangeSeries,{_drawMarkers:function(e,t,n,r,s,o,u,a,f){var l=this.get("upmarker"),c=this.get("downmarker"),h,p,d,v,m,g,y=f.padding.left,b,w;l.set(f.upmarker),c.set(f.downmarker),l.clear(),c.clear();for(i=0;i<o;i+=1)cx=e[i]+y,m=cx-a,g=cx+a,h=t[i],p=n[i],d=r[i],v=s[i],w=h>v,height=d-p,b=w?l:c,b.moveTo(m,h),b.lineTo(cx,h),b.moveTo(cx,p),b.lineTo(cx,d),b.moveTo(cx,v),b.lineTo(g,v);l.end(),c.end()},_toggleVisible:function(e){this.get("upmarker").set("visible",e),this.get("downmarker").set("visible",e)},destructor:function(){var e=this.get("upmarker"),t=this.get("downmarker");e&&e.destroy(),t&&t.destroy()},_getDefaultStyles:function(){var e={upmarker:{stroke:{color:"#00aa00",alpha:1,weight:1}},downmarker:{stroke:{color:"#aa0000",alpha:1,weight:1}}};return this._mergeStyles(e,n.superclass._getDefaultStyles())}}),e.OHLCSeries=n},"3.10.0pr1",{requires:["series-range"]});
