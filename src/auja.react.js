/**
 * @jsx React.DOM
 */


//Debugging
if (typeof __debug__ != 'undefined') {
    var __debug = false;
}

//RequireJS config
require.config({

    /**
     * Use document base url
     */
    baseUrl: '',

    /**
     * When debug is true add a bust to prevent caching
     */
    urlArgs: __debug__ ? '_=' + (new Date()).getTime() : '',

    /**
     * Location of dependencies
     */
    paths: {
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        request: 'build/Request/request',
        stores: 'build/Stores/flux'
    }
});

/**
 * Load initial dependencies:
 *
 * react - The ReactJS library from Facebook
 * jquery - Used as a toolkit to make life easier
 * fluxxor - To be able to implement the Flux architecture
 * request - Every request starts here, it'll take care of factories and routing
 * response_handler - Every response will end here after which it will dispatch
 */
require(['react', 'jquery', 'fluxxor', 'crossroads'], function (react) {

    //Register as a global since we'll be using it everywhere
    window.React = react;

    //Register as global
    window.Fluxxor = require('fluxxor');

    //Setup data layer
    require(['build/Stores/flux'], function (flux) {
        
        //Register as global
        window.flux = flux;
        
        //Setup building block and its utilities
        require(['build/scaffolding.react', 'request'], function(Scaffolding) {

            //Render the main structure
            React.renderComponent(<Scaffolding flux={flux} />, document.body);
        });
    });

});

    