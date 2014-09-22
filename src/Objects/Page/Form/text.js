
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Text = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'text';

    };

    // Inherit Panel
    Text.prototype = FormItem;

    // Fix constructor
    Text.prototype.constructor = Text;

    return Text;
});