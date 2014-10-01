/**
 * Page panel type
 * 
 * @todo implement sorting
 */
define(['build/Objects/Abstract/panel', 'build/Factories/page_item_factory'], function(Panel, PageItemFactory) {

    var Page = function() {
        
        //Call the parent constructor
        Panel.call(this);
        
        //Set the type
        this.setType('page');
        
        /**
         * Content of a page
         * @type {Array}
         */
        this.content = [];

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