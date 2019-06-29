'use strict'
const kurento = require('kurento-client');

var kurentoClient = null;

function getKurentoClient(uri) {
    return new Promise((resolve, reject) => {
        if (kurentoClient) {
            resolve(kurentoClient);
        }
        kurento(uri, (error, _kurentoClient) => {
            if (error) {
                console.log("Could not find media server at address " + uri);
                reject('Could not find media server at address'
                                +  uri + '.'
                                + 'Exiting with error ' + error);
            } else {
                kurentoClient = _kurentoClient;
                resolve(kurentoClient);
            }
        });
    });
}

module.exports = getKurentoClient;
