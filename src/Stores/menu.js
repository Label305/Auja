define(['fluxxor'], function(Fluxxor) {

    /**
     * The menus store
     */
    return Fluxxor.createStore({

        /**
         * All menus currently in view
         */
        menus: [],

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
            this.menus.push(menu);            
            menu = flux.stores.PanelStore.addPanel(menu);
            menu = this.sortItems(menu);
            this.addKeys(menu);
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
         * @param menu
         */
        addKeys: function(menu) {
            if(!menu._index) {
                return menu;
            }
            
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
         * Update menu's
         */
        update: function() {
            //TODO implement
            console.log('TODO: Menu update');
        }

    })

});