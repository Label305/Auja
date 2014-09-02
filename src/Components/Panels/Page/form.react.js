/**
 * A form, attributes of the form are passed directly 
 * 
 * @jsx React.DOM
 */

//Listing of all supported page items
var FormItems = {
    'text': 'build/Components/Panels/Page/Form/text.react.js',
    'password': 'build/Components/Panels/Page/Form/password.react.js',
    'submit': 'build/Components/Panels/Page/Form/submit.react.js'
};

define($.map(FormItems, function(value) { return value; }), function() {
    return React.createClass({

        /**
         * Handles form submission
         */
        handleSubmit: function() {
            alert('Bam!');  
        },
        
        /**
         * Generate an ID for an item
         * @param name
         */
        getFormItemId: function(item) {
            if(!this.formItemIds) {
                this.formItemIds = [];   
            }
            
            var i = 1;
            var available = false;
            while(!available) {                
                var id = 'input.{panel}.{type}.{index}'.assign({
                    panel: this.props.panel._index, 
                    type: item.type, 
                    index: i
                });
                
                if(!this.formItemIds[name]) {
                    available = true;
                }
            }
            
            return id;
        },
        
        render: function() {
            
            var items = this.props.item.form.items.map(function(item) {
                if(!FormItems[item.type]) {
                    console.error("Unsupported form item type requested: " + item.type);
                    return;
                }
                var Item = require(FormItems[item.type]);
                
                var className = 'row form-item form-item-{type}'.assign({type: item.type});                 
                return (
                    <div className={className}>
                        <Item itemId={this.getFormItemId(item)} item={item} />
                    </div>
                    );
            }.bind(this));
            
            //Remove the items key as part of the form attributes
            delete this.props.item.form.items;
            
            //Bind the main submit action
            this.props.item.form.onSubmit = this.handleSubmit;
            
            return React.DOM.form(this.props.item.form, items);
        }
    });

});