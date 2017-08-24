const express = require('express');
const router = express.Router();

const rp = require('request-promise');
const nws = require('../nws/nws');

const aysnc = require('async');

router.get('/login', (req, res) => {
    res.render('login');
});

const whiteList = {
    '/': true,
    '/production/classify': true,
    '/pagesetting/fullstation': true
}

router.get('*', (req, res, next) => {
    var url = req.url;
    
    if (!whiteList[url])
        return next();

    getPreloadedState(req).then(preloadedState => {
        res.render('index', {
            title: '后台管理系统',
            preloadedState: preloadedState
        });
    }).then(err => {

    });
});

function getPreloadedState(req) {
    
    var token = req.cookies['token'];

    var preloadedState = {
        // baseinfo: {
        //     author: 'Piny'
        // },
        userinfo: {}
    }

    var options = {
        uri: nws('/user/currentInfo'),
        qs: {
            token: token
        },
        json: true
    }

    return new Promise((resolve, reject) => {
        
        rp(options).then(body => {
            if (body.code != 0)
                resolve(preloadedState)

            preloadedState.userinfo = body.data;

            resolve(preloadedState);
        }).catch(err => {
            reject(preloadedState);
        });
    });
}

// function getUserCurrentInfo(cb) {
//     var options = {
//         uri: nws('/user/currentInfo'),
//         qs: {
//             token: token
//         },
//         json: true
//     }
//     rp(options).then(body => {
//         cb(null, body);
//     }).catch(err => {
//         cb(err);
//     })
// }

module.exports = router;