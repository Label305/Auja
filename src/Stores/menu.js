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