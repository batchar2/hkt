import axios from 'axios';

import constants from '../../constants/camera-detail.consts.js';


export const loadCameraDetail = (cameraId) => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь


        axios.get(`${axios.defaults.baseURL}/api/object/1/camera/${cameraId}`)
            .then(res => {
                dispatch({
                    type: constants.GET_CAMERA_DETAIL,
                    payload: res.data,
                });
            });


        // dispatch({
        //     type: constants.GET_CAMERA_DETAIL,
        //     payload: {
        //       id: 1,
        //       name: "camera 1",
        //       screenshot: "/media/restapi/1.png",
        //       position_coords: "qweqweqwe",
        //     }
        // });
    }
};

export const deleteCamera = (id) => {
    return dispatch => {
        dispatch({
            type: constants.CAMERA_DELETE,
            payload: null
        })
    }
}

export const saveCamera = (camera) => {
    return dispatch => {
        dispatch({
            type: constants.CAMERA_SAVE,
            payload: null
        })
    }
};

export const editCamera = (id) => {
    return dispatch => {
        dispatch({
            type: constants.CAMERA_EDIT,
            payload: null
        })
    }
}

export default {loadCameraDetail, saveCamera, deleteCamera, editCamera};
