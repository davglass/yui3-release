YUI.add("tabview-base",function(e,t){var n=e.ClassNameManager.getClassName,r="tabview",i="tab",s="panel",o="selected",u={},a=".",f={tabview:n(r),tabviewPanel:n(r,s),tabviewList:n(r,"list"),tab:n(i),tabLabel:n(i,"label"),tabPanel:n(i,s),selectedTab:n(i,o),selectedPanel:n(i,s,o)},l={tabview:a+f.tabview,tabviewList:"> ul",tab:"> ul > li",tabLabel:"> ul > li > a",tabviewPanel:"> div",tabPanel:"> div > div",selectedTab:"> ul > "+a+f.selectedTab,selectedPanel:"> div "+a+f.selectedPanel},c=function(){this.init.apply(this,arguments)};c.NAME="tabviewBase",c._queries=l,c._classNames=f,e.mix(c.prototype,{init:function(t){t=t||u,this._node=t.host||e.one(t.node),this.refresh()},initClassNames:function(t){e.Object.each(l,function(e,n){if(f[n]){var r=this.all(e);t!==undefined&&(r=r.item(t)),r&&r.addClass(f[n])}},this._node),this._node.addClass(f.tabview)},_select:function(e){var t=this._node,n=t.one(l.selectedTab),r=t.one(l.selectedPanel),i=t.all(l.tab).item(e),s=t.all(l.tabPanel).item(e);n&&n.removeClass(f.selectedTab),r&&r.removeClass(f.selectedPanel),i&&i.addClass(f.selectedTab),s&&s.addClass(f.selectedPanel)},initState:function(){var e=this._node,t=e.one(l.selectedTab),n=t?e.all(l.tab).indexOf(t):0;this._select(n)},_scrubTextNodes:function(){this._node.one(l.tabviewList).get("childNodes").each(function(e){e.get("nodeType")===3&&e.remove()})},refresh:function(){this._scrubTextNodes(),this.initClassNames(),this.initState(),this.initEvents()},tabEventName:"click",initEvents:function(){this._node.delegate(this.tabEventName,this.onTabEvent,l.tab,this)},onTabEvent:function(e){e.preventDefault(),this._select(this._node.all(l.tab).indexOf(e.currentTarget))},destroy:function(){this._node.detach(this.tabEventName)}}),e.TabviewBase=c},"3.10.0pr1",{requires:["node-event-delegate","classnamemanager"]});
