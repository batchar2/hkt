'use strict';
//const ws = require('ws');
const http = require('http');
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const KurentoManage = require('./kurento-manage');

const port = process.env.PORT || '3001';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var sessionHandler = session({
    secret : 'none',
    rolling : true,
    resave : true,
    saveUninitialized : true
});
app.use(sessionHandler);
app.set('port', port);



//const express_ws = require('express-ws')(app);

var kurentoURI = 'ws://localhost:8888/kurento';
if (process.env.KURENTO_HOST) {
    kurentoURI = 'ws://' + process.env.KURENTO_HOST + ':8888/kurento';
}

let kurentoManage = new KurentoManage(kurentoURI);

//console.log(kurnetoClient);

app.post("/api/stream/start/", (req, res, next) => {
    console.log(req.body)
    let cameraId = req.body.camera_id;
    let cameraUri = req.body.camera_uri;



    //console.log(cameraUri, fileUri);
    // kurentoManage.startRecord('file:///home/bat/Video/small.mp4', '/home/bat/data/file1.mp4')
    kurentoManage.startStream(cameraId, cameraUri)
        .then(() => {
            res.send({
                status: 'ok',
            })
        })
        .catch(err => {
            console.error(`[err] Error: ${err}`);
            res.send({
                status: 'error',
                msg: err,
            });
        });
});


app.post("/api/stream/stop/", (req, res, next) => {
    let cameraId = req.body.camera_id;
    let cameraUri = req.body.camera_uri;
    kurentoManage.startStream(cameraUri)
        .then(() => {
            res.send({
                status: 'ok',
            });
        })
        .catch(err => {
            console.error(`[err] Error: ${err}`);
            res.send({
                status: 'error',
                msg: err,
            });
        })
});


app.listen(3001, () => {
    console.error('[info] Server is up and running on port number ' + port);
});
