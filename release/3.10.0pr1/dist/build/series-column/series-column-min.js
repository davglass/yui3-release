/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-column",function(e,t){e.ColumnSeries=e.Base.create("columnSeries",e.MarkerSeries,[e.Histogram],{_getMarkerDimensions:function(e,t,n,r){var i={left:e+r};return this._bottomOrigin>=t?(i.top=t,i.calculatedSize=this._bottomOrigin-i.top):(i.top=this._bottomOrigin,i.calculatedSize=t-this._bottomOrigin),i},updateMarkerState:function(t,n){if(this._markers&&this._markers[n]){var r=e.clone(this.get("styles").marker),i,s=this._getState(t),o=this.get("xcoords"),u=this.get("ycoords"),a=this._markers[n],f,l,c=this.get("seriesTypeCollection"),h=c.length,p=0,d=0,v,m=0,g=[],y=this.get("order"),b;i=s==="off"||!r[s]?e.clone(r):e.clone(r[s]),i.fill.color=this._getItemColor(i.fill.color,n),i.border.color=this._getItemColor(i.border.color,n),b=this._getMarkerDimensions(o[n],u[n],r.width,d),i.height=b.calculatedSize,i.width=Math.min(this._maxSize,i.width),a.set(i);for(;m<h;++m)g[m]=o[n]+p,l=c[m].get("styles").marker,p+=Math.min(this._maxSize,l.width),y>m&&(d=p),d-=p/2;for(m=0;m<h;++m)f=c[m].get("markers"),f&&(v=f[n],v&&v!==undefined&&v.set("x",g[m]-p/2))}}},{ATTRS:{type:{value:"column"}}})},"3.10.0pr1",{requires:["series-marker","series-histogram-base"]});
