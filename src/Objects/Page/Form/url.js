
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Url = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('url');

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
    Url.prototype = FormItem;

    // Fix constructor
    Url.prototype.constructor = Url;

    return Url;
});