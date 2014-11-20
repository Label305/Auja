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
        jstree: 'bower_components/jstree/dist/jstree.min',
        sugar: 'bower_components/sugar/release/sugar.min',
        request: 'build/Requests/request',
        flux: 'build/Stores/flux',
        clockpicker: 'bower_components/clockpicker/dist/jquery-clockpicker.min'
    },

    /**
     * Shim
     */
shim: {
        trumbowyg: {
            deps: ['jquery']
        },
        clockpicker: {
            deps: ['jquery']
        },
        pikadayjq: {
            deps: ['jquery', 'moment', 'pikaday']
        }
}
});