import constants from '../../constants/product.consts.js';


const initialState = [];//[{}];



const productListReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.PRODUCT_LIST:
            return action.payload;
        case constants.PRODUCT_LIST_FETCH:
            return action.payload;
        case constants.PRODUCT_DETAIL_FETCH:
            return action.payload;
        case constants.PRODUCT_SAVE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};


export default productListReducer;
