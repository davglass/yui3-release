/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-area-stacked",function(e,t){e.StackedAreaSeries=e.Base.create("stackedAreaSeries",e.AreaSeries,[e.StackingUtil],{setAreaData:function(){e.StackedAreaSeries.superclass.setAreaData.apply(this),this._stackCoordinates.apply(this)},drawSeries:function(){this.drawFill.apply(this,this._getStackedClosingPoints())}},{ATTRS:{type:{value:"stackedArea"}}})},"3.10.0pr1",{requires:["series-stacked","series-area"]});
