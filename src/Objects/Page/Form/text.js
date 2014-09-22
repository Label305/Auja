
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Text = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'text';
    };

    // Inherit FormItem
    Text.prototype = FormItem;

    // Fix constructor
    Text.prototype.constructor = Text;

    /**
     * Get attributes for this input
     * @return Object
     */
    Text.prototype.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };

    return Text;
});