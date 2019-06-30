import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startsWithSegment } from 'router5-helpers';
import { createRouteNodeSelector } from 'redux-router5';

//import NotFound from './NotFound';

import AuthPage from '../pages/AuthPage';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import ObjectDetail from '../pages/ObjectDetail';
import CameraDetail from '../pages/CameraDetail';
import ObjectAdd from '../pages/ObjectAdd';
import ObjectEdit from '../pages/ObjectEdit';
import CameraAdd from '../pages/CameraAdd';
import CameraEdit from '../pages/CameraEdit';
import Report from '../pages/Report';

import { ROUTES } from '../constants/router.consts';

function SwitchPages({ route, onParams }) {
    let page = null;
    let isSeparatePage = false;

    if (route !== null) {
        const { params, name } = route;
        const testRoute = startsWithSegment(name);
        if (testRoute(ROUTES.LOGIN)) {
            //separate.isSeparate = true;
            //isSeparatePage = true;
            return (<AuthPage params={ params } />);
        } else if (testRoute(ROUTES.PRODUCT_LIST)) {
            return (<ProductList params={ params } />);
        } else if (testRoute(ROUTES.PRODUCT_DETAIL)) {
            console.error('+++++++');
            return (<ProductDetail params={params}/>);
        } else if (testRoute(ROUTES.OBJECT_DETAIL)) {
            console.error('+++++++');
            return (<ObjectDetail params={params}/>);
        } else if (testRoute(ROUTES.CAMERA_DETAIL)) {
            console.error('+++++++');
            return (<CameraDetail params={params}/>);
        } else if (testRoute(ROUTES.OBJECT_ADD)) {
            console.error('+++++++');
            return (<ObjectAdd params={params}/>);
        } else if (testRoute(ROUTES.OBJECT_EDIT)) {
            console.error('+++++++');
            return (<ObjectEdit params={params}/>);
        } else if (testRoute(ROUTES.CAMERA_ADD)) {
            console.error('+++++++');
            return (<CameraAdd params={params}/>);
        } else if (testRoute(ROUTES.CAMERA_EDIT)) {
            console.error('+++++++');
            return (<CameraEdit params={params}/>);
        } else if (testRoute(ROUTES.REPORT)) {
            console.error('+++++++');
            return (<Report params={params}/>);
        }
    }
    // onParams({
    //     isCreatePage: false,
    //     isSeparatePage: isSeparatePage,
    // })
    return page;
    //return <NotFound />
}

export default connect(state => {
    const routeNodeSelector = createRouteNodeSelector('');

    return (state) => ({
        ...routeNodeSelector(state)
    })
})(SwitchPages);
