/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('color-base', function (Y, NAME) {

/**
Color provides static methods for color conversion.

    Y.Color.toRGB('f00'); // rgb(255, 0, 0)

    Y.Color.toHex('rgb(255, 255, 0)'); // #ffff00


@module color
@submodule color-base
@class Color
@since 3.8.0
**/

var REGEX_HEX = /^#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/,
    REGEX_HEX3 = /^#?([\da-fA-F]{1})([\da-fA-F]{1})([\da-fA-F]{1})/,
    REGEX_RGB = /rgba?\(([\d]{1,3}), ?([\d]{1,3}), ?([\d]{1,3}),? ?([.\d]*)?\)/,
    TYPES = { 'HEX': 'hex', 'RGB': 'rgb', 'RGBA': 'rgba' },
    CONVERTS = { 'hex': 'toHex', 'rgb': 'toRGB', 'rgba': 'toRGBA' };


Y.Color = {
    /**
    @static
    @property KEYWORDS
    @type Object
    @since 3.8.0
    **/
    KEYWORDS: {
        'black': '000', 'silver': 'c0c0c0', 'gray': '808080', 'white': 'fff',
        'maroon': '800000', 'red': 'f00', 'purple': '800080', 'fuchsia': 'f0f',
        'green': '008000', 'lime': '0f0', 'olive': '808000', 'yellow': 'ff0',
        'navy': '000080', 'blue': '00f', 'teal': '008080', 'aqua': '0ff'
    },

    /**
    @static
    @property REGEX_HEX
    @type RegExp
    @default /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/
    @since 3.8.0
    **/
    REGEX_HEX: REGEX_HEX,

    /**
    @static
    @property REGEX_HEX3
    @type RegExp
    @default /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})/
    @since 3.8.0
    **/
    REGEX_HEX3: REGEX_HEX3,

    /**
    @static
    @property REGEX_RGB
    @type RegExp
    @default /rgba?\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3}),? ?([.0-9]{1,3})?\)/
    @since 3.8.0
    **/
    REGEX_RGB: REGEX_RGB,

    re_RGB: REGEX_RGB,

    re_hex: REGEX_HEX,

    re_hex3: REGEX_HEX3,

    /**
    @static
    @property STR_HEX
    @type String
    @default #{*}{*}{*}
    @since 3.8.0
    **/
    STR_HEX: '#{*}{*}{*}',

    /**
    @static
    @property STR_RGB
    @type String
    @default rgb({*}, {*}, {*})
    @since 3.8.0
    **/
    STR_RGB: 'rgb({*}, {*}, {*})',

    /**
    @static
    @property STR_RGBA
    @type String
    @default rgba({*}, {*}, {*}, {*})
    @since 3.8.0
    **/
    STR_RGBA: 'rgba({*}, {*}, {*}, {*})',

    /**
    @static
    @property TYPES
    @type Object
    @default {'rgb':'rgb', 'rgba':'rgba'}
    @since 3.8.0
    **/
    TYPES: TYPES,

    /**
    @static
    @property CONVERTS
    @type Object
    @default {}
    @since 3.8.0
    **/
    CONVERTS: CONVERTS,

    /**
    @public
    @method convert
    @param {String} str
    @param {String} to
    @return {String}
    @since 3.8.0
    **/
    convert: function (str, to) {
        // check for a toXXX conversion method first
        // if it doesn't exist, use the toXxx conversion method
        var convert = Y.Color.CONVERTS[to],
            clr = Y.Color[convert](str);

        return clr.toLowerCase();
    },

    /**
    Converts provided color value to a hex value string
    @public
    @method toHex
    @param {String} str Hex or RGB value string
    @return {String} returns array of values or CSS string if options.css is true
    @since 3.8.0
    **/
    toHex: function (str) {
        var clr = Y.Color._convertTo(str, 'hex');
        return clr.toLowerCase();
    },

    /**
    Converts provided color value to an RGB value string
    @public
    @method toRGB
    @param {String} str Hex or RGB value string
    @return {String}
    @since 3.8.0
    **/
    toRGB: function (str) {
        var clr = Y.Color._convertTo(str, 'rgb');
        return clr.toLowerCase();
    },

    /**
    Converts provided color value to an RGB value string
    @public
    @method toRGBA
    @param {String} str Hex or RGB value string
    @return {String}
    @since 3.8.0
    **/
    toRGBA: function (str) {
        var clr = Y.Color._convertTo(str, 'rgba' );
        return clr.toLowerCase();
    },

    /**
    Converts the provided color string to an array of values. Will
        return an empty array if the provided string is not able
        to be parsed.
    @public
    @method toArray
    @param {String} str
    @return {Array}
    @since 3.8.0
    **/
    toArray: function(str) {
        // parse with regex and return "matches" array
        var type = Y.Color.findType(str).toUpperCase(),
            regex,
            arr,
            length,
            lastItem;

        if (type === 'HEX' && str.length < 5) {
            type = 'HEX3';
        }

        if (type.charAt(type.length - 1) === 'A') {
            type = type.slice(0, -1);
        }
        regex = Y.Color['REGEX_' + type];
        if (regex) {
            arr = regex.exec(str) || [];
            length = arr.length;

            if (length) {

                arr.shift();
                length--;

                lastItem = arr[length - 1];
                if (!lastItem) {
                    arr[length - 1] = 1;
                }
            }
        }

        return arr;

    },

    /**
    Converts the array of values to a string based on the provided template.
    @public
    @method fromArray
    @param {Array} arr
    @param {String} template
    @return {String}
    @since 3.8.0
    **/
    fromArray: function(arr, template) {
        arr = arr.concat();

        if (typeof template === 'undefined') {
            return arr.join(', ');
        }

        var replace = '{*}';

        template = Y.Color['STR_' + template.toUpperCase()];

        if (arr.length === 3 && template.match(/\{\*\}/g).length === 4) {
            arr.push(1);
        }

        while ( template.indexOf(replace) >= 0 && arr.length > 0) {
            template = template.replace(replace, arr.shift());
        }

        return template;
    },

    /**
    Finds the value type based on the str value provided.
    @public
    @method findType
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    findType: function (str) {
        if (Y.Color.KEYWORDS[str]) {
            return 'keyword';
        }

        var index = str.indexOf('('),
            key;

        if (index > 0) {
            key = str.substr(0, index);
        }

        if (key && Y.Color.TYPES[key.toUpperCase()]) {
            return Y.Color.TYPES[key.toUpperCase()];
        }

        return 'hex';

    }, // return 'keyword', 'hex', 'rgb'

    /**
    Retrives the alpha channel from the provided string. If no alpha
        channel is present, `1` will be returned.
    @protected
    @method _getAlpha
    @param {String} clr
    @return {Number}
    @since 3.8.0
    **/
    _getAlpha: function (clr) {
        var alpha,
            arr = Y.Color.toArray(clr);

        if (arr.length > 3) {
            alpha = arr.pop();
        }

        return +alpha || 1;
    },

    /**
    Returns the hex value string if found in the KEYWORDS object
    @protected
    @method _keywordToHex
    @param {String} clr
    @return {String}
    @since 3.8.0
    **/
    _keywordToHex: function (clr) {
        var keyword = Y.Color.KEYWORDS[clr];

        if (keyword) {
            return keyword;
        }
    },

    /**
    Converts the provided color string to the value type provided as `to`
    @protected
    @method _convertTo
    @param {String} clr
    @param {String} to
    @return {String}
    @since 3.8.0
    **/
    _convertTo: function(clr, to) {
        var from = Y.Color.findType(clr),
            originalTo = to,
            needsAlpha,
            alpha,
            method,
            ucTo;

        if (from === 'keyword') {
            clr = Y.Color._keywordToHex(clr);
            from = 'hex';
        }

        if (from === 'hex' && clr.length < 5) {
            if (clr.charAt(0) === '#') {
                clr = clr.substr(1);
            }

            clr = '#' + clr.charAt(0) + clr.charAt(0) +
                        clr.charAt(1) + clr.charAt(1) +
                        clr.charAt(2) + clr.charAt(2);
        }

        if (from === to) {
            return clr;
        }

        if (from.charAt(from.length - 1) === 'a') {
            from = from.slice(0, -1);
        }

        needsAlpha = (to.charAt(to.length - 1) === 'a');
        if (needsAlpha) {
            to = to.slice(0, -1);
            alpha = Y.Color._getAlpha(clr);
        }

        ucTo = to.charAt(0).toUpperCase() + to.substr(1).toLowerCase();
        method = Y.Color['_' + from + 'To' + ucTo ];

        // check to see if need conversion to rgb first
        // check to see if there is a direct conversion method
        // convertions are: hex <-> rgb <-> hsl
        if (!method) {
            if (from !== 'rgb' && to !== 'rgb') {
                clr = Y.Color['_' + from + 'ToRgb'](clr);
                from = 'rgb';
                method = Y.Color['_' + from + 'To' + ucTo ];
            }
        }

        if (method) {
            clr = ((method)(clr, needsAlpha));
        }

        // process clr from arrays to strings after conversions if alpha is needed
        if (needsAlpha) {
            if (!Y.Lang.isArray(clr)) {
                clr = Y.Color.toArray(clr);
            }
            clr.push(alpha);
            clr = Y.Color.fromArray(clr, originalTo.toUpperCase());
        }

        return clr;
    },

    /**
    Processes the hex string into r, g, b values. Will return values as
        an array, or as an rgb string.
    @protected
    @method _hexToRgb
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _hexToRgb: function (str, toArray) {
        var r, g, b;

        /*jshint bitwise:false*/
        if (str.charAt(0) === '#') {
            str = str.substr(1);
        }

        str = parseInt(str, 16);

        r = str >> 16;
        g = str >> 8 & 0xFF;
        b = str & 0xFF;

        if (toArray) {
            return [r, g, b];
        }

        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },

    /**
    Processes the rgb string into r, g, b values. Will return values as
        an array, or as a hex string.
    @protected
    @method _rgbToHex
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _rgbToHex: function (str) {
        /*jshint bitwise:false*/
        var rgb = Y.Color.toArray(str),
            hex = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);

        hex = (+hex).toString(16);

        while (hex.length < 6) {
            hex = '0' + hex;
        }

        return '#' + hex;
    }

};



}, '3.10.0pr1', {"requires": ["yui-base"]});
