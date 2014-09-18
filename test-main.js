var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
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
     * @todo load these from global config
     */
    paths: {
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        sugar: 'bower_components/sugar/release/sugar-full.min',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg.min',
        request: 'build/Requests/request',
        stores: 'build/Stores/flux'
    }
});
