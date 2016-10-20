var node_dir = __dirname + '/node_modules',
    Webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var appVariables = {
    __DEVELOPMENT_MODE__: JSON.stringify(process.env.DEVELOPMENT_MODE),
};

module.exports = function(options, comp) {
    var config = {
        devtool: '#sourcemap',
        entry: {},
        output: {
            filename: 'bundle.js',
            path: __dirname + '/build/'
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            alias: {},
            root: [__dirname + '/app/assets/javascripts', __dirname + '/app/assets/stylesheets']
        },
        module: {
            noParse: [],
            loaders: [
                {
                    test: /\.(ttf|otf|png|ico|woff|eot|jpg|svg|gif|zip)(\?.*)?$/,
                    loader: options.isDev ? 'file?name=' + '/[name].[ext]' :
                        'file?name=[name].[ext]'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-0']
                    }
                }
            ]
        },
        plugins: [
            new Webpack.DefinePlugin(appVariables),
            new HtmlWebpackPlugin({
                template: 'app/assets/javascripts/index.ejs',
                chunks: [],
                filename: ('index.html'),
                inject: true,
                isDev: options.isDev,
                appName: 'LunchOrder'
            })
        ]
    };

    if (options.isDev) {
        config.devtool = '#cheap-module-eval-source-map';
        config.debug = true;
        config.output.publicPath = 'http://' + options.ip + ':' + options.port + '/';
        config.module.loaders.push({
            test: /\.styl$/,
            loader: 'style!css?sourceMap&sourceComments!stylus'
        });
    } else {
        config.plugins.push(new Webpack.optimize.UglifyJsPlugin());
        config.plugins.push(new ExtractTextPlugin("styles_[name].[hash].css"));
    }

    var nodes = [__dirname + '/app/assets/javascripts/app.jsx'];
    config.entry['LunchOrder'] = nodes;

    return config;
};