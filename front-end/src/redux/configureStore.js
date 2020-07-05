import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { requestReducer } from "./reducers/requestReducer";
import groupReducer from "./reducers/groupReducer";
import userReducer from "./reducers/userReducer";

import rootSaga from "./sagas/rootSaga";

const rootReducer = combineReducers({
  users: userReducer,
  request: requestReducer,
  groups: groupReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
