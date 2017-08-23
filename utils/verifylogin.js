const rp = require('request-promise');
const nws = require('../nws/nws');

/**
 * 检测请求接口是否需要登录权限 验证用户是否登录
 * 未登录时 返回
 */

const whiteList = {
    '/login': true,
    '/api/login': true,
}

function verifyLogin() {
    return (req, res, next) => {
        if (whiteList[req.path])
            return next();
        var token = req.cookies['token'];
        if (!token) {
            if (isApi(req))
                return res.sendJSON(new Error('请先登录'));
            else 
                return res.redirect('/login');
        }
        console.log('token', token)
        var options = {
            uri: nws('/user/verifyLogin'),
            qs: {
                token: token
            },
            json: true
        }
        rp(options).then(body => {
            console.log(typeof body)
            if (body.code != 0)
                return res.sendJSON(body)
            next();
        }).catch(err => {
            res.sendJSON(err);
        });
    }
}

function isApi(req) {
    var path = req.path;
    var reg = new RegExp('^/api/');
    return reg.test(path);
}

module.exports = verifyLogin;