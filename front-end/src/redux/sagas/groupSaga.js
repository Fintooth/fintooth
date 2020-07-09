import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as groupActions from "../actions/groupActions";
import { SAGA_GROUP_ACTIONS, URL } from "../constants";

const getGroups = () => axios.get(`${URL}/groups`);
// const postUser = user => axios.post(`${URL}/users/signup`, user);
// const updateUser = user => axios.patch(`${URL}/users/${user.id}`, user);
// const deleteUser = userId => axios.delete(`${URL}/users/${userId}`);
const addAccount = (group) =>
  axios.post(`${URL}/groups/${group.id}/add-account`);
const addUser = (group) => axios.post(`${URL}/groups/${group.id}/add-user`);

function* getGroupsSaga() {
  try {
    yield put(requestActions.startRequest());
    const response = yield getGroups();
    yield put(groupActions.addGroup(response.data.groups));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* addAccountSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield addAccount(action.group);
    yield put(groupActions.addAccount(action.group));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* addUserSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield addUser(action.group);
    yield put(groupActions.addUser(action.group));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

// function* postUserSaga(action) {
//   try {
//     yield put(requestActions.startRequest());
//     const response = yield postUser(action.user);
//     yield put(userActions.addUser(action.user));
//     yield put(requestActions.successRequest(response.data));
//   } catch (e) {
//     yield put(requestActions.errorRequest(e.message));
//   }
// }

// function* removeUserSaga(action) {
//   try {
//     yield put(requestActions.startRequest());
//     const response = yield deleteUser(action.userId);
//     yield put(userActions.removeUser(action.userId));
//     yield put(requestActions.successRequest(response.data));
//   } catch (e) {
//     yield put(requestActions.errorRequest(e.message));
//   }
// }

// function* modifyUserSaga(action) {
//   try {
//     yield put(requestActions.startRequest());
//     const response = yield updateUser(action.user);
//     yield put(userActions.modifyUser(action.user));
//     yield put(requestActions.successRequest(response.data));
//   } catch (e) {
//     yield put(requestActions.errorRequest(e.message));
//   }
// }

export function* groupsWatcherSaga() {
  yield all([
    takeLatest(SAGA_GROUP_ACTIONS.GET_GROUPS_ASYNC, getGroupsSaga),
    takeLatest(SAGA_GROUP_ACTIONS.ADD_ACCOUNT_ASYNC, addAccountSaga),
    takeLatest(SAGA_GROUP_ACTIONS.ADD_USER_ASYNC, addUserSaga),
  ]);
}
