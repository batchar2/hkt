import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';
import { Link } from 'react-router5';

import { ROUTES } from '../../constants/router.consts';

import CustomCalendar from '../../components/CustomCalendar';
import Graphic from '../../components/Graphic';

class Report extends React.Component {

    onChangeDate(date) {
        let timestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        console.error('ts', timestamp);
        // this.setState({data: date});
        // let camid = this.props.match.params.camid;
        //
        // {
        //     let url =  '/api/event/report/xls/' + camid + '/' + timestamp;
        //     if (Config.DEBUG && Config.PREFIX_URL) {
        //         url = Config.PREFIX_URL + url;
        //     }
        //     this.setState({linkXls: url});
    }

    render() {
        return (
          <div id="content">
                  <Graphic/>
                  <CustomCalendar/>
          </div>
        );
    }
}

export default connect(
  state => ({
      user: state.user,
      products: state.products,
  }),
  
)(Report);
