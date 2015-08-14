import PageItem from '../Abstract/page_item.js';
import FormItemFactory from '../../Factories/form_item_factory.js';
var Form = function (data) {

    //Call the parent constructor
    PageItem.call(this, arguments);

    /**
     * Our custom type
     * @type {string}
     */
    this.type = 'form';

    /**
     * Form items, is set during construct to make sure we use
     * the FormItemsFactory
     * @type {Array}
     */
    this.items = [];

    /**
     * Method
     * @type {string}
     */
    this.method = data.method || 'post';

    /**
     * Action
     * @type {string}
     */
    this.action = data.action || null;

    /**
     * Setter for Items
     * @param items
     */
    this.setItems = function (items) {
        this.items = items.map(function (item) {
            return FormItemFactory.createItem(item);
        }).filter(function (item) {
            return item !== false;
        });
    };

    /**
     * Getter for items
     * @returns {Array}
     */
    this.getItems = function () {
        return this.items;
    };

    /**
     * Setter for method
     * @param method
     */
    this.setMethod = function (method) {
        this.method = method;
    };

    /**
     * Getter for method
     * @returns {string}
     */
    this.getMethod = function () {
        return this.method;
    };

    /**
     * Setter for action
     * @param action
     */
    this.setAction = function (action) {
        this.action = action;
    };

    /**
     * Getter for action
     * @returns {string}
     */
    this.getAction = function () {
        return this.action;
    };

    if (data.items) {
        this.setItems(data.items);
    }

};

// Inherit Panel
Form.prototype = PageItem;

// Fix constructor
Form.prototype.constructor = Form;

module.exports = Form;
