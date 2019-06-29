'use strict'

const kurento = require('kurento-client');

kurento.register('kurento-module-gpuconcolidation');

class Camera {
    constructor(client, rtspUri, cameraId, filters) {
        this.client = client;
        this.rtspUri = rtspUri;
        this.filters = filters;
        this.cameraId = cameraId;

        this.pipeline = null;
        this.playerEndpoint = null;
        this.recorderEndpoint = null;

        console.error('[info] add camera ', rtspUri);
    }

    startFilters(filters, endPoint, callback) {
        if (filters && filters.length) {
            let f = filters[0];
            console.error('[info] startFilter', f);
            this.createFilter(f, endPoint)
            	.then((filter) => {
                    this.startFilters(filters.slice(1), filter, callback);
            	})
            	.catch((err) => {
                	console.error('[error] startFilters.catch', err);
                    callback(null);
                    return;
            	});
        } else {
            callback(endPoint);
        }
    }

    startStream() {
        return new Promise((resolve, reject) => {
            this.client.create('MediaPipeline', (error, pipeline) => {
                this.pipeline = pipeline;
                const params = {
                    uri: this.rtspUri,
                    useEncodedMedia: false,
                    networkCache: 0
                };
                this.pipeline.create('PlayerEndpoint', params, (error, player) => {
                    this.playerEndpoint = player;
                    if (error) {
                        reject('[err] pipeline.create PlayerEndpoint' + JSON.stringify(err));
                        return;
                    }
                    this.startFilters(this.filters, this.playerEndpoint, (filterEndPoint)=> {
                        try {
                            if (filterEndPoint == null) {
                                reject('[err] playerEndpoint.play()');
                                return;
                            }
                            this.endPoint = filterEndPoint;
                            let self = this;
                            function playStream() {
                                self.playerEndpoint.play((error) => {
                                   if (error) {
                                       reject('[err] playerEndpoint.play');
                                       return;
                                   } else {
                                       self.playerEndpoint.on('EndOfStream', event => {
                                           console.error('[info] EventInfo - EndOfStream');
                                           playStream();
                                       });
                                       console.log('[info] Now playing',  self.rtspUri);
                                       resolve();
                                   }
                               });
                           }
                           playStream();
                        } catch(err) {
                            console.error('[err]  playerEndpoint.play   ', err);
                            reject(err);
                        }
                    });
                });
            });
        });
    }

    stopStream() {
        return new Promise((resolve, reject) => {
            this.recorderEndpoin.stopAndWait((err) => {
                this.playerEndpoint.release();
                this.recorderEndpoin.release();
                this.pipeline.release();

                if (err) {
                    reject(JSON.stringify(err));
                }
                resolve();
            });
        });
    }
}

module.exports = Camera;
