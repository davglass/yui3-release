/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('color-hsl', function (Y, NAME) {

/**
Color provides static methods for color conversion to hsl values.

    Y.Color.toHSL('f00'); // hsl(0, 100%, 50%)

    Y.Color.toHSLA('rgb(255, 255, 0'); // hsla(60, 100%, 50%, 1)

@module color
@submodule color-hsl
@class HSL
@namespace Color
@since 3.8.0
**/
Color = {

    /**
    @static
    @property REGEX_HSL
    @type RegExp
    @default /hsla?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/
    @since 3.8.0
    **/
    REGEX_HSL: /hsla?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/,

    /**
    @static
    @property STR_HSL
    @type String
    @default hsl({*}, {*}%, {*}%)
    @since 3.8.0
    **/
    STR_HSL: 'hsl({*}, {*}%, {*}%)',

    /**
    @static
    @property STR_HSLA
    @type String
    @default hsla({*}, {*}%, {*}%, {*})
    @since 3.8.0
    **/
    STR_HSLA: 'hsla({*}, {*}%, {*}%, {*})',

    /**
    Converts provided color value to an HSL string.
    @public
    @method toHSL
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSL: function (str) {
        var clr = Y.Color._convertTo(str, 'hsl');
        return clr.toLowerCase();
    },

    /**
    Converts provided color value to an HSLA string.
    @public
    @method toHSLA
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSLA: function (str) {
        var clr = Y.Color._convertTo(str, 'hsla');
        return clr.toLowerCase();
    },

    /**
    Parses the RGB string into h, s, l values. Will return an Array
        of values or an HSL string.
    @protected
    @method _rgbToHsl
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _rgbToHsl: function (str, toArray) {
        var h, s, l,
            rgb = Y.Color.REGEX_RGB.exec(str),
            r = rgb[1] / 255,
            g = rgb[2] / 255,
            b = rgb[3] / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            isGrayScale = false,
            sub = max - min,
            sum = max + min;


        if (r === g && g === b) {
            isGrayScale = true;
        }

        // hue
        if (sub === 0) {
            h = 0;
        } else if (r === max) {
            h = ((60 * (g - b) / sub) + 360) % 360;
        } else if (g === max) {
            h = (60 * (b - r) / sub) + 120;
        } else {
            h = (60 * (r - g) / sub) + 240;
        }

        // lightness
        l = sum / 2;

        // saturation
        if (l === 0 || l === 1) {
            s = l;
        } else if (l <= 0.5) {
            s = sub / sum;
        } else {
            s = sub / (2 - sum);
        }

        if (isGrayScale) {
            s = 0;
        }

        // clean up hsl
        h = Math.round(h);
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        if (toArray) {
            return [h, s, l];
        }

        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },

    /**
    Parses the HSL string into r, b, g values. Will return an Array
        of values or an RGB string.
    @protected
    @method _hslToRgb
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _hslToRgb: function (str, toArray) {
        // assume input is [h, s, l]
        // TODO: Find legals for use of formula
        var hsl = Y.Color.REGEX_HSL.exec(str),
            h = parseInt(hsl[1], 10) / 360,
            s = parseInt(hsl[2], 10) / 100,
            l = parseInt(hsl[3], 10) / 100,
            r,
            g,
            b,
            p,
            q;

        if (l <= 0.5) {
            q = l * (s + 1);
        } else {
            q = (l + s) - (l * s);
        }

        p = 2 * l - q;

        r = Math.round(Color._hueToRGB(p, q, h + 1/3) * 255);
        g = Math.round(Color._hueToRGB(p, q, h) * 255);
        b = Math.round(Color._hueToRGB(p, q, h - 1/3) * 255);

        if (toArray) {
            return [r, g, b];
        }

        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },

    /**
    Converts the HSL hue to the different channels for RGB

    @protected
    @method _hueToRGB
    @param {Number} p
    @param {Number} q
    @param {Number} hue
    @return {Number} value for requested channel
    @since 3.8.0
    **/
    _hueToRGB: function(p, q, hue) {
        // TODO: Find legals for use of formula
        if (hue < 0) {
            hue += 1;
        } else if (hue > 1) {
            hue -= 1;
        }

        if (hue * 6 < 1) {
            return p + (q - p) * 6 * hue;
        }
        if (hue * 2 < 1) {
            return q;
        }
        if (hue * 3 < 2) {
            return p + (q - p) * (2/3 - hue) * 6;
        }
        return p;
    }

};

Y.Color = Y.mix(Color, Y.Color);

Y.Color.TYPES = Y.mix(Y.Color.TYPES, {'HSL':'hsl', 'HSLA':'hsla'});
Y.Color.CONVERTS = Y.mix(Y.Color.CONVERTS, {'hsl': 'toHSL', 'hsla': 'toHSLA'});


}, '3.10.0pr1', {"requires": ["color-base"]});
