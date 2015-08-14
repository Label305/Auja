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
import Checkbox from './checkbox.jsx';

module.exports = React.createClass({
    render: function () {
        var options = this.props.item.getOptions().map(function (option) {
            option._fallback = false;
            return (<Checkbox item={option}/>);
        }.bind(this));

        return (
            <div>
                <Label item={this.props.item} name={this.props.item.getLabel()}/>
                {options}
            </div>
        );
    }
});
