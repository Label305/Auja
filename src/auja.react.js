/**
 * @jsx React.DOM
 */
//RequireJS config
require.config({

    /**
     * Use document base url
     */
    baseUrl: '../',

    /**
     * When debug is true add a bust to prevent caching
     */
    urlArgs: (new Date()).getTime(), 

    /**
     * Location of dependencies
     */
    paths: {
        react: '../bower_components/react/react',
        jquery: '../bower_components/jquery/dist/jquery.min',
        fluxxor: '../bower_components/fluxxor/build/fluxxor',
        signals: '../bower_components/js-signals/dist/signals',
        crossroads: '../bower_components/crossroads.js/dist/crossroads',
        sugar: '../bower_components/sugar/release/sugar-full.min',
        trumbowyg: '../bower_components/trumbowyg/dist/trumbowyg.min',
        request: 'build/Requests/request',
        stores: 'build/Stores/flux'
    }
});

/**
 * Load initial dependencies:
 *
 * react - The ReactJS library from Facebook
 * jquery - Used as a toolkit to make life easier
 * fluxxor - To be able to implement the Flux architecture
 * sugar - A toolkit extending native objects
 */
require(['react', 'jquery', 'fluxxor', 'sugar'], function (react) {

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
            
            //Bind resize
            $(window).bind('resize', flux.actions.resize);

            //Render the main structure
            React.renderComponent(<Scaffolding flux={flux} />, document.body);
        });
    });

});

    