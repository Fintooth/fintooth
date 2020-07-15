import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as activityActions from "../actions/activityActions";
import { SAGA_ACTIVITY_ACTIONS, URL } from "../constants";

const getActivities = (userId) => axios.get(`${URL}/activities/user/${userId}`);
const postActivity = (activity, userId) =>
  axios.post(`${URL}/activities/user/${userId}`, activity);
const updateActivity = (activity) =>
  axios.patch(`${URL}/activities/${activity.id}`, activity);
const deleteActivity = (activityId) =>
  axios.delete(`${URL}/activities/${activityId}`);

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
    yield put(activityActions.addActivity([action.activity]));
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
    takeLatest(SAGA_ACTIVITY_ACTIONS.DELETE_ACTIVITY_ASYNC, deleteActivitySaga),
  ]);
}
