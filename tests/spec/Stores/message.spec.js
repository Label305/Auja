define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/message'
], function () {
    describe('Message store', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should have a message object', function () {

            var Store = require('build/Stores/message');
            var store = new Store();
            
            expect(store.getMessage()).toBeAnObject();
        });

        it('should store a message object', function() {

            var Store = require('build/Stores/message');
            var store = new Store();

            store.dispatch({
                authenticated: true
            });
            
            expect(store.getMessage().authenticated).toBe(true);
            
        });
        
        it('should reset its state', function() {
            
            var Store = require('build/Stores/message');
            var store = new Store();

            store.dispatch({
                authenticated: true
            });

            expect(store.getMessage().authenticated).toBe(true);
            
            store.reset();

            expect(store.getMessage().authenticated).toBeUndefined();
             
        });
        
    });

});