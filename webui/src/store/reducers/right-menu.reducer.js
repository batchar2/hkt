import constants from '../../constants/right-menu.consts.js';

const initialState = [];

const rightMenuReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_OBJECTS:
            return action.payload;
        default:
            return state;
    }
};


export default rightMenuReducer;
