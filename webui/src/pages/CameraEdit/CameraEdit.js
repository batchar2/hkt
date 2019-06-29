import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';
import ImageUploader from 'react-images-upload';
import { ROUTES } from '../../constants/router.consts';
import cameraDetailActions from '../../store/actions/camera-detail.actions.js';
import NotFoundPicture from './notfound.png';
import ImageMapper from 'react-image-mapper';
class CameraEdit extends React.Component {



    onDropImage(pictureFiles, pictureDataURLs) {
        this.pictureDataURLs = pictureDataURLs;

        this.props.addPicture(pictureDataURLs, this.props.object);
    }

    handleSave(event) {
        event.preventDefault();
        if (this.getPicture) {
          this.props.saveObject(this.getName.value, this.getPicture.src);
        }

    }

    handleCancel(event) {
        event.preventDefault();

        this.props.navigateTo(ROUTES.GET_OBJECT_DETAIL);
    }

    render() {
        let img = NotFoundPicture;
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
              <div className="content-wrapper col">
                  <div className="title-wrapper">
                      <h2>Создание камеры</h2>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="name" className="col-sm-2 col-form-label">Название</label>
                      <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Название"
                              ref={input => this.getName = input}
                          />
                      </div>
                  </div>

                  <div className="form-group row">
                      <label htmlFor="rtpsUrl" className="col-sm-2 col-form-label">RTPS url</label>
                      <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              id="rtpsUrl"
                              placeholder="RTPS url"
                              ref={input => this.getRTPSurl = input}
                          />
                      </div>
                  </div>

                  <div className="form-group row">
                      <label htmlFor="fps" className="col-sm-2 col-form-label">FPS</label>
                      <div className="col-sm-10">
                          <input
                              type="text"
                              className="form-control"
                              id="fps"
                              placeholder="FPS"
                              ref={input => this.getFPS = input}
                          />
                      </div>
                  </div>

                  <div className="form-group row">
                      <label htmlFor="threshold" className="col-sm-2 col-form-label">Порог</label>
                      <div className="col-sm-10">
                          <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="1"
                              className="form-control"
                              id="threshold"
                              placeholder="Порог"
                              ref={input => this.getThreshold = input}
                          />
                      </div>
                  </div>



                  <div className="form-group row">
                      <div className="col-sm-8"></div>
                      <div className="col-sm-2">
                          <button onClick={e => this.handleCancel(e)} className="btn btn-secondary float-right">
                              Отмена
                          </button>
                      </div>
                      <div className="col-sm-2">
                          <button onClick={e => this.handleSave(e)} className="btn btn-primary float-right">
                              Сохранить
                          </button>
                      </div>
                  </div>
              </div>
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
        saveCamera: (camera) => {
            dispatch(cameraDetailActions.saveCamera(camera));
        },
    }),
)(CameraEdit);

/*
<div className="form-group row">

    <div className="custom-control custom-checkbox">
        <label htmlFor="isActive" className="custom-control-label">Активная</label>

        <input
            type="checkbox"
            className="custom-control-input"
            id="isActive"
            ref={input => this.getIsActive = input}
        />

    </div>
</div>
*/
