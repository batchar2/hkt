import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'

import App from './App';
import configureStore from './store';
import {configureRouter} from './router';

const router = configureRouter();
const store = configureStore(router);

//router.setDependency('store', store);

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
