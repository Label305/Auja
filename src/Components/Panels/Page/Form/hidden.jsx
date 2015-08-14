/**
 * A text field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

import React from 'react';

module.exports = React.createClass({
    getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.value = this.state.value;

        return React.DOM.input(attributes);
    }
});
