
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Textarea = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'textarea';

    };

    // Inherit Panel
    Textarea.prototype = FormItem;

    // Fix constructor
    Textarea.prototype.constructor = Textarea;

    return Textarea;
});