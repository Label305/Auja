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
         * Index of current panel as a reference
         */
        index: 0,

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
            //Set the index, since adding will always be on the end
            panel._index = ++this.index;
            
            //If the panel from which this panel is added does not originate from the latest
            //we need to remove trailing panels
            if(panel.origin) {
                var panels = [];
                for(var i in this.panels) {
                    if(this.panels[i]._index <= panel.origin._index) {
                        panels.push(this.panels[i]);
                    }
                }      
                this.panels = panels;
            } else{
                // TODO check if this is the most elegant way of clearing after the main menu
                this.panels = [];
            }
                
            this.panels.push(panel);
            this.emit('change');
        }
        
    })

});