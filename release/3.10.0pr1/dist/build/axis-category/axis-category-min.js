/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-category",function(e,t){e.CategoryAxis=e.Base.create("categoryAxis",e.Axis,[e.CategoryImpl],{getMinimumValue:function(){var e=this.get("data"),t=e[0];return t},getMaximumValue:function(){var e=this.get("data"),t=e.length-1,n=e[t];return n},_getLabelByIndex:function(e){var t,n=this.get("data");return t=n[e],t},_getDataFromLabelValues:function(t,n,r,i,s){var o=[],u=[],a,f=(i-r*2)/(this.getTotalMajorUnits()-1),l=this.get("data"),c,h,p=n.length,d,v,m,g,y;s==="vertical"?(d="x",v="y"):(d="y",v="x"),m=t[d];for(h=0;h<p;h+=1)a=n[h],c=e.Array.indexOf(l,a),e.Lang.isNumber(c)&&c>-1&&(y=c?c*f:0,g={},g[d]=m,g[v]=y+r,o.push(g),u.push(a));return{points:o,values:u}}})},"3.10.0pr1",{requires:["axis","axis-category-base"]});
