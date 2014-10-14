
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var SelectMultipleCheckbox = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('selectMultipleCheckbox');

        /**
         * The Options of SelectMultipleCheckbox
         * @type {array|null}
         * @private
         */
        this._options = data.options || null;

        

        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

        

        /**
         * Setter for Options
         * @param SelectMultipleCheckbox
         */
        this.setOptions = function(options) {
            this._options = options;
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
                options: this.getOptions()
            }
        };
    };

    // Inherit FormItem
    SelectMultipleCheckbox.prototype = FormItem;

    // Fix constructor
    SelectMultipleCheckbox.prototype.constructor = SelectMultipleCheckbox;
    
    return SelectMultipleCheckbox;
});