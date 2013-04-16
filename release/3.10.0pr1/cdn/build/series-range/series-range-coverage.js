/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/series-range/series-range.js']) {
   __coverage__['build/series-range/series-range.js'] = {"path":"build/series-range/series-range.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"RangeSeries","line":24,"loc":{"start":{"line":24,"column":0},"end":{"line":25,"column":0}}},"3":{"name":"(anonymous_3)","line":50,"loc":{"start":{"line":50,"column":17},"end":{"line":50,"column":28}}},"4":{"name":"(anonymous_4)","line":68,"loc":{"start":{"line":68,"column":16},"end":{"line":69,"column":4}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":92,"column":52}},"2":{"start":{"line":24,"column":0},"end":{"line":27,"column":1}},"3":{"start":{"line":26,"column":4},"end":{"line":26,"column":62}},"4":{"start":{"line":29,"column":0},"end":{"line":29,"column":33}},"5":{"start":{"line":31,"column":0},"end":{"line":59,"column":2}},"6":{"start":{"line":51,"column":12},"end":{"line":56,"column":14}},"7":{"start":{"line":61,"column":0},"end":{"line":85,"column":3}},"8":{"start":{"line":70,"column":8},"end":{"line":82,"column":32}},"9":{"start":{"line":83,"column":8},"end":{"line":83,"column":114}},"10":{"start":{"line":87,"column":0},"end":{"line":87,"column":28}}},"branchMap":{},"code":["(function () { YUI.add('series-range', function (Y, NAME) {","","/**"," * Provides functionality for creating a range series."," *"," * @module charts"," * @submodule series-range"," */","","/**"," * An abstract class for creating range series instances."," * RangeSeries is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CandlestickSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"OHLCSeries\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class RangeSeries"," * @extends CartesianSeries"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-range"," */","function RangeSeries()","{","    RangeSeries.superclass.constructor.apply(this, arguments);","}","","RangeSeries.NAME = \"rangeSeries\";","","RangeSeries.ATTRS = {","    /**","     * Read-only attribute indicating the type of series.","     *","     * @attribute type","     * @type String","     * @default range","     */","    type: {","        value: \"range\"","    },","","    /**","     * Values to be used for open, high, low and close keys.","     *","     * @attribute ohlc","     * @type Object","     */","    ohlckeys: {","        valueFn: function() {","            return {","                open: \"open\",","                high: \"high\",","                low: \"low\",","                close: \"close\"","            };","        }","    }","};","","Y.extend(RangeSeries, Y.CartesianSeries, {","    /**","     * Draws the series.","     *","     * @method drawSeries","     * @protected","     */","    drawSeries: function()","    {","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            styles = this.get(\"styles\"),","            padding = styles.padding,","            len = xcoords.length,","            dataWidth = this.get(\"width\") - (padding.left + padding.right),","            keys = this.get(\"ohlckeys\"),","            opencoords = ycoords[keys.open],","            highcoords = ycoords[keys.high],","            lowcoords = ycoords[keys.low],","            closecoords = ycoords[keys.close],","            width = dataWidth/len,","            halfwidth = width/2;","        this._drawMarkers(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles);","    }","});","","Y.RangeSeries = RangeSeries;","","","","","}, '3.10.0pr1', {\"requires\": [\"series-cartesian\"]});","","}());"]};
}
var __cov_Bd76QhhgiiA4IDaxCRsUaQ = __coverage__['build/series-range/series-range.js'];
__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['1']++;YUI.add('series-range',function(Y,NAME){__cov_Bd76QhhgiiA4IDaxCRsUaQ.f['1']++;__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['2']++;function RangeSeries(){__cov_Bd76QhhgiiA4IDaxCRsUaQ.f['2']++;__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['3']++;RangeSeries.superclass.constructor.apply(this,arguments);}__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['4']++;RangeSeries.NAME='rangeSeries';__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['5']++;RangeSeries.ATTRS={type:{value:'range'},ohlckeys:{valueFn:function(){__cov_Bd76QhhgiiA4IDaxCRsUaQ.f['3']++;__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['6']++;return{open:'open',high:'high',low:'low',close:'close'};}}};__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['7']++;Y.extend(RangeSeries,Y.CartesianSeries,{drawSeries:function(){__cov_Bd76QhhgiiA4IDaxCRsUaQ.f['4']++;__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['8']++;var xcoords=this.get('xcoords'),ycoords=this.get('ycoords'),styles=this.get('styles'),padding=styles.padding,len=xcoords.length,dataWidth=this.get('width')-(padding.left+padding.right),keys=this.get('ohlckeys'),opencoords=ycoords[keys.open],highcoords=ycoords[keys.high],lowcoords=ycoords[keys.low],closecoords=ycoords[keys.close],width=dataWidth/len,halfwidth=width/2;__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['9']++;this._drawMarkers(xcoords,opencoords,highcoords,lowcoords,closecoords,len,width,halfwidth,styles);}});__cov_Bd76QhhgiiA4IDaxCRsUaQ.s['10']++;Y.RangeSeries=RangeSeries;},'3.10.0pr1',{'requires':['series-cartesian']});
