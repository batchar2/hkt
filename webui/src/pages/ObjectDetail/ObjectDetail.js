import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router5';


import axios from 'axios';
import ImageUploader from 'react-images-upload';

import { ROUTES } from '../../constants/router.consts';
import objectDetailActions from '../../store/actions/object-detail.actions.js';
import NotFoundPicture from './notfound.png';
import CameraList from '../../components/CameraList'
import ObjectActions from '../../components/ObjectActions'

import './style.css';

class ObjectDetail extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     cameras: [],
        //     name: undefined,
        //     mapPicture: undefined,
        //     mapData: undefined,
        //     mapid: undefined,
        //     hoveredArea: null,
        // };
    }

    componentDidMount() {
        this.props.loadObjectDetail(this.props.params.id);
    }

    enterArea(area) {
        console.error('area>>>>', area);
        this.props.hoverChanged(this.props.object, area, true);
    }

    leaveArea(area) {
        this.props.hoverChanged(this.props.object, null, false);
    }

    getTipPosition(area) {
        console.error('getTipPosition>', area);
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

    mapClicked(area) {

    }

    render() {
        let img = NotFoundPicture;
        let id = 0;
        if (this.props.object.id) {
            id = this.props.object.id;
            img =   `${axios.defaults.baseURL}${this.props.object.picture}`;
            console.error('obj_detail', img);
        }
        let mapData = {
            name: "my-map",
            areas: []//this.props.object.
        };
        if (this.props.object &&  this.props.object.cameras) {

            for (let i = 0; i < this.props.object.cameras.length; i++) {
                let coords = JSON.parse(this.props.object.cameras[i].position_coords);
                let camid = this.props.object.cameras[i].id;
                let screenshot = this.props.object.cameras[i].screenshot;
                mapData.areas.push({
                    camid: camid,
                    name: `camera_${camid}`,
                    coords: coords,
                    shape: 'circle',
                    preFillColor: 'red',
                    fillColor: 'red',
                    screenshot: `${axios.defaults.baseURL}${screenshot}`,
                });
            }
        }
        if (!this.props.object.id) {
            return (<div></div>);
        }
        return (
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

                              <ImageMapper
                                  src={img}
                                  map={mapData}
                                  onMouseEnter={area => this.enterArea(area)}
                                  onMouseLeave={area => this.leaveArea(area)}
                                  onClick={area => this.mapClicked(area)}
                                  width={720}
                                  />
                                  {
                                     this.props.object.hoveredArea &&
                                      <span className="tooltip" style={{ ...this.getTipPosition(this.props.object.hoveredArea)}}>
                                          <div className="tooltip-header">
                                              { this.props.object.hoveredArea && this.props.object.hoveredArea.name }
                                          </div>
                                          <div>
                                              <img src={this.props.object.hoveredImage} width="128"/>
                                          </div>
                                      </span>
                                  }
                              </div>
                        </div>
                    </div>
              </div>
              <CameraList obj={this.props.object}/>
          </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        object: state.object,
    }),
    dispatch => ({
        // пользователь нажал регистрацию
        loadObjectDetail: (objectId) => {
            dispatch(objectDetailActions.loadObjectDetail(objectId));
        },
        hoverChanged: (obj, camera, hoverVal) => {
          dispatch(objectDetailActions.hoverChanged(obj, camera, hoverVal));
        }
    }),
)(ObjectDetail);
