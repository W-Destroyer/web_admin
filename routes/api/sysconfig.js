const express = require('express');
const router = express.Router();

const nws = require('../../nws/nws');
const request = require('request');

router.get('/getCompanyName', (req, res) => {
    request(nws('/sysconfig/getCompanyName'), (err, result, body) => {
        if(err instanceof Error)
            return res.sendJSON(err);
        res.sendJSON(body)
    })
});

router.post('/setCompanyName', (req, res) => {
    // var data = req.body;
    var data = {
        companyName: req.body.companyName
    }
    request.post(nws('/sysconfig/setCompanyName'), {
        form: data
    }, (err, result, body) => {
        if(err instanceof Error)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
});

router.get('/listFriendLink', (req, res) => {
    request(nws('/sysconfig/listFriendLink'), (err, result, body) => {
        if(err instanceof Error)
            return res.sendJSON(err);
        res.sendJSON(body);
    });
});

router.post('/saveFriendLink', (req, res) => {
    var data = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    };
    request.post(nws('/sysconfig/saveFriendLink'), {
        form: data
    }, (err, result, body) => {
        if(err instanceof Error)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
});

router.post('/delFriendLink', (req, res) => {
    var data = {
        id: req.body.id
    }
    request.post(nws('/sysconfig/delFriendLink'), {
        form: data
    }, (err, result, body) => {
        if (err instanceof Error)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
})

module.exports = router;