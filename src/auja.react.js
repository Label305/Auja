/**
 * @jsx React.DOM
 */
//RequireJS config
require.config({

    /**
     * Use document base url
     */
    baseUrl: '',

    /**
     * When debug is true add a bust to prevent caching
     */
    urlArgs: (new Date()).getTime(),

    /**
     * Location of dependencies
     */
    paths: {
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg.min',
        jstree: 'bower_components/jstree/dist/jstree.min',
        sugar: 'bower_components/sugar/release/sugar.min',
        request: 'build/Requests/request',
        flux: 'build/Stores/flux'
    },
    
    shim: {
        trumbowyg: {
            deps: ['jquery']
        }
    }
});

require(['react', 'flux', 'request', 'build/scaffolding.react'], function (React, flux, Request, Scaffolding) {
    React.renderComponent(<Scaffolding flux={flux} />, document.body);
});
    