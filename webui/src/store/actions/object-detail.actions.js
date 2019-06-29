import axios from 'axios';

import constants from '../../constants/object-detail.consts.js';


export const loadObjectDetail = (objectId) => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь
        dispatch({
            type: constants.GET_OBJECT_DETAIL,
            payload: {
                id: 1,
                name: "object1",
                picture: "./map.jpg",
                cameras: [{
                    id: 1,
                    name: "camera 1",
                    screenshot: "/media/restapi/1.png",
                    position_coords: "qweqweqwe",
                    isHovered: false,
                },
                {
                    id: 2,
                    name: "camera 2",
                    screenshot: "/media/restapi/1.png",
                    position_coords: "qweqweqwe",
                    isHovered: false,
                },
                {
                    id: 3,
                    name: "camera 3",
                    screenshot: "/media/restapi/1.png",
                    position_coords: "qweqweqwe",
                    isHovered: false,
                },
              ]
            }
        });
    }
};

export const hoverChanged = (obj, camera, hoverVal) => {
    return dispatch => {
      dispatch({
        type: constants.HOVER_CHANGED,
        payload: {
            id: 1,
            name: "object1",
            picture: "./notfound.png",
            cameras: [{
                id: 1,
                name: "camera 1",
                screenshot: "/media/restapi/1.png",
                position_coords: "qweqweqwe",
                isHovered: hoverVal,
            },
            {
                id: 2,
                name: "camera 2",
                screenshot: "/media/restapi/1.png",
                position_coords: "qweqweqwe",
                isHovered: hoverVal,
            },
            {
                id: 3,
                name: "camera 3",
                screenshot: "/media/restapi/1.png",
                position_coords: "qweqweqwe",
                isHovered: hoverVal,
            },
          ]
        }
      });
    }
};

export const addPicture = (picture, object) => {
    return (dispatch) => {
        dispatch({
            type: constants.OBJECT_ADD_PICTURE,
            payload: {id: 1,
            name: "object1",
            picture: picture,
            cameras: [{
                id: 1,
                name: "camera 1",
                screenshot: "/media/restapi/1.png",
                position_coords: "qweqweqwe",
                isHovered: false,
            }]
          }
        });
    };
}

export const saveObject = (name, picture) => {
    console.error(name, picture);
    return (dispatch) => {
        dispatch({
            type: constants.OBJECT_SAVE,
            payload: {
              id: 1,
              name: "object1",
              picture: picture,
            }
        });
    };
}

export const deleteObject = (id) => {
    return (dispatch) => {
        dispatch({
            type: constants.OBJECT_DELETE,
            payload: {
              id: 1,
              name: "object1",
              picture: null,
            }
        });
    };
}

export default {loadObjectDetail, hoverChanged, addPicture, saveObject, deleteObject};
