YUI.add("graphics-group",function(e,t){var n,r,i,s,o,u=e.Lang;n=function(){n.superclass.constructor.apply(this,arguments)},n.NAME="shapeGroup",e.extend(n,e.Path,{_draw:function(){var e=this.get("xvalues"),t=this.get("yvalues"),n,r,i,s,o=0,a,f=this.get("dimensions"),l=f.width,c=f.height,h=f.radius,p=f.yRadius,d=u.isArray(l),v=u.isArray(c),m=u.isArray(h),g=u.isArray(p);if(e&&t&&e.length>0){this.clear(),a=e.length;for(;o<a;++o)n=e[o],r=t[o],i=m?h[o]:h,s=g?p[o]:p,!isNaN(n)&&!isNaN(r)&&!isNaN(i)&&(this.drawShape({x:n,y:r,width:d?l[o]:l,height:v?c[o]:c,radius:i,yRadius:s}),this.closePath());this._closePath()}},_getRadiusCollection:function(e){var t=0,n=e.length,r=[];for(;t<n;++t)r[t]=e[t]*.5;return r}}),n.ATTRS=e.merge(e.Path.ATTRS,{dimensions:{getter:function(){var e=this._dimensions,t,n,r,i;return e.hasOwnProperty("radius")?e:(r=e.width,i=e.height,t=u.isArray(r)?this._getRadiusCollection(r):r*.5,n=u.isArray(i)?this._getRadiusCollection(i):i*.5,{width:r,height:i,radius:t,yRadius:n})},setter:function(e){return this._dimensions=e,e}},xvalues:{getter:function(){return this._xvalues},setter:function(e){this._xvalues=e}},yvalues:{getter:function(){return this._yvalues},setter:function(e){this._yvalues=e}}}),e.ShapeGroup=n,r=function(){r.superclass.constructor.apply(this,arguments)},r.NAME="circleGroup",e.extend(r,e.ShapeGroup,{drawShape:function(e){this.drawCircle(e.x,e.y,e.radius)}}),r.ATTRS=e.merge(e.ShapeGroup.ATTRS,{dimensions:{getter:function(){var e=this._dimensions,t,n,r,i;return e.hasOwnProperty("radius")?e:(r=e.width,i=e.height,t=u.isArray(r)?this._getRadiusCollection(r):r*.5,n=t,{width:r,height:i,radius:t,yRadius:n})}}}),r.ATTRS=e.ShapeGroup.ATTRS,e.CircleGroup=r,i=function(){i.superclass.constructor.apply(this,arguments)},i.NAME="rectGroup",e.extend(i,e.ShapeGroup,{drawShape:function(e){this.drawRect(e.x,e.y,e.width,e.height)}}),i.ATTRS=e.ShapeGroup.ATTRS,e.RectGroup=i,o=function(){o.superclass.constructor.apply(this,arguments)},o.NAME="diamondGroup",e.extend(o,e.ShapeGroup,{drawShape:function(e){this.drawDiamond(e.x,e.y,e.width,e.height)}}),o.ATTRS=e.ShapeGroup.ATTRS,e.DiamondGroup=o,s=function(){s.superclass.constructor.apply(this,arguments)},s.NAME="ellipseGroup",e.extend(s,e.ShapeGroup,{drawShape:function(e){this.drawEllipse(e.x,e.y,e.width,e.height)}}),s.ATTRS=e.ShapeGroup.ATTRS,e.EllipseGroup=s},"3.10.0pr1",{requires:["graphics"]});
