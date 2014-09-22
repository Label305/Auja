define(['fluxxor', 'build/Factories/panel_factory'], function(Fluxxor, PanelFactory) {

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
         * Starts at -1 since adding will be done using ++index
         */
        index: -1,

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'panel-scroll', this.scroll,
                'resize', this.resize,
                'activate-item', this.activateItem,
                
                //Different types of panels
                'menu', this.addPanel,
                'page', this.addPanel
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
         * When somebody scrolls a panel
         */
        scroll: function(panel) {
            this.emit('change');
        },

        /**
         * Add a panel
         * @param p
         */
        addPanel: function(p) {
            var panel = PanelFactory.createPanel(p);
            
            if(!panel) {
                console.error('Requested to dispatch unknown panel');
                return;
            }
            
            //Set the index, since adding will always be on the end
            //TODO move to panel object
            panel._index = ++this.index;
            panel.setId('panel-' + panel._index);
            
            //If the panel from which this panel is added does not originate from the latest
            //we need to remove trailing panels
            if(panel.getOrigin()) {
                var panels = [];
                for(var i in this.panels) {
                    if(this.panels[i].getId() <= panel.getOrigin().getId()) {
                        panels.push(this.panels[i]);
                    }
                }      
                this.panels = panels;
            } else {
                this.panels = [];
            }
                
            //Put the panel in the view
            this.panels[panel._index] = panel;
            
            this.emit('change');
        },

        /**
         * Activate an item within a panel
         * @todo add spec test
         * @todo move to panel
         * @param item
         */
        activateItem: function(item) {
            for(var i in this.panels) {
                if(this.panels[i].getId() == item.panel.getId()) {
                    this.panels[i].activeItem = item.item;
                    break;
                }
            }
            
            this.emit('change');
        }
        
    })

});