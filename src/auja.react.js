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
        moment: 'bower_components/moment/min/moment.min',
        pikaday: 'bower_components/pikaday/pikaday',
        pikadayjq: 'bower_components/pikaday/plugins/pikaday.jquery',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg.min',
        jstree: 'bower_components/jstree/dist/jstree.min',
        minicolors: 'bower_components/jquery-minicolors/jquery.minicolors.min',
        sugar: 'bower_components/sugar/release/sugar.min',
        request: 'build/Requests/request',
        flux: 'build/Stores/flux',
        clockpicker: 'bower_components/clockpicker/dist/jquery-clockpicker.min',
        chosen: 'bower_components/chosen_v1.2.0/chosen.jquery.min'
    },

    /**
     * Shim
     */
    shim: {
        trumbowyg: {
            deps: ['jquery']
        },
        minicolors: {
            deps: ['jquery']
        },
        clockpicker: {
            deps: ['jquery']
        },
        pikadayjq: {
            deps: ['jquery', 'moment', 'pikaday']
        },
        chosen: {
            deps: ['jquery']
        }
    }
});

require(['react', 'flux', 'build/scaffolding.react'], function (React, flux, Scaffolding) {
    React.renderComponent(<Scaffolding flux={flux} />, document.body);
});
    