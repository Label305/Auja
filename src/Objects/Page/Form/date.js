
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Date = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('date');
       
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
    Date.prototype = FormItem;

    // Fix constructor
    Date.prototype.constructor = Date;

    return Date;
});