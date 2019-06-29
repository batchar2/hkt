import constants from '../../constants/camera-detail.consts.js';

const initialState = [];

const cameraDetailReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_CAMERA_DETAIL:
            return action.payload;
        case constants.CAMERA_EDIT:
            return action.payload;
        case constants.CAMERA_SAVE:
            return action.payload;
        case constants.CAMERA_DELETE:
            return action.payload;
        default:
            return state;
    }
};


export default cameraDetailReducer;
