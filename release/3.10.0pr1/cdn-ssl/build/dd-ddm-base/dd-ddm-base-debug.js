/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('dd-ddm-base', function (Y, NAME) {


    /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @module dd
     * @submodule dd-ddm-base
     */
     /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @class DDM
     * @extends Base
     * @constructor
     * @namespace DD
     */

    var DDMBase = function() {
        DDMBase.superclass.constructor.apply(this, arguments);
    };

    DDMBase.NAME = 'ddm';

    DDMBase.ATTRS = {
        /**
        * The cursor to apply when dragging, if shimmed the shim will get the cursor.
        * @attribute dragCursor
        * @type String
        */
        dragCursor: {
            value: 'move'
        },
        /**
        * The number of pixels to move to start a drag operation, default is 3.
        * @attribute clickPixelThresh
        * @type Number
        */
        clickPixelThresh: {
            value: 3
        },
        /**
        * The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @attribute clickTimeThresh
        * @type Number
        */
        clickTimeThresh: {
            value: 1000
        },
        /**
        * The number of milliseconds to throttle the mousemove event. Default: 150
        * @attribute throttleTime
        * @type Number
        */
        throttleTime: {
            //value: 150
            value: -1
        },
        /**
        * This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of all future Drag instances.
        * @attribute dragMode
        * @type String
        */
        dragMode: {
            value: 'point',
            setter: function(mode) {
                this._setDragMode(mode);
                return mode;
            }
        }

    };

    Y.extend(DDMBase, Y.Base, {
        _createPG: function() {},
        /**
        * flag set when we activate our first drag, so DDM can start listening for events.
        * @property _active
        * @type {Boolean}
        */
        _active: null,
        /**
        * Handler for dragMode attribute setter.
        * @private
        * @method _setDragMode
        * @param String/Number The Number value or the String for the DragMode to default all future drag instances to.
        * @return Number The Mode to be set
        */
        _setDragMode: function(mode) {
            if (mode === null) {
                mode = Y.DD.DDM.get('dragMode');
            }
            switch (mode) {
                case 1:
                case 'intersect':
                    return 1;
                case 2:
                case 'strict':
                    return 2;
                case 0:
                case 'point':
                    return 0;
            }
            return 0;
        },
        /**
        * The PREFIX to attach to all DD CSS class names
        * @property CSS_PREFIX
        * @type {String}
        */
        CSS_PREFIX: Y.ClassNameManager.getClassName('dd'),
        _activateTargets: function() {},
        /**
        * Holder for all registered drag elements.
        * @private
        * @property _drags
        * @type {Array}
        */
        _drags: [],
        /**
        * A reference to the currently active draggable object.
        * @property activeDrag
        * @type {Drag}
        */
        activeDrag: false,
        /**
        * Adds a reference to the drag object to the DDM._drags array, called in the constructor of Drag.
        * @private
        * @method _regDrag
        * @param {Drag} d The Drag object
        */
        _regDrag: function(d) {
            if (this.getDrag(d.get('node'))) {
                return false;
            }

            if (!this._active) {
                this._setupListeners();
            }
            this._drags.push(d);
            return true;
        },
        /**
        * Remove this drag object from the DDM._drags array.
        * @private
        * @method _unregDrag
        * @param {Drag} d The drag object.
        */
        _unregDrag: function(d) {
            var tmp = [];
            Y.Array.each(this._drags, function(n) {
                if (n !== d) {
                    tmp[tmp.length] = n;
                }
            });
            this._drags = tmp;
        },
        /**
        * Add the document listeners.
        * @private
        * @method _setupListeners
        */
        _setupListeners: function() {
            this._createPG();
            this._active = true;

            var doc = Y.one(Y.config.doc);
            doc.on('mousemove', Y.throttle(Y.bind(this._docMove, this), this.get('throttleTime')));
            doc.on('mouseup', Y.bind(this._end, this));
        },
        /**
        * Internal method used by Drag to signal the start of a drag operation
        * @private
        * @method _start
        */
        _start: function() {
            this.fire('ddm:start');
            this._startDrag();
        },
        /**
        * Factory method to be overwritten by other DDM's
        * @private
        * @method _startDrag
        * @param {Number} x The x position of the drag element
        * @param {Number} y The y position of the drag element
        * @param {Number} w The width of the drag element
        * @param {Number} h The height of the drag element
        */
        _startDrag: function() {},
        /**
        * Factory method to be overwritten by other DDM's
        * @private
        * @method _endDrag
        */
        _endDrag: function() {},
        _dropMove: function() {},
        /**
        * Internal method used by Drag to signal the end of a drag operation
        * @private
        * @method _end
        */
        _end: function() {
            if (this.activeDrag) {
                this._shimming = false;
                this._endDrag();
                this.fire('ddm:end');
                this.activeDrag.end.call(this.activeDrag);
                this.activeDrag = null;
            }
        },
        /**
        * Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @method stopDrag
        * @return {Self}
        * @chainable
        */
        stopDrag: function() {
            if (this.activeDrag) {
                this._end();
            }
            return this;
        },
        /**
        * Set to true when drag starts and useShim is true. Used in pairing with _docMove
        * @private
        * @property _shimming
        * @see _docMove
        * @type {Boolean}
        */
        _shimming: false,
        /**
        * Internal listener for the mousemove on Document. Checks if the shim is in place to only call _move once per mouse move
        * @private
        * @method _docMove
        * @param {Event.Facade} ev The Dom mousemove Event
        */
        _docMove: function(ev) {
            if (!this._shimming) {
                this._move(ev);
            }
        },
        /**
        * Internal listener for the mousemove DOM event to pass to the Drag's move method.
        * @private
        * @method _move
        * @param {Event.Facade} ev The Dom mousemove Event
        */
        _move: function(ev) {
            if (this.activeDrag) {
                this.activeDrag._move.call(this.activeDrag, ev);
                this._dropMove();
            }
        },
        /**
        * //TODO Private, rename??...
        * Helper method to use to set the gutter from the attribute setter.
        * CSS style string for gutter: '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)
        * @private
        * @method cssSizestoObject
        * @param {String} gutter CSS style string for gutter
        * @return {Object} The gutter Object Literal.
        */
        cssSizestoObject: function(gutter) {
            var x = gutter.split(' ');

            switch (x.length) {
                case 1: x[1] = x[2] = x[3] = x[0]; break;
                case 2: x[2] = x[0]; x[3] = x[1]; break;
                case 3: x[3] = x[1]; break;
            }

            return {
                top   : parseInt(x[0],10),
                right : parseInt(x[1],10),
                bottom: parseInt(x[2],10),
                left  : parseInt(x[3],10)
            };
        },
        /**
        * Get a valid Drag instance back from a Node or a selector string, false otherwise
        * @method getDrag
        * @param {String/Object} node The Node instance or Selector string to check for a valid Drag Object
        * @return {Object}
        */
        getDrag: function(node) {
            var drag = false,
                n = Y.one(node);
            if (n instanceof Y.Node) {
                Y.Array.each(this._drags, function(v) {
                    if (n.compareTo(v.get('node'))) {
                        drag = v;
                    }
                });
            }
            return drag;
        },
        /**
        * Swap the position of 2 nodes based on their CSS positioning.
        * @method swapPosition
        * @param {Node} n1 The first node to swap
        * @param {Node} n2 The first node to swap
        * @return {Node}
        */
        swapPosition: function(n1, n2) {
            n1 = Y.DD.DDM.getNode(n1);
            n2 = Y.DD.DDM.getNode(n2);
            var xy1 = n1.getXY(),
                xy2 = n2.getXY();

            n1.setXY(xy2);
            n2.setXY(xy1);
            return n1;
        },
        /**
        * Return a node instance from the given node, selector string or Y.Base extended object.
        * @method getNode
        * @param {Node/Object/String} n The node to resolve.
        * @return {Node}
        */
        getNode: function(n) {
            if (n instanceof Y.Node) {
                return n;
            }
            if (n && n.get) {
                if (Y.Widget && (n instanceof Y.Widget)) {
                    n = n.get('boundingBox');
                } else {
                    n = n.get('node');
                }
            } else {
                n = Y.one(n);
            }
            return n;
        },
        /**
        * Swap the position of 2 nodes based on their DOM location.
        * @method swapNode
        * @param {Node} n1 The first node to swap
        * @param {Node} n2 The first node to swap
        * @return {Node}
        */
        swapNode: function(n1, n2) {
            n1 = Y.DD.DDM.getNode(n1);
            n2 = Y.DD.DDM.getNode(n2);
            var p = n2.get('parentNode'),
                s = n2.get('nextSibling');

            if (s === n1) {
                p.insertBefore(n1, n2);
            } else if (n2 === n1.get('nextSibling')) {
                p.insertBefore(n2, n1);
            } else {
                n1.get('parentNode').replaceChild(n2, n1);
                p.insertBefore(n1, s);
            }
            return n1;
        }
    });

    Y.namespace('DD');
    Y.DD.DDM = new DDMBase();

    /**
    * Fires from the DDM before all drag events fire.
    * @event ddm:start
    * @type {CustomEvent}
    */
    /**
    * Fires from the DDM after the DDM finishes, before the drag end events.
    * @event ddm:end
    * @type {CustomEvent}
    */




}, '3.10.0pr1', {"requires": ["node", "base", "yui-throttle", "classnamemanager"]});
