/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("autocomplete-filters",function(e,t){var n=e.Array,r=e.Object,i=e.Text.WordBreak,s=e.mix(e.namespace("AutoCompleteFilters"),{charMatch:function(e,t,r){if(!e)return t;var i=n.unique((r?e:e.toLowerCase()).split(""));return n.filter(t,function(e){return e=e.text,r||(e=e.toLowerCase()),n.every(i,function(t){return e.indexOf(t)!==-1})})},charMatchCase:function(e,t){return s.charMatch(e,t,!0)},phraseMatch:function(e,t,r){return e?(r||(e=e.toLowerCase()),n.filter(t,function(t){return(r?t.text:t.text.toLowerCase()).indexOf(e)!==-1})):t},phraseMatchCase:function(e,t){return s.phraseMatch(e,t,!0)},startsWith:function(e,t,r){return e?(r||(e=e.toLowerCase()),n.filter(t,function(t){return(r?t.text:t.text.toLowerCase()).indexOf(e)===0})):t},startsWithCase:function(e,t){return s.startsWith(e,t,!0)},subWordMatch:function(e,t,r){if(!e)return t;var s=i.getUniqueWords(e,{ignoreCase:!r});return n.filter(t,function(e){var t=r?e.text:e.text.toLowerCase();return n.every(s,function(e){return t.indexOf(e)!==-1})})},subWordMatchCase:function(e,t){return s.subWordMatch(e,t,!0)},wordMatch:function(e,t,s){if(!e)return t;var o={ignoreCase:!s},u=i.getUniqueWords(e,o);return n.filter(t,function(e){var t=n.hash(i.getUniqueWords(e.text,o));return n.every(u,function(e){return r.owns(t,e)})})},wordMatchCase:function(e,t){return s.wordMatch(e,t,!0)}})},"3.10.0pr1",{requires:["array-extras","text-wordbreak"]});
