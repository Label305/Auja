
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Checkbox = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('checkbox');

        /**
         * The checked state of checkbox
         * @type {boolean|null}
         * @private
         */
        this._checked = data.checked || null;

        /**
         * The fallback state of checkbox
         * @type {boolean|null}
         * @private
         */
        this._fallback = data.fallback != false;

        /**
         * Getter for checked
         * @returns {boolean|null}
         */
        this.isChecked = function() {
            return this._checked;
        };

        /**
         * Getter for fallback
         * @returns {boolean|null}
         */
        this.hasFallback = function() {
            return this._fallback;
        };

        /**
         * Setter for checked
         * @param checked
         */
        this.setIsChecked = function(checked) {
            this._checked = checked;
        };

        /**
         * Setter for fallback
         * @param fallback
         */
        this.setHasFallback = function(fallback) {
            this._fallback = fallback;
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
                checked: this.isChecked(),
                fallback: this.hasFallback()
            }
        };
    };

    // Inherit FormItem
    Checkbox.prototype = FormItem;

    // Fix constructor
    Checkbox.prototype.constructor = Checkbox;
    
    return Checkbox;
});