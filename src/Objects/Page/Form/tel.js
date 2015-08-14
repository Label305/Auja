import FormItem from '../../Abstract/form_item.js';

var Tel = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('tel');

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
Tel.prototype = FormItem;

// Fix constructor
Tel.prototype.constructor = Tel;

module.exports = Tel;
