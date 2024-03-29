/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('pjax-content', function (Y, NAME) {

/**
`Y.Router` extension that provides the content fetching and handling needed to
implement the standard pjax (HTMP5 pushState + Ajax) functionality.

@module pjax
@submodule pjax-content
@since 3.7.0
**/

/**
`Y.Router` extension that provides the content fetching and handling needed to
implement the standard pjax (HTMP5 pushState + Ajax) functionality.

This makes it easy to fetch server rendered content for URLs using Ajax. By
helping the router to fulfill the "request" for the content you can avoid full
page loads.

The `PjaxContent` class isn't useful on its own, but can be mixed into a
`Router`-based class along with the `PjaxBase` class to add Pjax functionality
to that Router. For a pre-made standalone Pjax router, see the `Pjax` class.

    var MyRouter = Y.Base.create('myRouter', Y.Router, [
        Y.PjaxBase,
        Y.PjaxContent
    ], {
        // ...
    });

@class PjaxContent
@extensionfor Router
@since 3.7.0
**/
function PjaxContent() {}

PjaxContent.prototype = {
    // -- Public Methods -------------------------------------------------------

    /**
    Extracts and returns the relevant HTML content from an Ajax response. The
    content is extracted using the `contentSelector` attribute as a CSS
    selector. If `contentSelector` is `null`, the entire response will be
    returned.

    The return value is an object containing two properties:

      * `node`: A `Y.Node` instance for a document fragment containing the
        extracted HTML content.

      * `title`: The title of the HTML page, if any, extracted using the
        `titleSelector` attribute (which defaults to looking for a `<title>`
        element). If `titleSelector` is not set or if a title could not be
        found, this property will be `undefined`.

    @method getContent
    @param {String} responseText Raw Ajax response text.
    @return {Object} Content object with the properties described above.
    @since 3.5.0
    **/
    getContent: function (responseText) {
        var content         = {},
            contentSelector = this.get('contentSelector'),
            frag            = Y.Node.create(responseText || ''),
            titleSelector   = this.get('titleSelector'),
            titleNode;

        if (contentSelector && frag) {
            content.node = frag.all(contentSelector).toFrag();
        } else {
            content.node = frag;
        }

        if (titleSelector && frag) {
            titleNode = frag.one(titleSelector);

            if (titleNode) {
                content.title = titleNode.get('text');
            }
        }

        return content;
    },

    /**
    Pjax route middleware to load content from a server. This makes an Ajax
    request for the requested URL, parses the returned content and puts it on
    the route's response object.

    This is route middleware and not intended to be the final callback for a
    route. This will add the following information to the route's request and
    response objects:

      - `req.ioURL`: The full URL that was used to make the `Y.io()` XHR. This
        may contain `"pjax=1"` if the `addPjaxParam` option is set.

      - `res.content`: An object containing `node` and `title` properties for
        the content extracted from the server's response. See `getContent()` for
        more details.

      - `res.ioResponse`: The full `Y.io()` response object. This is useful if
        you need access to the XHR's response `status` or HTTP headers.

    @example
        router.route('/foo/', 'loadContent', function (req, res, next) {
            Y.one('container').setHTML(res.content.node);
            Y.config.doc.title = res.content.title;
        });

    @method loadContent
    @param {Object} req Request object.
    @param {Object} res Response Object.
    @param {Function} next Function to pass control to the next route callback.
    @since 3.7.0
    @see Router.route()
    **/
    loadContent: function (req, res, next) {
        var url = req.url;

        // If there's an outstanding request, abort it.
        if (this._request) {
            this._request.abort();
        }

        // Add a 'pjax=1' query parameter if enabled.
        if (this.get('addPjaxParam')) {
            // Captures the path with query, and hash parts of the URL. Then
            // properly injects the "pjax=1" query param in the right place,
            // before any hash fragment, and returns the updated URL.
            url = url.replace(/([^#]*)(#.*)?$/, function (match, path, hash) {
                path += (path.indexOf('?') > -1 ? '&' : '?') + 'pjax=1';
                return path + (hash || '');
            });
        }

        // Send a request.
        this._request = Y.io(url, {
            'arguments': {
                route: {
                    req : req,
                    res : res,
                    next: next
                },

                url: url
            },

            context: this,
            headers: {'X-PJAX': 'true'},
            timeout: this.get('timeout'),

            on: {
                complete: this._onPjaxIOComplete,
                end     : this._onPjaxIOEnd
            }
        });
    },

    // -- Event Handlers -------------------------------------------------------

    /**
    Handles IO complete events.

    This parses the content from the `Y.io()` response and puts it on the
    route's response object.

    @method _onPjaxIOComplete
    @param {String} id The `Y.io` transaction id.
    @param {Object} ioResponse The `Y.io` response object.
    @param {Object} details Extra details carried through from `loadContent()`.
    @protected
    @since 3.7.0
    **/
    _onPjaxIOComplete: function (id, ioResponse, details) {
        var content = this.getContent(ioResponse.responseText),
            route   = details.route,
            req     = route.req,
            res     = route.res;

        // Put the URL requested through `Y.io` on the route's `req` object.
        req.ioURL = details.url;

        // Put the parsed content and `Y.io` response object on the route's
        // `res` object.
        res.content    = content;
        res.ioResponse = ioResponse;

        route.next();
    },

    /**
    Handles IO end events.

    @method _onPjaxIOEnd
    @param {String} id The `Y.io` transaction id.
    @param {Object} details Extra details carried through from `loadContent()`.
    @protected
    @since 3.5.0
    **/
    _onPjaxIOEnd: function () {
        this._request = null;
    }
};

PjaxContent.ATTRS = {
    /**
    If `true`, a "pjax=1" query parameter will be appended to all URLs
    requested via Pjax.

    Browsers ignore HTTP request headers when caching content, so if the
    same URL is used to request a partial Pjax page and a full page, the
    browser will cache them under the same key and may later load the
    cached partial page when the user actually requests a full page (or vice
    versa).

    To prevent this, we can add a bogus query parameter to the URL so that
    Pjax URLs will always be cached separately from non-Pjax URLs.

    @attribute addPjaxParam
    @type Boolean
    @default true
    @since 3.5.0
    **/
    addPjaxParam: {
        value: true
    },

    /**
    CSS selector used to extract a specific portion of the content of a page
    loaded via Pjax.

    For example, if you wanted to load the page `example.html` but only use
    the content within an element with the id "pjax-content", you'd set
    `contentSelector` to "#pjax-content".

    If not set, the entire page will be used.

    @attribute contentSelector
    @type String
    @default null
    @since 3.5.0
    **/
    contentSelector: {
        value: null
    },

    /**
    CSS selector used to extract a page title from the content of a page
    loaded via Pjax.

    By default this is set to extract the title from the `<title>` element,
    but you could customize it to extract the title from an `<h1>`, or from
    any other element, if that's more appropriate for the content you're
    loading.

    @attribute titleSelector
    @type String
    @default "title"
    @since 3.5.0
    **/
    titleSelector: {
        value: 'title'
    },

    /**
    Time in milliseconds after which an Ajax request should time out.

    @attribute timeout
    @type Number
    @default 30000
    @since 3.5.0
    **/
    timeout: {
        value: 30000
    }
};

Y.PjaxContent = PjaxContent;


}, '3.10.0pr1', {"requires": ["io-base", "node-base", "router"]});
