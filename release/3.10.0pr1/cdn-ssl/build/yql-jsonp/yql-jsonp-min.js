/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("yql-jsonp",function(e,t){e.YQLRequest.prototype._send=function(t,n){n.allowCache!==!1&&(n.allowCache=!0),this._jsonp?(this._jsonp.url=t,n.on&&n.on.success&&(this._jsonp._config.on.success=n.on.success),this._jsonp.send()):this._jsonp=e.jsonp(t,n)}},"3.10.0pr1",{requires:["jsonp","jsonp-url"]});
