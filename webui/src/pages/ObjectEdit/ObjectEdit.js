import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';
import ImageUploader from 'react-images-upload';
import { ROUTES } from '../../constants/router.consts';
import objectDetailActions from '../../store/actions/object-detail.actions.js';
import NotFoundPicture from './notfound.png';

class ObjectEdit extends React.Component {



    onDropImage(pictureFiles, pictureDataURLs) {
        this.pictureDataURLs = pictureDataURLs;

        this.props.addPicture(pictureDataURLs, this.props.object);
    }

    handleSave(event) {
        event.preventDefault();
        this.props.saveObject(this.getName.value, this.getPicture.src);
    }

    handleCancel(event) {
        event.preventDefault();

        this.props.navigateTo(ROUTES.OBJECT_DETAIL, this.props.params);
    }

    render() {
        let img = NotFoundPicture;
        let name = '';
        let picture = undefined;
         if (this.props.object) {
              name = this.props.object.name;
             if (this.props.object.picture) {
                 picture = <img src={this.props.object.picture} width={128}
                 ref={img => this.getPicture = img}/>
             }
        }
        console.error('camera_detail!', this.props.camera);
        return (
          <div id="content">
              <div className="content-wrapper col">
                  <div className="title-wrapper">
                      <h2>Редактирование объекта</h2>
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
                  <div className="row">
                      {picture}
                  </div>
                  <div className="row">
                      <ImageUploader
                          withIcon={true}
                          buttonText='Выберите изображение'
                          imgExtension={['.jpg', '.gif', '.png', '.svg', '.jpeg']}
                          maxFileSize={524288000}
                          onChange={(pictureFiles, pictureDataURLs) => this.onDropImage(pictureFiles, pictureDataURLs)}/>
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

        addPicture: (picture, p) => {
            dispatch(objectDetailActions.addPicture(picture, p));
        },
        saveObject: (name, picture) => {
            dispatch(objectDetailActions.saveObject(name, picture));
        },
        navigateTo: (name, params) => {
          dispatch(routerActions.navigateTo(name, params));
        }
    }),
)(ObjectEdit);
