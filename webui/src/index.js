import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'

import App from './App';
import configureStore from './store';
import {configureRouter} from './router';
import CONFIG from './config';

const router = configureRouter();
const store = configureStore(router);

//router.setDependency('store', store);

axios.defaults.baseURL = CONFIG.BASE_URL;

const wrappedApp = (
    <Provider store={store}>
        <RouterProvider router={router}>

            <App/>
        </RouterProvider>
    </Provider>
);


//router={router}
router.start((err, state) => {
    ReactDOM.render(wrappedApp, document.getElementById('root'));
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
