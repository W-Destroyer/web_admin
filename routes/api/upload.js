const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const request = require('request');
const nws = require(path.resolve('nws/nws'));

// 每次只能上传一张图片
router.post('/productImages', (req, res) => {

    var data = {};
    var files = [];
    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        uploadDir: path.resolve('upload')
    });

    form.parse(req, (err, fields, files) => {
        if (err)
            return res.sendJSON(err);
        var data = fields;
        console.log(files);
        var name = files.masterPic.name;
        var picPath = files.masterPic.path;
        var size = files.masterPic.size;
        var type = files.masterPic.type;
        var readStream = fs.createReadStream(picPath);
        
        var r = request.post(nws('/upload/productImages'), {
            form: {
                data,
                name,
                size,
                type
            }
        }, (err, result, body) => {
            fs.unlink(picPath);
            if (err)
                return res.sendJSON(err);
            res.sendJSON(result);
        });
        readStream.pipe(r);
    })

    // form.parse(req)
    //     .on('error', err => {
    //         res.sendJSON(err);
    //     }).on('progress', (bytesReceived, bytesExpected) => {
    //         // console.log(bytesReceived, bytesExpected)
    //     }).on('field', (name, value) => {
    //         // console.log(name, value);
    //         data[name] = value;
    //     }).on('file', (name, file) => {
    //         // console.log(name, file);
    //         files.push(file);
    //     }).on('end', () => {
    //         var formData = {
    //             data: data,
    //             productImage: files//fs.createReadStream(files[0].path)
    //         }
    //         request.post(nws('/upload/productImages'), {
    //             formData: formData
    //         },(err, result, body) => {
    //             console.log(body);
    //             res.sendJSON(body)
    //         })
    //     });

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