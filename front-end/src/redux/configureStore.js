import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { requestReducer } from "./reducers/requestReducer";
import groupReducer from "./reducers/groupReducer";
import userReducer from "./reducers/userReducer";
import { userDataReducer } from "./reducers/userIdReducer";

import rootSaga from "./sagas/rootSaga";

const rootReducer = combineReducers({
  users: userReducer,
  request: requestReducer,
  groups: groupReducer,
  currentUser: userDataReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
