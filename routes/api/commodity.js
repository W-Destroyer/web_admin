const express = require('express');
const router = express.Router();
const _ = require('underscore');
const nws = require('../../nws/nws');
const request = require('request');
const qs = require('qs');

const path = require('path');
const rp = require(path.resolve('utils/request-promise'));

/*******************产品分类 CURD Begin*****************************/
router.get('/listClassify', (req, res) => {
    rp(nws('/classify/listall')).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    })
});

router.post('/createClassify', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/classify/create'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/updateClassify', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/classify/update'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/deleteClassify', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/classify/delete'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

/*******************产品分类 CURD End*****************************/

/*******************产品 CURD Start*****************************/
router.get('/listProduct', (req, res) => {
    var data = {
        start: req.query.start,
        length: req.query.length,
        type: req.query.type
    }

    rp(nws('/product/listall'), {
        qs: data
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/createProduct', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/product/create'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/updateProduct', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/commodity/updateProduct'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

router.post('/deleteProduct', (req, res) => {
    rp({
        method: 'POST',
        uri: nws('/product/delete'),
        body: req.body,
        json: true
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => res.sendJSON(err));
});

/*******************产品 CURD End*****************************/

module.exports = router;
