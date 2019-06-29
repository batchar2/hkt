import constants from '../../constants/product.consts.js';



const initialState = {};//[{}];

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.PRODUCT_DETAIL_FETCH:
            return action.payload;
        case constants.PRODUCT_SAVE_SUCCESS:
            return action.payload;
        case constants.PRODUCT_ADD_PICTURES:
            return action.payload;
        default:
            return state;
    }
};


export default productReducer;
