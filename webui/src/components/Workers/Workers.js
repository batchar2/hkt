import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';
import {ROUTES} from '../../constants/router.consts';
import workersActions from '../../store/actions/workers.actions';
import axios from "axios";
import './style.css';

class Workers extends React.Component {
    componentDidMount() {
        this.props.getWorkers(this.props.cameraId);
    }
    render() {
        let dataworker = this.props.workers.workers;
        let total = 0;
        if (dataworker && dataworker.total) {
            total = dataworker.total;
        }
        var zones;
        if (dataworker && dataworker.zones) {
            zones = [];
            for (var prop in dataworker.zones) {
                console.error('++++', prop);
                if (prop != 'undef') {
                  zones.push((
                          <tr>
                              <td>{dataworker.zones[prop].name}</td>
                              <td>{dataworker.zones[prop].number}</td>
                          </tr>
                      ));
                }
            }
            zones.push((
                    <tr>
                        <td>{dataworker.zones['undef'].name}</td>
                        <td>{dataworker.zones['undef'].number}</td>
                    </tr>
                ));
        }
        return (
        <div className="menu-wrapper">
            <div className="submenu-wrapper">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Зона</th>
                        <th>Колличество персонала</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones}
                        <tr>
                            <td>Все</td>
                            <td>
                                <span className="player-number-workers">
                                    {total}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}
export default connect(
  state => ({
      user: state.user,
      workers: state.workers,
  }),
  dispatch => ({
      // пользователь нажал регистрацию
      getWorkers: (cameraId) => {
          dispatch(workersActions.getWorkers(cameraId));
      },
  }),
)(Workers);
