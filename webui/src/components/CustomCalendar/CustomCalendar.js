import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';
import {ROUTES} from '../../constants/router.consts';
import Calendar from 'react-calendar';

class CustomCalendar extends React.Component {
    onChangeDate(date) {
        let timestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        console.error('ts', timestamp);
    }

    render() {
        return (
          <div className="menu-wrapper">
              <div className="submenu-wrapper">
                  <div className="row">
                    <div className="col">
                        <div className="col">
                            <Calendar
                                  onChange={date => this.onChangeDate(date)}
                                  value={new Date()}
                                  locale="ru-RU"
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">

                    </div>
                </div>
              </div>
          </div>
        );
    }
}
export default CustomCalendar;
