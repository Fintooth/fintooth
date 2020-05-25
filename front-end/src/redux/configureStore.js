import userReducer from "./reducers/userReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import {usersWatcherSaga} from './sagas/userSaga';
import { requestReducer } from "./reducers/requestReducer";

const rootReducer = combineReducers({
    users: userReducer,
    request: requestReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(usersWatcherSaga);

export default store;
