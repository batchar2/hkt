import React from 'react';
import {connect} from 'react-redux';

import productListReducer from '../../store/actions/product-list.actions.js';

import ProductInTableItem from '../../components/ProductInTableItem';

class ProductList extends React.Component {

    componentDidMount() {
        this.props.onListProducts();
        console.error('+1');
    }

    render() {
        let msg = null;
        let styleField = null;
        let styleText = null;
        if (!this.props.user.isAuth) {
            console.error('[err] auth');
        }

        console.error('this.props.products', this.props.products);

        let products = null;
        if (this.props.products && this.props.products.length) {
            console.error('this.props.products 2', this.props.products);
            products = this.props.products.map((product, i) => {
                return (
                    <ProductInTableItem product={product} index={i+1} key={i+1}/>
                );
            });
        }

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Камера</th>
                        <th scope="col">Время начала</th>
                        <th scope="col">Время окончания</th>
                        <th scope="col">Редактирование</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </table>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        products: state.products,
    }),
    dispatch => ({
        // пользователь нажал регистрацию
        onListProducts: (email, password) => {
            dispatch(productListReducer.onListProducts());
        }
    }),
)(ProductList);
