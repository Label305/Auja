
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Textarea = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

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

    /**
     * Get attributes for this input
     * @return Object
     */
    Textarea.prototype.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };

    return Textarea;
});