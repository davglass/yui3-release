/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("node-event-simulate",function(e,t){e.Node.prototype.simulate=function(t,n){e.Event.simulate(e.Node.getDOMNode(this),t,n)},e.Node.prototype.simulateGesture=function(t,n,r){e.Event.simulateGesture(this,t,n,r)}},"3.10.0pr1",{requires:["node-base","event-simulate","gesture-simulate"]});
