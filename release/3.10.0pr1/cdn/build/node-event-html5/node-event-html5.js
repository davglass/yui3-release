/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('node-event-html5', function (Y, NAME) {

/**
 * Adds HTML5 event support to Node.
 *
 * @module node
 * @submodule node-event-html5
 **/

Y.mix(Y.Node.DOM_EVENTS, {
    DOMActivate: 1,
    DOMContentLoaded: 1,
    afterprint: 1,
    beforeprint: 1,
    canplay: 1,
    canplaythrough: 1,
    durationchange: 1,
    emptied: 1,
    ended: 1,
    formchange: 1,
    forminput: 1,
    hashchange: 1,
    input: 1,
    invalid: 1,
    loadedmetadata: 1,
    loadeddata: 1,
    loadstart: 1,
    offline: 1,
    online: 1,
    pagehide: 1,
    pageshow: 1,
    pause: 1,
    play: 1,
    playing: 1,
    popstate: 1,
    progress: 1,
    ratechange: 1,
    readystatechange: 1,
    redo: 1,
    seeking: 1,
    seeked: 1,
    show: 1,
    stalled: 1,
    suspend: 1,
    timeupdate: 1,
    undo: 1,
    volumechange: 1,
    waiting: 1
});


}, '3.10.0pr1', {"requires": ["node-base"]});
