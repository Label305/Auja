
define(['build/Objects/Abstract/menu_item'], function(MenuItem) {

    var Resource = function(data) {

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

        /**
         * Target where to fetch the data from
         */
        this.target = data.target;

        /**
         * Paging options
         * @type {{}}
         */
        this.paging = {};
    };

    // Inherit Panel
    Resource.prototype = MenuItem;

    // Fix constructor
    Resource.prototype.constructor = Resource;

    /**
     * Getter for the target
     * @returns String
     */
    Resource.prototype.getTarget = function() {
        return this.target;
    };

    /**
     * Get items in this resource
     * @returns {Array}
     */
    Resource.prototype.getItems = function() {
        return this.items;  
    };

    /**
     * Get the current paging
     * @returns Object
     */
    Resource.prototype.getPaging = function() {
        return this.paging;
    };

    /**
     * Update with new data
     * @todo make this a little more elegant
     * @param data
     */
    Resource.prototype.update = function(data) {
        this.items = this.items.concat(data.items);
        this.paging = data.paging;
    };
    
    return Resource;
});