/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('yql-jsonp', function (Y, NAME) {

/**
* Plugin for YQL to use JSONP to make YQL requests. This is the default method,
* when loaded in nodejs or winjs this will not load. The new module is needed
* to make sure that JSONP is not loaded in the environments that it is not needed.
* @module yql
* @submodule yql-jsonp
*/

//Over writes Y.YQLRequest._send to use IO instead of JSONP
Y.YQLRequest.prototype._send = function (url, o) {
    if (o.allowCache !== false) {
        o.allowCache = true;
    }
    if (!this._jsonp) {
        this._jsonp = Y.jsonp(url, o);
    } else {
        this._jsonp.url = url;
        if (o.on && o.on.success) {
            this._jsonp._config.on.success = o.on.success;
        }
        this._jsonp.send();
    }
};



}, '3.10.0pr1', {"requires": ["jsonp", "jsonp-url"]});
