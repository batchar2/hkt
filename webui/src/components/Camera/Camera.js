import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';


class Camera extends React.Component {

    render() {
        let name = this.props.camera.name;
        let id = this.props.camera.id;
        return (<div className="item"><Link router={this.props.router}
                     routeName={ROUTES.CAMERA_DETAIL}
                     routeParams={{id}}>
                     {name}</Link></div>);

    }
}
export default connect(state => state.router.route)(Camera) ;
