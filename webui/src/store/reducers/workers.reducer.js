import constants from '../../constants/workers.consts.js';

const initialState = [];

const workersReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_WORKERS:
            return action.payload;
        default:
            return state;
    }
};
export default workersReducer;
