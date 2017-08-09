const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const request = require('request');
const nws = require(path.resolve('nws/nws'));

router.post('/productImages', (req, res) => {
    var data = {};
    var files = [];
    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        uploadDir: path.resolve('upload')
    });

    form.parse(req)
        .on('error', err => {
            res.sendJSON(err);
        }).on('progress', (bytesReceived, bytesExpected) => {
            // console.log(bytesReceived, bytesExpected)
        }).on('field', (name, value) => {
            // console.log(name, value);
        }).on('file', (name, file) => {
            // console.log(name, file);
            files.push(file);
        }).on('end', () => {
            // request.post(nws('/upload/productImages'))
            res.sendJSON({
                code: 0,
                data: 'success'
            })
        });

    // formidable的事件
    // form.parse(req);

    // form.on('progress', (bytesReceived, bytesExpected) => {
    //     console.log('progress')
    // });

    // form.on('field', (name, value) => {
    //     console.log('field')

    // });

    // form.on('fileBegin', (name, file) => {
    //     console.log('fileBegin')

    // });

    // form.on('file', (name, file) => {
    //     console.log('file')

    // });

    // form.on('error', err => {
    //     console.log('file')

    // });

    // form.on('aborted', () => {
    //     console.log('aborted')

    // });

    // form.on('end', () => {
    //     console.log('end')
    //     res.sendJSON({
    //         code: 0,
    //         data: 'success'
    //     })
    // })
});

module.exports = router;