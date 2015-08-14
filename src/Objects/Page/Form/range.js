import FormItem from '../../Abstract/form_item.js';

var Range = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('range');

    /**
     * Min and max of the range
     * @type {Number|null}
     * @private
     */
    this._min = data.min || null;
    this._max = data.max || null;

    /**
     * Getters for min and max
     * @returns {Number|null}
     */
    this.getMin = function () {
        return this._min;
    };

    this.getMax = function () {
        return this._max;
    };

    /**
     * Setters for min and max
     * @param maxLength
     */
    this.setMin = function (min) {
        this._min = min;
    };

    this.setMax = function (max) {
        this._max = max;
    };
    /**
     * Get attributes for this input
     * @return Object
     */
    this.getAttributes = function () {
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
Range.prototype = FormItem;

// Fix constructor
Range.prototype.constructor = Range;

module.exports = Range;
