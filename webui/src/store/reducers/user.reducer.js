import constants from '../../constants/user.consts.js';

const initialState = {
    isAuth:  false,
    isAnonimus: false,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.AUTH_LOGIN_FETCH:
            return action.payload;
        case constants.AUTH_LOGOUT:
            return {
                isAuth:  false,
                isAnonimus: false,
            }
        default:
            return state;
    }
};


export default userReducer;
