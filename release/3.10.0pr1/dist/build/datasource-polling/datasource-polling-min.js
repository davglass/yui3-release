/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datasource-polling",function(e,t){function n(){this._intervals={}}n.prototype={_intervals:null,setInterval:function(t,n){var r=e.later(t,this,this.sendRequest,[n],!0);return this._intervals[r.id]=r,e.later(0,this,this.sendRequest,[n]),r.id},clearInterval:function(e,t){e=t||e,this._intervals[e]&&(this._intervals[e].cancel(),delete this._intervals[e])},clearAllIntervals:function(){e.each(this._intervals,this.clearInterval,this)}},e.augment(e.DataSource.Local,n)},"3.10.0pr1",{requires:["datasource-local"]});
