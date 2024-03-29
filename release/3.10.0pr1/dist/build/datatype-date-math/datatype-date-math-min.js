/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatype-date-math",function(e,t){var n=e.Lang;e.mix(e.namespace("Date"),{isValidDate:function(e){return n.isDate(e)&&isFinite(e)&&e!="Invalid Date"&&!isNaN(e)&&e!=null?!0:!1},areEqual:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()==t.getTime()},isGreater:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()>t.getTime()},isGreaterOrEqual:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()>=t.getTime()},isInRange:function(e,t,n){return this.isGreaterOrEqual(e,t)&&this.isGreaterOrEqual(n,e)},addDays:function(e,t){return new Date(e.getTime()+864e5*t)},addMonths:function(e,t){var n=e.getFullYear(),r=e.getMonth()+t;n=Math.floor(n+r/12),r=(r%12+12)%12;var i=new Date(e.getTime());return i.setFullYear(n),i.setMonth(r),i},addYears:function(e,t){var n=e.getFullYear()+t,r=new Date(e.getTime());return r.setFullYear(n),r},listOfDatesInMonth:function(e){if(!this.isValidDate(e))return[];var t=this.daysInMonth(e),n=e.getFullYear(),r=e.getMonth(),i=[];for(var s=1;s<=t;s++)i.push(new Date(n,r,s,12,0,0));return i},daysInMonth:function(e){if(!this.isValidDate(e))return 0;var t=e.getMonth(),n=[31,28,31,30,31,30,31,31,30,31,30,31];if(t!=1)return n[t];var r=e.getFullYear();return r%400===0?29:r%100===0?28:r%4===0?29:28}}),e.namespace("DataType"),e.DataType.Date=e.Date},"3.10.0pr1",{requires:["yui-base"]});
