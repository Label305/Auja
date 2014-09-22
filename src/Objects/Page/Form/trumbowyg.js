
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Trumbowyg = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'trumbowyg';

        /**
         * Buttons for the editor
         * @type {string[]}
         */
        this.buttons = ['header', 'bold', 'italic', '|', 'unorderedList', 'orderedList', '|', 'insertImage', 'link', '|', 'viewHTML', 'fullscreen'];

    };

    // Inherit Panel
    Trumbowyg.prototype = FormItem;

    // Fix constructor
    Trumbowyg.prototype.constructor = Trumbowyg;

    /**
     * Get attributes for this input
     * @return Object
     */
    Trumbowyg.prototype.getAttributes = function() {
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
    Trumbowyg.prototype.setButtons = function(buttons) {
        this.buttons = buttons;
    };

    /**
     * Getter for buttons
     */
    Trumbowyg.prototype.getButtons = function() {
        return this.buttons;
    };

    return Trumbowyg;
});