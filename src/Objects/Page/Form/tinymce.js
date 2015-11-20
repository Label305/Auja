
define(['build/Objects/Page/Form/file_select'], function(FileSelect) {

    var Tinymce = function(data) {

        //Call the parent constructor
        FileSelect.call(this, data);

        /**
         * Uploader
         * @type {boolean}
         */
        this._uploader = data.uploader || false;

        /**
         * target
         * @type {string}
         */
        this._target = data.target || null;

        //Set type of this object
        this.setType('tinymce');

        /**
         * Setter for uploader
         * @param uploader
         */
        this.setUploader = function(uploader) {
            this._uploader = uploader;
        };

        /**
         * Getter for uploader
         * @returns {boolean}
         */
        this.hasUploader = function() {
            return this._uploader;
        };

        /**
         * Get target for uploader
         * @returns string
         */
        this.getTarget = function () {
            return this._target;
        };

        /**
         * Set target for uploader
         * @param target
         */
        this.setTarget = function (target) {
            this._target = target;
        };

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };

    };

    // Inherit Panel
    Tinymce.prototype = FileSelect;

    // Fix constructor
    Tinymce.prototype.constructor = Tinymce;

    return Tinymce;
});