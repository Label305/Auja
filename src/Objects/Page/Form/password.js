import FormItem from '../../Abstract/form_item.js';

var Password = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('password');

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
Password.prototype = FormItem;

// Fix constructor
Password.prototype.constructor = Password;

module.exports = Password;
