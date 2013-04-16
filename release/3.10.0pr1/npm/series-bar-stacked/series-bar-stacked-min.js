YUI.add("series-bar-stacked",function(e,t){var n=e.Lang;e.StackedBarSeries=e.Base.create("stackedBarSeries",e.BarSeries,[e.StackingUtil],{drawSeries:function(){if(this.get("xcoords").length<1)return;var t=n.isNumber,r=e.clone(this.get("styles").marker),i=r.width,s=r.height,o=this.get("xcoords"),u=this.get("ycoords"),a=0,f=o.length,l=u[0],c=this.get("seriesTypeCollection"),h,p=this.get("order"),d=this.get("graphOrder"),v,m,g,y,b,w,E,S=p===0,x=f*s,T={width:[],height:[]},N=[],C=[],k=this.get("groupMarkers");n.isArray(r.fill.color)&&(w=r.fill.color.concat()),n.isArray(r.border.color)&&(E=r.border.color.concat()),this._createMarkerCache(),x>this.get("height")&&(h=this.get("height")/x,s*=h,s=Math.max(s,1));if(!S){g=c[p-1],y=g.get("negativeBaseValues"),b=g.get("positiveBaseValues");if(!y||!b)S=!0,b=[],y=[]}else y=[],b=[];this.set("negativeBaseValues",y),this.set("positiveBaseValues",b);for(a=0;a<f;++a){l=u[a],v=o[a];if(!t(l)||!t(v)){S&&(b[a]=this._leftOrigin,y[a]=this._leftOrigin),this._markers.push(null);continue}S?(i=Math.abs(v-this._leftOrigin),v>this._leftOrigin?(b[a]=v,y[a]=this._leftOrigin,v-=i):v<this._leftOrigin?(b[a]=this._leftOrigin,y[a]=v):(b[a]=v,y[a]=this._leftOrigin)):v<this._leftOrigin?(v=y[a]-(this._leftOrigin-o[a]),i=y[a]-v,y[a]=v):v>=this._leftOrigin&&(v+=b[a]-this._leftOrigin,i=v-b[a],b[a]=v,v-=i),!isNaN(i)&&i>0?(l-=s/2,k?(T.width[a]=i,T.height[a]=s,N.push(v),C.push(l)):(r.width=i,r.height=s,r.x=v,r.y=l,w&&(r.fill.color=w[a%w.length]),E&&(r.border.color=E[a%E.length]),m=this.getMarker(r,d,a))):k||this._markers.push(null)}k?this._createGroupMarker({fill:r.fill,border:r.border,dimensions:T,xvalues:N,yvalues:C,shape:r.shape}):this._clearMarkerCache()},updateMarkerState:function(t,r){if(this._markers[r]){var i=this._getState(t),s=this.get("ycoords"),o=this._markers[r],u=this.get("styles").marker,a=u.height,f=i==="off"||!u[i]?e.clone(u):e.clone(u[i]),l,c;f.y=s[r]-a/2,f.x=o.get("x"),f.width=o.get("width"),f.id=o.get("id"),l=f.fill.color,c=f.border.color,n.isArray(l)?f.fill.color=l[r%l.length]:f.fill.color=this._getItemColor(f.fill.color,r),n.isArray(c)?f.border.color=c[r%c.length]:f.border.color=this._getItemColor(f.border.color,r),o.set(f)}},_getPlotDefaults:function(){var e={fill:{type:"solid",alpha:1,colors:null,alphas:null,ratios:null},border:{weight:0,alpha:1},width:24,height:24,shape:"rect",padding:{top:0,left:0,right:0,bottom:0}};return e.fill.color=this._getDefaultColor(this.get("graphOrder"),"fill"),e.border.color=this._getDefaultColor(this.get("graphOrder"),"border"),e}},{ATTRS:{type:{value:"stackedBar"},direction:{value:"vertical"},negativeBaseValues:{value:null},positiveBaseValues:{value:null}}})},"3.10.0pr1",{requires:["series-stacked","series-bar"]});
