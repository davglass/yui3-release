/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('dd-drop', function (Y, NAME) {


    /**
     * Provides the ability to create a Drop Target.
     * @module dd
     * @submodule dd-drop
     */
    /**
     * Provides the ability to create a Drop Target.
     * @class Drop
     * @extends Base
     * @constructor
     * @namespace DD
     */

    var NODE = 'node',
        DDM = Y.DD.DDM,
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        /**
        * Fires when a drag element is over this target.
        * @event drop:over
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_OVER = 'drop:over',
        /**
        * Fires when a drag element enters this target.
        * @event drop:enter
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_ENTER = 'drop:enter',
        /**
        * Fires when a drag element exits this target.
        * @event drop:exit
        * @param {EventFacade} event An Event Facade object
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_EXIT = 'drop:exit',

        /**
        * Fires when a draggable node is dropped on this Drop Target. (Fired from dd-ddm-drop)
        * @event drop:hit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */


    Drop = function() {
        this._lazyAddAttrs = false;
        Drop.superclass.constructor.apply(this, arguments);


        //DD init speed up.
        Y.on('domready', Y.bind(function() {
            Y.later(100, this, this._createShim);
        }, this));
        DDM._regTarget(this);

        /* TODO
        if (Dom.getStyle(this.el, 'position') == 'fixed') {
            Event.on(window, 'scroll', function() {
                this.activateShim();
            }, this, true);
        }
        */
    };

    Drop.NAME = 'drop';

    Drop.ATTRS = {
        /**
        * Y.Node instanace to use as the element to make a Drop Target
        * @attribute node
        * @type Node
        */
        node: {
            setter: function(node) {
                var n = Y.one(node);
                if (!n) {
                    Y.error('DD.Drop: Invalid Node Given: ' + node);
                }
                return n;
            }
        },
        /**
        * Array of groups to add this drop into.
        * @attribute groups
        * @type Array
        */
        groups: {
            value: ['default'],
            getter: function() {
                if (!this._groups) {
                    this._groups = {};
                    return [];
                }

                return Y.Object.keys(this._groups);
            },
            setter: function(g) {
                this._groups = Y.Array.hash(g);
                return g;
            }
        },
        /**
        * CSS style padding to make the Drop Target bigger than the node.
        * @attribute padding
        * @type String
        */
        padding: {
            value: '0',
            setter: function(p) {
                return DDM.cssSizestoObject(p);
            }
        },
        /**
        * Set to lock this drop element.
        * @attribute lock
        * @type Boolean
        */
        lock: {
            value: false,
            setter: function(lock) {
                if (lock) {
                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-locked');
                } else {
                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-locked');
                }
                return lock;
            }
        },
        /**
        * Controls the default bubble parent for this Drop instance. Default: Y.DD.DDM. Set to false to disable bubbling.
        * Use bubbleTargets in config.
        * @deprecated
        * @attribute bubbles
        * @type Object
        */
        bubbles: {
            setter: function(t) {
                Y.log('bubbles is deprecated use bubbleTargets: HOST', 'warn', 'dd');
                this.addTarget(t);
                return t;
            }
        },
        /**
        * Use the Drop shim. Default: true
        * @deprecated
        * @attribute useShim
        * @type Boolean
        */
        useShim: {
            value: true,
            setter: function(v) {
                Y.DD.DDM._noShim = !v;
                return v;
            }
        }
    };

    Y.extend(Drop, Y.Base, {
        /**
        * The default bubbleTarget for this object. Default: Y.DD.DDM
        * @private
        * @property _bubbleTargets
        */
        _bubbleTargets: Y.DD.DDM,
        /**
        * Add this Drop instance to a group, this should be used for on-the-fly group additions.
        * @method addToGroup
        * @param {String} g The group to add this Drop Instance to.
        * @return {Self}
        * @chainable
        */
        addToGroup: function(g) {
            this._groups[g] = true;
            return this;
        },
        /**
        * Remove this Drop instance from a group, this should be used for on-the-fly group removals.
        * @method removeFromGroup
        * @param {String} g The group to remove this Drop Instance from.
        * @return {Self}
        * @chainable
        */
        removeFromGroup: function(g) {
            delete this._groups[g];
            return this;
        },
        /**
        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        * @private
        * @method _createEvents
        */
        _createEvents: function() {

            var ev = [
                EV_DROP_OVER,
                EV_DROP_ENTER,
                EV_DROP_EXIT,
                'drop:hit'
            ];

            Y.Array.each(ev, function(v) {
                this.publish(v, {
                    type: v,
                    emitFacade: true,
                    preventable: false,
                    bubbles: true,
                    queuable: false,
                    prefix: 'drop'
                });
            }, this);
        },
        /**
        * Flag for determining if the target is valid in this operation.
        * @private
        * @property _valid
        * @type Boolean
        */
        _valid: null,
        /**
        * The groups this target belongs to.
        * @private
        * @property _groups
        * @type Array
        */
        _groups: null,
        /**
        * Node reference to the targets shim
        * @property shim
        * @type {Object}
        */
        shim: null,
        /**
        * A region object associated with this target, used for checking regions while dragging.
        * @property region
        * @type Object
        */
        region: null,
        /**
        * This flag is tripped when a drag element is over this target.
        * @property overTarget
        * @type Boolean
        */
        overTarget: null,
        /**
        * Check if this target is in one of the supplied groups.
        * @method inGroup
        * @param {Array} groups The groups to check against
        * @return Boolean
        */
        inGroup: function(groups) {
            this._valid = false;
            var ret = false;
            Y.Array.each(groups, function(v) {
                if (this._groups[v]) {
                    ret = true;
                    this._valid = true;
                }
            }, this);
            return ret;
        },
        /**
        * Private lifecycle method
        * @private
        * @method initializer
        */
        initializer: function() {
            Y.later(100, this, this._createEvents);

            var node = this.get(NODE), id;
            if (!node.get('id')) {
                id = Y.stamp(node);
                node.set('id', id);
            }
            node.addClass(DDM.CSS_PREFIX + '-drop');
            //Shouldn't have to do this..
            this.set('groups', this.get('groups'));
        },
        /**
        * Lifecycle destructor, unreg the drag from the DDM and remove listeners
        * @private
        * @method destructor
        */
        destructor: function() {
            DDM._unregTarget(this);
            if (this.shim && (this.shim !== this.get(NODE))) {
                this.shim.detachAll();
                this.shim.remove();
                this.shim = null;
            }
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop');
            this.detachAll();
        },
        /**
        * Removes classes from the target, resets some flags and sets the shims deactive position [-999, -999]
        * @private
        * @method _deactivateShim
        */
        _deactivateShim: function() {
            if (!this.shim) {
                return false;
            }
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');

            if (this.get('useShim')) {
                this.shim.setStyles({
                    top: '-999px',
                    left: '-999px',
                    zIndex: '1'
                });
            }
            this.overTarget = false;
        },
        /**
        * Activates the shim and adds some interaction CSS classes
        * @private
        * @method _activateShim
        */
        _activateShim: function() {
            if (!DDM.activeDrag) {
                return false; //Nothing is dragging, no reason to activate.
            }
            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                return false;
            }
            if (this.get('lock')) {
                return false;
            }
            var node = this.get(NODE);
            //TODO Visibility Check..
            //if (this.inGroup(DDM.activeDrag.get('groups')) && this.get(NODE).isVisible()) {
            if (this.inGroup(DDM.activeDrag.get('groups'))) {
                node.removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
                node.addClass(DDM.CSS_PREFIX + '-drop-active-valid');
                DDM._addValid(this);
                this.overTarget = false;
                if (!this.get('useShim')) {
                    this.shim = this.get(NODE);
                }
                this.sizeShim();
            } else {
                DDM._removeValid(this);
                node.removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
                node.addClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            }
        },
        /**
        * Positions and sizes the shim with the raw data from the node,
        * this can be used to programatically adjust the Targets shim for Animation..
        * @method sizeShim
        */
        sizeShim: function() {
            if (!DDM.activeDrag) {
                return false; //Nothing is dragging, no reason to activate.
            }
            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                return false;
            }
            //if (this.get('lock') || !this.get('useShim')) {
            if (this.get('lock')) {
                return false;
            }
            if (!this.shim) {
                Y.later(100, this, this.sizeShim);
                return false;
            }
            var node = this.get(NODE),
                nh = node.get(OFFSET_HEIGHT),
                nw = node.get(OFFSET_WIDTH),
                xy = node.getXY(),
                p = this.get('padding'),
                dd, dH, dW;


            //Apply padding
            nw = nw + p.left + p.right;
            nh = nh + p.top + p.bottom;
            xy[0] = xy[0] - p.left;
            xy[1] = xy[1] - p.top;


            if (DDM.activeDrag.get('dragMode') === DDM.INTERSECT) {
                //Intersect Mode, make the shim bigger
                dd = DDM.activeDrag;
                dH = dd.get(NODE).get(OFFSET_HEIGHT);
                dW = dd.get(NODE).get(OFFSET_WIDTH);

                nh = (nh + dH);
                nw = (nw + dW);
                xy[0] = xy[0] - (dW - dd.deltaXY[0]);
                xy[1] = xy[1] - (dH - dd.deltaXY[1]);

            }

            if (this.get('useShim')) {
                //Set the style on the shim
                this.shim.setStyles({
                    height: nh + 'px',
                    width: nw + 'px',
                    top: xy[1] + 'px',
                    left: xy[0] + 'px'
                });
            }

            //Create the region to be used by intersect when a drag node is over us.
            this.region = {
                '0': xy[0],
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + nw,
                bottom: xy[1] + nh,
                left: xy[0]
            };
        },
        /**
        * Creates the Target shim and adds it to the DDM's playground..
        * @private
        * @method _createShim
        */
        _createShim: function() {
            //No playground, defer
            if (!DDM._pg) {
                Y.later(10, this, this._createShim);
                return;
            }
            //Shim already here, cancel
            if (this.shim) {
                return;
            }
            var s = this.get('node');

            if (this.get('useShim')) {
                s = Y.Node.create('<div id="' + this.get(NODE).get('id') + '_shim"></div>');
                s.setStyles({
                    height: this.get(NODE).get(OFFSET_HEIGHT) + 'px',
                    width: this.get(NODE).get(OFFSET_WIDTH) + 'px',
                    backgroundColor: 'yellow',
                    opacity: '.5',
                    zIndex: '1',
                    overflow: 'hidden',
                    top: '-900px',
                    left: '-900px',
                    position:  'absolute'
                });

                DDM._pg.appendChild(s);

                s.on('mouseover', Y.bind(this._handleOverEvent, this));
                s.on('mouseout', Y.bind(this._handleOutEvent, this));
            }


            this.shim = s;
        },
        /**
        * This handles the over target call made from this object or from the DDM
        * @private
        * @method _handleOverTarget
        */
        _handleTargetOver: function() {
            if (DDM.isOverTarget(this)) {
                this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-over');
                DDM.activeDrop = this;
                DDM.otherDrops[this] = this;
                if (this.overTarget) {
                    DDM.activeDrag.fire('drag:over', { drop: this, drag: DDM.activeDrag });
                    this.fire(EV_DROP_OVER, { drop: this, drag: DDM.activeDrag });
                } else {
                    //Prevent an enter before a start..
                    if (DDM.activeDrag.get('dragging')) {
                        this.overTarget = true;
                        this.fire(EV_DROP_ENTER, { drop: this, drag: DDM.activeDrag });
                        DDM.activeDrag.fire('drag:enter', { drop: this, drag: DDM.activeDrag });
                        DDM.activeDrag.get(NODE).addClass(DDM.CSS_PREFIX + '-drag-over');
                        //TODO - Is this needed??
                        //DDM._handleTargetOver();
                    }
                }
            } else {
                this._handleOut();
            }
        },
        /**
        * Handles the mouseover DOM event on the Target Shim
        * @private
        * @method _handleOverEvent
        */
        _handleOverEvent: function() {
            this.shim.setStyle('zIndex', '999');
            DDM._addActiveShim(this);
        },
        /**
        * Handles the mouseout DOM event on the Target Shim
        * @private
        * @method _handleOutEvent
        */
        _handleOutEvent: function() {
            this.shim.setStyle('zIndex', '1');
            DDM._removeActiveShim(this);
        },
        /**
        * Handles out of target calls/checks
        * @private
        * @method _handleOut
        */
        _handleOut: function(force) {
            if (!DDM.isOverTarget(this) || force) {
                if (this.overTarget) {
                    this.overTarget = false;
                    if (!force) {
                        DDM._removeActiveShim(this);
                    }
                    if (DDM.activeDrag) {
                        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
                        DDM.activeDrag.get(NODE).removeClass(DDM.CSS_PREFIX + '-drag-over');
                        this.fire(EV_DROP_EXIT, { drop: this, drag: DDM.activeDrag });
                        DDM.activeDrag.fire('drag:exit', { drop: this, drag: DDM.activeDrag });
                        delete DDM.otherDrops[this];
                    }
                }
            }
        }
    });

    Y.DD.Drop = Drop;




}, '3.10.0pr1', {"requires": ["dd-drag", "dd-ddm-drop"]});
