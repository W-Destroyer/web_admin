const express = require('express');
const router = express.Router();
const { SHA1 } = require('crypto-js');
const request = require('request');
const nws = require('../../nws/nws');
const rp = require('request-promise');

router.post('/login', (req, res) => {
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
        if (body.code != 0 )
            return res.sendJSON(body);
        if (req.body.remember)
            res.cookie('username', req.body.username);
        res.cookie('token', body.data.token, {
            httpOnly: true
        });
        res.sendJSON({
            code: 0,
            data: '登录成功'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.sendJSON({
        code: 0,
        data: '登出成功'
    });
})

module.exports = router;
