/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("node-event-delegate",function(e,t){e.Node.prototype.delegate=function(t){var n=e.Array(arguments,0,!0),r=e.Lang.isObject(t)&&!e.Lang.isArray(t)?1:2;return n.splice(r,0,this._node),e.delegate.apply(e,n)}},"3.10.0pr1",{requires:["node-base","event-delegate"]});
