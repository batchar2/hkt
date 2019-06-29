import createRouter from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';

import routesPath from './routes-path';
import { ROUTES } from '../constants/router.consts';

export default function configureRouter() {


    const routerPages = createRouter(
            routesPath, {}
        );
    routerPages.setOption('defaultRoute', ROUTES.LOGIN);

    routerPages.usePlugin(loggerPlugin);
    routerPages.usePlugin(
        browserPlugin({
            useHash: true
        })
    );
    return routerPages;
}
