const express = require('express');
const router = express.Router();
const _ = require('underscore');
const nws = require('../../nws/nws');
const request = require('request');
const qs = require('qs');

const rp = require('request-promise');

router.get('/classify', (req, res) => {
    rp(nws('/classify')).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err)
    })
});

router.get('/classify/:id', (req, res) => {
    // rp()
})
var t_id = 100
router.post('/classify', (req, res) => {
    t_id++;
    return res.sendJSON({
        code: 0,
        data: {
            t_id: t_id,
            t_typename: req.body.typename,
            t_desp: req.body.describe
        },
        message: '保存成功！'
    })
    var data = req.body;
    rp(nws('/classify'), {
        data: data
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.put('/classify/:id', (req, res) => {
    var id = req.params.id;
    var data = req.body.data;
    rp(nws('/classify/' + id), {
        data: data
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(body);
    });
});

router.patch('/classify/:id', (req, res) => {
    var id = req.params.id;
    var data = req.body.data;

    rp.patch(`/classify/${id}`, {
        data: data
    }).then(body => {
        res.sendJSON(body);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.delete('/classify/:id', (req, res) => {

    rp.delete('/classify/')
})

router.get('/listClassify', (req, res) => {
    request(nws('/classify/listall'), (err, result, body) => {
        console.log(body)
        if(err)
            return res.sendJSON(err);
        res.sendJSON(body);
    })
});

router.post('/addClassify', (req, res) => {
    res.sendJSON({
        code: 0,
        data: '添加成功！'
    })
});

router.post('/changeClassify', (req, res) => {
    res.sendJSON({
        code: 0,
        data: '修改成功！'
    })
});

router.post('/deleteClassify', (req, res) => {
    res.sendJSON({
        code: 0,
        data: '删除成功！'
    })
})

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
});

router.post('/addProduct', (req, res) => {
    request.post(nws(`/product/addProduct`), {
        form: {
            data: JSON.stringify(req.body)
        }
    }, (err, result, body) => {
        if (err)
            return res.sendJSON(err)
        res.sendJSON(body);
    });
})

router.post('/deleteProduct', (req, res) => {
    res.sendJSON({
        code: 0,
        data: '删除成功！'
    })
})

module.exports = router;
