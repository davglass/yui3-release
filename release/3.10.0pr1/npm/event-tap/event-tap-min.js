YUI.add("event-tap",function(e,t){function c(t,n,r,i){n=r?n:[n.START,n.MOVE,n.END,n.CANCEL],e.Array.each(n,function(e,n,r){var i=t[e];i&&(i.detach(),t[e]=null)})}var n=e.config.doc,r=e.Event._GESTURE_MAP,i=!!n&&!!n.createTouch,s=r.start,o=r.move,u=r.end,a=r.cancel,f="tap",l={START:"Y_TAP_ON_START_HANDLE",MOVE:"Y_TAP_ON_MOVE_HANDLE",END:"Y_TAP_ON_END_HANDLE",CANCEL:"Y_TAP_ON_CANCEL_HANDLE"};e.Event.define(f,{on:function(e,t,n){t[l.START]=e.on(s,this.touchStart,this,e,t,n)},detach:function(e,t,n){c(t,l)},delegate:function(e,t,n,r){t[l.START]=e.delegate(s,function(r){this.touchStart(r,e,t,n,!0)},r,this)},detachDelegate:function(e,t,n){c(t,l)},touchStart:function(e,t,n,r,s){var f={canceled:!1};if(e.button&&e.button===3)return;if(e.touches&&e.touches.length!==1)return;f.node=s?e.currentTarget:t,i&&e.touches?f.startXY=[e.touches[0].pageX,e.touches[0].pageY]:f.startXY=[e.pageX,e.pageY],n[l.MOVE]=t.once(o,this.touchMove,this,t,n,r,s,f),n[l.END]=t.once(u,this.touchEnd,this,t,n,r,s,f),n[l.CANCEL]=t.once(a,this.touchMove,this,t,n,r,s,f)},touchMove:function(e,t,n,r,i,s){c(n,[l.MOVE,l.END,l.CANCEL],!0,s),s.cancelled=!0},touchEnd:function(e,t,n,r,s,o){var u=o.startXY,a,h;i&&e.changedTouches?(a=[e.changedTouches[0].pageX,e.changedTouches[0].pageY],h=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]):(a=[e.pageX,e.pageY],h=[e.clientX,e.clientY]),c(n,[l.MOVE,l.END,l.CANCEL],!0,o),Math.abs(a[0]-u[0])===0&&Math.abs(a[1]-u[1])===0&&(e.type=f,e.pageX=a[0],e.pageY=a[1],e.clientX=h[0],e.clientY=h[1],e.currentTarget=o.node,r.fire(e))}})},"3.10.0pr1",{requires:["node-base","event-base","event-touch","event-synthetic"]});