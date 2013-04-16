/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/series-combospline-stacked/series-combospline-stacked.js']) {
   __coverage__['build/series-combospline-stacked/series-combospline-stacked.js'] = {"path":"build/series-combospline-stacked/series-combospline-stacked.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":38},"end":{"line":1,"column":57}}},"2":{"name":"(anonymous_2)","line":30,"loc":{"start":{"line":30,"column":13},"end":{"line":31,"column":4}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":72,"column":77}},"2":{"start":{"line":22,"column":0},"end":{"line":69,"column":3}},"3":{"start":{"line":32,"column":8},"end":{"line":35,"column":9}},"4":{"start":{"line":34,"column":12},"end":{"line":34,"column":41}},"5":{"start":{"line":36,"column":8},"end":{"line":39,"column":9}},"6":{"start":{"line":38,"column":12},"end":{"line":38,"column":30}},"7":{"start":{"line":40,"column":8},"end":{"line":43,"column":9}},"8":{"start":{"line":42,"column":12},"end":{"line":42,"column":29}}},"branchMap":{"1":{"line":32,"type":"if","locations":[{"start":{"line":32,"column":8},"end":{"line":32,"column":8}},{"start":{"line":32,"column":8},"end":{"line":32,"column":8}}]},"2":{"line":36,"type":"if","locations":[{"start":{"line":36,"column":8},"end":{"line":36,"column":8}},{"start":{"line":36,"column":8},"end":{"line":36,"column":8}}]},"3":{"line":40,"type":"if","locations":[{"start":{"line":40,"column":8},"end":{"line":40,"column":8}},{"start":{"line":40,"column":8},"end":{"line":40,"column":8}}]}},"code":["(function () { YUI.add('series-combospline-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked combospline series."," *"," * @module charts"," * @submodule series-combospline-stacked"," */","/**"," * The StackedComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Series"," * are stacked along the value axis to indicate each series contribution to a cumulative total. Each"," * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are"," * rendered."," *"," * @class StackedComboSplineSeries"," * @extends StackedComboSeries"," * @uses CurveUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-combospline-stacked"," */","Y.StackedComboSplineSeries = Y.Base.create(\"stackedComboSplineSeries\", Y.StackedComboSeries, [Y.CurveUtil], {","    /**","\t * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","\t */","\tdrawSeries: function()","    {","        if(this.get(\"showAreaFill\"))","        {","            this.drawStackedAreaSpline();","        }","        if(this.get(\"showLines\"))","        {","            this.drawSpline();","        }","        if(this.get(\"showMarkers\"))","        {","            this.drawPlots();","        }","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedComboSpline","         */","        type : {","            value : \"stackedComboSpline\"","        },","","        /**","         * Indicates whether a fill is displayed.","         *","         * @attribute showAreaFill","         * @type Boolean","         * @default true","         */","        showAreaFill: {","            value: true","        }","    }","});","","","}, '3.10.0pr1', {\"requires\": [\"series-combo-stacked\", \"series-curve-util\"]});","","}());"]};
}
var __cov_K_9pqCnGyFTnTVOp6cAc6g = __coverage__['build/series-combospline-stacked/series-combospline-stacked.js'];
__cov_K_9pqCnGyFTnTVOp6cAc6g.s['1']++;YUI.add('series-combospline-stacked',function(Y,NAME){__cov_K_9pqCnGyFTnTVOp6cAc6g.f['1']++;__cov_K_9pqCnGyFTnTVOp6cAc6g.s['2']++;Y.StackedComboSplineSeries=Y.Base.create('stackedComboSplineSeries',Y.StackedComboSeries,[Y.CurveUtil],{drawSeries:function(){__cov_K_9pqCnGyFTnTVOp6cAc6g.f['2']++;__cov_K_9pqCnGyFTnTVOp6cAc6g.s['3']++;if(this.get('showAreaFill')){__cov_K_9pqCnGyFTnTVOp6cAc6g.b['1'][0]++;__cov_K_9pqCnGyFTnTVOp6cAc6g.s['4']++;this.drawStackedAreaSpline();}else{__cov_K_9pqCnGyFTnTVOp6cAc6g.b['1'][1]++;}__cov_K_9pqCnGyFTnTVOp6cAc6g.s['5']++;if(this.get('showLines')){__cov_K_9pqCnGyFTnTVOp6cAc6g.b['2'][0]++;__cov_K_9pqCnGyFTnTVOp6cAc6g.s['6']++;this.drawSpline();}else{__cov_K_9pqCnGyFTnTVOp6cAc6g.b['2'][1]++;}__cov_K_9pqCnGyFTnTVOp6cAc6g.s['7']++;if(this.get('showMarkers')){__cov_K_9pqCnGyFTnTVOp6cAc6g.b['3'][0]++;__cov_K_9pqCnGyFTnTVOp6cAc6g.s['8']++;this.drawPlots();}else{__cov_K_9pqCnGyFTnTVOp6cAc6g.b['3'][1]++;}}},{ATTRS:{type:{value:'stackedComboSpline'},showAreaFill:{value:true}}});},'3.10.0pr1',{'requires':['series-combo-stacked','series-curve-util']});
