/*
YUI 3.10.0pr1 (build 529d0dc)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-body', function (Y, NAME) {

/**
View class responsible for rendering the `<tbody>` section of a table. Used as
the default `bodyView` for `Y.DataTable.Base` and `Y.DataTable` classes.

@module datatable
@submodule datatable-body
@since 3.5.0
**/
var Lang         = Y.Lang,
    isArray      = Lang.isArray,
    isNumber     = Lang.isNumber,
    isString     = Lang.isString,
    fromTemplate = Lang.sub,
    htmlEscape   = Y.Escape.html,
    toArray      = Y.Array,
    bind         = Y.bind,
    YObject      = Y.Object,
    valueRegExp  = /\{value\}/g;

/**
View class responsible for rendering the `<tbody>` section of a table. Used as
the default `bodyView` for `Y.DataTable.Base` and `Y.DataTable` classes.

Translates the provided `modelList` into a rendered `<tbody>` based on the data
in the constituent Models, altered or ammended by any special column
configurations.

The `columns` configuration, passed to the constructor, determines which
columns will be rendered.

The rendering process involves constructing an HTML template for a complete row
of data, built by concatenating a customized copy of the instance's
`CELL_TEMPLATE` into the `ROW_TEMPLATE` once for each column.  This template is
then populated with values from each Model in the `modelList`, aggregating a
complete HTML string of all row and column data.  A `<tbody>` Node is then created from the markup and any column `nodeFormatter`s are applied.

Supported properties of the column objects include:

  * `key` - Used to link a column to an attribute in a Model.
  * `name` - Used for columns that don't relate to an attribute in the Model
    (`formatter` or `nodeFormatter` only) if the implementer wants a
    predictable name to refer to in their CSS.
  * `cellTemplate` - Overrides the instance's `CELL_TEMPLATE` for cells in this
    column only.
  * `formatter` - Used to customize or override the content value from the
    Model.  These do not have access to the cell or row Nodes and should
    return string (HTML) content.
  * `nodeFormatter` - Used to provide content for a cell as well as perform any
    custom modifications on the cell or row Node that could not be performed by
    `formatter`s.  Should be used sparingly for better performance.
  * `emptyCellValue` - String (HTML) value to use if the Model data for a
    column, or the content generated by a `formatter`, is the empty string,
    `null`, or `undefined`.
  * `allowHTML` - Set to `true` if a column value, `formatter`, or
    `emptyCellValue` can contain HTML.  This defaults to `false` to protect
    against XSS.
  * `className` - Space delimited CSS classes to add to all `<td>`s in a column.

A column `formatter` can be:

  * a function, as described below.
  * a string which can be:
      * the name of a pre-defined formatter function
        which can be located in the `Y.DataTable.BodyView.Formatters` hash using the
        value of the `formatter` property as the index.
      * A template that can use the `{value}` placeholder to include the value
        for the current cell or the name of any field in the underlaying model
        also enclosed in curly braces.  Any number and type of these placeholders
        can be used.

Column `formatter`s are passed an object (`o`) with the following properties:

  * `value` - The current value of the column's associated attribute, if any.
  * `data` - An object map of Model keys to their current values.
  * `record` - The Model instance.
  * `column` - The column configuration object for the current column.
  * `className` - Initially empty string to allow `formatter`s to add CSS
    classes to the cell's `<td>`.
  * `rowIndex` - The zero-based row number.
  * `rowClass` - Initially empty string to allow `formatter`s to add CSS
    classes to the cell's containing row `<tr>`.

They may return a value or update `o.value` to assign specific HTML content.  A
returned value has higher precedence.

Column `nodeFormatter`s are passed an object (`o`) with the following
properties:

  * `value` - The current value of the column's associated attribute, if any.
  * `td` - The `<td>` Node instance.
  * `cell` - The `<div>` liner Node instance if present, otherwise, the `<td>`.
    When adding content to the cell, prefer appending into this property.
  * `data` - An object map of Model keys to their current values.
  * `record` - The Model instance.
  * `column` - The column configuration object for the current column.
  * `rowIndex` - The zero-based row number.

They are expected to inject content into the cell's Node directly, including
any "empty" cell content.  Each `nodeFormatter` will have access through the
Node API to all cells and rows in the `<tbody>`, but not to the `<table>`, as
it will not be attached yet.

If a `nodeFormatter` returns `false`, the `o.td` and `o.cell` Nodes will be
`destroy()`ed to remove them from the Node cache and free up memory.  The DOM
elements will remain as will any content added to them.  _It is highly
advisable to always return `false` from your `nodeFormatter`s_.

@class BodyView
@namespace DataTable
@extends View
@since 3.5.0
**/
Y.namespace('DataTable').BodyView = Y.Base.create('tableBody', Y.View, [], {
    // -- Instance properties -------------------------------------------------

    /**
    HTML template used to create table cells.

    @property CELL_TEMPLATE
    @type {HTML}
    @default '<td {headers} class="{className}">{content}</td>'
    @since 3.5.0
    **/
    CELL_TEMPLATE: '<td {headers} class="{className}">{content}</td>',

    /**
    CSS class applied to even rows.  This is assigned at instantiation.

    For DataTable, this will be `yui3-datatable-even`.

    @property CLASS_EVEN
    @type {String}
    @default 'yui3-table-even'
    @since 3.5.0
    **/
    //CLASS_EVEN: null

    /**
    CSS class applied to odd rows.  This is assigned at instantiation.

    When used by DataTable instances, this will be `yui3-datatable-odd`.

    @property CLASS_ODD
    @type {String}
    @default 'yui3-table-odd'
    @since 3.5.0
    **/
    //CLASS_ODD: null

    /**
    HTML template used to create table rows.

    @property ROW_TEMPLATE
    @type {HTML}
    @default '<tr id="{rowId}" data-yui3-record="{clientId}" class="{rowClass}">{content}</tr>'
    @since 3.5.0
    **/
    ROW_TEMPLATE : '<tr id="{rowId}" data-yui3-record="{clientId}" class="{rowClass}">{content}</tr>',

    /**
    The object that serves as the source of truth for column and row data.
    This property is assigned at instantiation from the `host` property of
    the configuration object passed to the constructor.

    @property host
    @type {Object}
    @default (initially unset)
    @since 3.5.0
    **/
    //TODO: should this be protected?
    //host: null,

    /**
    HTML templates used to create the `<tbody>` containing the table rows.

    @property TBODY_TEMPLATE
    @type {HTML}
    @default '<tbody class="{className}">{content}</tbody>'
    @since 3.6.0
    **/
    TBODY_TEMPLATE: '<tbody class="{className}"></tbody>',

    // -- Public methods ------------------------------------------------------

    /**
    Returns the `<td>` Node from the given row and column index.  Alternately,
    the `seed` can be a Node.  If so, the nearest ancestor cell is returned.
    If the `seed` is a cell, it is returned.  If there is no cell at the given
    coordinates, `null` is returned.

    Optionally, include an offset array or string to return a cell near the
    cell identified by the `seed`.  The offset can be an array containing the
    number of rows to shift followed by the number of columns to shift, or one
    of "above", "below", "next", or "previous".

    <pre><code>// Previous cell in the previous row
    var cell = table.getCell(e.target, [-1, -1]);

    // Next cell
    var cell = table.getCell(e.target, 'next');
    var cell = table.getCell(e.taregt, [0, 1];</pre></code>

    @method getCell
    @param {Number[]|Node} seed Array of row and column indexes, or a Node that
        is either the cell itself or a descendant of one.
    @param {Number[]|String} [shift] Offset by which to identify the returned
        cell Node
    @return {Node}
    @since 3.5.0
    **/
    getCell: function (seed, shift) {
        var tbody = this.tbodyNode,
            row, cell, index, rowIndexOffset;

        if (seed && tbody) {
            if (isArray(seed)) {
                row = tbody.get('children').item(seed[0]);
                cell = row && row.get('children').item(seed[1]);
            } else if (Y.instanceOf(seed, Y.Node)) {
                cell = seed.ancestor('.' + this.getClassName('cell'), true);
            }

            if (cell && shift) {
                rowIndexOffset = tbody.get('firstChild.rowIndex');
                if (isString(shift)) {
                    // TODO this should be a static object map
                    switch (shift) {
                        case 'above'   : shift = [-1, 0]; break;
                        case 'below'   : shift = [1, 0]; break;
                        case 'next'    : shift = [0, 1]; break;
                        case 'previous': shift = [0, -1]; break;
                    }
                }

                if (isArray(shift)) {
                    index = cell.get('parentNode.rowIndex') +
                                shift[0] - rowIndexOffset;
                    row   = tbody.get('children').item(index);

                    index = cell.get('cellIndex') + shift[1];
                    cell  = row && row.get('children').item(index);
                }
            }
        }

        return cell || null;
    },

    /**
    Returns the generated CSS classname based on the input.  If the `host`
    attribute is configured, it will attempt to relay to its `getClassName`
    or use its static `NAME` property as a string base.

    If `host` is absent or has neither method nor `NAME`, a CSS classname
    will be generated using this class's `NAME`.

    @method getClassName
    @param {String} token* Any number of token strings to assemble the
        classname from.
    @return {String}
    @protected
    @since 3.5.0
    **/
    getClassName: function () {
        var host = this.host,
            args;

        if (host && host.getClassName) {
            return host.getClassName.apply(host, arguments);
        } else {
            args = toArray(arguments);
            args.unshift(this.constructor.NAME);
            return Y.ClassNameManager.getClassName
                .apply(Y.ClassNameManager, args);
        }
    },

    /**
    Returns the Model associated to the row Node or id provided. Passing the
    Node or id for a descendant of the row also works.

    If no Model can be found, `null` is returned.

    @method getRecord
    @param {String|Node} seed Row Node or `id`, or one for a descendant of a row
    @return {Model}
    @since 3.5.0
    **/
    getRecord: function (seed) {
        var modelList = this.get('modelList'),
            tbody     = this.tbodyNode,
            row       = null,
            record;

        if (tbody) {
            if (isString(seed)) {
                seed = tbody.one('#' + seed);
            }

            if (Y.instanceOf(seed, Y.Node)) {
                row = seed.ancestor(function (node) {
                    return node.get('parentNode').compareTo(tbody);
                }, true);

                record = row &&
                    modelList.getByClientId(row.getData('yui3-record'));
            }
        }

        return record || null;
    },

    /**
    Returns the `<tr>` Node from the given row index, Model, or Model's
    `clientId`.  If the rows haven't been rendered yet, or if the row can't be
    found by the input, `null` is returned.

    @method getRow
    @param {Number|String|Model} id Row index, Model instance, or clientId
    @return {Node}
    @since 3.5.0
    **/
    getRow: function (id) {
        var tbody = this.tbodyNode,
            row = null;

        if (tbody) {
            if (id) {
                id = this._idMap[id.get ? id.get('clientId') : id] || id;
            }

            row = isNumber(id) ?
                tbody.get('children').item(id) :
                tbody.one('#' + id);
        }

        return row;
    },

    /**
    Creates the table's `<tbody>` content by assembling markup generated by
    populating the `ROW\_TEMPLATE`, and `CELL\_TEMPLATE` templates with content
    from the `columns` and `modelList` attributes.

    The rendering process happens in three stages:

    1. A row template is assembled from the `columns` attribute (see
       `_createRowTemplate`)

    2. An HTML string is built up by concatening the application of the data in
       each Model in the `modelList` to the row template. For cells with
       `formatter`s, the function is called to generate cell content. Cells
       with `nodeFormatter`s are ignored. For all other cells, the data value
       from the Model attribute for the given column key is used.  The
       accumulated row markup is then inserted into the container.

    3. If any column is configured with a `nodeFormatter`, the `modelList` is
       iterated again to apply the `nodeFormatter`s.

    Supported properties of the column objects include:

      * `key` - Used to link a column to an attribute in a Model.
      * `name` - Used for columns that don't relate to an attribute in the Model
        (`formatter` or `nodeFormatter` only) if the implementer wants a
        predictable name to refer to in their CSS.
      * `cellTemplate` - Overrides the instance's `CELL_TEMPLATE` for cells in
        this column only.
      * `formatter` - Used to customize or override the content value from the
        Model.  These do not have access to the cell or row Nodes and should
        return string (HTML) content.
      * `nodeFormatter` - Used to provide content for a cell as well as perform
        any custom modifications on the cell or row Node that could not be
        performed by `formatter`s.  Should be used sparingly for better
        performance.
      * `emptyCellValue` - String (HTML) value to use if the Model data for a
        column, or the content generated by a `formatter`, is the empty string,
        `null`, or `undefined`.
      * `allowHTML` - Set to `true` if a column value, `formatter`, or
        `emptyCellValue` can contain HTML.  This defaults to `false` to protect
        against XSS.
      * `className` - Space delimited CSS classes to add to all `<td>`s in a
        column.

    Column `formatter`s are passed an object (`o`) with the following
    properties:

      * `value` - The current value of the column's associated attribute, if
        any.
      * `data` - An object map of Model keys to their current values.
      * `record` - The Model instance.
      * `column` - The column configuration object for the current column.
      * `className` - Initially empty string to allow `formatter`s to add CSS
        classes to the cell's `<td>`.
      * `rowIndex` - The zero-based row number.
      * `rowClass` - Initially empty string to allow `formatter`s to add CSS
        classes to the cell's containing row `<tr>`.

    They may return a value or update `o.value` to assign specific HTML
    content.  A returned value has higher precedence.

    Column `nodeFormatter`s are passed an object (`o`) with the following
    properties:

      * `value` - The current value of the column's associated attribute, if
        any.
      * `td` - The `<td>` Node instance.
      * `cell` - The `<div>` liner Node instance if present, otherwise, the
        `<td>`.  When adding content to the cell, prefer appending into this
        property.
      * `data` - An object map of Model keys to their current values.
      * `record` - The Model instance.
      * `column` - The column configuration object for the current column.
      * `rowIndex` - The zero-based row number.

    They are expected to inject content into the cell's Node directly, including
    any "empty" cell content.  Each `nodeFormatter` will have access through the
    Node API to all cells and rows in the `<tbody>`, but not to the `<table>`,
    as it will not be attached yet.

    If a `nodeFormatter` returns `false`, the `o.td` and `o.cell` Nodes will be
    `destroy()`ed to remove them from the Node cache and free up memory.  The
    DOM elements will remain as will any content added to them.  _It is highly
    advisable to always return `false` from your `nodeFormatter`s_.

    @method render
    @return {BodyView} The instance
    @chainable
    @since 3.5.0
    **/
    render: function () {
        var table   = this.get('container'),
            data    = this.get('modelList'),
            columns = this.get('columns'),
            tbody   = this.tbodyNode ||
                      (this.tbodyNode = this._createTBodyNode());

        // Needed for mutation
        this._createRowTemplate(columns);

        if (data) {
            tbody.setHTML(this._createDataHTML(columns));

            this._applyNodeFormatters(tbody, columns);
        }

        if (tbody.get('parentNode') !== table) {
            table.appendChild(tbody);
        }

        this._afterRenderCleanup();

        this.bindUI();

        return this;
    },

    // -- Protected and private methods ---------------------------------------
    /**
    Handles changes in the source's columns attribute.  Redraws the table data.

    @method _afterColumnsChange
    @param {EventFacade} e The `columnsChange` event object
    @protected
    @since 3.5.0
    **/
    // TODO: Preserve existing DOM
    // This will involve parsing and comparing the old and new column configs
    // and reacting to four types of changes:
    // 1. formatter, nodeFormatter, emptyCellValue changes
    // 2. column deletions
    // 3. column additions
    // 4. column moves (preserve cells)
    _afterColumnsChange: function () {
        this.render();
    },

    /**
    Handles modelList changes, including additions, deletions, and updates.

    Modifies the existing table DOM accordingly.

    @method _afterDataChange
    @param {EventFacade} e The `change` event from the ModelList
    @protected
    @since 3.5.0
    **/
    _afterDataChange: function () {
        //var type = e.type.slice(e.type.lastIndexOf(':') + 1);

        // TODO: Isolate changes
        this.render();
    },

    /**
    Handles replacement of the modelList.

    Rerenders the `<tbody>` contents.

    @method _afterModelListChange
    @param {EventFacade} e The `modelListChange` event
    @protected
    @since 3.6.0
    **/
    _afterModelListChange: function () {
        var handles = this._eventHandles;

        if (handles.dataChange) {
            handles.dataChange.detach();
            delete handles.dataChange;
            this.bindUI();
        }

        if (this.tbodyNode) {
            this.render();
        }
    },

    /**
    Iterates the `modelList`, and calls any `nodeFormatter`s found in the
    `columns` param on the appropriate cell Nodes in the `tbody`.

    @method _applyNodeFormatters
    @param {Node} tbody The `<tbody>` Node whose columns to update
    @param {Object[]} columns The column configurations
    @protected
    @since 3.5.0
    **/
    _applyNodeFormatters: function (tbody, columns) {
        var host = this.host,
            data = this.get('modelList'),
            formatters = [],
            linerQuery = '.' + this.getClassName('liner'),
            rows, i, len;

        // Only iterate the ModelList again if there are nodeFormatters
        for (i = 0, len = columns.length; i < len; ++i) {
            if (columns[i].nodeFormatter) {
                formatters.push(i);
            }
        }

        if (data && formatters.length) {
            rows = tbody.get('childNodes');

            data.each(function (record, index) {
                var formatterData = {
                        data      : record.toJSON(),
                        record    : record,
                        rowIndex  : index
                    },
                    row = rows.item(index),
                    i, len, col, key, cells, cell, keep;


                if (row) {
                    cells = row.get('childNodes');
                    for (i = 0, len = formatters.length; i < len; ++i) {
                        cell = cells.item(formatters[i]);

                        if (cell) {
                            col = formatterData.column = columns[formatters[i]];
                            key = col.key || col.id;

                            formatterData.value = record.get(key);
                            formatterData.td    = cell;
                            formatterData.cell  = cell.one(linerQuery) || cell;

                            keep = col.nodeFormatter.call(host,formatterData);

                            if (keep === false) {
                                // Remove from the Node cache to reduce
                                // memory footprint.  This also purges events,
                                // which you shouldn't be scoping to a cell
                                // anyway.  You've been warned.  Incidentally,
                                // you should always return false. Just sayin.
                                cell.destroy(true);
                            }
                        }
                    }
                }
            });
        }
    },

    /**
    Binds event subscriptions from the UI and the host (if assigned).

    @method bindUI
    @protected
    @since 3.5.0
    **/
    bindUI: function () {
        var handles     = this._eventHandles,
            modelList   = this.get('modelList'),
            changeEvent = modelList.model.NAME + ':change';

        if (!handles.columnsChange) {
            handles.columnsChange = this.after('columnsChange',
                bind('_afterColumnsChange', this));
        }

        if (modelList && !handles.dataChange) {
            handles.dataChange = modelList.after(
                ['add', 'remove', 'reset', changeEvent],
                bind('_afterDataChange', this));
        }
    },

    /**
    Iterates the `modelList` and applies each Model to the `_rowTemplate`,
    allowing any column `formatter` or `emptyCellValue` to override cell
    content for the appropriate column.  The aggregated HTML string is
    returned.

    @method _createDataHTML
    @param {Object[]} columns The column configurations to customize the
                generated cell content or class names
    @return {HTML} The markup for all Models in the `modelList`, each applied
                to the `_rowTemplate`
    @protected
    @since 3.5.0
    **/
    _createDataHTML: function (columns) {
        var data = this.get('modelList'),
            html = '';

        if (data) {
            data.each(function (model, index) {
                html += this._createRowHTML(model, index, columns);
            }, this);
        }

        return html;
    },

    /**
    Applies the data of a given Model, modified by any column formatters and
    supplemented by other template values to the instance's `_rowTemplate` (see
    `_createRowTemplate`).  The generated string is then returned.

    The data from Model's attributes is fetched by `toJSON` and this data
    object is appended with other properties to supply values to {placeholders}
    in the template.  For a template generated from a Model with 'foo' and 'bar'
    attributes, the data object would end up with the following properties
    before being used to populate the `_rowTemplate`:

      * `clientID` - From Model, used the assign the `<tr>`'s 'id' attribute.
      * `foo` - The value to populate the 'foo' column cell content.  This
        value will be the value stored in the Model's `foo` attribute, or the
        result of the column's `formatter` if assigned.  If the value is '',
        `null`, or `undefined`, and the column's `emptyCellValue` is assigned,
        that value will be used.
      * `bar` - Same for the 'bar' column cell content.
      * `foo-className` - String of CSS classes to apply to the `<td>`.
      * `bar-className` - Same.
      * `rowClass`      - String of CSS classes to apply to the `<tr>`. This
        will be the odd/even class per the specified index plus any additional
        classes assigned by column formatters (via `o.rowClass`).

    Because this object is available to formatters, any additional properties
    can be added to fill in custom {placeholders} in the `_rowTemplate`.

    @method _createRowHTML
    @param {Model} model The Model instance to apply to the row template
    @param {Number} index The index the row will be appearing
    @param {Object[]} columns The column configurations
    @return {HTML} The markup for the provided Model, less any `nodeFormatter`s
    @protected
    @since 3.5.0
    **/
    _createRowHTML: function (model, index, columns) {
        var data     = model.toJSON(),
            clientId = model.get('clientId'),
            values   = {
                rowId   : this._getRowId(clientId),
                clientId: clientId,
                rowClass: (index % 2) ? this.CLASS_ODD : this.CLASS_EVEN
            },
            host = this.host || this,
            i, len, col, token, value, formatterData;

        for (i = 0, len = columns.length; i < len; ++i) {
            col   = columns[i];
            value = data[col.key];
            token = col._id || col.key;

            values[token + '-className'] = '';

            if (col._formatterFn) {
                formatterData = {
                    value    : value,
                    data     : data,
                    column   : col,
                    record   : model,
                    className: '',
                    rowClass : '',
                    rowIndex : index
                };

                // Formatters can either return a value
                value = col._formatterFn.call(host, formatterData);

                // or update the value property of the data obj passed
                if (value === undefined) {
                    value = formatterData.value;
                }

                values[token + '-className'] = formatterData.className;
                values.rowClass += ' ' + formatterData.rowClass;
            }

            if (value === undefined || value === null || value === '') {
                value = col.emptyCellValue || '';
            }

            values[token] = col.allowHTML ? value : htmlEscape(value);

            values.rowClass = values.rowClass.replace(/\s+/g, ' ');
        }

        return fromTemplate(this._rowTemplate, values);
    },

    /**
    Creates a custom HTML template string for use in generating the markup for
    individual table rows with {placeholder}s to capture data from the Models
    in the `modelList` attribute or from column `formatter`s.

    Assigns the `_rowTemplate` property.

    @method _createRowTemplate
    @param {Object[]} columns Array of column configuration objects
    @protected
    @since 3.5.0
    **/
    _createRowTemplate: function (columns) {
        var html         = '',
            cellTemplate = this.CELL_TEMPLATE,
            F = Y.DataTable.BodyView.Formatters,
            i, len, col, key, token, headers, tokenValues, formatter;

        for (i = 0, len = columns.length; i < len; ++i) {
            col     = columns[i];
            key     = col.key;
            token   = col._id || key;
            formatter = col.formatter;
            // Only include headers if there are more than one
            headers = (col._headers || []).length > 1 ?
                        'headers="' + col._headers.join(' ') + '"' : '';

            tokenValues = {
                content  : '{' + token + '}',
                headers  : headers,
                className: this.getClassName('col', token) + ' ' +
                           (col.className || '') + ' ' +
                           this.getClassName('cell') +
                           ' {' + token + '-className}'
            };
            if (formatter) {
                if (Lang.isFunction(formatter)) {
                    col._formatterFn = formatter;
                } else if (formatter in F) {
                    col._formatterFn = F[formatter].call(this.host || this, col);
                } else {
                    tokenValues.content = formatter.replace(valueRegExp, tokenValues.content);
                }
            }

            if (col.nodeFormatter) {
                // Defer all node decoration to the formatter
                tokenValues.content = '';
            }

            html += fromTemplate(col.cellTemplate || cellTemplate, tokenValues);
        }

        this._rowTemplate = fromTemplate(this.ROW_TEMPLATE, {
            content: html
        });
    },
    /**
    Cleans up temporary values created during rendering.
    @method _afterRenderCleanup
    @private
    */
    _afterRenderCleanup: function () {
        var columns = this.get('columns'),
            i, len = columns.length;

        for (i = 0;i < len; i+=1) {
            delete columns[i]._formatterFn;
        }

    },

    /**
    Creates the `<tbody>` node that will store the data rows.

    @method _createTBodyNode
    @return {Node}
    @protected
    @since 3.6.0
    **/
    _createTBodyNode: function () {
        return Y.Node.create(fromTemplate(this.TBODY_TEMPLATE, {
            className: this.getClassName('data')
        }));
    },

    /**
    Destroys the instance.

    @method destructor
    @protected
    @since 3.5.0
    **/
    destructor: function () {
        (new Y.EventHandle(YObject.values(this._eventHandles))).detach();
    },

    /**
    Holds the event subscriptions needing to be detached when the instance is
    `destroy()`ed.

    @property _eventHandles
    @type {Object}
    @default undefined (initially unset)
    @protected
    @since 3.5.0
    **/
    //_eventHandles: null,

    /**
    Returns the row ID associated with a Model's clientId.

    @method _getRowId
    @param {String} clientId The Model clientId
    @return {String}
    @protected
    **/
    _getRowId: function (clientId) {
        return this._idMap[clientId] || (this._idMap[clientId] = Y.guid());
    },

    /**
    Map of Model clientIds to row ids.

    @property _idMap
    @type {Object}
    @protected
    **/
    //_idMap,

    /**
    Initializes the instance. Reads the following configuration properties in
    addition to the instance attributes:

      * `columns` - (REQUIRED) The initial column information
      * `host`    - The object to serve as source of truth for column info and
                    for generating class names

    @method initializer
    @param {Object} config Configuration data
    @protected
    @since 3.5.0
    **/
    initializer: function (config) {
        this.host = config.host;

        this._eventHandles = {
            modelListChange: this.after('modelListChange',
                bind('_afterModelListChange', this))
        };
        this._idMap = {};

        this.CLASS_ODD  = this.getClassName('odd');
        this.CLASS_EVEN = this.getClassName('even');

    }

    /**
    The HTML template used to create a full row of markup for a single Model in
    the `modelList` plus any customizations defined in the column
    configurations.

    @property _rowTemplate
    @type {HTML}
    @default (initially unset)
    @protected
    @since 3.5.0
    **/
    //_rowTemplate: null
},{
    /**
    Hash of formatting functions for cell contents.

    This property can be populated with a hash of formatting functions by the developer
    or a set of pre-defined functions can be loaded via the `datatable-formatters` module.

    See: [DataTable.BodyView.Formatters](./DataTable.BodyView.Formatters.html)
    @property Formatters
    @type Object
    @since 3.8.0
    @static
    **/
    Formatters: {}
});


}, '3.10.0pr1', {"requires": ["datatable-core", "view", "classnamemanager"]});
