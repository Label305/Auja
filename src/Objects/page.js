/**
 * Page panel type
 * 
 * @todo implement sorting
 */
define(['build/Objects/panel', 'build/Factories/page_item_factory'], function(Panel, PageItemFactory) {

    var Page = function() {
        
        //Call the parent constructor
        Panel.call(this);
        
        /**
         * Content of a page
         * @type {Array}
         */
        this.content = [];

        /**
         * Set panel type
         * @type {string}
         */
        this.type = 'page';

    };

    // Inherit Panel
    Page.prototype = Panel;

    // Fix constructor
    Page.prototype.constructor = Page;

    /**
     * Set the content of a page
     */
    Page.prototype.setContent = function(content) {
        this.content = content.map(function(item) {
            return PageItemFactory.createItem(item);
        });
    };

    /**
     * Getter for the content
     * @returns {Array}
     */
    Page.prototype.getContent = function() {
        return this.content;
    };

    return Page;
});