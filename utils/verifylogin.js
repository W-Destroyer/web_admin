const rp = require('request-promise');
const nws = require('../nws/nws');

/**
 * 检测请求接口是否需要登录权限 验证用户是否登录
 * 未登录时 返回
 */

const whiteList = {
    '/login': true,
    '/api/user/login': true,
}

function verifyLogin() {
    return (req, res, next) => {
        if (whiteList[req.path])
            return next();
        var token = req.cookies['token'];

        if (!!token) {
            console.log('token', token);

            var options = {
                uri: nws('/user/verifyLogin'),
                qs: {
                    token: token
                },
                json: true
            }
            rp(options).then(body => {
                console.log(body)
                if (body.code === 0)
                    return next();
                
                if (isApi(req)) 
                    return res.sendJSON(body);
                
                res.redirect(redirectUrl(req));
            }).catch(err => {
                res.redirect(redirectUrl(req));
            });
            return;
        }

        if (isApi(req))
            return res.sendJSON(new Error('请先登录'));
        
        res.redirect(redirectUrl(req));
    }
}

function isApi(req) {
    var path = req.path;
    var reg = new RegExp('^/api/');
    return reg.test(path);
}

function redirectUrl(req) {
    var strLogin = '/login';
    console.log(req.url);
    if (req.url != '/')
        strLogin += '?' + encodeURIComponent(req.url);
    return strLogin;
}

module.exports = verifyLogin;