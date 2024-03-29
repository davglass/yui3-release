YUI.add('datatype-number-parse', function (Y, NAME) {

/**
 * Parse number submodule.
 *
 * @module datatype-number
 * @submodule datatype-number-parse
 * @for Number
 */

var LANG = Y.Lang;

Y.mix(Y.namespace("Number"), {
    /**
     * Converts data to type Number.
     *
     * @method parse
     * @param data {String | Number | Boolean} Data to convert. The following
     * values return as null: null, undefined, NaN, "".
     * @return {Number} A number, or null.
     */
    parse: function(data) {
        var number = (data === null || data === "") ? data : +data;
        if(LANG.isNumber(number)) {
            return number;
        }
        else {
            return null;
        }
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").number = Y.Number.parse;
Y.namespace("DataType");
Y.DataType.Number = Y.Number;


}, '3.10.0pr1');
