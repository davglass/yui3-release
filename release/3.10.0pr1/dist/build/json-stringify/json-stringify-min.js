/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("json-stringify",function(e,t){var n=":",r=e.config.global.JSON;e.mix(e.namespace("JSON"),{dateToString:function(e){function t(e){return e<10?"0"+e:e}return e.getUTCFullYear()+"-"+t(e.getUTCMonth()+1)+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+n+t(e.getUTCMinutes())+n+t(e.getUTCSeconds())+"Z"},stringify:function(){return r.stringify.apply(r,arguments)},charCacheThreshold:100})},"3.10.0pr1",{requires:["yui-base"]});
