YUI.add('tabview-plugin', function (Y, NAME) {

function TabviewPlugin() {
    TabviewPlugin.superclass.constructor.apply(this, arguments);
}

TabviewPlugin.NAME = 'tabviewPlugin';
TabviewPlugin.NS = 'tabs';

Y.extend(TabviewPlugin, Y.TabviewBase);

Y.namespace('Plugin');
Y.Plugin.Tabview = TabviewPlugin;


}, '3.10.0pr1', {"requires": ["tabview-base"]});
