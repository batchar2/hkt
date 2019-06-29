import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';
import rightMenuActions from '../../store/actions/right-menu.actions.js';
import Camera from '../Camera';


class CameraList extends React.Component {

    render() {
        let cameras = null;
        if (this.props.cameras && this.props.cameras.length) {
            cameras = this.props.cameras.map(camera => {
              return (<Camera data={camera} key={camera.id}/>)
            });
        }
        return (<div className="menu-wrapper">
            <h5>Камеры</h5>
            <div className="submenu-wrapper">
                {cameras}
                <div class="item btn"><Link routeName={ROUTES.CAMERA_ADD}>+ Добавить камеру</Link></div>
            </div>
        </div>);

    }
}
export default connect(state => state.router.route)(CameraList) ;
