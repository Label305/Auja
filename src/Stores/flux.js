var FluxStores = {
    'AujaStore': 'build/Stores/auja', 
    'PanelStore': 'build/Stores/panel', 
    'MessageStore': 'build/Stores/message'
}

//Map as an array to load store dependencies
define([
    'fluxxor',
    'build/Stores/auja',
    'build/Stores/panel',
    'build/Stores/message'
], function(Fluxxor) {
    
    //Fill object with stores
    var stores = {};
    for(var name in FluxStores) {
        var store = require(FluxStores[name]);
        stores[name] = new store;
    }

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
         * @param item (optional) if isset will dispatch an activate-item event
         */
        click: function(url) {
            var panel = null;
            if(arguments[1]) {
                panel = arguments[1];
            }
            
            var item = null;
            if(panel != null && arguments[2]) {
                this.dispatch('activate-item', {panel: panel, item: arguments[2]});                
            }
            
            var request = new Request(url);
            request.get().done(function(response) {
                response.url = url;
                flux.actions.handle(response.type, response, panel); 
            });
        },

        /**
         * Submitting a form
         * @param url
         * @param method
         * @param data  
         */
        submit: function(url, method, data) {
            var panel = null;
            if(arguments[3]) {
                panel = arguments[3];
            }
            
            var request = new Request(url);
            
            switch(method.toLowerCase()) {
                case 'put':
                    request.put(data).done(function(response) {
                        response.url = url;
                        flux.actions.handle(response.type, response, panel);
                    });
                    break;
                case 'get':
                    request.get(data).done(function(response) {
                        response.url = url;
                        flux.actions.handle(response.type, response, panel);
                    });                    
                    break;
                default:
                    request.post(data).done(function(response) {
                        response.url = url;
                        flux.actions.handle(response.type, response, panel);
                    });
            }          
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
            
            switch(type) {
                case 'message':
                    //You can set weither or not to update the system
                    if(data.message.update == undefined || data.message.update) {
                        this.dispatch('update');
                    }
                    break;
            }
        },

        /**
         * Trigger scrolling of a panel
         * @param panel
         */
        onPanelScroll: function(panel) {
            this.dispatch('panel-scroll', panel);            
        },

        /**
         * Extend the items in a panel
         * @todo fix async
         * @param panel
         * @param item
         * @param url
         */
        extendResource: function(panel, item, url) {
            var request = new Request(url);
            request.get().done(function(data) {
                this.dispatch('extend-resource', {
                    panel: panel,
                    item: item,
                    data: data
                });
            }.bind(this));
        },

        /**
         * Update a single item with the response of an url
         * @param item
         * @param url
         */
        updateResource: function(item, url) {
            var request = new Request(url);
            request.get().done(function(data) {
                this.dispatch('update-resource', {
                    item: item,
                    data: data
                });
            }.bind(this));            
        }
    };
    
    return new Fluxxor.Flux(stores, actions); 
});