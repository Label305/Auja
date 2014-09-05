define(['fluxxor'], function (Fluxxor) {

    /**
     * The main Auja store
     */
    return Fluxxor.createStore({

        /**
         * All resources with items
         */
        resources: [],

        /**
         * Key index for all menu items
         */
        keyIndex: [],

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function (url) {
            this.bindActions(
                'items', this.addItems,
                'items-extend', this.addItems,
                'update', this.update
            )
        },

        /**
         * Getter for the state of a resource
         * @returns {*}
         */
        getState: function (resource) {
            if (!this.resources[resource]) {
                this.resources[resource] = {
                    items: [],
                    paging: {}
                };
            }
            return this.resources[resource];
        },

        /**
         * Check if items store already exists
         * @param resource
         * @returns {Boolean}
         */
        exists: function(resource) {
            return this.getState(resource).items.length > 0;
        },

        /**
         *
         * @param resource
         */
        addItems: function (resource) {
            
            //Increment key index
            if(!this.keyIndex[resource.resource]) {
                this.keyIndex[resource.resource] = 0;
            }
                        
            //Set keys for every item
            for(var i in resource.items.items) {
                if(!resource.items.items[i].key) {
                    resource.items.items[i].key = ++this.keyIndex[resource.resource];
                }
            }
            
            //Add items
            this.resources[resource.resource].items = this.resources[resource.resource].items.concat(resource.items.items);
            
            //Pass/reset the paging
            this.resources[resource.resource].paging = resource.paging ? resource.paging : {};

            this.emit('change');
        },

        /**
         * Update items
         */
        update: function() {
            //TODO implement
            console.log('TODO: Items update');
        }

    })

});