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
         * Height of the panels, changed on resize
         */
        height: 0,

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
                'panel-add', this.addPanel,
                'panel-scroll', this.scroll,
                'resize', this.resize,
                'activate-item', this.activateItem
            )
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return {
                'height': this.height,
                'panels': this.panels
            };
        },

        /**
         * On window resize also set the panel height
         */
        resize: function() {
            var oldHeight = this.height;
            this.height = $('#panels').height();
            if(this.height != oldHeight) {
                this.emit('change');
            }
        },

        /**
         * Initialize the DOM node, will set the scrollTarget
         * @param panel
         */
        panelDidMount: function (panel) {
            this.emit('change');
        },
        
        /**
         * When somebody scrolls a panel
         */
        scroll: function(panel) {
            this.emit('change');
        },

        /**
         * Update a panel
         * @param panel
         */
        updatePanel: function(index, panel) {
            for(var i in this.panels) {
                if(this.panels[i]._index == panel._index) {
                    this.panels[i] = panel;
                    this.emit('change');
                    break;
                }
            }
        },

        /**
         * Add a panel
         * @param panel
         */
        addPanel: function(panel) {
            //Set the index, since adding will always be on the end
            panel._index = ++this.index;
            panel.id = 'panel-' + panel._index;
            
            //If the panel from which this panel is added does not originate from the latest
            //we need to remove trailing panels
            if(panel.origin) {
                var panels = [];
                for(var i in this.panels) {
                    if(this.panels[i].id <= panel.origin.id) {
                        panels.push(this.panels[i]);
                    }
                }      
                this.panels = panels;
            } else {
                this.panels = [];
            }
                
            //Put the panel in the view
            this.panels[panel._index] = panel;
            
            return panel;
        },

        /**
         * Should be called when finished processing of panel adding
         */
        addPanelSuccess: function() {
            this.emit('change');
            this.resize();            
        },        
        
        /**
         * Activate an item within a panel
         * @param item
         */
        activateItem: function(item) {
            for(var i in this.panels) {
                if(this.panels[i].id == item.panel.id) {
                    this.panels[i].activeItem = item.item;
                    break;
                }
            }
            
            this.emit('change');
        }
        
    })

});