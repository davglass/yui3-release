/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("highlight-base",function(e,t){var n=e.Array,r=e.Escape,i=e.Text.WordBreak,s=e.Lang.isArray,o={},u="(&[^;\\s]*)?",a={_REGEX:u+"(%needles)",_REPLACER:function(e,t,n){return t&&!/\s/.test(n)?e:a._TEMPLATE.replace(/\{s\}/g,n)},_START_REGEX:"^"+u+"(%needles)",_TEMPLATE:'<b class="'+e.ClassNameManager.getClassName("highlight")+'">{s}</b>',all:function(e,t,n){var i=[],u,f,l,c,h,p;n||(n=o),u=n.escapeHTML!==!1,h=n.startsWith?a._START_REGEX:a._REGEX,p=n.replacer||a._REPLACER,t=s(t)?t:[t];for(f=0,l=t.length;f<l;++f)c=t[f],c&&i.push(r.regex(u?r.html(c):c));return u&&(e=r.html(e)),i.length?e.replace(new RegExp(h.replace("%needles",i.join("|")),n.caseSensitive?"g":"gi"),p):e},allCase:function(t,n,r){return a.all(t,n,e.merge(r||o,{caseSensitive:!0}))},start:function(t,n,r){return a.all(t,n,e.merge(r||o,{startsWith:!0}))},startCase:function(e,t){return a.start(e,t,{caseSensitive:!0})},words:function(e,t,u){var f,l,c=a._TEMPLATE,h;return u||(u=o),f=!!u.caseSensitive,t=n.hash(s(t)?t:i.getUniqueWords(t,{ignoreCase:!f})),l=u.mapper||function(e,t){return t.hasOwnProperty(f?e:e.toLowerCase())?c.replace(/\{s\}/g,r.html(e)):r.html(e)},h=i.getWords(e,{includePunctuation:!0,includeWhitespace:!0}),n.map(h,function(e){return l(e,t)}).join("")},wordsCase:function(e,t){return a.words(e,t,{caseSensitive:!0})}};e.Highlight=a},"3.10.0pr1",{requires:["array-extras","classnamemanager","escape","text-wordbreak"]});
