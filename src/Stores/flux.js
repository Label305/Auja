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
        }
    };

    return new Fluxxor.Flux(stores, actions); 
});