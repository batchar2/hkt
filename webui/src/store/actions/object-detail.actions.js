import axios from 'axios';

import constants from '../../constants/object-detail.consts.js';


export const loadObjectDetail = (objectId) => {
    return dispatch => {
        axios.get(`${axios.defaults.baseURL}/api/object/${objectId}`)
            .then(res => {
                console.error('loadObjectDetail >>>', res.data);
                dispatch({
                    type: constants.GET_OBJECT_DETAIL,
                    payload: res.data,
                });
            });
    }
};

export const hoverChanged = (obj, area, hoverVal) => {
    return dispatch => {
        let st = {...obj}
        console.error("!!!===== ", area);
        st.hoveredArea = area;
        if (area) {
            st.hoveredImage = area.screenshot;
        }
        // for (let i = 0; i < st.cameras.length; i++ ) {
        //     if (st.cameras[i].id == camera.camid) {
        //         st.cameras[i].isHovered = hoverVal;
        //     }
        // }
      dispatch({
          type: constants.HOVER_CHANGED,
          payload: st,
      });
      /**
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
      */
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
