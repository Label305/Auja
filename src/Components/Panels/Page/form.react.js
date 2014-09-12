/**
 * A form, attributes of the form are passed directly
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var FormItems = {
    'header': 'build/Components/Panels/Page/header.react',
    'text': 'build/Components/Panels/Page/Form/text.react',
    'password': 'build/Components/Panels/Page/Form/password.react',
    'textarea': 'build/Components/Panels/Page/Form/textarea.react',
    'trumbowyg': 'build/Components/Panels/Page/Form/trumbowyg.react',
    'number': 'build/Components/Panels/Page/Form/number.react',
    'email': 'build/Components/Panels/Page/Form/email.react',
    'submit': 'build/Components/Panels/Page/Form/submit.react'
};

define([
    'build/Components/Panels/Page/header.react',
    'build/Components/Panels/Page/Form/text.react',
    'build/Components/Panels/Page/Form/password.react',
    'build/Components/Panels/Page/Form/textarea.react',
    'build/Components/Panels/Page/Form/trumbowyg.react',
    'build/Components/Panels/Page/Form/number.react',
    'build/Components/Panels/Page/Form/email.react',
    'build/Components/Panels/Page/Form/submit.react'
], function() {
    return React.createClass({

        /**
         * Handles form submission
         */
        handleSubmit: function (e) {
            flux.actions.submit(
                this.props.item.form.action,
                event.target.getAttribute('method'),
                $(event.target).serializeArray(),
                this.props.panel
            );
            return false;
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
                    type: item.type,
                    index: i
                });

                if (!this.formItemIds[name]) {
                    available = true;
                }
            }

            return id;
        },

        render: function () {

            var items = this.props.item.form.items.map(function (item) {
                if (!FormItems[item.type]) {
                    console.error("Unsupported form item type requested: " + item.type);
                    return;
                }

                //Fetch the item from the corresponding file
                var Item = require(FormItems[item.type]);

                //Extract the validation message from the item
                item.validationMessage = null;
                if(item[item.type].name && this.props.message.validation && this.props.message.validation[item[item.type].name]) {
                    item.validationMessage = this.props.message.validation[item[item.type].name];
                }

                var className = 'row form-item form-item-{type}'.assign({type: item.type});
                return (
                    <div className={className}>
                        <Item itemId={this.getFormItemId(item)} item={item} />
                    </div>
                    );
            }.bind(this));

            //Remove the items key as part of the form attributes
            var form = Object.clone(this.props.item.form);
            delete form.items;

            //Bind the main submit action
            form.onSubmit = this.handleSubmit;

            return React.DOM.form(form, items);
        }
    });

});