/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-bar",function(e,t){e.BarSeries=e.Base.create("barSeries",e.MarkerSeries,[e.Histogram],{_getMarkerDimensions:function(e,t,n,r){var i={top:t+r};return e>=this._leftOrigin?(i.left=this._leftOrigin,i.calculatedSize=e-i.left):(i.left=e,i.calculatedSize=this._leftOrigin-e),i},updateMarkerState:function(t,n){if(this._markers&&this._markers[n]){var r=e.clone(this.get("styles").marker),i,s=this._getState(t),o=this.get("xcoords"),u=this.get("ycoords"),a=this._markers[n],f,l=this.get("seriesTypeCollection"),c=l.length,h,p=0,d=0,v,m=0,g=[],y=this.get("order"),b;i=s==="off"||!r[s]?r:r[s],i.fill.color=this._getItemColor(i.fill.color,n),i.border.color=this._getItemColor(i.border.color,n),b=this._getMarkerDimensions(o[n],u[n],r.height,d),i.width=b.calculatedSize,i.height=Math.min(this._maxSize,i.height),a.set(i);for(;m<c;++m)g[m]=u[n]+p,h=l[m].get("styles").marker,p+=Math.min(this._maxSize,h.height),y>m&&(d=p),d-=p/2;for(m=0;m<c;++m)f=l[m].get("markers"),f&&(v=f[n],v&&v!==undefined&&v.set("y",g[m]-p/2))}}},{ATTRS:{type:{value:"bar"},direction:{value:"vertical"}}})},"3.10.0pr1",{requires:["series-marker","series-histogram-base"]});
