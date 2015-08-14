/**
 * A select field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */

import React from 'react';
import Label from './label.jsx';

modules.export = React.createClass({
    getInitialState: function () {
        return {
            options: this.props.item.getOptions(),
            value: this.props.item.getValue()
        }
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();

        var options = this.props.item.getOptions().map(function (option) {
            return (React.DOM.option(option, option.label)
            );
        }.bind(this));

        attributes.value = this.state.value;
        attributes.onChange = this.handleChange;

        return (
            <div>
                <Label item={this.props.item} name={this.props.item.getLabel()}/>
                {React.DOM.select(attributes,
                    options
                )}
            </div>
        );
    }
});
