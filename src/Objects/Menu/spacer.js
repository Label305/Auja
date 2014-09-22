
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

    };

    // Inherit Panel
    Spacer.prototype = MenuItem;

    // Fix constructor
    Spacer.prototype.constructor = Spacer;

    /**
     * Setter for text
     * @param text
     */
    Spacer.prototype.setText = function(text) {
        this.text = text;
    };

    /**
     * Getter for text
     * @returns {string}
     */
    Spacer.prototype.getText = function() {
        return this.text;
    };

    return Spacer;
});