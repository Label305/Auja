import FormItem from '../../Abstract/form_item.js';

var DateTime = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('datetime');

    /**
     * The format the datetime
     * @type {string|null}
     * @private
     */
    this._format = data.format || null;

    /**
     * Getter for format
     * @returns {string|null}
     */
    this.getFormat = function () {
        return this._format;
    };


    /**
     * Setter for format
     * @param format
     */
    this.setFormat = function (format) {
        this._format = format;
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
            format: this.getFormat(),

        }
    };
};

// Inherit Panel
DateTime.prototype = FormItem;

// Fix constructor
DateTime.prototype.constructor = DateTime;

module.exports = DateTime;
