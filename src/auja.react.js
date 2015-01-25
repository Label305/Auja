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

        //Bunch of requirements needed for the blueimp file uploader
        'jquery.ui.widget': 'bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload': 'bower_components/blueimp-file-upload/js/jquery.fileupload',
        'jquery.fileupload-ui': 'bower_components/blueimp-file-upload/js/jquery.fileupload-ui',
        'jquery.fileupload-image': 'bower_components/blueimp-file-upload/js/jquery.fileupload-image',
        'jquery.fileupload-validate': 'bower_components/blueimp-file-upload/js/jquery.fileupload-validate',
        'jquery.fileupload-video': 'bower_components/blueimp-file-upload/js/jquery.fileupload-video',
        'jquery.fileupload-audio': 'bower_components/blueimp-file-upload/js/jquery.fileupload-audio',
        'jquery.fileupload-process': 'bower_components/blueimp-file-upload/js/jquery.fileupload-process',
        'jquery.fileupload-jquery-ui': 'bower_components/blueimp-file-upload/js/jquery.fileupload-jquery-ui',
        'jquery.iframe-transport': 'bower_components/blueimp-file-upload/js/jquery.iframe-transport',
        'load-image': 'bower_components/blueimp-load-image/js/load-image',
        'load-image-meta': 'bower_components/blueimp-load-image/js/load-image-meta',
        'load-image-exif': 'bower_components/blueimp-load-image/js/load-image-exif',
        'load-image-ios': 'bower_components/blueimp-load-image/js/load-image-ios',
        'canvas-to-blob': 'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',
        'tmpl': 'bower_components/blueimp-tmpl/js/tmpl',

        //System dependencies
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        moment: 'bower_components/moment/moment',
        pikaday: 'bower_components/pikaday/pikaday',
        pikadayjq: 'bower_components/pikaday/plugins/pikaday.jquery',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg',
        jstree: 'bower_components/jstree/dist/jstree',
        minicolors: 'bower_components/jquery-minicolors/jquery.minicolors',
        sugar: 'bower_components/sugar/release/sugar-full.development',
        request: 'build/Requests/request',
        flux: 'build/Stores/flux',
        clockpicker: 'bower_components/clockpicker/dist/jquery-clockpicker.min',
        selectize: 'bower_components/selectize/dist/js/standalone/selectize.min'
    },
    config: {
        moment: {
            noGlobal: true
        }
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
        selectize: {
            deps: ['jquery']
        }
    }
});

require(['react', 'flux', 'build/scaffolding.react'], function (React, flux, Scaffolding) {
    React.renderComponent(<Scaffolding flux={flux} />, document.body);
});
    