/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("dom-deprecated",function(e,t){e.mix(e.DOM,{children:function(t,n){var r=[];return t&&(n=n||"*",r=e.Selector.query("> "+n,t)),r},firstByTag:function(t,n){var r;return n=n||e.config.doc,t&&n.getElementsByTagName&&(r=n.getElementsByTagName(t)[0]),r||null},previous:function(t,n,r){return e.DOM.elementByAxis(t,"previousSibling",n,r)},next:function(t,n,r){return e.DOM.elementByAxis(t,"nextSibling",n,r)}})},"3.10.0pr1",{requires:["dom-base"]});
