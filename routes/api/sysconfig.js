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
})

router.post('/setCompanyName', (req, res) => {
    // var data = req.body;
    console.log(req.body);
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
})

module.exports = router;