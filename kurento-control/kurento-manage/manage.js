'use strict';

const kurnetoClient = require('./client');
const Camera = require('./camera');

class Manage {
    constructor(wsUrl) {
        this._cameras = {};
        kurnetoClient(wsUrl)
            .then(client => {
                console.log('succes kurento client create');
                this.kurentoClient = client;
            })
            .catch(err => {
                console.error('[err] kurentoClient error ' + JSON.stringify(err));
            })
    }

    startStream(cameraId, cameraUri) {
        return new Promise((resolve, reject) => {
            let filters = [];
            filters.push({
                name: 'gpuconcolidation.GpuConcolidation',
                options: {"camera_id": "camera_" + cameraId}
            });

            if (this._cameras[cameraUri] === undefined) {
                console.log('!!!')
                let camera = new Camera(this.kurentoClient, cameraUri, cameraId);
                camera.startStream()
                    .then(() => {
                        this._cameras[cameraUri] = camera;
                        resolve();
                    })
                    //.catch(err => {
                    //    reject(err);
                    //});
            } else {
                reject('the camera is already running');
            }
        });
    }

    stopStream(cameraId, cameraUri) {
        return new Promise((resolve, reject) => {
            let camera = this._cameras[cameraUrl];
            if (camera) {
                camera.stopStream()
                    .then(() => {
                        delete this._cameras[cameraUrl];
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                reject('camera not found');
            }
        });
    }
}

module.exports = Manage;
