var node_dir = __dirname + '/node_modules',
    Webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    StringReplacePlugin = require("string-replace-webpack-plugin"),
    AppCachePlugin = require('appcache-webpack-plugin');

var appVariables = {
    __SOCKET_URL__: JSON.stringify(process.env.SOCKET_URL),
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
            extensions: ['', '.js', '.jsx', '.styl'],
            alias: {},
            root: [__dirname + '/src/app', __dirname + '/src/assets']
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
                    test: /\.json$/,
                    loader: 'file?name=[name]/app.json'
                },
                {
                    test: /\.proto$/,
                    loader: 'proto-loader'
                },
                {
                    test: /\.json$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [{
                            pattern: /<ip>:<port>/g,
                            replacement: function() {
                                return options.ip + ':' + options.port
                            }
                        }]
                    })
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
            new StringReplacePlugin(),
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
        config.module.loaders.push({
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!stylus')
        });
    }

    var nodes = [__dirname + '/app/assets/javascripts/app.jsx'];
    config.entry['LunchOrder'] = nodes;

    return config;
};