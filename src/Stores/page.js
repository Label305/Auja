define(['fluxxor'], function(Fluxxor) {

    /**
     * The pages store
     */
    return Fluxxor.createStore({

        /**
         * All pages currently in view
         */
        pages: [],
        
        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'page', this.dispatch
            )
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return this.pages;
        },

        /**
         * Dispatching of a page
         * @param page
         * @todo write spec test
         * @todo remove panel store dependency
         */
        dispatch: function(page) {
            this.pages.push(page);
            
            //TODO Remove panel dependency
            flux.stores.PanelStore.addPanel(page);            
            flux.stores.PanelStore.addPanelSuccess();
        }

    })

});