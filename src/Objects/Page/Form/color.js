
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Color = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('color');

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
    Color.prototype = FormItem;

    // Fix constructor
    Color.prototype.constructor = Color;

    return Color;
});