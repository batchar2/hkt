import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';

import { ROUTES } from '../../constants/router.consts';
import cameraDetailActions from '../../store/actions/camera-detail.actions.js';
import NotFoundPicture from './notfound.png';
import CameraActions from '../../components/CameraActions'

class CameraDetail extends React.Component {

    componentDidMount() {
        this.props.loadCameraDetail(this.props.params.id);
    }

    render() {
        let img = NotFoundPicture;

        console.error('camera_detail!', this.props.camera);
        return (
          <div id="content">
              <div class="content-wrapper">
                  <div class="title-wrapper">
                      <h2>{this.props.camera.name}</h2>
                      <CameraActions id={this.props.params.id}/>
                  </div>
                  <img src={img}/>
           </div>
        </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        camera: state.camera,
    }),
    dispatch => ({
        // пользователь нажал регистрацию
        loadCameraDetail: (cameraId) => {
            dispatch(cameraDetailActions.loadCameraDetail(cameraId));
        },
    }),
)(CameraDetail);
