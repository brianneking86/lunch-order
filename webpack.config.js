var Webpack = require('webpack');

module.exports = {
    entry: './app/assets/javascripts/main.jsx',
    output: {
        filename: 'index.js',
        path: './app/assets/javascripts/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {},
        root: ['./app/assets/javascripts']
    },
    devServer: {
        inline: true,
        port: 3333,
        publicPath: '/',
        contentBase: './app/assets/javascripts/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};