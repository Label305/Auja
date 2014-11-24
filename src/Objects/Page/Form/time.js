
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Time = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('time');

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
    Time.prototype = FormItem;

    // Fix constructor
    Time.prototype.constructor = Time;

    return Time;
});