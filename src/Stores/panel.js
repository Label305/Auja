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
                'activate-panel-left', this.activatePanelLeft,
                'activate-panel-right', this.activatePanelRight,
                
                //Update panels
                'update', this.update,
                
                //Different types of panels
                'menu', this.addPanel,
                'page', this.addPanel,
                
                //Menu specific actions
                'extend-resource', this.extendResource,
                'update-resource', this.updateResource
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
            if(panel.isPaginated()) {
                this.emit('change');
            }
        },

        /**
         * Update content of all panels
         * @todo group same origin requests (or do something in request object with ongoing requests)
         */
        update: function() {
            this.panels.map(function(panel) {
                if(panel.isUpdateable()) {
                    var request = new Request(panel.getUrl());
                    request.get().done(function (response) {
                        panel = PanelFactory.updatePanel(panel, response);
                        this.emit('change');
                    }.bind(this));
                }
            }.bind(this));
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
            panel.setIndex(++this.index);
            panel.setId('panel-' + panel.getIndex());
            
            //If the panel from which this panel is added does not originate from the latest
            //we need to remove trailing panels
            var panels = [];
            for(var i in this.panels) {
                if(panel.getOrigin() && this.panels[i].getIndex() <= panel.getOrigin().getIndex()) {
                    panels.push(this.panels[i]);
                }
            }      
            this.panels = panels;
                
            //Put the panel in the view
            this.panels[panel.getIndex()] = panel;
            
            //Set latest addition as active
            this.setActivePanel(panel);
            
            this.emit('change');
        },

        /**
         * Activate an item within a panel
         * @param item
         */
        activateItem: function(item) {
            for(var i in this.panels) {
                if(this.panels[i].getId() == item.panel.getId()) {
                    this.panels[i].setActiveItem(item.item);
                    break;
                }
            }
            
            this.emit('change');
        },

        /**
         * Activate a panel to the left
         */
        activatePanelLeft: function() {
            //First try to find to activate
            var flag = false;
            for(var i = this.panels.length-1; i >= 0; i--) {
                if(flag) {
                    this.setActivePanel(this.panels[i]);
                    return
                } else if(this.panels[i].isActive()) {
                    flag = true;
                }
            }
            
            //If nothing found set all to inactive
            for(var i in this.panels) {
                this.panels[i].setIsActive(false);
            }
            this.emit('change');
        },

        /**
         * Activate a panel to the right
         */
        activatePanelRight: function() {
            //First try to find to activate
            var flag = false;
            for(var i = 0; i < this.panels.length; i++) {
                if(flag) {
                    this.setActivePanel(this.panels[i]);
                    return
                } else if(this.panels[i].isActive()) {
                    flag = true;
                }
            }
            
            //If none active, also not the last one, activate the first one
            if(!flag) {
                this.panels.first().setIsActive(true);
            }
            
            this.emit('change');
        },

        /**
         * Set the active panel
         * @param panel
         */
        setActivePanel: function(panel) {
            for(var i in this.panels) {
                var isActive = panel ? this.panels[i].getId() == panel.getId() : false;
                this.panels[i].setIsActive(isActive);
            }

            this.emit('change');
        },

        /**
         * Extend a resource
         * @param data
         */
        extendResource: function(data) {
            var panel = data.panel,
                response = data.data,
                item = data.item;
            
            //Find the panel
            for(var i in this.panels) {
                if(this.panels[i].getId() == panel.getId()) {
                    
                    if(this.panels[i].getType() != 'menu') {
                        console.error('Update of menu item requested on a non menu');
                        return;
                    }
                    this.panels[i].extendItem(item, response);
                    this.emit('change');                    
                    return;
                }
            }
        },

        /**
         * Update a resource
         * @param data
         */
        updateResource: function(data) {
            var response = data.data,
                item = data.item;

            //Find the panel
            for(var i in this.panels) {
                if(this.panels[i].hasItem(item)) {
                    this.panels[i].updateItem(item, response);
                    this.emit('change');
                    return;
                }
            }
        },

        /**
         * @return bool
         */
        hasActivePanels: function() {
            for(var i in this.panels) {
                if(this.panels[i].isActive()) {
                    return true;
                }
            }
            return false;
        }
        
    })

});