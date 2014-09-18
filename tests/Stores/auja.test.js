define([
    'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/auja'
], function() {
    describe('Auja store', function() {
        it('to pass the authenticated parameter from a message to the auja state', function() {
            
            var Store = require('build/Stores/auja');
            var store = new Store();
            
            expect(store.getState().authenticated).toEqual(false);
            
            store.message({
                authenticated: true
            });
            expect(store.getState().authenticated).toEqual(true);
            
            
            
        });
    });

});