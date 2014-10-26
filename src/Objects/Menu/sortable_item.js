define(['build/Objects/Abstract/menu_item'], function (MenuItem) {

    var SortableItem = function (data) {

        //Call the parent constructor
        MenuItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'sortable_item';

        /**
         * Target of this link
         * @type {string|boolean}
         */
        this.target = data.target || false;

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';

        /**
         * Left
         *
         * @type {integer|boolean}
         */
        this.left = data.left || false;

        /**
         * Right
         * 
         * @type {integer|boolean}
         */
        this.right = data.right || false;

        /**
         * Getter for the id
         * @returns string
         * @override
         */
        this.getId = function () {
            return this.target;
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
         * Setter for left
         * @param left
         */
        this.setLeft = function(left) {
            this.left = left;
        };

        /**
         * Getter for left
         * @return {integer|boolean}
         */
        this.getLeft = function() {
            return this.left;
        };

        /**
         * Setter for right
         * @param right
         */
        this.setRight = function(right) {
            this.right = right;
        };

        /**
         * Getter for right
         * @return {integer|boolean}
         */
        this.getRight = function() {
            return this.right;
        };

        /**
         * Update this Link with another Link
         * @param item
         */
        this.update = function (item) {
            this.setText(item.getText());
            this.setTarget(item.getTarget());
            this.setLeft(item.getLeft());
            this.setRight(item.getRight());
        };
    };

    // Inherit Panel
    SortableItem.prototype = MenuItem;

    // Fix constructor
    SortableItem.prototype.constructor = SortableItem;
    
    return SortableItem;
});