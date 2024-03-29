/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('dd-scroll', function (Y, NAME) {


    /**
     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.
     * This class should not be called on it's own, it's designed to be a plugin.
     * @module dd
     * @submodule dd-scroll
     */
    /**
     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.
     * This class should not be called on it's own, it's designed to be a plugin.
     * @class Scroll
     * @extends Base
     * @namespace DD
     * @constructor
     */

    var S = function() {
        S.superclass.constructor.apply(this, arguments);

    },
    WS, NS,
    HOST = 'host',
    BUFFER = 'buffer',
    PARENT_SCROLL = 'parentScroll',
    WINDOW_SCROLL = 'windowScroll',
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight';


    S.ATTRS = {
        /**
        * Internal config option to hold the node that we are scrolling. Should not be set by the developer.
        * @attribute parentScroll
        * @type Node
        */
        parentScroll: {
            value: false,
            setter: function(node) {
                if (node) {
                    return node;
                }
                return false;
            }
        },
        /**
        * The number of pixels from the edge of the screen to turn on scrolling. Default: 30
        * @attribute buffer
        * @type Number
        */
        buffer: {
            value: 30,
            validator: Y.Lang.isNumber
        },
        /**
        * The number of milliseconds delay to pass to the auto scroller. Default: 235
        * @attribute scrollDelay
        * @type Number
        */
        scrollDelay: {
            value: 235,
            validator: Y.Lang.isNumber
        },
        /**
        * The host we are plugged into.
        * @attribute host
        * @type Object
        */
        host: {
            value: null
        },
        /**
        * Turn on window scroll support, default: false
        * @attribute windowScroll
        * @type Boolean
        */
        windowScroll: {
            value: false,
            validator: Y.Lang.isBoolean
        },
        /**
        * Allow vertical scrolling, default: true.
        * @attribute vertical
        * @type Boolean
        */
        vertical: {
            value: true,
            validator: Y.Lang.isBoolean
        },
        /**
        * Allow horizontal scrolling, default: true.
        * @attribute horizontal
        * @type Boolean
        */
        horizontal: {
            value: true,
            validator: Y.Lang.isBoolean
        }
    };

    Y.extend(S, Y.Base, {
        /**
        * Tells if we are actively scrolling or not.
        * @private
        * @property _scrolling
        * @type Boolean
        */
        _scrolling: null,
        /**
        * Cache of the Viewport dims.
        * @private
        * @property _vpRegionCache
        * @type Object
        */
        _vpRegionCache: null,
        /**
        * Cache of the dragNode dims.
        * @private
        * @property _dimCache
        * @type Object
        */
        _dimCache: null,
        /**
        * Holder for the Timer object returned from Y.later.
        * @private
        * @property _scrollTimer
        * @type {Y.later}
        */
        _scrollTimer: null,
        /**
        * Sets the _vpRegionCache property with an Object containing the dims from the viewport.
        * @private
        * @method _getVPRegion
        */
        _getVPRegion: function() {
            var r = {},
                n = this.get(PARENT_SCROLL),
            b = this.get(BUFFER),
            ws = this.get(WINDOW_SCROLL),
            xy = ((ws) ? [] : n.getXY()),
            w = ((ws) ? 'winWidth' : OFFSET_WIDTH),
            h = ((ws) ? 'winHeight' : OFFSET_HEIGHT),
            t = ((ws) ? n.get(SCROLL_TOP) : xy[1]),
            l = ((ws) ? n.get(SCROLL_LEFT) : xy[0]);

            r = {
                top: t + b,
                right: (n.get(w) + l) - b,
                bottom: (n.get(h) + t) - b,
                left: l + b
            };
            this._vpRegionCache = r;
            return r;
        },
        initializer: function() {
            var h = this.get(HOST);
            h.after('drag:start', Y.bind(this.start, this));
            h.after('drag:end', Y.bind(this.end, this));
            h.on('drag:align', Y.bind(this.align, this));

            //TODO - This doesn't work yet??
            Y.one('win').on('scroll', Y.bind(function() {
                this._vpRegionCache = null;
            }, this));
        },
        /**
        * Check to see if we need to fire the scroll timer. If scroll timer is running this will scroll the window.
        * @private
        * @method _checkWinScroll
        * @param {Boolean} move Should we move the window. From Y.later
        */
        _checkWinScroll: function(move) {
            var r = this._getVPRegion(),
                ho = this.get(HOST),
                ws = this.get(WINDOW_SCROLL),
                xy = ho.lastXY,
                scroll = false,
                b = this.get(BUFFER),
                win = this.get(PARENT_SCROLL),
                sTop = win.get(SCROLL_TOP),
                sLeft = win.get(SCROLL_LEFT),
                w = this._dimCache.w,
                h = this._dimCache.h,
                bottom = xy[1] + h,
                top = xy[1],
                right = xy[0] + w,
                left = xy[0],
                nt = top,
                nl = left,
                st = sTop,
                sl = sLeft;

            if (this.get('horizontal')) {
                if (left <= r.left) {
                    scroll = true;
                    nl = xy[0] - ((ws) ? b : 0);
                    sl = sLeft - b;
                }
                if (right >= r.right) {
                    scroll = true;
                    nl = xy[0] + ((ws) ? b : 0);
                    sl = sLeft + b;
                }
            }
            if (this.get('vertical')) {
                if (bottom >= r.bottom) {
                    scroll = true;
                    nt = xy[1] + ((ws) ? b : 0);
                    st = sTop + b;

                }
                if (top <= r.top) {
                    scroll = true;
                    nt = xy[1] - ((ws) ? b : 0);
                    st = sTop - b;
                }
            }

            if (st < 0) {
                st = 0;
                nt = xy[1];
            }

            if (sl < 0) {
                sl = 0;
                nl = xy[0];
            }

            if (nt < 0) {
                nt = xy[1];
            }
            if (nl < 0) {
                nl = xy[0];
            }
            if (move) {
                ho.actXY = [nl, nt];
                ho._alignNode([nl, nt], true); //We are srolling..
                xy = ho.actXY;
                ho.actXY = [nl, nt];
                ho._moveNode({ node: win, top: st, left: sl});
                if (!st && !sl) {
                    this._cancelScroll();
                }
            } else {
                if (scroll) {
                    this._initScroll();
                } else {
                    this._cancelScroll();
                }
            }
        },
        /**
        * Cancel a previous scroll timer and init a new one.
        * @private
        * @method _initScroll
        */
        _initScroll: function() {
            this._cancelScroll();
            this._scrollTimer = Y.Lang.later(this.get('scrollDelay'), this, this._checkWinScroll, [true], true);

        },
        /**
        * Cancel a currently running scroll timer.
        * @private
        * @method _cancelScroll
        */
        _cancelScroll: function() {
            this._scrolling = false;
            if (this._scrollTimer) {
                this._scrollTimer.cancel();
                delete this._scrollTimer;
            }
        },
        /**
        * Called from the drag:align event to determine if we need to scroll.
        * @method align
        */
        align: function(e) {
            if (this._scrolling) {
                this._cancelScroll();
                e.preventDefault();
            }
            if (!this._scrolling) {
                this._checkWinScroll();
            }
        },
        /**
        * Set the cache of the dragNode dims.
        * @private
        * @method _setDimCache
        */
        _setDimCache: function() {
            var node = this.get(HOST).get('dragNode');
            this._dimCache = {
                h: node.get(OFFSET_HEIGHT),
                w: node.get(OFFSET_WIDTH)
            };
        },
        /**
        * Called from the drag:start event
        * @method start
        */
        start: function() {
            this._setDimCache();
        },
        /**
        * Called from the drag:end event
        * @method end
        */
        end: function() {
            this._dimCache = null;
            this._cancelScroll();
        }
    });

    Y.namespace('Plugin');


    /**
     * Extends the Scroll class to make the window scroll while dragging.
     * @class DDWindowScroll
     * @extends Scroll
     * @namespace Plugin
     * @constructor
     */
    WS = function() {
        WS.superclass.constructor.apply(this, arguments);
    };
    WS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * Turn on window scroll support, default: true
        * @attribute windowScroll
        * @type Boolean
        */
        windowScroll: {
            value: true,
            setter: function(scroll) {
                if (scroll) {
                    this.set(PARENT_SCROLL, Y.one('win'));
                }
                return scroll;
            }
        }
    });
    Y.extend(WS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            this.set('windowScroll', this.get('windowScroll'));
        }
    });
    /**
    * The Scroll instance will be placed on the Drag instance under the winscroll namespace.
    * @property NS
    * @default winscroll
    * @readonly
    * @protected
    * @static
    * @type {String}
    */
    WS.NAME = WS.NS = 'winscroll';
    Y.Plugin.DDWinScroll = WS;


    /**
     * Extends the Scroll class to make a parent node scroll while dragging.
     * @class DDNodeScroll
     * @extends Scroll
     * @namespace Plugin
     * @constructor
     */
    NS = function() {
        NS.superclass.constructor.apply(this, arguments);

    };
    NS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * The node we want to scroll. Used to set the internal parentScroll attribute.
        * @attribute node
        * @type Node
        */
        node: {
            value: false,
            setter: function(node) {
                var n = Y.one(node);
                if (!n) {
                    if (node !== false) {
                        Y.error('DDNodeScroll: Invalid Node Given: ' + node);
                    }
                } else {
                    this.set(PARENT_SCROLL, n);
                }
                return n;
            }
        }
    });
    Y.extend(NS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            this.set('node', this.get('node'));
        }
    });
    /**
    * The NodeScroll instance will be placed on the Drag instance under the nodescroll namespace.
    * @property NS
    * @default nodescroll
    * @readonly
    * @protected
    * @static
    * @type {String}
    */
    NS.NAME = NS.NS = 'nodescroll';
    Y.Plugin.DDNodeScroll = NS;

    Y.DD.Scroll = S;




}, '3.10.0pr1', {"requires": ["dd-drag"]});
