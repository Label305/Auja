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
            flux.stores.PanelStore.addPanel(menu);
            this.addKeys(menu);
            flux.stores.PanelStore.addPanelSuccess();
        },

        /**
         * Add keys to menu items
         * @param menu
         */
        addKeys: function(menu) {
            if(!menu._index) {
                return;
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