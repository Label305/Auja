/**
 * A time field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */

import React from 'react';
import Label from './label.jsx';
import moment from 'moment';
import clockpicker   from '../../../../../bower_components/clockpicker/dist/jquery-clockpicker.js';

module.exports = React.createClass({
    componentDidMount: function () {
        $(this.refs.time.getDOMNode()).clockpicker({
            autoclose: true
        });
    },
    getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    handleChange: function (event) {
        var time = moment(event.target.value, this.props.item.getFormat()).format(this.props.item.getFormat());

        //If parent element want us to broadcast our changes to it we'll oblige
        if (this.props.onChange) {
            this.props.onChange(time);
        }

        this.setState({value: time});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.value = moment(this.state.value, this.props.item.getFormat()).format(this.props.item.getFormat());

        //onBlur needed to detect time change through clockpicker
        attributes.onBlur = this.handleChange;

        //Fallback if clockpicker somehow doesn't work
        attributes.onChange = this.handleChange;

        attributes.ref = 'time';
        attributes.readOnly = true;

        //Insure label is ommited when the item is part of another component.
        var label = attributes.type == 'time' ? <Label item={this.props.item} name={this.props.item.getLabel()}/> : '';

        return (
            <div>
                {label}
                {React.DOM.input(attributes)}
            </div>
        );
    }
});
