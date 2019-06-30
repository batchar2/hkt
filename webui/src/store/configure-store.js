import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { router5Middleware, router5Reducer, reduxPlugin } from 'redux-router5'

// my reducers
import userReducer from './reducers/user.reducer';
import productReducer from './reducers/product.reducer';
import productListReducer from './reducers/product-list.reducer';
import rightMenuReducer from './reducers/right-menu.reducer';
import objectDetailReducer from './reducers/object-detail.reducer';
import cameraDetailReducer from './reducers/camera-detail.reducer';
import workersReducer from './reducers/workers.reducer';

export default function configureStore(router, initialState = {}) {
    const reducers = combineReducers({
        /* customs */
        user: userReducer,          // редюсер юзера
        product: productReducer,   // редюсер рандоных юзеров
        products: productListReducer,
        objects: rightMenuReducer,
        object: objectDetailReducer,
        camera: cameraDetailReducer,
        workers: workersReducer,
        /* system */
        router: router5Reducer,     // редюсер на роутер
    });

    const createStoreWithMiddleware = composeWithDevTools(applyMiddleware( // создаем стор и добавляем плагины
        thunk,                      // асинхронные экшены
        router5Middleware(router),  // роутер
        createLogger()              // лог в консоль
    )) (createStore);

    const store = createStoreWithMiddleware( // собираем редюсеры
        reducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    router.usePlugin(reduxPlugin(store.dispatch));

    window.store = store;
    return store;
}
