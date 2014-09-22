
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Trumbowyg = function(data) {

        //Call the parent constructor
        FormItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'trumbowyg';

    };

    // Inherit Panel
    Trumbowyg.prototype = FormItem;

    // Fix constructor
    Trumbowyg.prototype.constructor = Trumbowyg;

    return Trumbowyg;
});