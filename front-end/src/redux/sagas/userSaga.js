import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as userActions from "../actions/userActions";
import { SAGA_USER_ACTIONS, URL } from "../constants";

const getUsers = () => axios.get(`${URL}/users`);
const postUser = user => axios.post(`${URL}/users/signup`, user);
const updateUser = user => axios.patch(`${URL}/users/${user.id}`, user);
const deleteUser = userId => axios.delete(`${URL}/users/${userId}`);

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

function* postUserSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield postUser(action.user);
    yield put(userActions.addUser(action.user));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* removeUserSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield deleteUser(action.userId);
    yield put(userActions.removeUser(action.userId));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* modifyUserSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield updateUser(action.user);
    yield put(userActions.modifyUser(action.user));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

export function* usersWatcherSaga() {
  yield all([
    takeLatest(SAGA_USER_ACTIONS.GET_USERS_ASYNC, getUsersSaga),
    takeLatest(SAGA_USER_ACTIONS.ADD_USER_ASYNC, postUserSaga),
    takeLatest(SAGA_USER_ACTIONS.MODIFY_USER_ASYNC, modifyUserSaga),
    takeLatest(SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, removeUserSaga)
  ]);
}
