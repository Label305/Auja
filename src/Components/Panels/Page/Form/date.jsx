/**
 * A date field, properties:
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
import Pikaday from '../../../../../bower_components/pikaday/pikaday.js';

module.exports = React.createClass({

    componentDidMount: function () {
        new Pikaday({
            field: this.refs.date.getDOMNode(),
            firstDay: 1,
            bound: true,
            format: this.props.format ? this.props.format : this.props.item.getFormat(),//Allow override from parent
            defaultDate: new Date(this.props.item.getValue()),
            container: this.refs.calender.getDOMNode(),
            showWeekNumber: true,
            onSelect: function (date) {
                this.handleChange(date);
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {value: this.props.item.getValue()};
    },
    handleChange: function (date) {
        var date = moment(date).format(this.props.item.getFormat());

        //If parent element want us to broadcast our changes to it we'll oblige
        if (this.props.onChange) {
            this.props.onChange(date);
        }

        this.setState({value: date});
    },
    render: function () {
        var attributes = this.props.item.getAttributes();
        attributes.value = moment(this.state.value).format(this.props.item.getFormat());
        attributes.onChange = this.handleChange;
        attributes.ref = 'date';
        attributes.readOnly = true;
        //Insure label is ommited when the item is part of another component.
        var label = attributes.type == 'date' ? <Label item={this.props.item} name={this.props.item.getLabel()}/> : '';

        return (
            <div>
                {label}
                {React.DOM.input(attributes)}
                <div className="pika-container" ref='calender'></div>
            </div>
        );
    }
});
