import { takeLatest, put, all } from "redux-saga/effects";
import axios from "axios";

import * as requestActions from "../actions/requestActions";
import * as pollActions from "../actions/pollsActions";
import { SAGA_POLLS_ACTIONS, URL } from "../constants";

const token =
  (localStorage.getItem("currentUser") &&
    JSON.parse(localStorage.getItem("currentUser")).token) ||
  "abc";

const getPolls = () =>
  axios.get(`${URL}/polls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const postPoll = poll =>
  axios.post(`${URL}/polls/${poll.group}`, poll, {
    headers: { Authorization: `Bearer ${token}` }
  });
const updatePoll = poll =>
  axios.post(
    `${URL}/polls/${poll._id}/comment`,
    poll.comments[poll.comments.length - 1],
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
const deletePoll = pollId =>
  axios.delete(`${URL}/polls/${pollId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
const votePoll = vote => {
  axios.patch(`${URL}/polls/${vote.poll._id}/vote`, vote.vote, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

function* getPollsSaga() {
  try {
    yield put(requestActions.startRequest());
    const response = yield getPolls();
    yield put(pollActions.getPolls(response.data.polls));
    yield put(requestActions.successRequest(response));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* postPollSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield postPoll(action.poll);
    console.log(response);
    yield put(pollActions.addPoll(response.data.poll));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* deletePollSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield deletePoll(action.pollId);
    yield put(pollActions.deletePoll(action.pollId));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* editPollSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield updatePoll(action.poll);
    yield put(pollActions.editPoll(action.poll));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

function* votePollSaga(action) {
  try {
    yield put(requestActions.startRequest());
    const response = yield votePoll(action.vote);
    yield put(pollActions.editPoll(action.poll));
    yield put(requestActions.successRequest(response.data));
  } catch (e) {
    yield put(requestActions.errorRequest(e.message));
  }
}

export function* pollsWatcherSaga() {
  yield all([
    takeLatest(SAGA_POLLS_ACTIONS.GET_POLLS_ASYNC, getPollsSaga),
    takeLatest(SAGA_POLLS_ACTIONS.ADD_POLL_ASYNC, postPollSaga),
    takeLatest(SAGA_POLLS_ACTIONS.EDIT_POLL_ASYNC, editPollSaga),
    takeLatest(SAGA_POLLS_ACTIONS.DELETE_POLL_ASYNC, deletePollSaga),
    takeLatest(SAGA_POLLS_ACTIONS.VOTE_POLL_ASYNC, votePollSaga)
  ]);
}
