/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('dd-ddm', function (Y, NAME) {


    /**
     * Extends the dd-ddm-base Class to add support for the viewport shim to allow a draggable
     * anode to drag to be dragged over an iframe or any other node that traps mousemove events.
     * It is also required to have Drop Targets enabled, as the viewport shim will contain the shims for the Drop Targets.
     * @module dd
     * @submodule dd-ddm
     * @for DDM
     * @namespace DD
     */
    Y.mix(Y.DD.DDM, {
        /**
        * The shim placed over the screen to track the mousemove event.
        * @private
        * @property _pg
        * @type {Node}
        */
        _pg: null,
        /**
        * Set this to true to set the shims opacity to .5 for debugging it, default: false.
        * @private
        * @property _debugShim
        * @type {Boolean}
        */
        _debugShim: false,
        _activateTargets: function() { },
        _deactivateTargets: function() {},
        _startDrag: function() {
            if (this.activeDrag && this.activeDrag.get('useShim')) {
                this._shimming = true;
                this._pg_activate();
                this._activateTargets();
            }
        },
        _endDrag: function() {
            this._pg_deactivate();
            this._deactivateTargets();
        },
        /**
        * Deactivates the shim
        * @private
        * @method _pg_deactivate
        */
        _pg_deactivate: function() {
            this._pg.setStyle('display', 'none');
        },
        /**
        * Activates the shim
        * @private
        * @method _pg_activate
        */
        _pg_activate: function() {
            if (!this._pg) {
                this._createPG();
            }
            var ah = this.activeDrag.get('activeHandle'), cur = 'auto';
            if (ah) {
                cur = ah.getStyle('cursor');
            }
            if (cur === 'auto') {
                cur = this.get('dragCursor');
            }

            this._pg_size();
            this._pg.setStyles({
                top: 0,
                left: 0,
                display: 'block',
                opacity: ((this._debugShim) ? '.5' : '0'),
                cursor: cur
            });
        },
        /**
        * Sizes the shim on: activatation, window:scroll, window:resize
        * @private
        * @method _pg_size
        */
        _pg_size: function() {
            if (this.activeDrag) {
                var b = Y.one('body'),
                h = b.get('docHeight'),
                w = b.get('docWidth');
                this._pg.setStyles({
                    height: h + 'px',
                    width: w + 'px'
                });
            }
        },
        /**
        * Creates the shim and adds it's listeners to it.
        * @private
        * @method _createPG
        */
        _createPG: function() {
            var pg = Y.Node.create('<div></div>'),
            bd = Y.one('body'), win;
            pg.setStyles({
                top: '0',
                left: '0',
                position: 'absolute',
                zIndex: '9999',
                overflow: 'hidden',
                backgroundColor: 'red',
                display: 'none',
                height: '5px',
                width: '5px'
            });
            pg.set('id', Y.stamp(pg));
            pg.addClass(Y.DD.DDM.CSS_PREFIX + '-shim');
            bd.prepend(pg);
            this._pg = pg;
            this._pg.on('mousemove', Y.throttle(Y.bind(this._move, this), this.get('throttleTime')));
            this._pg.on('mouseup', Y.bind(this._end, this));

            win = Y.one('win');
            Y.on('window:resize', Y.bind(this._pg_size, this));
            win.on('scroll', Y.bind(this._pg_size, this));
        }
    }, true);




}, '3.10.0pr1', {"requires": ["dd-ddm-base", "event-resize"]});
