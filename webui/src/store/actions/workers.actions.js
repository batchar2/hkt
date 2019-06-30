import axios from 'axios';

import constants from '../../constants/workers.consts.js';

export const getWorkers = (cameraId) => {
    return dispatch => {
        dispatch({
            type: constants.GET_WORKERS,
            payload: {
                workers: {
                    zones: {
                        undef: {
                            number: 0,
                            name: "Вне зон"
                        },
                        zone1: {
                            number: 1,
                            name: "zone1"
                        }
                    },
                    total: 1,
                    violations: [{
                        label: "helmet",
                        name: "helmet"
                    }]
                }
            },
        });
    };
};

export default {getWorkers};
