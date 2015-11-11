
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Tinymce = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('tinymce');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                upload_path: this.getUploadPath()
            }
        };

    };

    // Inherit Panel
    Tinymce.prototype = FormItem;

    // Fix constructor
    Tinymce.prototype.constructor = Tinymce;

    return Tinymce;
});