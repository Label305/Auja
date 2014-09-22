
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Password = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'number';

    };

    // Inherit Panel
    Password.prototype = FormItem;

    // Fix constructor
    Password.prototype.constructor = Password;

    return Password;
});