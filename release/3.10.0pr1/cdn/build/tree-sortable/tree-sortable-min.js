/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("tree-sortable",function(e,t){function r(){}function i(){}var n="sort";r.prototype={sortReverse:!1,initializer:function(t){this.nodeExtensions=this.nodeExtensions.concat(e.Tree.Node.Sortable),t&&(t.sortComparator&&(this.sortComparator=t.sortComparator),"sortReverse"in t&&(this.sortReverse=t.sortReverse))},sortComparator:function(e){return e.index()},sortNode:function(t,r){if(!t.children.length)return this;r||(r={});var i;r.sortComparator?i=t.sortComparator=r.sortComparator:i=t.sortComparator||this.sortComparator;var s;return"sortReverse"in r?s=t.sortReverse=r.sortReverse:"sortReverse"in t?s=t.sortReverse:s=this.sortReverse,t.children.sort(e.rbind(this._sort,this,i,s)),r.silent||this.fire(n,{node:t,reverse:!!s,src:r.src}),this},_compare:function(e,t){return e<t?-1:e>t?1:0},_compareReverse:function(e,t){return t<e?-1:t>e?1:0},_getDefaultNodeIndex:function(e,t){var n=e.children,i=e.sortComparator||this.sortComparator,s=n.length,o=0,u="sortReverse"in e?e.sortReverse:this.sortReverse;if(!s)return s;if(i===r.prototype.sortComparator)return u?0:s;var a=u?this._compareReverse:this._compare,f=i(t),l;while(o<s)l=o+s>>1,a(i(n[l]),f)<0?o=l+1:s=l;return o},_sort:function(e,t,n,r){return this[r?"_compareReverse":"_compare"](n(e),n(t))}},e.Tree.Sortable=r,i.prototype={sort:function(e){return this.tree.sortNode(this,e),this}},e.Tree.Node.Sortable=i},"3.10.0pr1",{requires:["tree"]});
