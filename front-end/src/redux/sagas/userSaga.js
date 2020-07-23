import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as userActions from "../actions/userActions";
import * as userIdActions from "../actions/userIdActions";
import { SAGA_USER_ACTIONS, URL } from "../constants";

const token = "ads" || JSON.parse(localStorage.getItem("currentUser")).token;

const getUser = userId =>
  axios.get(`${URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const getUsers = () =>
  axios.get(`${URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const postUser = user =>
  axios.post(`${URL}/users/signup`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
const addAccount = user =>
  axios.post(`${URL}/users/${user.id}/accounts`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
const updateUser = user =>
  axios.patch(`${URL}/users/${user.id}`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
const deleteUser = userId =>
  axios.delete(`${URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const deleteAccount = accountId =>
  axios.delete(`${URL}/users/delete-account/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

function* getCurrentUserSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield getUser(action.userId);
    yield put(userIdActions.setCurrentUser(response.data));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

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

function* addAccountSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield addAccount(action.user);
    yield put(userActions.addAccount(action.user));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* deleteAccountSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield deleteAccount(action.accountId);
    yield put(userActions.deleteAccount(action.accountId, action.user));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

export function* usersWatcherSaga() {
  yield all([
    takeLatest(SAGA_USER_ACTIONS.GET_CURRENT_USER_ASYNC, getCurrentUserSaga),
    takeLatest(SAGA_USER_ACTIONS.GET_USERS_ASYNC, getUsersSaga),
    takeLatest(SAGA_USER_ACTIONS.ADD_USER_ASYNC, postUserSaga),
    takeLatest(SAGA_USER_ACTIONS.MODIFY_USER_ASYNC, modifyUserSaga),
    takeLatest(SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, removeUserSaga),
    takeLatest(SAGA_USER_ACTIONS.ADD_ACCOUNT_ASYNC, addAccountSaga),
    takeLatest(SAGA_USER_ACTIONS.DELETE_ACCOUNT_ASYNC, deleteAccountSaga)
  ]);
}
