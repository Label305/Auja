
define(['build/Objects/Abstract/page_item'], function(PageItem) {

    var Header = function(data) {

        //Call the parent constructor
        PageItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'header';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';

        /**
         * Buttons
         * @type {array}
         */
        this.buttons = data.buttons || [];

    };

    // Inherit Panel
    Header.prototype = PageItem;

    // Fix constructor
    Header.prototype.constructor = Header;

    /**
     * Setter for text
     * @param text
     */
    Header.prototype.setText = function(text) {
        this.text = text;
    };

    /**
     * Getter for text
     * @returns {string}
     */
    Header.prototype.getText = function() {
        return this.text;
    };

    /**
     * Setter for buttons
     * @param buttons
     */
    Header.prototype.setButtons = function(buttons) {
        this.buttons = buttons;
    };

    /**
     * Getter for buttons
     * @returns {array}
     */
    Header.prototype.getButtons = function() {
        return this.buttons;
    };
    
    return Header;
});