/**
 * Menu item factory will create menu item objects based on input
 */
var FormItemObjects = {
    'header': '../Objects/Page/Form/header',
    'number': '../Objects/Page/Form/number',
    'integer': '../Objects/Page/Form/integer',
    'password': '../Objects/Page/Form/password',
    'submit': '../Objects/Page/Form/submit',
    'text': '../Objects/Page/Form/text',
    'textarea': '../Objects/Page/Form/textarea',
    'url': '../Objects/Page/Form/url',
    'tel': '../Objects/Page/Form/tel',
    'color': '../Objects/Page/Form/color',
    'time': '../Objects/Page/Form/time',
    'checkbox': '../Objects/Page/Form/checkbox',
    'email': '../Objects/Page/Form/email',
    'selectMultiple': '../Objects/Page/Form/select_multiple',
    'select': '../Objects/Page/Form/select',
    'selectMultipleCheckbox': '../Objects/Page/Form/select_multiple_checkbox',
    'date': '../Objects/Page/Form/date',
    'datetime': '../Objects/Page/Form/datetime',
    'range': '../Objects/Page/Form/range',
    'trumbowyg': '../Objects/Page/Form/trumbowyg',
    'tinymce': '../Objects/Page/Form/tinymce',
    'file_select': '../Objects/Page/Form/file_select',
    'hidden': '../Objects/Page/Form/hidden'
};

module.exports = new function () {

    /**
     * Create the panel, will do this based on the type passed in the data
     */
    this.createItem = function (data) {
        if (FormItemObjects[data.type]) {
            var Item = require(FormItemObjects[data.type]);
            return new Item(data[data.type]);
        }

        console.error('Unknown item type passed to factory: ' + data.type);

        return false;
    }

};

