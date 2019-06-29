import axios from 'axios';

import constants from '../../constants/product.consts.js';


export const onListProducts = () => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь
        dispatch({
            type: constants.PRODUCT_LIST,
            payload: [
                {
                    title: 'product1',
                    camera: {
                        id: 1,
                        title: 'camera 1',
                    },
                    time_start: "10/03/2010",
                    time_end: "10/03/2010",
                },
                {
                    title: 'product2',
                    camera: {
                        id: 1,
                        title: 'camera 1',
                    },
                    time_start: "10/03/2010",
                    time_end: "10/03/2010",
                }
            ]
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


export default {onListProducts};
