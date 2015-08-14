/**
 * Page panel type
 *
 * @todo implement sorting
 */

import Panel from './Abstract/panel.js';
import PageItemFactory from '../Factories/page_item_factory.js';

var Page = function () {

    //Call the parent constructor
    Panel.call(this);

    //Set the type
    this.setType('page');

    /**
     * Content of a page
     * @type {Array}
     */
    this.content = [];

    /**
     * Set the content of a page
     */
    this.setContent = function (content) {
        this.content = content.map(function (item) {
            return PageItemFactory.createItem(item);
        });
    };

    /**
     * Getter for the content
     * @returns {Array}
     */
    this.getContent = function () {
        return this.content;
    };

};

// Inherit Panel
Page.prototype = Panel;

// Fix constructor
Page.prototype.constructor = Page;

module.exports = Page;
