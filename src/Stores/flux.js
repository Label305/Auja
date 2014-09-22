var FluxStores = {
    'AujaStore': 'build/Stores/auja', 
    'PanelStore': 'build/Stores/panel', 
    'MenuStore': 'build/Stores/menu', 
    'PageStore': 'build/Stores/page',
    'MessageStore': 'build/Stores/message',
    'ItemsStore': 'build/Stores/items'
}

//Map as an array to load store dependencies
define([
    'fluxxor',
    'build/Stores/auja',
    'build/Stores/panel',
    'build/Stores/menu',
    'build/Stores/page',
    'build/Stores/message',
    'build/Stores/items'
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
         * @param data
         */
        submit: function(url, method, data) {
            var panel = null;
            if(arguments[3]) {
                panel = arguments[3];
            }
            
            var request = new Request(url);
            
            switch(method) {
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
         * Mounts a resource with items
         * @todo fix async error
         * @param url
         */
        mountResource: function(url) {
            //Only when no items store exists for this url initialize it
            if(!flux.stores.ItemsStore.exists(url)) { 
                var request = new Request(url);
                request.get().done(function(response) {
                    if(response.type != 'items') {
                        console.error('Mounting of a resource resulted in a non-items response');
                    } else {
                        this.dispatch('items', {
                            resource: url,
                            items: response,
                            paging: response.paging ? response.paging : {}
                        });
                    }
                }.bind(this));
            }
        },

        /**
         * Extend a resource with new itemsd
         * @todo fix async error
         * @param url
         * @param resource
         */
        extendResource: function(url, resource) {
            var request = new Request(url);
            request.get().done(function(response) {
                if(response.type != 'items') {
                    console.error('Mounting of a resource resulted in a non-items response');
                } else {
                    this.dispatch('items-extend', {
                        resource: resource,
                        items: response,
                        paging: response.paging ? response.paging : {}
                    });
                }
            }.bind(this));
        },

        /**
         * Trigger scrolling of a panel
         * @param panel
         */
        onPanelScroll: function(panel) {
            this.dispatch('panel-scroll', panel);            
        }

    };
    
    return new Fluxxor.Flux(stores, actions); 
});