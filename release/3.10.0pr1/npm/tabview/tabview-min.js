YUI.add("tabview",function(e,t){var n=e.TabviewBase._queries,r=e.TabviewBase._classNames,i=".",s=e.Base.create("tabView",e.Widget,[e.WidgetParent],{_afterChildAdded:function(){this.get("contentBox").focusManager.refresh()},_defListNodeValueFn:function(){return e.Node.create(s.LIST_TEMPLATE)},_defPanelNodeValueFn:function(){return e.Node.create(s.PANEL_TEMPLATE)},_afterChildRemoved:function(e){var t=e.index,n=this.get("selection");n||(n=this.item(t-1)||this.item(0),n&&n.set("selected",1)),this.get("contentBox").focusManager.refresh()},_initAria:function(){var e=this.get("contentBox"),t=e.one(n.tabviewList);t&&t.setAttrs({role:"tablist"})},bindUI:function(){this.get("contentBox").plug(e.Plugin.NodeFocusManager,{descendants:i+r.tabLabel,keys:{next:"down:39",previous:"down:37"},circular:!0}),this.after("render",this._setDefSelection),this.after("addChild",this._afterChildAdded),this.after("removeChild",this._afterChildRemoved)},renderUI:function(){var e=this.get("contentBox");this._renderListBox(e),this._renderPanelBox(e),this._childrenContainer=this.get("listNode"),this._renderTabs(e)},_setDefSelection:function(){var e=this.get("selection")||this.item(0);this.some(function(t){if(t.get("selected"))return e=t,!0}),e&&(this.set("selection",e),e.set("selected",1))},_renderListBox:function(e){var t=this.get("listNode");t.inDoc()||e.append(t)},_renderPanelBox:function(e){var t=this.get("panelNode");t.inDoc()||e.append(t)},_renderTabs:function(e){var t=e.all(n.tab),s=this.get("panelNode"),o=s?this.get("panelNode").get("children"):null,u=this;t&&(t.addClass(r.tab),e.all(n.tabLabel).addClass(r.tabLabel),e.all(n.tabPanel).addClass(r.tabPanel),t.each(function(e,t){var n=o?o.item(t):null;u.add({boundingBox:e,contentBox:e.one(i+r.tabLabel),panelNode:n})}))}},{LIST_TEMPLATE:'<ul class="'+r.tabviewList+'"></ul>',PANEL_TEMPLATE:'<div class="'+r.tabviewPanel+'"></div>',ATTRS:{defaultChildType:{value:"Tab"},listNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabviewList),t},valueFn:"_defListNodeValueFn"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabviewPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null}},HTML_PARSER:{listNode:n.tabviewList,panelNode:n.tabviewPanel}});e.TabView=s;var o=e.Lang,r=e.TabviewBase._classNames;e.Tab=e.Base.create("tab",e.Widget,[e.WidgetChild],{BOUNDING_TEMPLATE:'<li class="'+r.tab+'"></li>',CONTENT_TEMPLATE:'<a class="'+r.tabLabel+'"></a>',PANEL_TEMPLATE:'<div class="'+r.tabPanel+'"></div>',_uiSetSelectedPanel:function(e){this.get("panelNode").toggleClass(r.selectedPanel,e)},_afterTabSelectedChange:function(e){this._uiSetSelectedPanel(e.newVal)},_afterParentChange:function(e){e.newVal?this._add():this._remove()},_initAria:function(){var t=this.get("contentBox"),n=t.get("id"),r=this.get("panelNode");n||(n=e.guid(),t.set("id",n)),t.set("role","tab"),t.get("parentNode").set("role","presentation"),r.setAttrs({role:"tabpanel","aria-labelledby":n})},syncUI:function(){this.set("label",this.get("label")),this.set("content",this.get("content")),this._uiSetSelectedPanel(this.get("selected"))},bindUI:function(){this.after("selectedChange",this._afterTabSelectedChange),this.after("parentChange",this._afterParentChange)},renderUI:function(){this._renderPanel(),this._initAria()},_renderPanel:function(){this.get("parent").get("panelNode").appendChild(this.get("panelNode"))},_add:function(){var e=this.get("parent").get("contentBox"),t=e.get("listNode"),n=e.get("panelNode");t&&t.appendChild(this.get("boundingBox")),n&&n.appendChild(this.get("panelNode"))},_remove:function(){this.get("boundingBox").remove(),this.get("panelNode").remove()},_onActivate:function(e){e.target===this&&(e.domEvent.preventDefault(),e.target.set("selected",1))},initializer:function(){this.publish(this.get("triggerEvent"),{defaultFn:this._onActivate})},_defLabelGetter:function(){return this.get("contentBox").getHTML()},_defLabelSetter:function(e){var t=this.get("contentBox");return t.getHTML()!==e&&t.setHTML(e),e},_defContentSetter:function(e){var t=this.get("panelNode");return t.getHTML()!==e&&t.setHTML(e),e},_defContentGetter:function(){return this.get("panelNode").getHTML()},_defPanelNodeValueFn:function(){var t=this.get("contentBox").get("href")||"",n=this.get("parent"),i=t.indexOf("#"),s;return t=t.substr(i),t.charAt(0)==="#"&&(s=e.one(t),s&&s.addClass(r.tabPanel)),!s&&n&&(s=n.get("panelNode").get("children").item(this.get("index"))),s||(s=e.Node.create(this.PANEL_TEMPLATE)),s}},{ATTRS:{triggerEvent:{value:"click"},label:{setter:"_defLabelSetter",getter:"_defLabelGetter"},content:{setter:"_defContentSetter",getter:"_defContentGetter"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null,validator:"_validTabIndex"}},HTML_PARSER:{selected:function(){var e=this.get("boundingBox").hasClass(r.selectedTab)?1:0;return e}}})},"3.10.0pr1",{requires:["widget","widget-parent","widget-child","tabview-base","node-pluginhost","node-focusmanager"],skinnable:!0});
