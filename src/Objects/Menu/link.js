
define(['build/Objects/menu/item'], function(Item) {

    var Link = function(data) {

        //Call the parent constructor
        Item.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'link';

        /**
         * Target of this link
         * @type {string|boolean}
         */
        this.target = data.target || false;

        /**
         * Icon
         * @type {string}
         */
        this.icon = data.icon || 'planet';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';

    };

    // Inherit Panel
    Link.prototype = Item;

    // Fix constructor
    Link.prototype.constructor = Link;

    /**
     * Setter for icon
     * @param icon
     */
    Link.prototype.setIcon = function(icon) {
        this.icon = icon;
    };

    /**
     * Getter for icon
     * @returns {string}
     */
    Link.prototype.getIcon = function() {
        return this.icon;
    };

    /**
     * Setter for target
     * @param target
     */
    Link.prototype.setTarget = function(target) {
        this.target = target;
    };

    /**
     * Getter for target
     * @returns {string|boolean}
     */
    Link.prototype.getTarget = function() {
        return this.target;
    };

    /**
     * Setter for text
     * @param text
     */
    Link.prototype.setText = function(text) {
        this.text = text;
    };

    /**
     * Getter for text
     * @returns {string}
     */
    Link.prototype.getText = function() {
        return this.text;
    };
    
    return Link;
});