/**
 * A form, attributes of the form are passed directly
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var FormItems = {
    'header': './header.react',
    'text': './Form/text.react',
    'password': './Form/password.react',
    'textarea': './Form/textarea.react',
    'trumbowyg': './Form/trumbowyg.react',
    'tinymce': './Form/tinymce.react',
    'number': './Form/number.react',
    'file_select': './Form/file_select.react',
    'integer': './Form/integer.react',
    'url': './Form/url.react',
    'tel': './Form/tel.react',
    'color': './Form/color.react',
    'time': './Form/time.react',
    'checkbox': './Form/checkbox.react',
    'email': './Form/email.react',
    'selectMultiple': './Form/select_multiple.react',
    'select': './Form/select.react',
    'selectMultipleCheckbox': './Form/select_multiple_checkbox.react',
    'date': './Form/date.react',
    'datetime': './Form/datetime.react',
    'range': './Form/range.react',
    'submit': './Form/submit.react',
    'hidden': './Form/hidden.react'
};

import React from 'react';

module.exports = React.createClass({

    /**
     * Focus first element after form load
     */
    componentDidMount: function () {
        $(this.refs.form.getDOMNode()).find('input:visible:first').focus();
    },

    /**
     * Handles form submission
     */
    handleSubmit: function (event) {
        event.preventDefault();
        flux.actions.submit(
            this.props.item.getAction(),
            event.target.getAttribute('method'),
            $(event.target).serializeArray(),
            this.props.panel
        );
    },

    /**
     * Generate an ID for an item
     * @param item
     */
    getFormItemId: function (item) {
        if (!this.formItemIds) {
            this.formItemIds = [];
        }

        var i = 1;
        var available = false;
        while (!available) {
            var id = 'input.{panel}.{type}.{index}'.assign({
                panel: this.props.panel.id,
                type: item.getType(),
                index: i
            });

            if (!this.formItemIds[name]) {
                available = true;
            }
        }

        return id;
    },

    render: function () {

        var items = this.props.item.getItems().map(function (item) {

            if (!FormItems[item.getType()]) {
                console.error("Unsupported form item type requested: " + item.getType());
                return;
            }

            //Fetch the item from the corresponding file
            var Item = require(FormItems[item.getType()]);

            //Extract the validation message from the item
            item.validationMessage = null;
            if (item.getName() && this.props.message && this.props.message.validation && this.props.message.validation[item.getName()]) {
                item.validationMessage = this.props.message.validation[item.getName()];
            }

            var className = 'row form-item form-item-{type}'.assign({type: item.getType()});
            return (
                <div className={className}>
                    <Item itemId={this.getFormItemId(item)} item={item}/>
                </div>
            );
        }.bind(this));

        return (
            <form ref="form" onSubmit={this.handleSubmit} action={this.props.item.getAction()}
                  method={this.props.item.getMethod()}>{items}</form>
        );
    }
});

