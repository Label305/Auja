
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Submit = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

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

    /**
     * Get attributes for this input
     * @return Object
     */
    Submit.prototype.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };

    return Submit;
});