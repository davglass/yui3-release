/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-time",function(e,t){e.TimeAxis=e.Base.create("timeAxis",e.Axis,[e.TimeImpl],{_getLabelByIndex:function(e,t){var n=this.get("minimum"),r=this.get("maximum"),i,s;return t-=1,i=(r-n)/t*e,s=n+i,s},_getDataFromLabelValues:function(t,n,r,i,s){var o=[],u,a,f=n.length,l,c,h,p,d=this.get("maximum"),v=this.get("minimum"),m=[],g=(i-r*2)/(d-v);s==="vertical"?(l="x",c="y"):(l="y",c="x"),h=t[l];for(a=0;a<f;a+=1)u=this._getNumber(n[a]),e.Lang.isNumber(u)&&u>=v&&u<=d&&(p={},p[l]=h,p[c]=r+(u-v)*g,o.push(p),m.push(u));return{points:o,values:m}}})},"3.10.0pr1",{requires:["axis","axis-time-base"]});
