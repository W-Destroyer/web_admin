var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var argv = require('yargs').argv;

/**
 * 请求中间件 
 * @middleware 输出日志文件 打印日志；
 * @verifyLogin  验证是否登录；
 * @visitCount 请求计数
 */

var middleware = require('./utils/middleware');
var verifyLogin = require('./utils/verifylogin');
var setVisitCount = require('./utils/visitcount');

/**
 * 前端构建工具 打包压缩
 * webpack
 */
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", ejs.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public/src/images
app.use(favicon(path.join(__dirname, 'public/src/images', 'favicon.ico')));
app.use(logger('dev'));

// 设置express接收表单大小
// app.use(express.json({limit: '50mb'}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

if (argv.dev) {
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true,
        stats: {
            warnings: false,
            colors: true
        },
        hot: true
    }));
    app.use(webpackHotMiddleware(compiler))
}
app.use(setVisitCount());
app.use(middleware());
app.use(verifyLogin());

/** 
 * 路由控制
 */
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use('*', require('./routes/error'));

module.exports = app;