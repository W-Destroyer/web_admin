var express = require('express');
var router = express.Router();

const request = require('request');

router.get('*', (req, res) => {
    res.render('index', {
        title: "admin",
        
        preloadedState: {
            username: "Piny",
            userImg: "//localhost:8080/upload/userImg/user.png",
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;