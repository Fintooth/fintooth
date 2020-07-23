import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { requestReducer } from "./reducers/requestReducer";
import groupReducer from "./reducers/groupReducer";
import userReducer from "./reducers/userReducer";
import { userDataReducer } from "./reducers/userIdReducer";
import activityReducer from "./reducers/activityReducer";

import rootSaga from "./sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import pollsReducer from "./reducers/pollsReducer";

const rootReducer = combineReducers({
  users: userReducer,
  request: requestReducer,
  groups: groupReducer,
  currentUser: userDataReducer,
  activities: activityReducer,
  polls: pollsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
