import React from 'react';
import {connect} from 'react-redux';
import { actions as routerActions, createRouteNodeSelector } from 'redux-router5';

import ImageUploader from 'react-images-upload';

import { ROUTES } from '../../constants/router.consts';
import productActions from '../../store/actions/product.actions.js';

class ProductDetail extends React.Component {

    componentDidMount() {
        this.props.loadProductDetail(this.props.params.id);
    }

    handleSave(event) {
        event.preventDefault();
        const data = {
            title: this.getTitle.value,
            description: this.getDescription.value,
        };
        this.props.saveProduct(data, this.props.params.id);
    }

    handleCancel(event) {
        event.preventDefault();

        this.props.navigateTo(ROUTES.PRODUCT_LIST);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product && nextProps.product.isSaved === true) {
            this.props.navigateTo(ROUTES.PRODUCT_LIST);
        }
    }

    onDropImage(pictureFiles, pictureDataURLs) {
        this.pictureDataURLs = pictureDataURLs;

        this.props.addPictures(pictureDataURLs, this.props.product);
    }

    render() {
        let title = null;
        let description = null;
        let pictures = [];
        if (this.props.product) {
            title = this.props.product.title;
            description = this.props.product.description;

            if (this.props.product.pictures && this.props.product.pictures.length) {
                pictures = this.props.product.pictures.map((picture, i) => {
                    return (
                        <img src={picture} width="250" key={i+1}/>
                    );
                });
            }
        }
        if (!this.props.product) {
            return (<div></div>);
        }
        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="title-product" className="col-sm-2 col-form-label">Название</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="title-product"
                            placeholder="Название"
                            defaultValue={title}
                            ref={input => this.getTitle = input}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description-product" className="col-sm-2 col-form-label">Описание</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="description-product3"
                            style={{height:'200px', width:'100%'}}
                            value={description}
                            ref={input => this.getDescription = input}
                        ></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description-product" className="col-sm-2 col-form-label">Описание</label>
                    <div className="col-sm-10">
                        <ImageUploader
                            withIcon={true}
                            buttonText='Выберите изображение'
                            imgExtension={['.jpg', '.gif', '.png', '.svg', '.jpeg']}
                            maxFileSize={524288000}
                            onChange={(pictureFiles, pictureDataURLs) => this.onDropImage(pictureFiles, pictureDataURLs)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        {pictures}
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
            </form>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        product: state.product,
    }),
    dispatch => ({
        // пользователь нажал регистрацию
        loadProductDetail: (productId) => {
            dispatch(productActions.loadProductDetail(productId));
        },
        saveProduct: (data, id) => {
            dispatch(productActions.saveProduct(data, id));
        },
        addPictures: (pictures, p) => {
            dispatch(productActions.addPictures(pictures, p));
        },
        navigateTo: (name, params={}) => {
            dispatch(routerActions.navigateTo(name, params));
        }
    }),
)(ProductDetail);
