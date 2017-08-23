var express = require('express');
var router = express.Router();

router.use('/sysconfig', require('./api/sysconfig'));

router.use('/user', require('./api/user'));

router.use('/commodity', require('./api/commodity'));

router.use('/upload', require('./api/upload'));

module.exports = router;