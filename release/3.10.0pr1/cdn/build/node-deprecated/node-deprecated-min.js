/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("node-deprecated",function(e,t){var n=e.Node;n.ATTRS.data={getter:function(){return this._dataVal},setter:function(e){return this._dataVal=e,e},value:null},e.get=n.get=function(){return n.one.apply(n,arguments)},e.mix(n.prototype,{query:function(e){return this.one(e)},queryAll:function(e){return this.all(e)},each:function(e,t){return t=t||this,e.call(t,this)},item:function(e){return this},size:function(){return this._node?1:0}})},"3.10.0pr1",{requires:["node-base"]});
