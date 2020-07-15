import { all } from "redux-saga/effects";

import { usersWatcherSaga } from "./userSaga";
import { groupsWatcherSaga } from "./groupSaga";
import { activitiesWatcherSaga } from "./activitySaga";

export default function* rootSaga() {
  yield all([usersWatcherSaga(), groupsWatcherSaga(), activitiesWatcherSaga()]);
}
