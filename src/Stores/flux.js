define([
    'build/Stores/auja',
    'build/Stores/panel',
    'build/Stores/menu',
], function() {

    var AujaStore = require('build/Stores/auja');
    var PanelStore = require('build/Stores/panel');
    var MenuStore = require('build/Stores/menu');
    
    /**
     * All stores
     */
    var stores = {
        AujaStore: new AujaStore,
        PanelStore: new PanelStore,
        MenuStore: new MenuStore
    };

    /**
     * All actions that can be dispatched
     * @type {{}}
     */
    var actions = {
        /**
         * Dispatch all initializing events
         */
        initialize: function() {
            this.dispatch('initialize');
        },

        /**
         * Process a click on a panel
         *
         * @todo Fix async version of passing the panel to the response handler
         * @param url
         * @param panel (optional)
         */
        click: function(url) {
            var panel = null;
            if(arguments[0]) {
                panel = arguments[0];
            }
            
            var request = new Request(url);
            request.get().done(function(response) {
                ResponseHandler.handle(response, panel); 
            });
        },

        /**
         * Will dispatch according to type, so if you listen on handling of type "menu"
         * you'll get your data
         * @param type
         * @param data
         * @param origin the location the event originated from
         */
        handle: function(type, data, origin) {
            data.origin = origin;
            this.dispatch(type, data);
        },

        /**
         * Add a panel
         * @param panel
         */
        addPanel: function(panel) {
            this.dispatch('panel-add', panel);
        }
    };
    
    return new Fluxxor.Flux(stores, actions); 
});