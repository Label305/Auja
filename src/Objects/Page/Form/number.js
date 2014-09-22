
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Number = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

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

    /**
     * Get attributes for this input
     * @return Object
     */
    Number.prototype.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };

    return Number;
});