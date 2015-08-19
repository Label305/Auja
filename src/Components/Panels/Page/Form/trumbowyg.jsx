/**
 * A trumbowyg RTE, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

import React from 'react';
import Label from './label.jsx';
require('script!jquery');
require('script!../../../../../bower_components/trumbowyg/dist/trumbowyg.js');

module.exports = React.createClass({
    componentDidMount: function () {
        var btnsGrps = {
            design: this.props.item.getButtons()
        };

        $(this.refs.textarea.getDOMNode()).trumbowyg({
            btns: this.props.item.getButtons(),
            btnsGrps: btnsGrps
        });
    },
    render: function () {
        var attributes = this.props.item.getAttributes();

        Object.merge(attributes, {
            id: this.props.itemId,
            type: 'textarea',
            ref: 'textarea'
        });

        return (
            <div>
                <Label item={this.props.item} name={this.props.item.getLabel()}/>
                {React.DOM.textarea(attributes, this.props.item.getValue())}
            </div>
        );
    }
});

