import { ROUTES } from '../constants/router.consts';

const routesPath = [
    { name: ROUTES.LOGIN,            path: '/login'},
    { name: ROUTES.PRODUCT_LIST,     path: '/products'},
    { name: ROUTES.PRODUCT_DETAIL,   path: '/product/detail/:id'},

    { name: ROUTES.OBJECT_DETAIL,    path: '/object/:id' },
    { name: ROUTES.OBJECT_EDIT,      path: '/object/edit/:id' },
    { name: ROUTES.OBJECT_ADD,       path: '/object/add' },

    { name: ROUTES.CAMERA_DETAIL,    path: '/camera/:id' },
    { name: ROUTES.CAMERA_ADD,       path: '/camera/add' },
    { name: ROUTES.CAMERA_EDIT,      path: '/camera/edit/:id' },

    { name: ROUTES.REPORT,           path: '/report' },
    { name: ROUTES.REPORT_VIEW,      path: '/camera/:id/report/:year/:month/:day' },

    { name: ROUTES.GET_WORKERS,      path: '/camera/:id/workers/number/curent/'}

];
export default routesPath;
