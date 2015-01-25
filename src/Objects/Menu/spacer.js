
define(['build/Objects/Abstract/menu_item'], function(MenuItem) {

    var Spacer = function(data) {

        //Call the parent constructor
        MenuItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'spacer';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';
        
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
         * Update this item
         * @param item
         */
        this.update = function(item) {
            this.setText(item.getText());
        }
    };

    // Inherit Panel
    Spacer.prototype = MenuItem;

    // Fix constructor
    Spacer.prototype.constructor = Spacer;
    
    return Spacer;
});