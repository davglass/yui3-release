YUI.add('dd-proxy', function (Y, NAME) {


    /**
     * Plugin for dd-drag for creating a proxy drag node, instead of dragging the original node.
     * @module dd
     * @submodule dd-proxy
     */
    /**
     * Plugin for dd-drag for creating a proxy drag node, instead of dragging the original node.
     * @class DDProxy
     * @extends Base
     * @constructor
     * @namespace Plugin
     */
    var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAG_NODE = 'dragNode',
        HOST = 'host',
        TRUE = true, proto,
        P = function() {
            P.superclass.constructor.apply(this, arguments);
        };

    P.NAME = 'DDProxy';
    /**
    * The Proxy instance will be placed on the Drag instance under the proxy namespace.
    * @property NS
    * @default con
    * @readonly
    * @protected
    * @static
    * @type {String}
    */
    P.NS = 'proxy';

    P.ATTRS = {
        host: {
        },
        /**
        * Move the original node at the end of the drag. Default: true
        * @attribute moveOnEnd
        * @type Boolean
        */
        moveOnEnd: {
            value: TRUE
        },
        /**
        * Hide the drag node at the end of the drag. Default: true
        * @attribute hideOnEnd
        * @type Boolean
        */
        hideOnEnd: {
            value: TRUE
        },
        /**
        * Make the Proxy node assume the size of the original node. Default: true
        * @attribute resizeFrame
        * @type Boolean
        */
        resizeFrame: {
            value: TRUE
        },
        /**
        * Make the Proxy node appear in the same place as the original node. Default: true
        * @attribute positionProxy
        * @type Boolean
        */
        positionProxy: {
            value: TRUE
        },
        /**
        * The default border style for the border of the proxy. Default: 1px solid #808080
        * @attribute borderStyle
        * @type Boolean
        */
        borderStyle: {
            value: '1px solid #808080'
        },
        /**
        * Should the node be cloned into the proxy for you. Default: false
        * @attribute cloneNode
        * @type Boolean
        */
        cloneNode: {
            value: false
        }
    };

    proto = {
        /**
        * Holds the event handles for setting the proxy
        * @private
        * @property _hands
        */
        _hands: null,
        /**
        * Handler for the proxy config attribute
        * @private
        * @method _init
        */
        _init: function() {
            if (!DDM._proxy) {
                DDM._createFrame();
                Y.on('domready', Y.bind(this._init, this));
                return;
            }
            if (!this._hands) {
                this._hands = [];
            }
            var h, h1, host = this.get(HOST), dnode = host.get(DRAG_NODE);
            if (dnode.compareTo(host.get(NODE))) {
                if (DDM._proxy) {
                    host.set(DRAG_NODE, DDM._proxy);
                }
            }
            Y.Array.each(this._hands, function(v) {
                v.detach();
            });
            h = DDM.on('ddm:start', Y.bind(function() {
                if (DDM.activeDrag === host) {
                    DDM._setFrame(host);
                }
            }, this));
            h1 = DDM.on('ddm:end', Y.bind(function() {
                if (host.get('dragging')) {
                    if (this.get('moveOnEnd')) {
                        host.get(NODE).setXY(host.lastXY);
                    }
                    if (this.get('hideOnEnd')) {
                        host.get(DRAG_NODE).setStyle('display', 'none');
                    }
                    if (this.get('cloneNode')) {
                        host.get(DRAG_NODE).remove();
                        host.set(DRAG_NODE, DDM._proxy);
                    }
                }
            }, this));
            this._hands = [h, h1];
        },
        initializer: function() {
            this._init();
        },
        destructor: function() {
            var host = this.get(HOST);
            Y.Array.each(this._hands, function(v) {
                v.detach();
            });
            host.set(DRAG_NODE, host.get(NODE));
        },
        clone: function() {
            var host = this.get(HOST),
                n = host.get(NODE),
                c = n.cloneNode(true);

            delete c._yuid;
            c.setAttribute('id', Y.guid());
            c.setStyle('position', 'absolute');
            n.get('parentNode').appendChild(c);
            host.set(DRAG_NODE, c);
            return c;
        }
    };

    Y.namespace('Plugin');
    Y.extend(P, Y.Base, proto);
    Y.Plugin.DDProxy = P;

    //Add a couple of methods to the DDM
    Y.mix(DDM, {
        /**
        * Create the proxy element if it doesn't already exist and set the DD.DDM._proxy value
        * @private
        * @for DDM
        * @namespace DD
        * @method _createFrame
        */
        _createFrame: function() {
            if (!DDM._proxy) {
                DDM._proxy = TRUE;

                var p = Y.Node.create('<div></div>'),
                b = Y.one('body');

                p.setStyles({
                    position: 'absolute',
                    display: 'none',
                    zIndex: '999',
                    top: '-999px',
                    left: '-999px'
                });

                b.prepend(p);
                p.set('id', Y.guid());
                p.addClass(DDM.CSS_PREFIX + '-proxy');
                DDM._proxy = p;
            }
        },
        /**
        * If resizeProxy is set to true (default) it will resize the proxy element to match the size of the Drag Element.
        * If positionProxy is set to true (default) it will position the proxy element in the same location as the Drag Element.
        * @private
        * @for DDM
        * @namespace DD
        * @method _setFrame
        */
        _setFrame: function(drag) {
            var n = drag.get(NODE), d = drag.get(DRAG_NODE), ah, cur = 'auto';

            ah = DDM.activeDrag.get('activeHandle');
            if (ah) {
                cur = ah.getStyle('cursor');
            }
            if (cur === 'auto') {
                cur = DDM.get('dragCursor');
            }

            d.setStyles({
                visibility: 'hidden',
                display: 'block',
                cursor: cur,
                border: drag.proxy.get('borderStyle')
            });

            if (drag.proxy.get('cloneNode')) {
                d = drag.proxy.clone();
            }

            if (drag.proxy.get('resizeFrame')) {
                d.setStyles({
                    height: n.get('offsetHeight') + 'px',
                    width: n.get('offsetWidth') + 'px'
                });
            }

            if (drag.proxy.get('positionProxy')) {
                d.setXY(drag.nodeXY);
            }
            d.setStyle('visibility', 'visible');
        }
    });

    //Create the frame when DOM is ready
    //Y.on('domready', Y.bind(DDM._createFrame, DDM));




}, '3.10.0pr1', {"requires": ["dd-drag"]});
