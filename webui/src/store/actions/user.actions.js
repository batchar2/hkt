import axios from 'axios';

import constants from '../../constants/user.consts.js';


export const onLogin = (email, password) => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь
        dispatch({
            type: constants.AUTH_LOGIN_FETCH,
            payload: {
                isError: false,
                isAuth:  true,
                isAnonimus: false,
                username: 'batchar2',
                key: 'oweropwerljbbfkbflkwgr',
            }
        });
        // dispatch({
        //     type: constants.AUTH_LOGIN_FETCH,
        //     payload: {
        //         isError: true,
        //         isAuth:  false,
        //         isAnonimus: false,
        //         username: 'batchar2',
        //         key: 'oweropwerljbbfkbflkwgr',
        //     }
        // });
    }
};

export const onLogout = () => {
    return dispatch => {
        dispatch({
            type: constants.AUTH_LOGOUT,
            payload: {
            }
        });
    }
}


export default {onLogin};
