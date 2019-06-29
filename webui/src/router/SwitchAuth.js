// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { startsWithSegment } from 'router5-helpers';
// import { createRouteNodeSelector } from 'redux-router5';
//
// //import NotFound from './NotFound';
//
// import AuthPage from '../pages/AuthPage';
//
// import { ROUTES } from '../constants/router';
//
// function SwitchAuth({ route }) {
//     // console.error('>>> Switch AUTH >>', route);
//     // if (route !== null) {
//     //     const { params, name } = route;
//     //
//     //     const testRoute = startsWithSegment(name);
//     //
//     //     if (testRoute(ROUTES.LOGIN)) {
//     //         return <AuthPage params={ params } />;
//     //     }
//     // }
//     return null;
//     //return <NotFound />
// }
//
// export default connect(state => {
//     const routeNodeSelector = createRouteNodeSelector('auth');
//
//     return (state) => ({
//         ...routeNodeSelector(state)
//     })
// })(SwitchAuth);
