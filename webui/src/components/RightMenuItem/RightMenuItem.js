import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';


class RightMenuItem extends React.Component {

    render() {
        let id = this.props.object.id;
        let name = this.props.object.name;
        console.error('+100', id);
        return (<li><Link router={this.props.router}
             routeName={ROUTES.OBJECT_DETAIL}
             routeParams={{id}}>
             {name}</Link></li>);

    }
}
export default connect(state => state.router.route)(RightMenuItem) ;
