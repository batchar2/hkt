import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';
import rightMenuActions from '../../store/actions/right-menu.actions.js';
import objectDetailActions from '../../store/actions/object-detail.actions.js';

class ObjectActions extends React.Component {

    handleDelete(e) {
        e.preventDefault();
        let rv = window.confirm('Вы действительно хотите удалить объект?');
        if (rv === true) {
            let objectId = this.props.id;
            this.props.deleteObject(objectId);
        }
    }

    render() {
        let id = this.props.id;
        return (
          <div className="btn-list">
            <div className="title">Действия</div>
            <div className="list">
                <div>
                    <Link router={this.props.router} routeName={ROUTES.OBJECT_ADD}>Добавить</Link>
                </div>
                <div>
                    <Link router={this.props.router} routeName={ROUTES.OBJECT_EDIT} routeParams={{id}}>Редактировать</Link></div>
                <div>
                    <a href="#" onClick={e => this.handleDelete(e)}>Удалить</a>
                </div>
            </div>
        </div>);
    }
}
export default connect(state => state.router.route, dispatch => ({
    onGetObjects: () => {
        dispatch(rightMenuActions.onGetObjects());
    },
    deleteObject: (id) => {
        dispatch(objectDetailActions.deleteObject(id));
    }
}),)(ObjectActions) ;
