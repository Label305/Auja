import FormItem from '../../Abstract/form_item.js';

var Hidden = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('hidden');

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

// Inherit FormItem
Hidden.prototype = FormItem;

// Fix constructor
Hidden.prototype.constructor = Hidden;

module.exports = Hidden;
