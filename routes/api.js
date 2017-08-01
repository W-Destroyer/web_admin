var express = require('express');
var router = express.Router();

router.use('/login', require('./api/login'));

router.use('/sysconfig', require('./api/sysconfig'));

router.use('/user', require('./api/user'));

router.use('/product', require('./api/product'));

module.exports = router;