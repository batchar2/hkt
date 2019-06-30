import axios from 'axios';

import constants from '../../constants/report.consts.js';


export const getReportView = () => {
    return dispatch => {
        dispatch({
            type: constants.REPORT_VIEW,
            payload: {
                isSaved: false, /// !!!!
                id: 1,
                title: 'product1',
                description: 'sdfsdfsdfsdfsdf',
                pictures: [],
                camera: {
                    id: 1,
                    title: 'camera 1',
                },
                time_start: "10/03/2010",
                time_end: "10/03/2010",
            },
        });
    };
};

export default {getReportView};
