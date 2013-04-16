if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/resize-proxy/resize-proxy.js']) {
   __coverage__['build/resize-proxy/resize-proxy.js'] = {"path":"build/resize-proxy/resize-proxy.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"ResizeProxy","line":38,"loc":{"start":{"line":38,"column":0},"end":{"line":38,"column":23}}},"3":{"name":"(anonymous_3)","line":57,"loc":{"start":{"line":57,"column":21},"end":{"line":57,"column":32}}},"4":{"name":"(anonymous_4)","line":73,"loc":{"start":{"line":73,"column":17},"end":{"line":73,"column":28}}},"5":{"name":"(anonymous_5)","line":81,"loc":{"start":{"line":81,"column":16},"end":{"line":81,"column":27}}},"6":{"name":"(anonymous_6)","line":87,"loc":{"start":{"line":87,"column":25},"end":{"line":87,"column":41}}},"7":{"name":"(anonymous_7)","line":100,"loc":{"start":{"line":100,"column":23},"end":{"line":100,"column":34}}},"8":{"name":"(anonymous_8)","line":106,"loc":{"start":{"line":106,"column":23},"end":{"line":106,"column":39}}},"9":{"name":"(anonymous_9)","line":125,"loc":{"start":{"line":125,"column":18},"end":{"line":125,"column":29}}},"10":{"name":"(anonymous_10)","line":144,"loc":{"start":{"line":144,"column":18},"end":{"line":144,"column":29}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":166,"column":57}},"2":{"start":{"line":3,"column":0},"end":{"line":16,"column":44}},"3":{"start":{"line":38,"column":0},"end":{"line":40,"column":1}},"4":{"start":{"line":39,"column":4},"end":{"line":39,"column":62}},"5":{"start":{"line":42,"column":0},"end":{"line":62,"column":3}},"6":{"start":{"line":58,"column":16},"end":{"line":58,"column":58}},"7":{"start":{"line":64,"column":0},"end":{"line":160,"column":3}},"8":{"start":{"line":74,"column":8},"end":{"line":74,"column":28}},"9":{"start":{"line":76,"column":8},"end":{"line":76,"column":76}},"10":{"start":{"line":77,"column":8},"end":{"line":77,"column":73}},"11":{"start":{"line":78,"column":8},"end":{"line":78,"column":77}},"12":{"start":{"line":82,"column":8},"end":{"line":82,"column":28}},"13":{"start":{"line":84,"column":8},"end":{"line":84,"column":46}},"14":{"start":{"line":88,"column":8},"end":{"line":89,"column":42}},"15":{"start":{"line":92,"column":8},"end":{"line":92,"column":24}},"16":{"start":{"line":95,"column":8},"end":{"line":95,"column":32}},"17":{"start":{"line":97,"column":8},"end":{"line":97,"column":40}},"18":{"start":{"line":101,"column":8},"end":{"line":101,"column":28}},"19":{"start":{"line":103,"column":8},"end":{"line":103,"column":32}},"20":{"start":{"line":107,"column":8},"end":{"line":108,"column":34}},"21":{"start":{"line":110,"column":8},"end":{"line":110,"column":54}},"22":{"start":{"line":113,"column":8},"end":{"line":113,"column":32}},"23":{"start":{"line":115,"column":8},"end":{"line":115,"column":34}},"24":{"start":{"line":126,"column":8},"end":{"line":128,"column":49}},"25":{"start":{"line":130,"column":8},"end":{"line":134,"column":9}},"26":{"start":{"line":131,"column":12},"end":{"line":133,"column":14}},"27":{"start":{"line":145,"column":8},"end":{"line":150,"column":55}},"28":{"start":{"line":152,"column":8},"end":{"line":152,"column":50}},"29":{"start":{"line":154,"column":8},"end":{"line":154,"column":50}},"30":{"start":{"line":156,"column":8},"end":{"line":156,"column":62}},"31":{"start":{"line":158,"column":8},"end":{"line":158,"column":49}},"32":{"start":{"line":162,"column":0},"end":{"line":162,"column":22}},"33":{"start":{"line":163,"column":0},"end":{"line":163,"column":35}}},"branchMap":{"1":{"line":130,"type":"if","locations":[{"start":{"line":130,"column":8},"end":{"line":130,"column":8}},{"start":{"line":130,"column":8},"end":{"line":130,"column":8}}]}},"code":["(function () { YUI.add('resize-proxy', function (Y, NAME) {","","var ACTIVE_HANDLE_NODE = 'activeHandleNode',","    CURSOR = 'cursor',","    DRAG_CURSOR = 'dragCursor',","    HOST = 'host',","    PARENT_NODE = 'parentNode',","    PROXY = 'proxy',","    PROXY_NODE = 'proxyNode',","    RESIZE = 'resize',","    RESIZE_PROXY = 'resize-proxy',","    WRAPPER = 'wrapper',","","    getCN = Y.ClassNameManager.getClassName,","","    CSS_RESIZE_PROXY = getCN(RESIZE, PROXY);","","","/**","Adds a `proxyNode` attribute and resizes it instead of the actual node. __very similar to DDProxy__","","    var resize = new Y.Resize({","        //Selector of the node to resize","        node: '#demo'","    });","    resize.plug(Y.Plugin.ResizeProxy);","","","@class ResizeProxy","@module resize","@submodule resize-proxy","@constructor","@extends Plugin.Base","@namespace Plugin","*/","","","function ResizeProxy() {","    ResizeProxy.superclass.constructor.apply(this, arguments);","}","","Y.mix(ResizeProxy, {","    NAME: RESIZE_PROXY,","","    NS: PROXY,","","    ATTRS: {","        /**","         * The Resize proxy element.","         *","         * @attribute proxyNode","         * @default Generated using an internal HTML markup","         * @type String|Node","         */","        proxyNode: {","            setter: Y.one,","            valueFn: function() {","                return Y.Node.create(this.PROXY_TEMPLATE);","            }","        }","    }","});","","Y.extend(ResizeProxy, Y.Plugin.Base, {","    /**","     * Template used to create the resize proxy.","     *","     * @property PROXY_TEMPLATE","     * @type {String}","     */","    PROXY_TEMPLATE: '<div class=\"'+CSS_RESIZE_PROXY+'\"></div>',","","    initializer: function() {","        var instance = this;","","        instance.afterHostEvent('resize:start', instance._afterResizeStart);","        instance.beforeHostMethod('_resize', instance._beforeHostResize);","        instance.afterHostMethod('_resizeEnd', instance._afterHostResizeEnd);","    },","","    destructor: function() {","        var instance = this;","","        instance.get(PROXY_NODE).remove(true);","    },","","    _afterHostResizeEnd: function(event) {","        var instance = this,","            drag = event.dragEvent.target;","","        // reseting actXY from drag when drag end","        drag.actXY = [];","","        // if proxy is true, hide it on resize end","        instance._syncProxyUI();","","        instance.get(PROXY_NODE).hide();","    },","","    _afterResizeStart: function() {","        var instance = this;","","        instance._renderProxy();","    },","","    _beforeHostResize: function(event) {","        var instance = this,","            host = this.get(HOST);","","        host._handleResizeAlignEvent(event.dragEvent);","","        // if proxy is true _syncProxyUI instead of _syncUI","        instance._syncProxyUI();","","        return new Y.Do.Prevent();","    },","","    /**","      * Render the <a href=\"ResizeProxy.html#attr_proxyNode\">proxyNode</a> element and","      * make it sibling of the <a href=\"Resize.html#attr_node\">node</a>.","      *","      * @method _renderProxy","      * @protected","      */","    _renderProxy: function() {","        var instance = this,","            host = this.get(HOST),","            proxyNode = instance.get(PROXY_NODE);","","        if (!proxyNode.inDoc()) {","            host.get(WRAPPER).get(PARENT_NODE).append(","                proxyNode.hide()","            );","        }","    },","","    /**","     * Sync the proxy UI with internal values from","     * <a href=\"ResizeProxy.html#property_info\">info</a>.","     *","     * @method _syncProxyUI","     * @protected","     */","    _syncProxyUI: function() {","        var instance = this,","            host = this.get(HOST),","            info = host.info,","            activeHandleNode = host.get(ACTIVE_HANDLE_NODE),","            proxyNode = instance.get(PROXY_NODE),","            cursor = activeHandleNode.getStyle(CURSOR);","","        proxyNode.show().setStyle(CURSOR, cursor);","","        host.delegate.dd.set(DRAG_CURSOR, cursor);","","        proxyNode.sizeTo(info.offsetWidth, info.offsetHeight);","","        proxyNode.setXY([ info.left, info.top ]);","    }","});","","Y.namespace('Plugin');","Y.Plugin.ResizeProxy = ResizeProxy;","","","}, '3.10.0pr1', {\"requires\": [\"plugin\", \"resize-base\"]});","","}());"]};
}
var __cov_Be1N$25RhCQsQUfZ1Ypn1w = __coverage__['build/resize-proxy/resize-proxy.js'];
__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['1']++;YUI.add('resize-proxy',function(Y,NAME){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['1']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['2']++;var ACTIVE_HANDLE_NODE='activeHandleNode',CURSOR='cursor',DRAG_CURSOR='dragCursor',HOST='host',PARENT_NODE='parentNode',PROXY='proxy',PROXY_NODE='proxyNode',RESIZE='resize',RESIZE_PROXY='resize-proxy',WRAPPER='wrapper',getCN=Y.ClassNameManager.getClassName,CSS_RESIZE_PROXY=getCN(RESIZE,PROXY);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['3']++;function ResizeProxy(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['2']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['4']++;ResizeProxy.superclass.constructor.apply(this,arguments);}__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['5']++;Y.mix(ResizeProxy,{NAME:RESIZE_PROXY,NS:PROXY,ATTRS:{proxyNode:{setter:Y.one,valueFn:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['3']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['6']++;return Y.Node.create(this.PROXY_TEMPLATE);}}}});__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['7']++;Y.extend(ResizeProxy,Y.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+CSS_RESIZE_PROXY+'"></div>',initializer:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['4']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['8']++;var instance=this;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['9']++;instance.afterHostEvent('resize:start',instance._afterResizeStart);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['10']++;instance.beforeHostMethod('_resize',instance._beforeHostResize);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['11']++;instance.afterHostMethod('_resizeEnd',instance._afterHostResizeEnd);},destructor:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['5']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['12']++;var instance=this;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['13']++;instance.get(PROXY_NODE).remove(true);},_afterHostResizeEnd:function(event){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['6']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['14']++;var instance=this,drag=event.dragEvent.target;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['15']++;drag.actXY=[];__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['16']++;instance._syncProxyUI();__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['17']++;instance.get(PROXY_NODE).hide();},_afterResizeStart:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['7']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['18']++;var instance=this;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['19']++;instance._renderProxy();},_beforeHostResize:function(event){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['8']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['20']++;var instance=this,host=this.get(HOST);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['21']++;host._handleResizeAlignEvent(event.dragEvent);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['22']++;instance._syncProxyUI();__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['23']++;return new Y.Do.Prevent();},_renderProxy:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['9']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['24']++;var instance=this,host=this.get(HOST),proxyNode=instance.get(PROXY_NODE);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['25']++;if(!proxyNode.inDoc()){__cov_Be1N$25RhCQsQUfZ1Ypn1w.b['1'][0]++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['26']++;host.get(WRAPPER).get(PARENT_NODE).append(proxyNode.hide());}else{__cov_Be1N$25RhCQsQUfZ1Ypn1w.b['1'][1]++;}},_syncProxyUI:function(){__cov_Be1N$25RhCQsQUfZ1Ypn1w.f['10']++;__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['27']++;var instance=this,host=this.get(HOST),info=host.info,activeHandleNode=host.get(ACTIVE_HANDLE_NODE),proxyNode=instance.get(PROXY_NODE),cursor=activeHandleNode.getStyle(CURSOR);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['28']++;proxyNode.show().setStyle(CURSOR,cursor);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['29']++;host.delegate.dd.set(DRAG_CURSOR,cursor);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['30']++;proxyNode.sizeTo(info.offsetWidth,info.offsetHeight);__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['31']++;proxyNode.setXY([info.left,info.top]);}});__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['32']++;Y.namespace('Plugin');__cov_Be1N$25RhCQsQUfZ1Ypn1w.s['33']++;Y.Plugin.ResizeProxy=ResizeProxy;},'3.10.0pr1',{'requires':['plugin','resize-base']});
