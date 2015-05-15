
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Wysihtml = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('wysihtml');

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
    Wysihtml.prototype = FormItem;

    // Fix constructor
    Wysihtml.prototype.constructor = Wysihtml;

    return Wysihtml;
});