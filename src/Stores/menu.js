define(['fluxxor'], function(Fluxxor) {

    /**
     * The menus store
     */
    return Fluxxor.createStore({

        /**
         * All menus currently in view
         */
        menus: {},

        /**
         * Key value pairs of url:[menu._index] so that the update action
         * only has to update the same menu once
         */
        menuResources: {},

        /**
         * Key index for all menu items
         */
        keyIndex: [],
        
        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'menu', this.dispatch,
                'update', this.update
            )
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return this.menus;
        },

        /**
         * Dispatching of a menu
         * @param menu
         */
        dispatch: function(menu) {
            //Create array with menus sharing this url
            if(!this.menuResources[menu.url]) {
                this.menuResources[menu.url] = [];
            }
                     
            menu = flux.stores.PanelStore.addPanel(menu);
            this.menus[menu._index] = menu;
            menu = this.sortItems(menu);
            this.addKeys(menu);
            
            this.menuResources[menu.url].push(menu._index);
            
            flux.stores.PanelStore.addPanelSuccess();
        },

        /**
         * Sort items of a menu
         * @param menu
         */
        sortItems: function(menu) {
            var flag = false;
            for(var i in menu.menu) {
                if(menu.menu[i].order) {
                    flag = true;
                    break;
                }
            }
            //Order the items in the menu as they are defined
            if(flag) {
                menu.menu.sort(function(a, b) {
                    return a.order > b.order ? 1 : -1;
                });
            }
            return menu;
        },

        /**
         * Add keys to menu items
         * @todo use keys provided by server if applicable
         * @param menu
         */
        addKeys: function(menu) {            
            //Arrange a key index
            if(!this.keyIndex[menu._index]) {
                this.keyIndex[menu._index] = 0;
            }
            
            //Add a key when not present
            for(var i in menu.menu) {
                if(!menu.menu[i].key) {
                    menu.menu[i].key = ++this.keyIndex[menu._index];
                }
            }
            
            return menu
        },

        /**
         * Update a single menu
         * 
         * Note: this function does not emit change
         * 
         * @param menu
         * @param response
         */
        updateMenu: function(menu, response) {
            //Reset index
            this.keyIndex[menu._index] = 0;
            
            this.menus[menu._index].menu = response.menu;
            this.menus[menu._index] = this.sortItems(this.menus[menu._index]);
            this.menus[menu._index] = this.addKeys(this.menus[menu._index]);
            flux.stores.PanelStore.updatePanel(menu._index, this.menus[menu._index]);     
            
            this.emit('change');
        },

        /**
         * Update a single entry of menuResources
         * @param url
         * @param menuIndexes
         */
        updateResource: function(url, menuIndexes) {
            var request = new Request(url);
            request.get().done(function(response) {
                menuIndexes.map(function(index) {
                    this.updateMenu(this.menus[index], response);
                }.bind(this));
            }.bind(this));
        },

        /**
         * Remove inactive menu panels
         */
        clean: function() {
            
            //Clean menu's that are not present anymore
            var panelsState = flux.stores.PanelStore.getState();
            for(var i in this.menus) {
                var flag = false;
                for(var j in panelsState.panels) {
                    if(this.menus[i].id == panelsState.panels[j].id) {
                        flag = true;
                        break;
                    }
                }
                if(!flag) {
                    delete this.menus[i];
                }
            }
            
            //Clean menu resources
            for(var url in this.menuResources) {
                var flag = false;
                for(var i in this.menus) {
                    if(this.menus[i].url == url) {
                        flag = true;
                        break;
                    }
                }
                if(!flag) {
                    delete this.menuResources[url];
                }
            }
        },

        /**
         * Update menu's
         */
        update: function() {
            
            //Now is the moment to clean, we keep menu's as long as possible in memory
            this.clean();            
            
            //Update from server
            for(var url in this.menuResources) {
                this.updateResource(url, this.menuResources[url]);
            }
        }

    })

});