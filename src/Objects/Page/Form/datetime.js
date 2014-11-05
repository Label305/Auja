
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Datetime = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('datetime');
       
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
    Datetime.prototype = FormItem;

    // Fix constructor
    Datetime.prototype.constructor = Datetime;

    return Datetime;
});