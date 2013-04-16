/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/view-node-map/view-node-map.js']) {
   __coverage__['build/view-node-map/view-node-map.js'] = {"path":"build/view-node-map/view-node-map.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":44}}},"2":{"name":"NodeMap","line":29,"loc":{"start":{"line":29,"column":0},"end":{"line":29,"column":19}}},"3":{"name":"(anonymous_3)","line":54,"loc":{"start":{"line":54,"column":20},"end":{"line":54,"column":36}}},"4":{"name":"(anonymous_4)","line":57,"loc":{"start":{"line":57,"column":25},"end":{"line":57,"column":45}}},"5":{"name":"(anonymous_5)","line":68,"loc":{"start":{"line":68,"column":17},"end":{"line":68,"column":29}}},"6":{"name":"(anonymous_6)","line":72,"loc":{"start":{"line":72,"column":16},"end":{"line":72,"column":28}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":84,"column":40}},"2":{"start":{"line":13,"column":0},"end":{"line":14,"column":19}},"3":{"start":{"line":29,"column":0},"end":{"line":29,"column":21}},"4":{"start":{"line":34,"column":0},"end":{"line":34,"column":50}},"5":{"start":{"line":35,"column":0},"end":{"line":35,"column":38}},"6":{"start":{"line":54,"column":0},"end":{"line":62,"column":2}},"7":{"start":{"line":55,"column":4},"end":{"line":55,"column":13}},"8":{"start":{"line":57,"column":4},"end":{"line":59,"column":13}},"9":{"start":{"line":58,"column":8},"end":{"line":58,"column":68}},"10":{"start":{"line":61,"column":4},"end":{"line":61,"column":24}},"11":{"start":{"line":65,"column":0},"end":{"line":65,"column":31}},"12":{"start":{"line":67,"column":0},"end":{"line":79,"column":2}},"13":{"start":{"line":69,"column":8},"end":{"line":69,"column":57}},"14":{"start":{"line":73,"column":8},"end":{"line":73,"column":57}},"15":{"start":{"line":75,"column":8},"end":{"line":77,"column":9}},"16":{"start":{"line":76,"column":12},"end":{"line":76,"column":36}},"17":{"start":{"line":81,"column":0},"end":{"line":81,"column":25}}},"branchMap":{"1":{"line":34,"type":"binary-expr","locations":[{"start":{"line":34,"column":0},"end":{"line":34,"column":19}},{"start":{"line":34,"column":24},"end":{"line":34,"column":48}}]},"2":{"line":58,"type":"binary-expr","locations":[{"start":{"line":58,"column":16},"end":{"line":58,"column":57}},{"start":{"line":58,"column":62},"end":{"line":58,"column":67}}]},"3":{"line":61,"type":"binary-expr","locations":[{"start":{"line":61,"column":11},"end":{"line":61,"column":15}},{"start":{"line":61,"column":19},"end":{"line":61,"column":23}}]},"4":{"line":75,"type":"if","locations":[{"start":{"line":75,"column":8},"end":{"line":75,"column":8}},{"start":{"line":75,"column":8},"end":{"line":75,"column":8}}]}},"code":["(function () { YUI.add('view-node-map', function (Y, NAME) {","","/**","View extension that adds a static `getByNode()` method that returns the nearest","View instance associated with the given Node (similar to Widget's `getByNode()`","method).","","@module app","@submodule view-node-map","@since 3.5.0","**/","","var buildCfg  = Y.namespace('View._buildCfg'),","    instances = {};","","/**","View extension that adds a static `getByNode()` method that returns the nearest","View instance associated with the given Node (similar to Widget's `getByNode()`","method).","","Note that it's important to call `destroy()` on a View instance using this","extension when you plan to stop using it. This ensures that all internal","references to that View are cleared to prevent memory leaks.","","@class View.NodeMap","@extensionfor View","@since 3.5.0","**/","function NodeMap() {}","","// Tells Base.create() to mix the static getByNode method into built classes.","// We're cheating and modifying Y.View here, because right now there's no better","// way to do it.","buildCfg.aggregates || (buildCfg.aggregates = []);","buildCfg.aggregates.push('getByNode');","","/**","Returns the nearest View instance associated with the given Node. The Node may","be a View container or any child of a View container.","","Note that only instances of Views that have the Y.View.NodeMap extension mixed","in will be returned. The base View class doesn't provide this functionality by","default due to the additional memory management overhead involved in maintaining","a mapping of Nodes to View instances.","","@method getByNode","@param {Node|HTMLElement|String} node Node instance, selector string, or","    HTMLElement.","@return {View} Closest View instance associated with the given Node, or `null`","    if no associated View instance was found.","@static","@since 3.5.0","**/","NodeMap.getByNode = function (node) {","    var view;","","    Y.one(node).ancestor(function (ancestor) {","        return (view = instances[Y.stamp(ancestor, true)]) || false;","    }, true);","","    return view || null;","};","","// To make this testable.","NodeMap._instances = instances;","","NodeMap.prototype = {","    initializer: function () {","        instances[Y.stamp(this.get('container'))] = this;","    },","","    destructor: function () {","        var stamp = Y.stamp(this.get('container'), true);","","        if (stamp in instances) {","            delete instances[stamp];","        }","    }","};","","Y.View.NodeMap = NodeMap;","","","}, '3.10.0pr1', {\"requires\": [\"view\"]});","","}());"]};
}
var __cov_dcBad38U5f4bqwU1QIM7dA = __coverage__['build/view-node-map/view-node-map.js'];
__cov_dcBad38U5f4bqwU1QIM7dA.s['1']++;YUI.add('view-node-map',function(Y,NAME){__cov_dcBad38U5f4bqwU1QIM7dA.f['1']++;__cov_dcBad38U5f4bqwU1QIM7dA.s['2']++;var buildCfg=Y.namespace('View._buildCfg'),instances={};__cov_dcBad38U5f4bqwU1QIM7dA.s['3']++;function NodeMap(){__cov_dcBad38U5f4bqwU1QIM7dA.f['2']++;}__cov_dcBad38U5f4bqwU1QIM7dA.s['4']++;(__cov_dcBad38U5f4bqwU1QIM7dA.b['1'][0]++,buildCfg.aggregates)||(__cov_dcBad38U5f4bqwU1QIM7dA.b['1'][1]++,buildCfg.aggregates=[]);__cov_dcBad38U5f4bqwU1QIM7dA.s['5']++;buildCfg.aggregates.push('getByNode');__cov_dcBad38U5f4bqwU1QIM7dA.s['6']++;NodeMap.getByNode=function(node){__cov_dcBad38U5f4bqwU1QIM7dA.f['3']++;__cov_dcBad38U5f4bqwU1QIM7dA.s['7']++;var view;__cov_dcBad38U5f4bqwU1QIM7dA.s['8']++;Y.one(node).ancestor(function(ancestor){__cov_dcBad38U5f4bqwU1QIM7dA.f['4']++;__cov_dcBad38U5f4bqwU1QIM7dA.s['9']++;return(__cov_dcBad38U5f4bqwU1QIM7dA.b['2'][0]++,view=instances[Y.stamp(ancestor,true)])||(__cov_dcBad38U5f4bqwU1QIM7dA.b['2'][1]++,false);},true);__cov_dcBad38U5f4bqwU1QIM7dA.s['10']++;return(__cov_dcBad38U5f4bqwU1QIM7dA.b['3'][0]++,view)||(__cov_dcBad38U5f4bqwU1QIM7dA.b['3'][1]++,null);};__cov_dcBad38U5f4bqwU1QIM7dA.s['11']++;NodeMap._instances=instances;__cov_dcBad38U5f4bqwU1QIM7dA.s['12']++;NodeMap.prototype={initializer:function(){__cov_dcBad38U5f4bqwU1QIM7dA.f['5']++;__cov_dcBad38U5f4bqwU1QIM7dA.s['13']++;instances[Y.stamp(this.get('container'))]=this;},destructor:function(){__cov_dcBad38U5f4bqwU1QIM7dA.f['6']++;__cov_dcBad38U5f4bqwU1QIM7dA.s['14']++;var stamp=Y.stamp(this.get('container'),true);__cov_dcBad38U5f4bqwU1QIM7dA.s['15']++;if(stamp in instances){__cov_dcBad38U5f4bqwU1QIM7dA.b['4'][0]++;__cov_dcBad38U5f4bqwU1QIM7dA.s['16']++;delete instances[stamp];}else{__cov_dcBad38U5f4bqwU1QIM7dA.b['4'][1]++;}}};__cov_dcBad38U5f4bqwU1QIM7dA.s['17']++;Y.View.NodeMap=NodeMap;},'3.10.0pr1',{'requires':['view']});
