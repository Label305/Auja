
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Textarea = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('textarea');

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
    Textarea.prototype = FormItem;

    // Fix constructor
    Textarea.prototype.constructor = Textarea;
    return Textarea;
});