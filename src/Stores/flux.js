define([
    'build/Stores/auja',
    'build/Stores/panel',
    'build/Stores/menu',
    'build/Stores/page'
], function() {

    var AujaStore = require('build/Stores/auja');
    var PanelStore = require('build/Stores/panel');
    var MenuStore = require('build/Stores/menu');
    var PageStore = require('build/Stores/page');
    
    /**
     * All stores
     */
    var stores = {
        AujaStore: new AujaStore,
        PanelStore: new PanelStore,
        MenuStore: new MenuStore,
        PageStore: new PageStore
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
         * Dispatched on window resize
         */
        resize: function() {
            this.dispatch('resize');
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
            if(arguments[1]) {
                panel = arguments[1];
            }
            
            var request = new Request(url);
            request.get().done(function(response) {
                flux.actions.handle(response.type, response, panel); 
            });
        },

        /**
         * Submitting a form
         * @param url
         * @param data
         */
        submit: function(url, data) {
            var panel = null;
            if(arguments[2]) {
                panel = arguments[2];
            }

            var request = new Request(url);
            request.post(data).done(function(response) {
                flux.actions.handle(response.type, response, panel);
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