import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';
import {ROUTES} from '../../constants/router.consts';

class NavBar extends React.Component {

    render() {
        let id = this.props.id;
        return (
          <ul className="nav nav-pills">
              <li className="nav-item">
                <Link routeName={ROUTES.REPORT} className="nav-link active">Отчет</Link>
              </li>
              <li class="nav-item">
                <Link routeName={ROUTES.REPORT} className="nav-link">Отчет</Link>
              </li>
              <li class="nav-item">
                <Link routeName={ROUTES.REPORT} className="nav-link">Отчет</Link>
              </li>
          </ul>);
    }
}
export default NavBar;
