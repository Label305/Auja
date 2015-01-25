define([
    'jasmine_matchers', 'react', 'jquery', 'fluxxor', 'sugar',
    'build/Stores/flux'
], function () {
    describe('Flux', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should have all actions', function () {

            var flux = require('build/Stores/flux');
            
            expect(flux.actions).toHaveKeys([
                'initialize',
                'resize',
                'click',
                'submit',
                'handle',
                'onPanelScroll',
                'extendResource',
                'updateResource',
                'processFail'
            ]);
        });

        
    });

});