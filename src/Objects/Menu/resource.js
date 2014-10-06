
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

        /**
         * Getter for the id
         * @returns string
         * @override
         */
        this.getId = function() {
            return this.target;
        };

        /**
         * Getter for the target
         * @returns String
         */
        this.getTarget = function() {
            return this.target;
        };

        /**
         * Get items in this resource
         * @returns {Array}
         */
        this.getItems = function() {
            return this.items;
        };

        /**
         * Get the current paging
         * @returns Object
         */
        this.getPaging = function() {
            return this.paging;
        };

        /**
         * Update with new data
         * @todo make this a little more elegant
         * @param data
         */
        this.update = function(data) {
            if(data.items) {
                this.items = this.items.concat(data.items);
                this.paging = data.paging;
            } else if(data.resource) {
                alert('Updating');
            }
        };
    };

    // Inherit Panel
    Resource.prototype = MenuItem;

    // Fix constructor
    Resource.prototype.constructor = Resource;
    
    return Resource;
});