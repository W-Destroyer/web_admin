const router = require('express').Router();
const _ = require('underscore');
const { SHA1 } = require('crypto-js');

router.get('/', (req, res) => {
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
    return res.sendJSON({
        code: 0,
        data: '登录成功'
    })
})

module.exports = router;