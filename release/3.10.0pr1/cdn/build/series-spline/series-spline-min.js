/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-spline",function(e,t){e.SplineSeries=e.Base.create("splineSeries",e.LineSeries,[e.CurveUtil,e.Lines],{drawSeries:function(){this.drawSpline()}},{ATTRS:{type:{value:"spline"}}})},"3.10.0pr1",{requires:["series-line","series-curve-util"]});
