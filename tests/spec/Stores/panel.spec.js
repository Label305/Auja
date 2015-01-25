define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/panel'
], function () {
    describe('Panel store', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should have an array of panels in its state', function () {

            var Store = require('build/Stores/panel');
            var store = new Store();

            expect(store.getState().panels).toBeAnObject();
            expect(store.getState().height).toBeAnInteger();

        });
        
        it('should be able to add panels', function() {
            
            var Store = require('build/Stores/panel');
            var store = new Store();
            
            expect(store.getState().panels.length).toBe(0);
            
            store.addPanel({
                type: 'menu',
                menu: []
            });
            
            expect(store.getState().panels.length).toBe(1);
            
        });
        
        it('should add _index after adding', function() {
            
            var Store = require('build/Stores/panel');
            var store = new Store();

            expect(store.getState().panels.length).toBe(0);

            var panel = {
                type: 'menu',
                menu: []
            };
            
            store.addPanel(panel);

            expect(store.getState().panels[0]._index).toBe(0);
            
        });
        
        //TODO implement updating
        //it('should be able to update a panel', function() {
        //
        //    var Store = require('build/Stores/panel');
        //    var store = new Store();
        //
        //    expect(store.getState().panels.length).toBe(0);
        //
        //    var panel = {
        //        foo: 123,
        //        origin: {
        //            id: -1
        //        }
        //    };
        //
        //    panel = store.addPanel(panel);
        //    expect(store.getState().panels.length).toBe(1);
        //
        //    expect(panel.foo).toBe(123);
        //    
        //    panel.foo = 321;
        //    
        //    panel = store.updatePanel(panel._index, panel);
        //    
        //    expect(panel.foo).toBe(321);
        //
        //    expect(store.getState().panels.length).toBe(1);
        //    
        //}); 

    });

});