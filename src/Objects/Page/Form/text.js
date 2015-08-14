import FormItem from '../../Abstract/form_item.js';

var Text = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('text');

    /**
     * Max length of the text
     * @type {Number|null}
     * @private
     */
    this._maxLength = data.maxLength || null;

    /**
     * Getter for maxLength
     * @returns {Number|null}
     */
    this.getMaxLength = function () {
        return this._maxLength;
    };

    /**
     * Setter for maxLength
     * @param maxLength
     */
    this.setMaxLength = function (maxLength) {
        this._maxLength = maxLength;
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
            maxLength: this.getMaxLength()
        }
    };
};

// Inherit FormItem
Text.prototype = FormItem;

// Fix constructor
Text.prototype.constructor = Text;

module.exports = Text;
