
define(['build/Objects/Abstract/item'], function(Item) {

    var Spacer = function(data) {

        //Call the parent constructor
        Item.call(this, arguments);

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
    Spacer.prototype = Item;

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