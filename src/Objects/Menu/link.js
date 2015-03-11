define(['build/Objects/Abstract/menu_item'], function (MenuItem) {

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
         * Icon
         * @type {string}
         */
        this.icon = data.icon || 'planet';

        /**
         * Active Icon, if none found tries to fall back to normal icon first, otherwise to the general fallback icon
         * @type {string}
         */
        this.activeIcon = data.active_icon || this.icon;

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
         * Setter for active icon
         * @param icon
         */
        this.setActiveIcon = function (activeIcon) {
            this.activeIcon = activeIcon;
        };

        /**
         * Getter for activ icon
         * @returns {string}
         */
        this.getActiveIcon = function () {
            return this.activeIcon;
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
            this.setActiveIcon(item.getActiveIcon());
            this.setTarget(item.getTarget());
        };
    };

    // Inherit Panel
    Link.prototype = MenuItem;

    // Fix constructor
    Link.prototype.constructor = Link;

    return Link;
});
