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
        'react': 'bower_components/react/react',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'fluxxor': 'bower_components/fluxxor/build/fluxxor',
        'signals': 'bower_components/js-signals/dist/signals',
        'crossroads': 'bower_components/crossroads.js/dist/crossroads',
        'sugar': 'bower_components/sugar/release/sugar-full.min',
        'trumbowyg': 'bower_components/trumbowyg/dist/trumbowyg.min',
        'request': 'build/Requests/request',
        'stores': 'build/Stores/flux',
        
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
        'tmpl': 'bower_components/blueimp-tmpl/js/tmpl'
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

    