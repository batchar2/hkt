import React from 'react';
import { Link } from 'react-router5'
import { connect } from 'react-redux';

import { ROUTES } from '../../constants/router.consts';

class ProductInTableItem extends React.Component {
    render() {
        console.error('!!!', this.props.product);
        let time_start = this.props.product.time_start.toString();
        let time_end   = this.props.product.time_end.toString();

        let id = 1;
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.product.title}</td>
                <td>{this.props.product.camera.title}</td>
                <td>{time_start}</td>
                <td>{time_end}</td>
                <td>
                    <Link
                         router={this.props.router}
                         routeName={ROUTES.PRODUCT_DETAIL}
                         routeParams={{id}}
                    >
                        [Правка]
                    </Link>
                </td>
            </tr>
        );
    }
}
export default connect(state => state.router.route)(ProductInTableItem)
