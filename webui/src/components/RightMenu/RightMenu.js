import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';

import { ROUTES } from '../../constants/router.consts';

import './RightMenu.css';

import rightMenuActions from '../../store/actions/right-menu.actions.js';
import RightMenuItem from '../RightMenuItem';


class RightMenu extends React.Component {
    componentDidMount() {
        this.props.onGetObjects();
    }

    render() {
        let objects = this.props.objects;
        console.error('menu', objects);
        let menuItems = null;
        if (objects && objects.length) {
          menuItems = objects.map(object => {return (<RightMenuItem object={object} key={object.id}/>)});
        }
        return (
          <nav id="sidebar">
              <nav id="sidebar">
                  <ul className="list-unstyled components">
                      <li className="active">
                          <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Объекты</a>
                          <ul className="list-unstyled" id="homeSubmenu">
                          {menuItems}
                          </ul>
                      </li>
                  </ul>
              </nav>
          </nav>
        );
    }
}
export default connect(
    state => ({
        objects: state.objects,
    }),
    dispatch => ({
        onGetObjects: () => {
            dispatch(rightMenuActions.onGetObjects());
        }
    }),
)(RightMenu);
