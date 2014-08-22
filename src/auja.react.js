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
        flux: 'bower_components/flux-tools/flux-tools',
        request: 'build/Utils/request'
    }
});

/**
 * Load initial dependencies:
 * 
 * react - The ReactJS library from Facebook
 * jquery - Used as a toolkit to make life easier
 * flux - Flux-tools to be able to implement the Flux architecture
 */
require(['react', 'jquery', 'flux', 'request'], function(react) {
    
    //Register as a global since we'll be using it everywhere
    window.React = react;

    //Require the main building block and initialize it
    require(['build/scaffolding.react'], function(Scaffolding) {
        React.renderComponent(<Scaffolding />, document.body);
    });
    
});

    