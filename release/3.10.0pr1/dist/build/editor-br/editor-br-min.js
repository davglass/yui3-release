/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("editor-br",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host",i="li";e.extend(n,e.Base,{_onKeyDown:function(t){if(t.stopped){t.halt();return}if(t.keyCode===13){var n=this.get(r),s=n.getInstance(),o=new s.EditorSelection;o&&(e.UA.ie&&(!o.anchorNode||!o.anchorNode.test(i)&&!o.anchorNode.ancestor(i))&&(n.execCommand("inserthtml",s.EditorSelection.CURSOR),t.halt()),e.UA.webkit&&!o.anchorNode.test(i)&&!o.anchorNode.ancestor(i)&&(n.frame._execCommand("insertlinebreak",null),t.halt()))}},_afterEditorReady:function(){var t=this.get(r).getInstance();try{t.config.doc.execCommand("insertbronreturn",null,!0)}catch(n){}(e.UA.ie||e.UA.webkit)&&t.on("keydown",e.bind(this._onKeyDown,this),t.config.doc)},_onNodeChange:function(e){switch(e.changedType){case"backspace-up":case"backspace-down":case"delete-up":var t=this.get(r).getInstance(),n=e.changedNode,i=t.config.doc.createTextNode(" ");n.appendChild(i),n.removeChild(i)}},initializer:function(){var t=this.get(r);if(t.editorPara){e.error("Can not plug EditorBR and EditorPara at the same time.");return}t.after("ready",e.bind(this._afterEditorReady,this)),e.UA.gecko&&t.on("nodeChange",e.bind(this._onNodeChange,this))}},{NAME:"editorBR",NS:"editorBR",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorBR=n},"3.10.0pr1",{requires:["editor-base"]});
