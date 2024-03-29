/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('scrollview-paginator', function (Y, NAME) {

/**
 * Provides a plugin that adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */
var getClassName = Y.ClassNameManager.getClassName,
    SCROLLVIEW = 'scrollview',
    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),
    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),
    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : 'ui',
    INDEX = 'index',
    SCROLL_X = 'scrollX',
    SCROLL_Y = 'scrollY',
    TOTAL = 'total',
    DISABLED = 'disabled',
    HOST = 'host',
    SELECTOR = 'selector',
    AXIS = 'axis',
    DIM_X = 'x',
    DIM_Y = 'y';

/**
 * Scrollview plugin that adds support for paging
 *
 * @class ScrollViewPaginator
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
function PaginatorPlugin() {
    PaginatorPlugin.superclass.constructor.apply(this, arguments);
}

Y.extend(PaginatorPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     * @param {config} Configuration object for the plugin
     */
    initializer: function (config) {
        var paginator = this,
            host = paginator.get(HOST);

        // Initialize & default
        paginator._pageDims = [];
        paginator._pageBuffer = 1;
        paginator._optimizeMemory = false;

        // Cache some values
        paginator._host = host;
        paginator._bb = host._bb;
        paginator._cb = host._cb;
        paginator._cIndex = paginator.get(INDEX);
        paginator._cAxis = paginator.get(AXIS);

        // Apply configs
        if (config._optimizeMemory) {
            paginator._optimizeMemory = config._optimizeMemory;
        }

        if (config._pageBuffer) {
            paginator._pageBuffer = config._pageBuffer;
        }

        // Attach event bindings
        paginator._bindAttrs();
    },

    /**
     *
     *
     * @method _bindAttrs
     * @private
     */
    _bindAttrs: function () {
        var paginator = this;

        // Event listeners
        paginator.after({
            'indexChange': paginator._afterIndexChange,
            'axisChange': paginator._afterAxisChange
        });

        // Host method listeners
        paginator.beforeHostMethod('scrollTo', paginator._beforeHostScrollTo);
        paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);
        paginator.beforeHostMethod('_flick', paginator._beforeHostFlick);
        paginator.afterHostMethod('_onGestureMoveEnd', paginator._afterHostGestureMoveEnd);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        paginator.afterHostMethod('syncUI', paginator._afterHostSyncUI);
        
        // Host event listeners
        paginator.afterHostEvent('render', paginator._afterHostRender);
        paginator.afterHostEvent('scrollEnd', paginator._afterHostScrollEnded);
    },

    /**
     * After host render
     *
     * @method _afterHostRender
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostRender: function () {
        var paginator = this,
            bb = paginator._bb,
            host = paginator._host,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            pageDim = paginator._pageDims[index];

        if (paginatorAxis[DIM_Y]) {
            host._maxScrollX = pageDim.maxScrollX;
        }
        else if (paginatorAxis[DIM_X]) {
            host._maxScrollY = pageDim.maxScrollY;
        }

        // Set the page count
        paginator.set(TOTAL, size);

        // Jump to the index
        if (index !== 0) {
            paginator.scrollToIndex(index, 0);
        }

        // Add the paginator class
        bb.addClass(CLASS_PAGED);

        // Trigger the optimization process
        paginator._optimize();
    },

    /**
     * After host syncUI
     *
     * @method _afterHostSyncUI
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostSyncUI: function () {
        var paginator = this,
            host = paginator._host,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        // Set the page count
        paginator.set(TOTAL, size);

        // If paginator's 'axis' property is to be automatically determined, inherit host's property
        if (paginator._cAxis === undefined) {
            paginator._set(AXIS, host.get(AXIS));
        }
    },

    /**
     * After host _uiDimensionsChange
     *
     * @method _afterHostUIDimensionsChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostUIDimensionsChange: function () {

        var paginator = this,
            host = paginator._host,
            dims = host._getScrollDims(),
            widgetWidth = dims.offsetWidth,
            widgetHeight = dims.offsetHeight,
            pageNodes = paginator._getPageNodes();
            
        // Inefficient. Should not reinitialize every page every syncUI
        pageNodes.each(function (node, i) {
            var scrollWidth = node.get('scrollWidth'),
                scrollHeight = node.get('scrollHeight'),
                maxScrollX = Math.max(0, scrollWidth - widgetWidth), // Math.max to ensure we don't set it to a negative value
                maxScrollY = Math.max(0, scrollHeight - widgetHeight);

            // Don't initialize any page _pageDims that already have been.
            if (!paginator._pageDims[i]) {

                paginator._pageDims[i] = {

                    // Current scrollX & scrollY positions (default to 0)
                    scrollX: 0,
                    scrollY: 0,

                    // Maximum scrollable values
                    maxScrollX: maxScrollX,
                    maxScrollY: maxScrollY,

                    // Height & width of the page
                    width: scrollWidth,
                    height: scrollHeight
                };

            } else {
                paginator._pageDims[i].maxScrollX = maxScrollX;
                paginator._pageDims[i].maxScrollY = maxScrollY;
            }

        });
    },

    /**
     * Executed before host.scrollTo
     *
     * @method _beforeHostScrollTo
     * @param x {Number} The x-position to scroll to. (null for no movement)
     * @param y {Number} The y-position to scroll to. (null for no movement)
     * @param {Number} [duration] Duration, in ms, of the scroll animation (default is 0)
     * @param {String} [easing] An easing equation if duration is set
     * @param {String} [node] The node to move
     * @protected
     */
    _beforeHostScrollTo: function (x, y, duration, easing, node) {
        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            pageNodes = paginator._getPageNodes(),
            gestureAxis;

        if (gesture) {
            gestureAxis = gesture.axis;

            // Null the opposite axis so it won't be modified by host.scrollTo
            if (gestureAxis === DIM_Y) {
                x = null;
            } else {
                y = null;
            }

            // If they are scrolling against the specified axis, pull out the page's node to have its own offset
            if (paginatorAxis[gestureAxis] === false) {
                node = pageNodes.item(index);
            }

        }

        // Return the modified argument list
        return new Y.Do.AlterArgs("new args", [x, y, duration, easing, node]);
    },

    /**
     * Executed after host._gestureMoveEnd
     * Determines if the gesture should page prev or next (if at all)
     *
     * @method _afterHostGestureMoveEnd
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostGestureMoveEnd: function () {

        // This was a flick, so we don't need to do anything here
        if (this._host._gesture.flick) {
            return;
        }

        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            gestureAxis = gesture.axis,
            isHorizontal = (gestureAxis === DIM_X),
            delta = gesture[(isHorizontal ? 'deltaX' : 'deltaY')],
            isForward = (delta > 0),
            pageDims = paginator._pageDims[index],
            halfway = pageDims[(isHorizontal ? 'width' : 'height')] / 2,
            isHalfway = (Math.abs(delta) >= halfway),
            canScroll = paginatorAxis[gestureAxis],
            rtl = host.rtl;

        if (canScroll) {
            if (isHalfway) { // TODO: This condition should probably be configurable
                // Fire next()/prev()
                paginator[(rtl === isForward ? 'prev' : 'next')]();
            }
            // Scrollback
            else {
                paginator.scrollToIndex(paginator.get(INDEX));
            }
        }
    },

    /**
     * Executed before host._mousewheel
     * Prevents mousewheel events in some conditions
     *
     * @method _beforeHostMousewheel
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _beforeHostMousewheel: function (e) {
        var paginator = this,
            host = paginator._host,
            bb = host._bb,
            isForward = (e.wheelDelta < 0),
            paginatorAxis = paginator._cAxis;

        // Only if the mousewheel event occurred on a DOM node inside the BB
        if (bb.contains(e.target) && paginatorAxis[DIM_Y]) {

            // Fire next()/prev()
            paginator[(isForward ? 'next' : 'prev')]();

            // prevent browser default behavior on mousewheel
            e.preventDefault();

            // Block host._mousewheel from running
            return new Y.Do.Prevent();
        }
    },

    /**
     * Executed before host._flick
     * Prevents flick events in some conditions
     *
     * @method _beforeHostFlick
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _beforeHostFlick: function (e) {
        
        // If the widget is disabled
        if (this._host.get(DISABLED)) {
            return false;
        }

        // The drag was out of bounds, so do nothing (which will cause a snapback)
        if (this._host._isOutOfBounds()){
            return new Y.Do.Prevent();
        }
        
        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            paginatorAxis = paginator.get(AXIS),
            flick = e.flick,
            velocity = flick.velocity,
            flickAxis = flick.axis || false,
            isForward = (velocity < 0),
            canScroll = paginatorAxis[flickAxis],
            rtl = host.rtl;

        // Store the flick data in the this._host._gesture object so it knows this was a flick
        if (gesture) {
            gesture.flick = flick;
        }

        // Can we scroll along this axis?
        if (canScroll) {

            // Fire next()/prev()
            paginator[(rtl === isForward ? 'prev' : 'next')]();

            // Prevent flicks on the paginated axis
            if (paginatorAxis[flickAxis]) {
                return new Y.Do.Prevent();
            }
        }
    },

    /**
     * Executes after host's 'scrollEnd' event
     * Runs cleanup operations
     *
     * @method _afterHostScrollEnded
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostScrollEnded: function () {
        var paginator = this,
            host = paginator._host,
            index = paginator._cIndex,
            scrollX = host.get(SCROLL_X),
            scrollY = host.get(SCROLL_Y),
            paginatorAxis = paginator._cAxis;

        if (paginatorAxis[DIM_Y]) {
            paginator._pageDims[index].scrollX = scrollX;
        } else {
            paginator._pageDims[index].scrollY = scrollY;
        }

        paginator._optimize();
    },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterIndexChange: function (e) {
        var paginator = this,
            host = paginator._host,
            index = e.newVal,
            pageDims = paginator._pageDims[index],
            hostAxis = host._cAxis,
            paginatorAxis = paginator._cAxis;

        // Cache the new index value
        paginator._cIndex = index;

        // For dual-axis instances, we need to hack some host properties to the
        // current page's max height/width and current stored offset
        if (hostAxis[DIM_X] && hostAxis[DIM_Y]) {
            if (paginatorAxis[DIM_Y]) {
                host._maxScrollX = pageDims.maxScrollX;
                host.set(SCROLL_X, pageDims.scrollX, { src: UI });
            }
            else if (paginatorAxis[DIM_X]) {
                host._maxScrollY = pageDims.maxScrollY;
                host.set(SCROLL_Y, pageDims.scrollY, { src: UI });
            }
        }

        if (e.src !== UI) {
            paginator.scrollToIndex(index);
        }
    },

    /**
     * Optimization: Hides the pages not near the viewport
     *
     * @method _optimize
     * @protected
     */
    _optimize: function () {

        if (!this._optimizeMemory) {
            return false;
        }

        var paginator = this,
            currentIndex = paginator._cIndex,
            pageNodes = paginator._getStage(currentIndex);

        // Show the pages in/near the viewport & hide the rest
        paginator._showNodes(pageNodes.visible);
        paginator._hideNodes(pageNodes.hidden);
    },

    /**
     * Optimization: Determines which nodes should be visible, and which should be hidden.
     *
     * @method _getStage
     * @param index {Number} The page index # intended to be in focus.
     * @return {object}
     * @protected
     */
    _getStage: function (index) {
        var paginator = this,
            pageBuffer = paginator._pageBuffer,
            pageCount = paginator.get(TOTAL),
            pageNodes = paginator._getPageNodes(),
            start = Math.max(0, index - pageBuffer),
            end = Math.min(pageCount, index + 1 + pageBuffer); // noninclusive

        return {
            visible: pageNodes.splice(start, end - start),
            hidden: pageNodes
        };
    },

    /**
     * A utility method to show node(s)
     *
     * @method _showNodes
     * @param nodeList {Object} The list of nodes to show
     * @protected
     */
    _showNodes: function (nodeList) {
        if (nodeList) {
            nodeList.removeClass(CLASS_HIDDEN).setStyle('visibility', '');
        }
    },

    /**
     * A utility method to hide node(s)
     *
     * @method _hideNodes
     * @param nodeList {Object} The list of nodes to hide
     * @protected
     */
    _hideNodes: function (nodeList) {
        if (nodeList) {
            nodeList.addClass(CLASS_HIDDEN).setStyle('visibility', 'hidden');
        }
    },

    /**
     * Gets a nodeList for the "pages"
     *
     * @method _getPageNodes
     * @protected
     * @return {nodeList}
     */
    _getPageNodes: function () {
        var paginator = this,
            host = paginator._host,
            cb = host._cb,
            pageSelector = paginator.get(SELECTOR),
            pageNodes = (pageSelector ? cb.all(pageSelector) : cb.get('children'));

        return pageNodes;
    },

    /**
     * Scroll to the next page, with animation
     *
     * @method next
     */
    next: function () {
        var paginator = this,
            index = paginator._cIndex,
            target = index + 1,
            total = paginator.get(TOTAL);

        if (target >= total) {
            return;
        }

        // Update the index
        paginator.set(INDEX, target);
    },

    /**
     * Scroll to the previous page, with animation
     *
     * @method prev
     */
    prev: function () {
        var paginator = this,
            index = paginator._cIndex,
            target = index - 1;

        if (target < 0) {
            return;
        }

        // Update the index
        paginator.set(INDEX, target);
    },
    
    /**
     * Deprecated for 3.7.0.
     * @method scrollTo
     * @deprecated
     */
    scrollTo: function () {
        return this.scrollToIndex.apply(this, arguments);
    },

    /**
     * Scroll to a given page in the scrollview
     *
     * @method scrollToIndex
     * @since 3.7.0
     * @param index {Number} The index of the page to scroll to
     * @param {Number} [duration] The number of ms the animation should last
     * @param {String} [easing] The timing function to use in the animation
     */
    scrollToIndex: function (index, duration, easing) {
        var paginator = this,
            host = paginator._host,
            pageNode = paginator._getPageNodes().item(index),
            scrollAxis = (paginator._cAxis[DIM_X] ? SCROLL_X : SCROLL_Y),
            scrollOffset = pageNode.get(scrollAxis === SCROLL_X ? 'offsetLeft' : 'offsetTop');

        duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;
        easing = (easing !== undefined) ? easing : PaginatorPlugin.TRANSITION.easing;

        // Set the index ATTR to the specified index value
        paginator.set(INDEX, index, { src: UI });

        // Makes sure the viewport nodes are visible
        paginator._showNodes(pageNode);

        // Scroll to the offset
        host.set(scrollAxis, scrollOffset, {
            duration: duration,
            easing: easing
        });
    },

    /**
     * Setter for 'axis' attribute
     *
     * @method _axisSetter
     * @param val {Mixed} A string ('x', 'y', 'xy') to specify which axis/axes to allow scrolling on
     * @param name {String} The attribute name
     * @return {Object} An object to specify scrollability on the x & y axes
     *
     * @protected
     */
    _axisSetter: function (val) {

        // Turn a string into an axis object
        if (Y.Lang.isString(val)) {
            return {
                x: (val.match(/x/i) ? true : false),
                y: (val.match(/y/i) ? true : false)
            };
        }
    },
 

    /**
     * After listener for the axis attribute
     *
     * @method _afterAxisChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterAxisChange: function (e) {
        this._cAxis = e.newVal;
    }

    // End prototype properties

}, {
    
    // Static properties

    /**
     * The identity of the plugin
     *
     * @property NAME
     * @type String
     * @default 'pluginScrollViewPaginator'
     * @readOnly
     * @protected
     * @static
     */
    NAME: 'pluginScrollViewPaginator',

    /**
     * The namespace on which the plugin will reside
     *
     * @property NS
     * @type String
     * @default 'pages'
     * @static
     */
    NS: 'pages',

    /**
     * The default attribute configuration for the plugin
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Specifies ability to scroll on x, y, or x and y axis/axes.
         *  If unspecified, it inherits from the host instance.
         *
         * @attribute axis
         * @type String
         */
        axis: {
            setter: '_axisSetter',
            writeOnce: 'initOnly'
        },

        /**
         * CSS selector for a page inside the scrollview. The scrollview
         * will snap to the closest page.
         *
         * @attribute selector
         * @type {String}
         * @default null
         */
        selector: {
            value: null
        },

        /**
         * The active page number for a paged scrollview
         *
         * @attribute index
         * @type {Number}
         * @default 0
         */
        index: {
            value: 0
        },

        /**
         * The total number of pages
         *
         * @attribute total
         * @type {Number}
         * @default 0
         */
        total: {
            value: 0
        }
    },
        
    /**
     * The default snap to current duration and easing values used on scroll end.
     *
     * @property SNAP_TO_CURRENT
     * @static
     */
    TRANSITION: {
        duration: 300,
        easing: 'ease-out'
    }

    // End static properties

});

Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;


}, '3.10.0pr1', {"requires": ["plugin", "classnamemanager"]});
