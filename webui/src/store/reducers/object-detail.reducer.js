import constants from '../../constants/object-detail.consts.js';

const initialState = [];

const objectDetailReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_OBJECT_DETAIL:
            return action.payload;
        case constants.HOVER_CHANGED:
            return action.payload;
        case constants.OBJECT_ADD_PICTURE:
            return action.payload;
        case constants.OBJECT_SAVE:
            return action.payload;
        case constants.OBJECT_DELETE:
            return action.payload;
        default:
            return state;
    }
};


export default objectDetailReducer;
