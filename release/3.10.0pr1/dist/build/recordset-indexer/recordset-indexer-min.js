/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("recordset-indexer",function(e,t){function n(e){n.superclass.constructor.apply(this,arguments)}e.mix(n,{NS:"indexer",NAME:"recordsetIndexer",ATTRS:{hashTables:{value:{}},keys:{value:{}}}}),e.extend(n,e.Plugin.Base,{initializer:function(t){var n=this.get("host");this.onHostEvent("add",e.bind("_defAddHash",this),n),this.onHostEvent("remove",e.bind("_defRemoveHash",this),n),this.onHostEvent("update",e.bind("_defUpdateHash",this),n)},destructor:function(e){},_setHashTable:function(e){var t=this.get("host"),n={},r=0,i=t.getLength();for(;r<i;r++)n[t._items[r].getValue(e)]=t._items[r];return n},_defAddHash:function(t){var n=this.get("hashTables");e.each(n,function(n,r){e.each(t.added||t.updated,function(e){e.getValue(r)&&(n[e.getValue(r)]=e)})})},_defRemoveHash:function(t){var n=this.get("hashTables"),r;e.each(n,function(n,i){e.each(t.removed||t.overwritten,function(e){r=e.getValue(i),r&&n[r]===e&&delete n[r]})})},_defUpdateHash:function(e){e.added=e.updated,e.removed=e.overwritten,this._defAddHash(e),this._defRemoveHash(e)},createTable:function(e){var t=this.get("hashTables");return t[e]=this._setHashTable(e),this.set("hashTables",t),t[e]},getTable:function(e){return this.get("hashTables")[e]}}),e.namespace("Plugin").RecordsetIndexer=n},"3.10.0pr1",{requires:["recordset-base","plugin"]});
