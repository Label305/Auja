define(['build/Objects/Abstract/form_item'], function (FormItem) {

    var File = function (data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('file');

        /**
         * Place to upload data to
         * @var string
         */
        this.target = data.target;

        /**
         * Get target for uploader
         * @returns string
         */
        this.getTarget = function () {
            return this.target;
        };

        /**
         * Set target for uploader
         * @param target
         */
        this.setTarget = function (target) {
            this.target = target;
        }

    };

    // Inherit Panel
    File.prototype = FormItem;

    // Fix constructor
    File.prototype.constructor = File;

    return File;
});