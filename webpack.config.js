const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const os = require('os');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var publicPath = 'http://localhost:3000';
// var publicPath = 'http://127.0.0.1:3000/dist';
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var HappyPack = require('happypack');

var webpackPlugins = [

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor.js'
    }),
    new HappyPack({loaders: ['babel-loader']}),
    // new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: true,
    //     compress: {
    //         warnings: true
    //     }
    // }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash',
        "window._": "lodash",
        "window.$": "jquery",
        "window.jQuery": 'jquery'
    }),
    // new webpack.ResolverPlugin([
    //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    // ]),
    // new HtmlWebpackPlugin({
    //     filename: __dirname + '/views/register.html',
    //     template: __dirname + '/public/dist/html/register.html',
    //     chunks: ['index','register']
    // }),
    // new HtmlWebpackPlugin({
    //     filename: __dirname + '/views/index.html',
    //     template: __dirname + '/public/dist/html/index.html',
    //     chunks: []
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //     minimize: true,
    //     debug: false,
    //     options: {
    //         context: __dirname
    //     }
    // })
    new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.NamedModulesPlugin(),
    // new webpack.NoErrorsPlugin()

];

var config = {
    // cache: true,
    // context: path.join(__dirname, 'public/src/'),
    // context: __dirname,
    entry: {
        // vendor: [
        //     "_",
        //     "jquery",
        //     // 'webpack-dev-server/client?http://localhost:3000',
        //     // 'webpack/hot/only-dev-server'
        // ],
        // vendor: ["_", "jquery", "react", "react-dom", "react-redux", "redux"],
        
        // test 

        // admin 
        "login":  './public/src/js/login.jsx',
        "index":  './public/src/js/index.jsx'
    },
    output: {
        path: __dirname + '/public/dist/',
        filename: "js/[name].js?[hash:8]",
        chunkFilename: "js/chunk/[id].js",
        publicPath: publicPath
    },
    module: {
        loaders:[{
            test: /\.js$/,
            loader: "happypack/loader"
        }, {
            test: /\.jsx$/,
            loader: "happypack/loader"
            // loader: "babel-loader"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.(jpg|png)$/,
            loader: "url-loader?limit=8192"
        }],
    },
    // devtool: "inline-source-map",
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'react-router-redux': 'ReactRouterRedux',
        'loadsh': '_'
    },
    resolve: {
        modules: [process.cwd() + '/public/src/', process.cwd() + '/node_modules/', process.cwd() + '/public/src/js_components/'],
        alias: {
            // 'underscore': 'underscore/underscore.js',
            'cryptoJs': 'crypto-js/crypto-js.js',
            'axios': 'axios/axios.js',
            'lodash': 'lodash/lodash.js',
            // 'react': lib + 'js_components/react/react.js',
            // 'react-dom': lib + 'js_components/react/react-dom.js',

            // 'react': 'react',
            // 'react-dom': 'react-dom',

            // 'react-router': 'react-router/modules',
            // 'redux': 'redux/dist/redux.js',
            // 'react-redux': 'react-redux/dist/react-redux.js',
            // 'react-router-redux': 'react-router-redux/src/index.js',
            'redux-logger': 'redux-logger/index.js',
            'redux-thunk': 'redux-thunk/redux-thunk.js',
            'antd': 'antd',

            // redux devtool
            'redux-devtools-extension': 'redux-devtools-extension/index.js',

            'webpack': 'webpack',
            'webpack-dev-server': 'webpack-dev-server',

            'module': 'js/module',
            'utils': 'js/utils',
        },
        extensions: ['.js', '.html', '.jsx', '.json', '.ejs']
    },
    plugins: webpackPlugins
}

module.exports = config;
