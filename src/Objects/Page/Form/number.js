
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Number = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'number';

    };

    // Inherit Panel
    Number.prototype = FormItem;

    // Fix constructor
    Number.prototype.constructor = Number;

    return Number;
});