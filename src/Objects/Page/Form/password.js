
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Password = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('password');
        
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

    // Inherit FormItem
    Password.prototype = FormItem;

    // Fix constructor
    Password.prototype.constructor = Password;
    
    return Password;
});