if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/template-base/template-base.js']) {
   __coverage__['build/template-base/template-base.js'] = {"path":"build/template-base/template-base.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0],"9":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":44}}},"2":{"name":"Template","line":54,"loc":{"start":{"line":54,"column":0},"end":{"line":54,"column":36}}},"3":{"name":"(anonymous_3)","line":88,"loc":{"start":{"line":88,"column":13},"end":{"line":88,"column":38}}},"4":{"name":"(anonymous_4)","line":104,"loc":{"start":{"line":104,"column":16},"end":{"line":104,"column":41}}},"5":{"name":"(anonymous_5)","line":121,"loc":{"start":{"line":121,"column":12},"end":{"line":121,"column":43}}},"6":{"name":"(anonymous_6)","line":143,"loc":{"start":{"line":143,"column":12},"end":{"line":143,"column":44}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":158,"column":44}},"2":{"start":{"line":54,"column":0},"end":{"line":74,"column":1}},"3":{"start":{"line":61,"column":4},"end":{"line":61,"column":29}},"4":{"start":{"line":69,"column":4},"end":{"line":69,"column":45}},"5":{"start":{"line":71,"column":4},"end":{"line":73,"column":5}},"6":{"start":{"line":72,"column":8},"end":{"line":72,"column":46}},"7":{"start":{"line":76,"column":0},"end":{"line":149,"column":2}},"8":{"start":{"line":89,"column":8},"end":{"line":89,"column":76}},"9":{"start":{"line":90,"column":8},"end":{"line":90,"column":50}},"10":{"start":{"line":105,"column":8},"end":{"line":105,"column":76}},"11":{"start":{"line":106,"column":8},"end":{"line":106,"column":53}},"12":{"start":{"line":122,"column":8},"end":{"line":122,"column":76}},"13":{"start":{"line":124,"column":8},"end":{"line":126,"column":9}},"14":{"start":{"line":125,"column":12},"end":{"line":125,"column":59}},"15":{"start":{"line":128,"column":8},"end":{"line":128,"column":65}},"16":{"start":{"line":144,"column":8},"end":{"line":144,"column":76}},"17":{"start":{"line":146,"column":8},"end":{"line":147,"column":28}},"18":{"start":{"line":155,"column":0},"end":{"line":155,"column":65}}},"branchMap":{"1":{"line":69,"type":"binary-expr","locations":[{"start":{"line":69,"column":18},"end":{"line":69,"column":24}},{"start":{"line":69,"column":28},"end":{"line":69,"column":44}}]},"2":{"line":71,"type":"if","locations":[{"start":{"line":71,"column":4},"end":{"line":71,"column":4}},{"start":{"line":71,"column":4},"end":{"line":71,"column":4}}]},"3":{"line":89,"type":"cond-expr","locations":[{"start":{"line":89,"column":28},"end":{"line":89,"column":59}},{"start":{"line":89,"column":62},"end":{"line":89,"column":75}}]},"4":{"line":105,"type":"cond-expr","locations":[{"start":{"line":105,"column":28},"end":{"line":105,"column":59}},{"start":{"line":105,"column":62},"end":{"line":105,"column":75}}]},"5":{"line":122,"type":"cond-expr","locations":[{"start":{"line":122,"column":28},"end":{"line":122,"column":59}},{"start":{"line":122,"column":62},"end":{"line":122,"column":75}}]},"6":{"line":124,"type":"if","locations":[{"start":{"line":124,"column":8},"end":{"line":124,"column":8}},{"start":{"line":124,"column":8},"end":{"line":124,"column":8}}]},"7":{"line":144,"type":"cond-expr","locations":[{"start":{"line":144,"column":28},"end":{"line":144,"column":59}},{"start":{"line":144,"column":62},"end":{"line":144,"column":75}}]},"8":{"line":146,"type":"cond-expr","locations":[{"start":{"line":146,"column":36},"end":{"line":146,"column":76}},{"start":{"line":147,"column":16},"end":{"line":147,"column":27}}]},"9":{"line":155,"type":"cond-expr","locations":[{"start":{"line":155,"column":26},"end":{"line":155,"column":53}},{"start":{"line":155,"column":56},"end":{"line":155,"column":64}}]}},"code":["(function () { YUI.add('template-base', function (Y, NAME) {","","/**","Virtual rollup of the `template-base` and `template-micro` modules.","","@module template","@main template","@since 3.8.0","**/","","/**","Provides a generic API for using template engines such as Handlebars and","`Y.Template.Micro`.","","@module template","@submodule template-base","@since 3.8.0","**/","","/**","Provides a generic API for using template engines such as Handlebars and","`Y.Template.Micro`.","","### Examples","","Using with `Y.Template.Micro` (the default template engine):","","    YUI().use('template', function (Y) {","        var micro = new Y.Template(),","            html  = micro.render('<%= data.message %>', {message: 'hello!'});","","        // ...","    });","","Using with Handlebars:","","    YUI().use('template-base', 'handlebars', function (Y) {","        var handlebars = new Y.Template(Y.Handlebars),","            html       = handlebars.render('{{message}}', {message: 'hello!'});","","        // ...","    });","","@class Template","@param {Mixed} [engine=Y.Template.Micro] Template engine to use, such as","    `Y.Template.Micro` or `Y.Handlebars`. Defaults to `Y.Template.Micro` if not","    specified.","@param {Object} [defaults] Default options to use when instance methods are","    invoked.","@constructor","@since 3.8.0","**/","","function Template(engine, defaults) {","    /**","    Default options.","","    @property {Object} defaults","    @since 3.8.1","    **/","    this.defaults = defaults;","","    /**","    Template engine class.","","    @property {Mixed} engine","    @since 3.8.0","    **/","    this.engine = engine || Y.Template.Micro;","","    if (!this.engine) {","        Y.error('No template engine loaded.');","    }","}","","Template.prototype = {","    /**","    Compiles a template with the current template engine and returns a compiled","    template function.","","    @method compile","    @param {String} text Template text to compile.","    @param {Object} [options] Options to pass along to the template engine. See","        template engine docs for options supported by each engine.","    @return {Function} Compiled template function.","    @since 3.8.0","    **/","    compile: function (text, options) {","        options = options ? Y.merge(this.defaults, options) : this.defaults;","        return this.engine.compile(text, options);","    },","","    /**","    Precompiles a template with the current template engine and returns a string","    containing JavaScript source code for the precompiled template.","","    @method precompile","    @param {String} text Template text to compile.","    @param {Object} [options] Options to pass along to the template engine. See","        template engine docs for options supported by each engine.","    @return {String} Source code for the precompiled template.","    @since 3.8.0","    **/","    precompile: function (text, options) {","        options = options ? Y.merge(this.defaults, options) : this.defaults;","        return this.engine.precompile(text, options);","    },","","    /**","    Compiles and renders a template with the current template engine in a single","    step, and returns the rendered result.","","    @method render","    @param {String} text Template text to render.","    @param {Object} data Data object to provide when rendering the template.","    @param {Object} [options] Options to pass along to the template engine. See","        template engine docs for options supported by each engine.","    @return {String} Rendered result.","    @since 3.8.0","    **/","    render: function (text, data, options) {","        options = options ? Y.merge(this.defaults, options) : this.defaults;","","        if (this.engine.render) {","            return this.engine.render(text, data, options);","        }","","        return this.engine.compile(text, options)(data, options);","    },","","    /**","    Revives a precompiled template function into an executable template function","    using the current template engine. The precompiled code must already have","    been evaluated; this method won't evaluate it for you.","","    @method revive","    @param {Function} precompiled Precompiled template function.","    @param {Object} [options] Options to pass along to the template engine. See","        template engine docs for options supported by each engine.","    @return {Function} Compiled template function.","    @since 3.8.0","    **/","    revive: function (precompiled, options) {","        options = options ? Y.merge(this.defaults, options) : this.defaults;","","        return this.engine.revive ? this.engine.revive(precompiled, options) :","                precompiled;","    }","};","","// Copy existing namespaced properties from Y.Template to the Template function","// if Y.Template already exists, then make the function the new Y.Template.","// This ensures that other modules can safely add stuff to the Y.Template","// namespace even if they're loaded before this one.","Y.Template = Y.Template ? Y.mix(Template, Y.Template) : Template;","","","}, '3.10.0pr1', {\"requires\": [\"yui-base\"]});","","}());"]};
}
var __cov_BkMB1MG_jJsU4nnvMLlbFw = __coverage__['build/template-base/template-base.js'];
__cov_BkMB1MG_jJsU4nnvMLlbFw.s['1']++;YUI.add('template-base',function(Y,NAME){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['1']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['2']++;function Template(engine,defaults){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['2']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['3']++;this.defaults=defaults;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['4']++;this.engine=(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['1'][0]++,engine)||(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['1'][1]++,Y.Template.Micro);__cov_BkMB1MG_jJsU4nnvMLlbFw.s['5']++;if(!this.engine){__cov_BkMB1MG_jJsU4nnvMLlbFw.b['2'][0]++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['6']++;Y.error('No template engine loaded.');}else{__cov_BkMB1MG_jJsU4nnvMLlbFw.b['2'][1]++;}}__cov_BkMB1MG_jJsU4nnvMLlbFw.s['7']++;Template.prototype={compile:function(text,options){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['3']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['8']++;options=options?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['3'][0]++,Y.merge(this.defaults,options)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['3'][1]++,this.defaults);__cov_BkMB1MG_jJsU4nnvMLlbFw.s['9']++;return this.engine.compile(text,options);},precompile:function(text,options){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['4']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['10']++;options=options?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['4'][0]++,Y.merge(this.defaults,options)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['4'][1]++,this.defaults);__cov_BkMB1MG_jJsU4nnvMLlbFw.s['11']++;return this.engine.precompile(text,options);},render:function(text,data,options){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['5']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['12']++;options=options?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['5'][0]++,Y.merge(this.defaults,options)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['5'][1]++,this.defaults);__cov_BkMB1MG_jJsU4nnvMLlbFw.s['13']++;if(this.engine.render){__cov_BkMB1MG_jJsU4nnvMLlbFw.b['6'][0]++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['14']++;return this.engine.render(text,data,options);}else{__cov_BkMB1MG_jJsU4nnvMLlbFw.b['6'][1]++;}__cov_BkMB1MG_jJsU4nnvMLlbFw.s['15']++;return this.engine.compile(text,options)(data,options);},revive:function(precompiled,options){__cov_BkMB1MG_jJsU4nnvMLlbFw.f['6']++;__cov_BkMB1MG_jJsU4nnvMLlbFw.s['16']++;options=options?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['7'][0]++,Y.merge(this.defaults,options)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['7'][1]++,this.defaults);__cov_BkMB1MG_jJsU4nnvMLlbFw.s['17']++;return this.engine.revive?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['8'][0]++,this.engine.revive(precompiled,options)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['8'][1]++,precompiled);}};__cov_BkMB1MG_jJsU4nnvMLlbFw.s['18']++;Y.Template=Y.Template?(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['9'][0]++,Y.mix(Template,Y.Template)):(__cov_BkMB1MG_jJsU4nnvMLlbFw.b['9'][1]++,Template);},'3.10.0pr1',{'requires':['yui-base']});
