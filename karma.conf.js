var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Firefox'],
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel-loader'}
                ]
            }
        },
        webpackServer: {
            noInfo: false
        }
    });
};