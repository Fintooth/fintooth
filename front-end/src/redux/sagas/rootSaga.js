import { all } from "redux-saga/effects";

import { usersWatcherSaga } from "./userSaga";
import { groupsWatcherSaga } from "./groupSaga";
import { activitiesWatcherSaga } from "./activitySaga";
import { pollsWatcherSaga } from './pollSaga';

export default function* rootSaga() {
  yield all([usersWatcherSaga(), groupsWatcherSaga(), activitiesWatcherSaga(), pollsWatcherSaga()]);
}
