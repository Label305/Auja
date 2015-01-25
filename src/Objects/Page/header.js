
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
        this.text = data.text || '';

        /**
         * Buttons
         * @type {array}
         */
        this.buttons = data.buttons || [];

        /**
         * Setter for text
         * @param text
         */
        this.setText = function(text) {
            this.text = text;
        };

        /**
         * Getter for text
         * @returns {string}
         */
        this.getText = function() {
            return this.text;
        };

        /**
         * Setter for buttons
         * @param buttons
         */
        this.setButtons = function(buttons) {
            this.buttons = buttons;
        };

        /**
         * Getter for buttons
         * @returns {array}
         */
        this.getButtons = function() {
            return this.buttons;
        };

    };

    // Inherit Panel
    Header.prototype = PageItem;

    // Fix constructor
    Header.prototype.constructor = Header;
    
    return Header;
});