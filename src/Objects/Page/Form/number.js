import FormItem from '../../Abstract/form_item.js';

var Number = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('number');

    /**
     * Get attributes for this input
     * @return Object
     */
    this.getAttributes = function () {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };
};

// Inherit Panel
Number.prototype = FormItem;

// Fix constructor
Number.prototype.constructor = Number;

module.exports = Number;
