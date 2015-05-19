var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/i;

var pathToModule = function (path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start,

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
        
        jasmine_matchers: 'tests/spec/matchers',
        react: 'bower_components/react/react-with-addons',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        moment: 'bower_components/moment/min/moment.min',
        pikaday: 'bower_components/pikaday/pikaday',
        pikadayjq: 'bower_components/pikaday/plugins/pikaday.jquery',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg.min',
        tinymce: 'bower_components/tinymce/tinymce',
        tinymcejq: 'bower_components/tinymce/tinymce.jquery',
        minicolors: 'bower_components/jquery-minicolors/jquery.minicolors.min',
        jstree: 'bower_components/jstree/dist/jstree.min',
        sugar: 'bower_components/sugar/release/sugar.min',
        request: 'build/Requests/request',
        flux: 'build/Stores/flux',
        clockpicker: 'bower_components/clockpicker/dist/jquery-clockpicker.min',
        selectize: 'bower_components/selectize/dist/js/standalone/selectize.min'
    },

    /**
     * Shim
     */
shim: {
        trumbowyg: {
            deps: ['jquery']
        },
        tinymcejq: {
            deps: ['jquery', 'tinymce']
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