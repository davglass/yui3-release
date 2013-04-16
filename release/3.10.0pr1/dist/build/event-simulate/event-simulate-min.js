/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-simulate",function(e,t){(function(){function d(t,u,a,f,l,c,h,p,d,v,m){t||e.error("simulateKeyEvent(): Invalid target.");if(r(u)){u=u.toLowerCase();switch(u){case"textevent":u="keypress";break;case"keyup":case"keydown":case"keypress":break;default:e.error("simulateKeyEvent(): Event type '"+u+"' not supported.")}}else e.error("simulateKeyEvent(): Event type must be a string.");i(a)||(a=!0),i(f)||(f=!0),s(l)||(l=e.config.win),i(c)||(c=!1),i(h)||(h=!1),i(p)||(p=!1),i(d)||(d=!1),o(v)||(v=0),o(m)||(m=0);var g=null;if(n(e.config.doc.createEvent)){try{g=e.config.doc.createEvent("KeyEvents"),g.initKeyEvent(u,a,f,l,c,h,p,d,v,m)}catch(y){try{g=e.config.doc.createEvent("Events")}catch(b){g=e.config.doc.createEvent("UIEvents")}finally{g.initEvent(u,a,f),g.view=l,g.altKey=h,g.ctrlKey=c,g.shiftKey=p,g.metaKey=d,g.keyCode=v,g.charCode=m}}t.dispatchEvent(g)}else s(e.config.doc.createEventObject)?(g=e.config.doc.createEventObject(),g.bubbles=a,g.cancelable=f,g.view=l,g.ctrlKey=c,g.altKey=h,g.shiftKey=p,g.metaKey=d,g.keyCode=m>0?m:v,t.fireEvent("on"+u,g)):e.error("simulateKeyEvent(): No event simulation framework present.")}function v(t,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x){t||e.error("simulateMouseEvent(): Invalid target."),r(f)?!u[f.toLowerCase()]&&!a[f]&&e.error("simulateMouseEvent(): Event type '"+f+"' not supported."):e.error("simulateMouseEvent(): Event type must be a string."),i(l)||(l=!0),i(c)||(c=f!=="mousemove"),s(h)||(h=e.config.win),o(p)||(p=1),o(d)||(d=0),o(v)||(v=0),o(m)||(m=0),o(g)||(g=0),i(y)||(y=!1),i(b)||(b=!1),i(w)||(w=!1),i(E)||(E=!1),o(S)||(S=0),x=x||null;var T=null;if(n(e.config.doc.createEvent))T=e.config.doc.createEvent("MouseEvents"),T.initMouseEvent?T.initMouseEvent(f,l,c,h,p,d,v,m,g,y,b,w,E,S,x):(T=e.config.doc.createEvent("UIEvents"),T.initEvent(f,l,c),T.view=h,T.detail=p,T.screenX=d,T.screenY=v,T.clientX=m,T.clientY=g,T.ctrlKey=y,T.altKey=b,T.metaKey=E,T.shiftKey=w,T.button=S,T.relatedTarget=x),x&&!T.relatedTarget&&(f==="mouseout"?T.toElement=x:f==="mouseover"&&(T.fromElement=x)),t.dispatchEvent(T);else if(s(e.config.doc.createEventObject)){T=e.config.doc.createEventObject(),T.bubbles=l,T.cancelable=c,T.view=h,T.detail=p,T.screenX=d,T.screenY=v,T.clientX=m,T.clientY=g,T.ctrlKey=y,T.altKey=b,T.metaKey=E,T.shiftKey=w;switch(S){case 0:T.button=1;break;case 1:T.button=4;break;case 2:break;default:T.button=0}T.relatedTarget=x,t.fireEvent("on"+f,T)}else e.error("simulateMouseEvent(): No event simulation framework present.")}function m(t,u,a,f,h,p){t||e.error("simulateUIEvent(): Invalid target."),r(u)?(u=u.toLowerCase(),l[u]||e.error("simulateUIEvent(): Event type '"+u+"' not supported.")):e.error("simulateUIEvent(): Event type must be a string.");var d=null;i(a)||(a=u in c),i(f)||(f=u==="submit"),s(h)||(h=e.config.win),o(p)||(p=1),n(e.config.doc.createEvent)?(d=e.config.doc.createEvent("UIEvents"),d.initUIEvent(u,a,f,h,p),t.dispatchEvent(d)):s(e.config.doc.createEventObject)?(d=e.config.doc.createEventObject(),d.bubbles=a,d.cancelable=f,d.view=h,d.detail=p,t.fireEvent("on"+u,d)):e.error("simulateUIEvent(): No event simulation framework present.")}function g(t,n,r,i,s,o,u,a,f,l,c,h,d,v,m,g){var y;(!e.UA.ios||e.UA.ios<2)&&e.error("simulateGestureEvent(): Native gesture DOM eventframe is not available in this platform."),t||e.error("simulateGestureEvent(): Invalid target."),e.Lang.isString(n)?(n=n.toLowerCase(),p[n]||e.error("simulateTouchEvent(): Event type '"+n+"' not supported.")):e.error("simulateGestureEvent(): Event type must be a string."),e.Lang.isBoolean(r)||(r=!0),e.Lang.isBoolean(i)||(i=!0),e.Lang.isObject(s)||(s=e.config.win),e.Lang.isNumber(o)||(o=2),e.Lang.isNumber(u)||(u=0),e.Lang.isNumber(a)||(a=0),e.Lang.isNumber(f)||(f=0),e.Lang.isNumber(l)||(l=0),e.Lang.isBoolean(c)||(c=!1),e.Lang.isBoolean(h)||(h=!1),e.Lang.isBoolean(d)||(d=!1),e.Lang.isBoolean(v)||(v=!1),e.Lang.isNumber(m)||(m=1),e.Lang.isNumber(g)||(g=0),y=e.config.doc.createEvent("GestureEvent"),y.initGestureEvent(n,r,i,s,o,u,a,f,l,c,h,d,v,t,m,g),t.dispatchEvent(y)}function y(t,n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w){var E;t||e.error("simulateTouchEvent(): Invalid target."),e.Lang.isString(n)?(n=n.toLowerCase(),h[n]||e.error("simulateTouchEvent(): Event type '"+n+"' not supported.")):e.error("simulateTouchEvent(): Event type must be a string."),n==="touchstart"||n==="touchmove"?m.length===0&&e.error("simulateTouchEvent(): No touch object in touches"):n==="touchend"&&y.length===0&&e.error("simulateTouchEvent(): No touch object in changedTouches"),e.Lang.isBoolean(r)||(r=!0),e.Lang.isBoolean(i)||(i=n!=="touchcancel"),e.Lang.isObject(s)||(s=e.config.win),e.Lang.isNumber(o)||(o=1),e.Lang.isNumber(u)||(u=0),e.Lang.isNumber(a)||(a=0),e.Lang.isNumber(f)||(f=0),e.Lang.isNumber(l)||(l=0),e.Lang.isBoolean(c)||(c=!1),e.Lang.isBoolean(p)||(p=!1),e.Lang.isBoolean(d)||(d=!1),e.Lang.isBoolean(v)||(v=!1),e.Lang.isNumber(b)||(b=1),e.Lang.isNumber(w)||(w=0),e.Lang.isFunction(e.config.doc.createEvent)?(e.UA.android?e.UA.android<4?(E=e.config.doc.createEvent("MouseEvents"),E.initMouseEvent(n,r,i,s,o,u,a,f,l,c,p,d,v,0,t),E.touches=m,E.targetTouches=g,E.changedTouches=y):(E=e.config.doc.createEvent("TouchEvent"),E.initTouchEvent(m,g,y,n,s,u,a,f,l,c,p,d,v)):e.UA.ios?e.UA.ios>=2?(E=e.config.doc.createEvent("TouchEvent"),E.initTouchEvent(n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w)):e.error("simulateTouchEvent(): No touch event simulation framework present for iOS, "+e.UA.ios+"."):e.error("simulateTouchEvent(): Not supported agent yet, "+e.UA.userAgent),t.dispatchEvent(E)):e.error("simulateTouchEvent(): No event simulation framework present.")}var t=e.Lang,n=t.isFunction,r=t.isString,i=t.isBoolean,s=t.isObject,o=t.isNumber,u={click:1,dblclick:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,mousemove:1,contextmenu:1},a={MSPointerOver:1,MSPointerOut:1,MSPointerDown:1,MSPointerUp:1,MSPointerMove:1},f={keydown:1,keyup:1,keypress:1},l={submit:1,blur:1,change:1,focus:1,resize:1,scroll:1,select:1},c={scroll:1,resize:1,reset:1,submit:1,change:1,select
:1,error:1,abort:1},h={touchstart:1,touchmove:1,touchend:1,touchcancel:1},p={gesturestart:1,gesturechange:1,gestureend:1};e.mix(c,u),e.mix(c,f),e.mix(c,h),e.Event.simulate=function(t,n,r){r=r||{},u[n]||a[n]?v(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.button,r.relatedTarget):f[n]?d(t,n,r.bubbles,r.cancelable,r.view,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.keyCode,r.charCode):l[n]?m(t,n,r.bubbles,r.cancelable,r.view,r.detail):h[n]?e.config.win&&"ontouchstart"in e.config.win&&!e.UA.phantomjs&&!(e.UA.chrome&&e.UA.chrome<6)?y(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.touches,r.targetTouches,r.changedTouches,r.scale,r.rotation):e.error("simulate(): Event '"+n+"' can't be simulated. Use gesture-simulate module instead."):e.UA.ios&&e.UA.ios>=2&&p[n]?g(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.scale,r.rotation):e.error("simulate(): Event '"+n+"' can't be simulated.")}})()},"3.10.0pr1",{requires:["event-base"]});
