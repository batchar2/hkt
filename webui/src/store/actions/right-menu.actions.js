import axios from 'axios';

import constants from '../../constants/right-menu.consts.js';

export const onGetObjects = (email, password) => {
    return dispatch => {
        axios.get(`${axios.defaults.baseURL}/api/objects/list`)
            .then(res => {
                dispatch({
                    type: constants.GET_OBJECTS,
                    payload: res.data,
                });
            });
    }
};

export default {onGetObjects};
