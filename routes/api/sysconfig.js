const express = require('express');
const router = express.Router();

const nws = require('../../nws/nws');
const request = require('request');

const rp = require('../../utils/request-promise');

router.get('/getCompanyName', (req, res) => {
    rp(nws('/sysconfig/getCompanyName')).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/setCompanyName', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/sysconfig/setCompanyName'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.get('/listFriendLink', (req, res) => {
    rp(nws('/sysconfig/friendLink/list')).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.post('/saveFriendLink', (req, res) => {
    var data = req.body.data;
    rp({
        method: 'POST',
        uri: data.id == -1 ? nws('/sysconfig/friendLink/create') : nws('/sysconfig/friendLink/update'),
        body: data,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.post('/delFriendLink', (req, res) => {
    var data = {
        id: req.body.id
    }
    rp({
        method: 'POST',
        uri: nws('/sysconfig/friendLink/delete'),
        body: data,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
})

module.exports = router;