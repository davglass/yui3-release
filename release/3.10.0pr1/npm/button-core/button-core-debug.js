YUI.add('button-core', function (Y, NAME) {

/**
 * Provides an interface for working with button-like DOM nodes
 *
 * @module button-core
 * @since 3.5.0
 */
var getClassName = Y.ClassNameManager.getClassName;

/**
 * Creates a button
 *
 * @class ButtonCore
 * @uses AttributeCore
 * @param config {Object} Configuration object
 * @constructor
 */
function ButtonCore(config) {
    this.initializer(config);
}

ButtonCore.prototype = {

    /**
     *
     * @property TEMPLATE
     * @type {String}
     * @default <button/>
     */
    TEMPLATE: '<button/>',

    /**
     *
     * @property constructor
     * @type {Object}
     * @default ButtonCore
     * @private
     */
    constructor: ButtonCore,

    /**
     * @method initializer
     * @description Internal init() handler.
     * @param config {Object} Config object.
     * @private
     */
    initializer: function(config) {
        this._initNode(config);
        this._initAttributes(config);
        this._renderUI(config);
    },

    /**
     * @method _initNode
     * @description Node initializer
     * @param config {Object} Config object.
     * @private
     */
    _initNode: function(config) {
        if (config.host) {
            this._host = Y.one(config.host);
        } else {
            this._host = Y.Node.create(this.TEMPLATE);
        }
    },

    /**
     * @method _initAttributes
     * @description  Attribute initializer
     * @param config {Object} Config object.
     * @private
     */
    _initAttributes: function(config) {
        var host = this._host,
            node = host.one('.' + ButtonCore.CLASS_NAMES.LABEL) || host;
            
        config.label = config.label || this._getLabel(node);
        Y.AttributeCore.call(this, ButtonCore.ATTRS, config);
    },

    /**
     * @method renderUI
     * @description Renders any UI/DOM elements for Button instances
     * @param config {Object} Config object.
     * @private
     */
    _renderUI: function() {
        var node = this.getNode(),
            tagName = node.get('tagName').toLowerCase();

        // Set some default node attributes
        node.addClass(ButtonCore.CLASS_NAMES.BUTTON);
        
        if (tagName !== 'button' && tagName !== 'input') {
            node.set('role', 'button');
        }
    },

    /**
     * @method enable
     * @description Sets the button's `disabled` DOM attribute to false
     * @public
     */
    enable: function() {
        this.set('disabled', false);
    },

    /**
     * @method disable
     * @description Sets the button's `disabled` DOM attribute to true
     * @public
     */
    disable: function() {
        this.set('disabled', true);
    },

    /**
     * @method getNode
     * @description Gets the host DOM node for this button instance
     * @public
     */
    getNode: function() {
        return this._host;
    },
    
    /**
     * @method _getLabel
     * @description Getter for a button's 'label' ATTR
     * @private
     */
    _getLabel: function () {
        var node    = this.getNode(),
            tagName = node.get('tagName').toLowerCase(),
            label;

        if (tagName === 'input') {
            label = node.get('value');
        }
        else {
            label = (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).get('text');
        }
        
        return label;
    },
    
    /**
     * @method _uiSetLabel
     * @description Setter for a button's 'label' ATTR
     * @param label {string}
     * @private
     */
    _uiSetLabel: function (label) {
        var node    = this.getNode(),
            tagName = node.get('tagName').toLowerCase();

        if (tagName === 'input') {
            node.set('value', label);
        } else {
            (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).set('text', label);
        }

        return label;
    },

    /**
     * @method _uiSetDisabled
     * @description Setter for the 'disabled' ATTR
     * @param value {boolean}
     * @private
     */
    _uiSetDisabled: function(value) {
        var node = this.getNode();
        
        node.getDOMNode().disabled = value; // avoid rerunning setter when this === node
        node.toggleClass(ButtonCore.CLASS_NAMES.DISABLED, value);
        
        return value;
    }
};


Y.mix(ButtonCore.prototype, Y.AttributeCore.prototype);

/**
 * Attribute configuration.
 *
 * @property ATTRS
 * @type {Object}
 * @protected
 * @static
 */
ButtonCore.ATTRS = {

    /**
     * The text of the button (the `value` or `text` property)
     *
     * @attribute label
     * @type String
     */
    label: {
        setter: '_uiSetLabel',
        getter: '_getLabel',
        lazyAdd: false
    },

    /**
     * The button's enabled/disabled state
     *
     * @attribute disabled
     * @type Boolean
     */
    disabled: {
        value: false,
        setter: '_uiSetDisabled',
        lazyAdd: false
    }
};

/**
 * Name of this component.
 *
 * @property NAME
 * @type String
 * @static
 */
ButtonCore.NAME = "button";

/**
 * Array of static constants used to identify the classnames applied to DOM nodes
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @public
 * @static
 */
ButtonCore.CLASS_NAMES = {
    BUTTON  : getClassName('button'),
    DISABLED: getClassName('button', 'disabled'),
    SELECTED: getClassName('button', 'selected'),
    LABEL   : getClassName('button', 'label')
};

/**
 * Array of static constants used to for applying ARIA states
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @private
 * @static
 */
ButtonCore.ARIA_STATES = {
    PRESSED : 'aria-pressed',
    CHECKED : 'aria-checked'
};

/**
 * Array of static constants used to for applying ARIA roles
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @private
 * @static
 */
ButtonCore.ARIA_ROLES = {
    BUTTON  : 'button',
    CHECKBOX: 'checkbox',
    TOGGLE  : 'toggle'
};

// Export Button
Y.ButtonCore = ButtonCore;

}, '3.10.0pr1', {"requires": ["attribute-core", "classnamemanager", "node-base"]});
