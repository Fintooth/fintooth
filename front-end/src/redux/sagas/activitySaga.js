import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as activityActions from "../actions/activityActions";
import { SAGA_ACTIVITY_ACTIONS, URL } from "../constants";

const token = "asd" || JSON.parse(localStorage.getItem("currentUser")).token;

const getActivities = userId =>
  axios.get(`${URL}/activities/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const postActivity = activity =>
  axios.post(`${URL}/activities/user/${activity.user}`, activity, {
    headers: { Authorization: `Bearer ${token}` }
  });
const updateActivity = activity =>
  axios.patch(`${URL}/activities/${activity.id}`, activity, {
    headers: { Authorization: `Bearer ${token}` }
  });
const deleteActivity = activityId =>
  axios.delete(`${URL}/activities/${activityId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

function* getActivitiesSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield getActivities(action.userId);
    yield put(activityActions.getActivities(response.data.activities));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* postActivitySaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield postActivity(action.activity);
    yield put(activityActions.addActivity(response.data.activity));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* deleteActivitySaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield deleteActivity(action.activityId);
    yield put(activityActions.deleteActivity(action.activityId));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* editActivitySaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield updateActivity(action.activity);
    yield put(activityActions.editActivity(action.activity));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

export function* activitiesWatcherSaga() {
  yield all([
    takeLatest(SAGA_ACTIVITY_ACTIONS.GET_ACTIVITIES_ASYNC, getActivitiesSaga),
    takeLatest(SAGA_ACTIVITY_ACTIONS.ADD_ACTIVITY_ASYNC, postActivitySaga),
    takeLatest(SAGA_ACTIVITY_ACTIONS.EDIT_ACTIVITY_ASYNC, editActivitySaga),
    takeLatest(SAGA_ACTIVITY_ACTIONS.DELETE_ACTIVITY_ASYNC, deleteActivitySaga)
  ]);
}
