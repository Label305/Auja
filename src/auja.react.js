/**
 * @jsx React.DOM
 */


//Debugging
if(typeof __debug__ != 'undefined') {
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
    urlArgs: __debug__ ? '_=' +  (new Date()).getTime() : '',

    /**
     * Location of dependencies
     */
    paths: {
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        request: 'build/Utils/request',
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
 */
require(['react', 'jquery', 'fluxxor', 'request'], function(react) {
    
    //Register as a global since we'll be using it everywhere
    window.React = react;
    
    //Register as global
    window.Fluxxor = require('fluxxor');
        
    //Require the main building block and initialize it
    require(['build/scaffolding.react', 'build/Stores/flux'], function(Scaffolding, flux) {
        
        //Register as global
        window.flux = flux;
        
        //Render the main structure
        React.renderComponent(<Scaffolding flux={flux} />, document.body);
    });
    
});

    