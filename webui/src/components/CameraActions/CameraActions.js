import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';
import rightMenuActions from '../../store/actions/right-menu.actions.js';
import cameraDetailActions from '../../store/actions/camera-detail.actions.js';

class ObjectActions extends React.Component {

    handleDelete(e) {
        e.preventDefault();
        let rv = window.confirm('Вы действительно хотите удалить камеру?');
        if (rv === true) {
            let objectId = this.props.id;
            this.props.deleteCamera(objectId);
        }
    }

    render() {
        let id = this.props.id;
        return (
          <div className="btn-list">
            <div className="title">Действия</div>
            <div className="list">
                <div><Link router={this.props.router}
                              routeName={ROUTES.CAMERA_EDIT}
                              routeParams={{id}}>
                              редактировать</Link></div>
                <div><a onClick={e => this.handleDelete(e)}>удалить</a></div>
            </div>
        </div>);
    }
}
export default connect(state => state.router.route, dispatch => ({
    deleteCamera: (id) => {
        dispatch(cameraDetailActions.deleteCamera(id));
    }
}),)(ObjectActions) ;
