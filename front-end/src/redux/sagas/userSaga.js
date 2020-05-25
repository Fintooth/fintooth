import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as userActions from "../actions/userActions";
import { SAGA_USER_ACTIONS } from "../constants";

const url = "http://localhost:3001/users";

const getUsers = () => axios.get(url);
const postUser = user => axios.post(`${url}/signup`, user);

function* getUsersSaga() {
  try {
    yield put(requestActions.startRequest());
    const response = yield getUsers();
    yield put(userActions.addUser(response.data.users));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* postUserSaga(user) {
  try {
    yield put(requestActions.startRequest());
    const response = yield postUser(user.user);
    yield put(userActions.addUser(user.user));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

export function* usersWatcherSaga() {
  yield all([
    takeLatest(SAGA_USER_ACTIONS.GET_USERS_ASYNC, getUsersSaga),
    takeLatest(SAGA_USER_ACTIONS.ADD_USER_ASYNC, postUserSaga)
  ]);
}
