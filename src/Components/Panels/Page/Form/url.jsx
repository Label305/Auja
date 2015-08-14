/**
 * A url field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

import React from 'react';
import Label from './label.jsx';

modules.export = React.createClass({
    getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.value = this.state.value;
        attributes.onChange = this.handleChange;

        return (
            <div>
                <Label item={this.props.item} name={this.props.item.getLabel()}/>
                {React.DOM.input(attributes)}
            </div>
        );
    }
});
