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
            
            //Make sure the items are sorted
            this.resources[resource.resource].items = flux.stores.ItemsStore.sortItems(this.resources[resource.resource].items); 
            
            //Pass/reset the paging
            this.resources[resource.resource].paging = resource.paging ? resource.paging : {};

            this.emit('change');
        },

        /**
         * Make sure the items are sorted
         * @param items
         * @returns {*}
         */
        sortItems: function(items) {
            var flag = false;
            for(var i in items) {
                if(items[i].order) {
                    flag = true;
                    break;
                }
            }
            //Order the items in the menu as they are defined
            if(flag) {
                items.sort(function(a, b) {
                    return a.order > b.order ? 1 : -1;
                });
            }
            return items;
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