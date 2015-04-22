
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Trumbowyg = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('trumbowyg');

        /**
         * Buttons for the editor
         * @type {string[]}
         */
        this.buttons = data.buttons || ['header', 'bold', 'italic', '|', 'unorderedList', 'orderedList', '|', 'insertImage', 'link', '|', 'viewHTML', 'fullscreen'];

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

        /**
         * Setter of buttons
         * @param buttons
         */
        this.setButtons = function(buttons) {
            this.buttons = buttons;
        };

        /**
         * Getter for buttons
         */
        this.getButtons = function() {
            return this.buttons;
        };

    };

    // Inherit Panel
    Trumbowyg.prototype = FormItem;

    // Fix constructor
    Trumbowyg.prototype.constructor = Trumbowyg;

    return Trumbowyg;
});