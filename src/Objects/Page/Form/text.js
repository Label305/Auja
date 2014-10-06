
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Text = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('text');
        
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
    Text.prototype = FormItem;

    // Fix constructor
    Text.prototype.constructor = Text;
    
    return Text;
});