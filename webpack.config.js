var node_dir = __dirname + '/node_modules',
    Webpack = require('webpack');

var appVariables = {
    __DEVELOPMENT_MODE__: JSON.stringify(process.env.DEVELOPMENT_MODE),
};

module.exports = {
    entry: './app/assets/javascripts/app.jsx',
    output: {
        filename: 'index.js',
        path: './app/assets/javascripts/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {},
        root: [__dirname + '/app/assets/javascripts', __dirname + '/app/assets/stylesheets']
    },
    devServer: {
        inline: true,
        port: 3333
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