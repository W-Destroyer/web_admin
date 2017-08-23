const router = require('express').Router();
const _ = require('underscore');
const { SHA1 } = require('crypto-js');
const request = require('request');
const nws = require('../../nws/nws');
const rp = require('request-promise');

router.get('/', (req, res) => {
    return res.render('index')
    return res.sendJSON({
        code: 0,
        data: '登录成功'
    })
    var username = req.query.username;
    var password = req.query.password;
    var userResult = User.find({name: username});
    userResult.then( data => {
        if( !!data.length ) return res.sendJSON(new Error("login error"));
        if( data[0].password == SHA1(password) ) {
            res.sendJSON("login success");
        } else {
            res.sendJSON(new Error("login error"))
        }
    }).catch(error => {
        res.sendJSON(new Error("login error"))
    })

});

router.post('/', (req, res) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    rp({
        method: 'POST',
        uri: nws('/user/login'),
        body: data,
        json: true
    }).then(body => {
        if (req.body.remember)
            res.cookie('username', req.body.username)
        if (body.code != 0 )
            return res.sendJSON(body);
        res.cookie('token', body.data.token, {
            httpOnly: true
        });
        res.sendJSON({
            code: 0,
            data: '登录成功'
        })
    }).catch(err => {
        res.sendJSON(err);
    });
})

module.exports = router;