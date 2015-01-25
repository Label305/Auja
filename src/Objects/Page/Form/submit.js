
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Submit = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('submit');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };


    };

    // Inherit Panel
    Submit.prototype = FormItem;

    // Fix constructor
    Submit.prototype.constructor = Submit;
    
    return Submit;
});