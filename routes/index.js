var express = require('express');
var router = express.Router();

const request = require('request');

router.get('*', (req, res) => {
    res.render('index', {
        title: "admin",
        username: "Piny",
        userImg: "/upload/userImg/user.png"
    });
    // request('http://localhost:8080/add', (err, response, body) => {
    //     res.send(response.body);
    // })
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;