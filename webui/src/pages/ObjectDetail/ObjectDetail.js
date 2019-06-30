import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router5';

import ImageUploader from 'react-images-upload';

import { ROUTES } from '../../constants/router.consts';
import objectDetailActions from '../../store/actions/object-detail.actions.js';
import NotFoundPicture from './notfound.png';
import CameraList from '../../components/CameraList';
import ObjectActions from '../../components/ObjectActions';


class ObjectDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cameras: [],
            name: undefined,
            mapPicture: undefined,
            mapData: undefined,
            mapid: undefined,
            hoveredArea: null,
        };
    }

    componentDidMount() {
        this.props.loadObjectDetail(this.props.params.id);
    }

    enterArea(area) {
        console.error('area', area);
        this.props.hoverChanged(this.props.objectDetail, area, true);
    }

    leaveArea(area) {
        this.props.hoverChanged(this.props.objectDetail, area, false);
    }

    getTipPosition(area) {
        /*return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };*/
    }

    mapClicked(area) {

    }

    render() {
        let img = NotFoundPicture;
        let id = 0;
        if (this.props.object) {
            id = this.props.object.id;
            //img = this.props.object.picture;
            console.error('obj_detail', img);
        }
        let mapData = {
            name: "my-map",
            areas: [
              {
                  camid: 1,
                  name: "camera 1",
                  //picture: img,
                  coords: [50, 50, 15],
                  shape: "circle",
                  preFillColor: "blue",
                  fillColor: "red"
              },
              {
                  camid: 2,
                  name: "camera 2",
                  //picture: img,
                  coords: [150, 150, 15],
                  shape: "circle",
                  preFillColor: "blue",
                  fillColor: "red"
              },
              {
                  camid: 3,
                  name: "camera 3",
                  //picture: img,
                  coords: [250, 250, 15],
                  shape: "circle",
                  preFillColor: "blue",
                  fillColor: "red"
              },
            ],
        };
        return (
          <div id="content">
              <div className="content-wrapper">
                  <div className="title-wrapper">
                      <h2>{this.props.object.name}</h2>

                      <ObjectActions id={this.props.params.id}/>
                  </div>
                  <ImageMapper
                  src={img}
                  map={mapData}
                  onMouseEnter={area => this.enterArea(area)}
                  onMouseLeave={area => this.leaveArea(area)}
                  onClick={area => this.mapClicked(area)}
                  width={720}
                  />
                  {
                      this.props.object &&
                      <span className="tooltip" style={{ ...this.getTipPosition(this.props.object)}}>
                          <div className="tooltip-header">
                              { this.props.object && this.props.object.name }
                          </div>
                          <div>
                              <img src={img} width="128"/>
                          </div>
                      </span>
                  }
           </div>
           <CameraList cameras={this.props.object.cameras}/>
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
