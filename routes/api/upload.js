const express = require('express');
const router = express.Router();

router.post('/productImages', (req, res) => {
    console.log(req);
    res.sendJSON({
        code: 0,
        data: '保存成功'
    })
});

module.exports = router;