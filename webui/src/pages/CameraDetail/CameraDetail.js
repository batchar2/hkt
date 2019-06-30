import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';

import { ROUTES } from '../../constants/router.consts';
import cameraDetailActions from '../../store/actions/camera-detail.actions.js';
import NotFoundPicture from './notfound.png';
import CameraActions from '../../components/CameraActions';
import Workers from '../../components/Workers';

class CameraDetail extends React.Component {

    componentDidMount() {
        this.props.loadCameraDetail(this.props.params.id);
        this.mjpegUri = `http://127.0.0.1:5000/mjpeg/camera/${this.props.params.id}/feed`;
    }

    render() {

        console.error('camera_detail!', this.props.camera);


        return (

            <div id="content">
                <div className="content-wrapper">
                    <div class="breadcrumb">
                        <div><a href="#">Камеры</a></div>
                        <div class="active"><a href="#">{this.props.camera.name}</a></div>
                    </div>
                    <div className="title-wrapper">
                        <h2>{this.props.camera.name}</h2>
                        <CameraActions id={this.props.params.id}/>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <img width="720" src={this.mjpegUri}/>
                                </div>
                          </div>
                      </div>
                </div>
                <Workers cameraId={this.props.params.id}/>
            </div>












        );

        /*
        <div id="content">
            <div className="content-wrapper">
                <div class="breadcrumb">
                    <div><a href="#">Оъекты</a></div>
                    <div class="active"><a href="#">{this.props.object.name}</a></div>
                </div>
                <div className="title-wrapper">
                    <h2>{this.props.object.name}</h2>
                    <ObjectActions id={this.props.params.id}/>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="container">
                            <h2>{this.props.camera.name}</h2>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">

                    </div>
                </div>

       </div>



        */
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
