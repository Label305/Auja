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
         */
        dispatch: function(page) {
            this.pages.push(page);
            flux.stores.PanelStore.addPanel(page);
        },

        /**
         * Update page's
         */
        update: function() {
            //TODO implement
        }

    })

});