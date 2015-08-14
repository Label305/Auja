import MenuItem from '../Abstract/menu_item.js';

var Link = function (data) {

    //Call the parent constructor
    MenuItem.call(this, arguments);

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
     * If false the dispatching of this link will happen internally within Auja
     * Otherwise will be dispatched to the browser directly
     * @type {boolean}
     */
    this.external = data.external || false;

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

    /**
     * Getter for the id
     * @returns string
     * @override
     */
    this.getId = function () {
        return this.target;
    };

    /**
     * Setter for icon
     * @param icon
     */
    this.setIcon = function (icon) {
        this.icon = icon;
    };

    /**
     * Getter for icon
     * @returns {string}
     */
    this.getIcon = function () {
        return this.icon;
    };

    /**
     * Getter for external
     * @returns {boolean}
     */
    this.isExternal = function () {
        return this.external;
    };

    /**
     * Setter for external
     * @param external
     */
    this.setIsExternal = function (external) {
        this.external = external;
    };

    /**
     * Setter for target
     * @param target
     */
    this.setTarget = function (target) {
        this.target = target;
    };

    /**
     * Getter for target
     * @returns {string|boolean}
     */
    this.getTarget = function () {
        return this.target;
    };

    /**
     * Setter for text
     * @param text
     */
    this.setText = function (text) {
        this.text = text;
    };

    /**
     * Getter for text
     * @returns {string}
     */
    this.getText = function () {
        return this.text;
    };

    /**
     * Update this Link with another Link
     * @param item
     */
    this.update = function (item) {
        this.setText(item.getText());
        this.setIcon(item.getIcon());
        this.setTarget(item.getTarget());
    };
};

// Inherit Panel
Link.prototype = MenuItem;

// Fix constructor
Link.prototype.constructor = Link;

module.exports = Link;
