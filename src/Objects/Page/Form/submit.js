
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Submit = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'submit';

    };

    // Inherit Panel
    Submit.prototype = FormItem;

    // Fix constructor
    Submit.prototype.constructor = Submit;

    return Submit;
});