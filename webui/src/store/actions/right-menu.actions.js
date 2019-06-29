import axios from 'axios';

import constants from '../../constants/right-menu.consts.js';


export const onGetObjects = (email, password) => {
    return dispatch => {
        // вызываю API
        // потом делаю вызов, залоген или нет пользователь
        dispatch({
            type: constants.GET_OBJECTS,
            payload: [
              {
                  id: 1,
                  name:  "Object 1"
              },
              {
                  id: 2,
                  name:  "Object 2"
              },
              {
                  id: 3,
                  name:  "Object 3"
              },
              {
                  id: 4,
                  name:  "Object 4"
              },
              {
                  id: 5,
                  name:  "Object 5"
              },
            ]
        });
    }
};

export default {onGetObjects};
