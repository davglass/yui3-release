/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('cache-plugin', function (Y, NAME) {

/**
 * Provides support to use Cache as a Plugin to a Base-based class.
 *
 * @module cache
 * @submodule cache-plugin
 */

/**
 * Plugin.Cache adds pluginizability to Cache.
 * @class Plugin.Cache
 * @extends Cache
 * @uses Plugin.Base
 */
function CachePlugin(config) {
    var cache = config && config.cache ? config.cache : Y.Cache,
        tmpclass = Y.Base.create("dataSourceCache", cache, [Y.Plugin.Base]),
        tmpinstance = new tmpclass(config);
    tmpclass.NS = "tmpClass";
    return tmpinstance;
}

Y.mix(CachePlugin, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "cache"
     */
    NS: "cache",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceCache"
     */
    NAME: "cachePlugin"
});


Y.namespace("Plugin").Cache = CachePlugin;


}, '3.10.0pr1', {"requires": ["plugin", "cache-base"]});
