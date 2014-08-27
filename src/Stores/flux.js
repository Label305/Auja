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
         * Do a GET request, since the interface does only know what request to do
         * not what will be returned
         * 
         * @param url
         */
        get: function(url) {
            //TODO move this (?)
            var request = new Request(url);
            request.get().done(function(response) {
                ResponseHandler.handle(response);
            });
        },

        /**
         * Will dispatch according to type, so if you listen on handling of type "menu"
         * you'll get your data
         * @param type
         * @param data
         */
        handle: function(type, data) {
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