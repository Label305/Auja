/**
 * A checkbox field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */

import React from 'react';
import Label from './label.jsx';

module.exports = React.createClass({
    getInitialState: function () {
        return {checked: this.props.item.isChecked()}
    },
    handleChange: function (event) {
        this.setState({checked: event.target.checked});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.checked = this.state.checked;
        attributes.onChange = this.handleChange;

        //Add a fallback to make sure something (although empty) is sent to the server
        var fallback = '';
        if (this.props.item.hasFallback()) {
            fallback = <input type="hidden" name={this.props.item.getName()} value="0"/>;
        }

        return (
            <div>
                <Label item={this.props.item} name={this.props.item.getLabel()}/>
                {fallback}
                {React.DOM.input(attributes)}
            </div>
        );
    }
});
