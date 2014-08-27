define(['fluxxor'], function(Fluxxor) {

    /**
     * The main Auja store
     */
    return Fluxxor.createStore({

        /**
         * All panels currently in view
         */
        panels: [],

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'panel-add', this.addPanel
            )
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return {
                'panels': this.panels
            };
        },

        /**
         * Add a panel
         * @param panel
         */
        addPanel: function(panel) {
            this.panels.push(panel);
            this.emit('change');
        }
        
    })

});