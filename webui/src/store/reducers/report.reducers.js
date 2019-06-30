import constants from '../../constants/report.consts.js';

const initialState = [];

const reportReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.REPORT:
            return action.payload;
        case constants.REPORT_VIEW:
            return action.payload;
        default:
            return state;
    }
};
