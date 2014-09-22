
define(['build/Objects/Abstract/item'], function(Item) {

    var Resource = function() {

        //Call the parent constructor
        Item.call(this, arguments);

        /**
         * Resource items
         * @type {Array}
         */
        this.items = [];

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'resource';

    };

    // Inherit Panel
    Resource.prototype = Item;

    // Fix constructor
    Resource.prototype.constructor = Resource;

    /**
     * Get items in this resource
     * @returns {Array}
     */
    Resource.prototype.getItems = function() {
        return this.items;  
    };
    
    return Resource;
});