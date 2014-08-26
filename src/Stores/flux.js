define([
    'build/Stores/auja'
], function() {

    var AujaStore = require('build/Stores/auja');
    
    /**
     * All stores
     */
    var stores = {
        AujaStore: new AujaStore
    };

    /**
     * All callbacks that can be dispatched
     * @type {{}}
     */
    var actions = {
        initialize: function() {
            this.dispatch('initialize');
        },
        get: function(url) {
            this.dispatch('get', { url: url });
        },
        update: function() {
            this.dispatch('update');
        }
    };

    return new Fluxxor.Flux(stores, actions); 
});