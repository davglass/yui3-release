/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("parallel",function(e,t){e.Parallel=function(t){this.config=t||{},this.results=[],this.context=this.config.context||e,this.total=0,this.finished=0},e.Parallel.prototype={results:null,total:null,finished:null,add:function(t){var n=this,r=n.total;return n.total+=1,function(){n.finished++,n.results[r]=t&&t.apply(n.context,arguments)||(arguments.length===1?arguments[0]:e.Array(arguments)),n.test()}},test:function(){var e=this;e.finished>=e.total&&e.callback&&e.callback.call(e.context,e.results,e.data)},done:function(e,t){this.callback=e,this.data=t,this.test()}}},"3.10.0pr1",{requires:["yui-base"]});
