/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("editor-para-base",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host",i="body",s=i+" > p",o="p",u="<br>";e.extend(n,e.Base,{_fixFirstPara:function(){var e=this.get(r),t=e.getInstance(),n,i,a=t.config.doc.body,f=a.innerHTML,l=f.length?!0:!1;f===u&&(f="",l=!1),a.innerHTML="<"+o+">"+f+t.EditorSelection.CURSOR+"</"+o+">",i=t.one(s),n=new t.EditorSelection,n.selectNode(i,!0,l)},_afterEditorReady:function(){var e=this.get(r),t=e.getInstance(),n;t&&(t.EditorSelection.filterBlocks(),n=t.EditorSelection.DEFAULT_BLOCK_TAG,s=i+" > "+n,o=n)},_afterContentChange:function(){var e=this.get(r),t=e.getInstance();t&&t.EditorSelection&&t.EditorSelection.filterBlocks()},_afterPaste:function(){var t=this.get(r),n=t.getInstance();e.later(50,t,function(){n.EditorSelection.filterBlocks()})},initializer:function(){var t=this.get(r);if(t.editorBR){e.error("Can not plug EditorPara and EditorBR at the same time.");return}t.after("ready",e.bind(this._afterEditorReady,this)),t.after("contentChange",e.bind(this._afterContentChange,this)),e.Env.webkit&&t.after("dom:paste",e.bind(this._afterPaste,this))}},{NAME:"editorParaBase",NS:"editorParaBase",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorParaBase=n},"3.10.0pr1",{requires:["editor-base"]});
