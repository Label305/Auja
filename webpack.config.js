var path = require('path');
var webpack = require('webpack');

module.exports.getConfig = function (type) {

    var isDev = type === 'development';

    return {
        entry: './src/auja.jsx',
        //devtool: "source-map",
        output: {
            filename: 'auja.js',
            path: path.join(__dirname, 'dist')
        },
        debug: isDev,
        module: {
            loaders: [{
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery'
            })
        ]
    };
};