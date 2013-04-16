/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("attribute-observable",function(e,t){function s(){this._ATTR_E_FACADE={},n.call(this,{emitFacade:!0})}var n=e.EventTarget,r="Change",i="broadcast";s._ATTR_CFG=[i],s.prototype={set:function(e,t,n){return this._setAttr(e,t,n)},_set:function(e,t,n){return this._setAttr(e,t,n,!0)},setAttrs:function(e,t){return this._setAttrs(e,t)},_setAttrs:function(e,t){var n;for(n in e)e.hasOwnProperty(n)&&this.set(n,e[n],t);return this},_fireAttrChange:function(t,n,i,s,o,u){var a=this,f=this._getFullType(t+r),l=a._state,c,h,p;u||(u=l.data[t]||{}),u.published||(p=a._publish(f),p.emitFacade=!0,p.defaultTargetOnly=!0,p.defaultFn=a._defAttrChangeFn,h=u.broadcast,h!==undefined&&(p.broadcast=h),u.published=!0),c=o?e.merge(o):a._ATTR_E_FACADE,c.attrName=t,c.subAttrName=n,c.prevVal=i,c.newVal=s,a.fire(f,c)},_defAttrChangeFn:function(e){this._setAttrVal(e.attrName,e.subAttrName,e.prevVal,e.newVal,e.opts)?e.newVal=this.get(e.attrName):e.stopImmediatePropagation()}},e.mix(s,n,!1,null,1),e.AttributeObservable=s,e.AttributeEvents=s},"3.10.0pr1",{requires:["event-custom"]});
