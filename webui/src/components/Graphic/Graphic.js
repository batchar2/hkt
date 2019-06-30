import React from 'react';
import { Link } from 'react-router5';
import {connect} from 'react-redux';
import {ROUTES} from '../../constants/router.consts';

import Vis from './Vis.js';

class Graphic extends React.Component {

    render() {
        let id = this.props.id;
        return (
          <div className="content-wrapper">
          <div className="row">
              <div className="col">
                  <div class="row">
                      <div className="row">
                          <div className="col">
                              <h3>Report</h3>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <Vis visdata={[{y: 1, x: 12}, {y: 2, x: 2}, {y: 3, x: 11},{y: 4, x: 12}, {y: 5, x: 2}, {y: 6, x: 11}]}/>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col">

                      </div>
                  </div>
              </div>
          </div>
          </div>);
    }
}
export default Graphic;
