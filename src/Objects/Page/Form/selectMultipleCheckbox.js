
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
         * The checked state of checkbox option
         * @type {boolean|null}
         * @private
         */
        this._checked = data.options.checked || null;        

        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

        /**
         * Getter for checked
         * @returns {boolean|null}
         */
        this.isChecked = function() {
            return this._checked;
        };

        

        /**
         * Setter for Options
         * @param SelectMultipleCheckbox
         */
        this.setOptions = function(options) {
            this._options = options;
        };

        /**
         * Setter for checked
         * @param checked
         */
        this.setIsChecked = function(checked) {
            this._checked = checked;
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
                options: this.getOptions(),
                checked: this.isChecked()
            }
        };
    };

    // Inherit FormItem
    SelectMultipleCheckbox.prototype = FormItem;

    // Fix constructor
    SelectMultipleCheckbox.prototype.constructor = SelectMultipleCheckbox;
    
    return SelectMultipleCheckbox;
});