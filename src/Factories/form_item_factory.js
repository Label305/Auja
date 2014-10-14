/**
 * Menu item factory will create menu item objects based on input
 */
var FormItemObjects = {
    'header': 'build/Objects/Page/Form/header',
    'number': 'build/Objects/Page/Form/number',
    'password': 'build/Objects/Page/Form/password',
    'submit': 'build/Objects/Page/Form/submit',
    'text': 'build/Objects/Page/Form/text',
    'textarea': 'build/Objects/Page/Form/textarea',
    'url': 'build/Objects/Page/Form/url',
    'tel': 'build/Objects/Page/Form/tel',
    'checkbox': 'build/Objects/Page/Form/checkbox',
    'email': 'build/Objects/Page/Form/email',
    'select': 'build/Objects/Page/Form/select',
    'selectMultipleCheckbox': 'build/Objects/Page/Form/selectMultipleCheckbox',
    'date': 'build/Objects/Page/Form/date',
    'range': 'build/Objects/Page/Form/range',
    'trumbowyg': 'build/Objects/Page/Form/trumbowyg'
};

define([
    'build/Objects/Page/Form/header',
    'build/Objects/Page/Form/number',
    'build/Objects/Page/Form/password',
    'build/Objects/Page/Form/submit',
    'build/Objects/Page/Form/text',
    'build/Objects/Page/Form/textarea',
    'build/Objects/Page/Form/url',
    'build/Objects/Page/Form/tel',
    'build/Objects/Page/Form/checkbox',
    'build/Objects/Page/Form/email',
    'build/Objects/Page/Form/select',
    'build/Objects/Page/Form/selectMultipleCheckbox',
    'build/Objects/Page/Form/date',
    'build/Objects/Page/Form/range',
    'build/Objects/Page/Form/trumbowyg'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(FormItemObjects[data.type]) {
                var Item = require(FormItemObjects[data.type]);
                return new Item(data[data.type]);
            }
            
            console.error('Unknown item type passed to factory: ' + data.type);
            
            return false;
        }

    };

});