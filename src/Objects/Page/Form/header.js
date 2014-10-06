
define(['build/Objects/Abstract/form_item'], function(FormItem) {
    
    var Header = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('header');

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
    
    // Inherit item
    Header.prototype = FormItem;

    // Fix constructor
    Header.prototype.constructor = Header;
    
    return Header;
});