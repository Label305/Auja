
define(['build/Objects/Abstract/menu_item'], function(MenuItem) {

    var Resource = function() {

        //Call the parent constructor
        MenuItem.call(this, arguments);

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
    Resource.prototype = MenuItem;

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