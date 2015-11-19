
define(['build/Objects/Page/Form/file_select'], function(FileSelect) {

    var Tinymce = function(data) {

        //Call the parent constructor
        FileSelect.call(this, data);

        /**
         * Uploader
         * @type {boolean}
         */
        this._hasUploader = data.hasUploader || false;

        /**
         * uploadTarget
         * @type {string}
         */
        this._uploadTarget = data.uploadTarget || null;

        //Set type of this object
        this.setType('tinymce');

        /**
         * Setter for hasUploader
         * @param hasUploader
         */
        this.setHasUploader = function(hasUploader) {
            this._hasUploader = hasUploader;
        };

        /**
         * Getter for hasUploader
         * @returns {boolean}
         */
        this.getHasUploader = function() {
            return this._hasUploader;
        };

        /**
         * Setter for uploadTarget
         * @param uploadTarget
         */
        this.setUploadTarget = function(uploadTarget) {
            this._uploadTarget= uploadTarget;
        };

        /**
         * Getter for uploadTarget
         * @returns {string}
         */
        this.getUploadTarget = function() {
            return this._uploadTarget;
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