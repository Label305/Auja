
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Integer = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('integer');

        /**
         * Min and max of the integer
         * @type {Number|null}
         * @private
         */
        this._min = data.min || null;
        this._max = data.max || null;

        /**
         * Getters for min and max
         * @returns {Number|null}
         */
        this.getMin = function() {
            return this._min;
        };

        this.getMax = function() {
            return this._max;
        };

        /**
         * Setters for min and max
         * @param maxLength
         */
        this.setMin = function(min) {
            this._min = min;
        };

        this.setMax = function(max) {
            this._max = max;
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
                min: this.getMin(),
                max: this.getMax()
            }
        };
    };

    // Inherit Panel
    Integer.prototype = FormItem;

    // Fix constructor
    Integer.prototype.constructor = Integer;

    return Integer;
});