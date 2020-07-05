import {all} from 'redux-saga/effects';

import { usersWatcherSaga } from "./userSaga";
import { groupsWatcherSaga } from "./groupSaga";

export default function* rootSaga() {
    yield all([
        usersWatcherSaga(),
        groupsWatcherSaga()
    ])
}