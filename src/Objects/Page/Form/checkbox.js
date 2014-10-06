
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Checkbox = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('checkbox');

            /**
     * Set default value
     * If none is found set to false
     */

     this.checked = data.checked || false;

     isChecked = function(){
        this.checked
        };
    };

        /**
     * Get attributes for this input
     * @return Object
     */
     this.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName(),
            checked: this.isChecked()
        }
    };

    // Inherit FormItem
    Checkbox.prototype = FormItem;

    // Fix constructor
    Checkbox.prototype.constructor = Checkbox;
    


    return Checkbox;
});