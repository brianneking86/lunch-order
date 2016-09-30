/*eslint-disable */
var Webpack = require('webpack'),
    Fs = require('fs'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    StringReplacePlugin = require("string-replace-webpack-plugin"),
    getConfig = require('./webpack.config.js');

module.exports = function(options) {
    var config = getConfig(options);

    config.devtool = '#cheap-module-eval-source-map';
    config.debug = true;
    config.entry = {};
    config.output.filename = '[name]/[name].js';
    config.plugins = [
        new ExtractTextPlugin("styles.css"),
        new StringReplacePlugin()
    ];

    return config;
};