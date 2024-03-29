/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatype-xml-parse', function (Y, NAME) {

/**
 * Parse XML submodule.
 *
 * @module datatype-xml
 * @submodule datatype-xml-parse
 * @for XML
 */

var LANG = Y.Lang;

Y.mix(Y.namespace("XML"), {
    /**
     * Converts data to type XMLDocument.
     *
     * @method parse
     * @param data {String} Data to convert.
     * @return {XMLDoc} XML Document.
     */
    parse: function(data) {
        var xmlDoc = null;
        if(LANG.isString(data)) {
            try {
                if(!LANG.isUndefined(ActiveXObject)) {
                        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(data);
                }
            }
            catch(ee) {
                try {
                    if (!LANG.isUndefined(DOMParser)) {
                        xmlDoc = new DOMParser().parseFromString(data, "text/xml");
                    }
                    if (!LANG.isUndefined(Windows.Data.Xml.Dom)) {
                        xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
                        xmlDoc.loadXml(data);
                    }
                }
                catch(e) {
                }
                    Y.log(ee.message + " (Could not initialize the ActiveX control for XML parsing)", "warn", "xml");
            }
        }
        
        if( (LANG.isNull(xmlDoc)) || (LANG.isNull(xmlDoc.documentElement)) || (xmlDoc.documentElement.nodeName === "parsererror") ) {
            Y.log("Could not parse data to type XML Document", "warn", "xml");
        }
        
        return xmlDoc;
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").xml = Y.XML.parse;

Y.namespace("DataType");
Y.DataType.XML = Y.XML;


}, '3.10.0pr1');
