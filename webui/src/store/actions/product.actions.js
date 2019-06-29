import axios from 'axios';

import constants from '../../constants/product.consts.js';


export const loadProductDetail = () => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь

        dispatch({
            type: constants.PRODUCT_DETAIL_FETCH,
            payload: {
                isSaved: false, /// !!!!
                id: 1,
                title: 'product1',
                description: 'sdfsdfsdfsdfsdf',
                pictures: [],
                camera: {
                    id: 1,
                    title: 'camera 1',
                },
                time_start: "10/03/2010",
                time_end: "10/03/2010",
            },
        });
    };
};


export const saveProduct = (data) => {

    return (dispatch) => {
        dispatch({
            type: constants.PRODUCT_SAVE_SUCCESS,
            payload: {
                isSaved: true, /// !!!!
            },
        });
    };
    //dispatch(productActions.saveData(data));
};

export const addPictures = (pictures, product) => {
    return (dispatch) => {
        dispatch({
            type: constants.PRODUCT_ADD_PICTURES,
            payload: {
                isSaved: product.isSaved, /// !!!!
                id: product.id,
                title: product.title,
                description: product.description,
                pictures: pictures,
                camera: {
                    id: product.camera.id,
                    title: product.camera.title,
                },
                time_start: product.time_start,
                time_end:   product.time_end,
            }
        });
    };
}




export default {loadProductDetail, saveProduct, addPictures};
