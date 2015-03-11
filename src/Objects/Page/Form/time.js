
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Time = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('time');
        /**
         * The format the date
         * @type {string|null}
         * @private
         */
        this._format = data.format || 'HH:mm:ss';

        /**
         * Getter for format
         * @returns {string|null}
         */
        this.getFormat = function() {
            return this._format;
        };

        /**
         * Setter for format
         * @param format
         */
        this.setFormat = function(format) {
            this._format = format;
        };

        /**
         * Min and max of the time
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
                format: this.getFormat(),
                min: this.getMin(),
                max: this.getMax()
            }
        };
    };

    // Inherit Panel
    Time.prototype = FormItem;

    // Fix constructor
    Time.prototype.constructor = Time;

    return Time;
});