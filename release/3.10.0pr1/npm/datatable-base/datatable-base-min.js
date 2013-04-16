YUI.add("datatable-base",function(e,t){e.DataTable.Base=e.Base.create("datatable",e.Widget,[e.DataTable.Core],{delegate:function(){var e=this.get("contentBox");return e.delegate.apply(e,arguments)},destructor:function(){this.view&&this.view.destroy()},getCell:function(){return this.view&&this.view.getCell&&this.view.getCell.apply(this.view,arguments)},getRow:function(){return this.view&&this.view.getRow&&this.view.getRow.apply(this.view,arguments)},_afterDisplayColumnsChange:function(e){this._extractDisplayColumns(e.newVal||[])},bindUI:function(){this._eventHandles.relayCoreChanges=this.after(["columnsChange","dataChange","summaryChange","captionChange","widthChange"],e.bind("_relayCoreAttrChange",this))},_defRenderViewFn:function(e){e.view.render()},_extractDisplayColumns:function(t){function r(t){var i,s,o;for(i=0,s=t.length;i<s;++i)o=t[i],e.Lang.isArray(o.children)?r(o.children):n.push(o)}var n=[];r(t),this._displayColumns=n},initializer:function(){this.publish("renderView",{defaultFn:e.bind("_defRenderViewFn",this)}),this._extractDisplayColumns(this.get("columns")||[]),this.after("columnsChange",e.bind("_afterDisplayColumnsChange",this))},_relayCoreAttrChange:function(e){var t=e.attrName==="data"?"modelList":e.attrName;this.view.set(t,e.newVal)},renderUI:function(){var t=this,n=this.get("view");n&&(this.view=new n(e.merge(this.getAttrs(),{host:this,container:this.get("contentBox"),modelList:this.data},this.get("viewConfig"))),this._eventHandles.legacyFeatureProps||(this._eventHandles.legacyFeatureProps=this.view.after({renderHeader:function(e){t.head=e.view,t._theadNode=e.view.theadNode,t._tableNode=e.view.get("container")},renderFooter:function(e){t.foot=e.view,t._tfootNode=e.view.tfootNode,t._tableNode=e.view.get("container")},renderBody:function(e){t.body=e.view,t._tbodyNode=e.view.tbodyNode,t._tableNode=e.view.get("container")},renderTable:function(){var e=this.get("container");t._tableNode=this.tableNode||e.one("."+this.getClassName("table")+", table"),t._captionNode=this.captionNode||e.one("caption"),t._theadNode||(t._theadNode=e.one("."+this.getClassName("columns")+", thead")),t._tbodyNode||(t._tbodyNode=e.one("."+this.getClassName("data")+", tbody")),t._tfootNode||(t._tfootNode=e.one("."+this.getClassName("footer")+", tfoot"))}})),this.view.addTarget(this))},syncUI:function(){this.view&&this.fire("renderView",{view:this.view})},_validateView:function(t){return t===null||e.Lang.isFunction(t)&&t.prototype.render}},{ATTRS:{view:{value:e.DataTable.TableView,validator:"_validateView"},viewConfig:{}}}),e.DataTable=e.mix(e.Base.create("datatable",e.DataTable.Base,[]),e.DataTable)},"3.10.0pr1",{requires:["datatable-core","datatable-table","datatable-head","datatable-body","base-build","widget"],skinnable:!0});
