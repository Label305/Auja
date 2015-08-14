import FormItem from '../../Abstract/form_item.js';

var Tinymce = function (data) {

    //Call the parent constructor
    FormItem.call(this, data);

    //Set type of this object
    this.setType('tinymce');

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
Tinymce.prototype = FormItem;

// Fix constructor
Tinymce.prototype.constructor = Tinymce;

module.exports = Tinymce;
