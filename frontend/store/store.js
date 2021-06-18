import { configureStore } from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import signupsReducer from '../slices/signups_slice';
import loadingReducer from '../slices/loading_slice';
import sessionReducer from '../slices/session_slice';
import formReducer from '../slices/form_slice';
import listReducer from '../slices/list_slice';
import timeReducer from '../slices/time_slice';
window.loadingReducer = loadingReducer;



const reducer = {
     signups: signupsReducer,
    loading: loadingReducer,
    session: sessionReducer,
    form: formReducer,
    list: listReducer,
    time: timeReducer
}



export default configureStore({reducer: reducer,middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)});


