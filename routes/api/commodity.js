const express = require('express');
const router = express.Router();
const _ = require('underscore');
const nws = require('../../nws/nws');
const request = require('request');

router.get('/listClassify', (req, res) => {
    request(nws('/classify/listall'), (err, result, body) => {
        console.log(body)
        if(err)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
});

router.get('/listProduct', (req, res) => {
    var data = {
        start: req.query.start,
        length: req.query.length,
        type: req.query.type
    }
    request(nws(`/product/listProduct?start=${req.query.start}&length=${req.query.length}&type=${req.query.type}`), (err, result, body) => {
        if(err)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
})

module.exports = router;
