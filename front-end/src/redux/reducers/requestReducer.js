import {REQUEST_ACTIONS} from '../constants';

const defaultState = {
    fetching: false,
    data: null,
    error: null
}

export const requestReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_ACTIONS.REQUEST_START:
            return {fetching: true, data: null, error: null}
        case REQUEST_ACTIONS.REQUEST_SUCCESS:
            return {fetching: false, data: action.data, error: null}
        case REQUEST_ACTIONS.REQUEST_ERROR:
            return {fetching: false, data: null, error: action.error}
        default:
            return state
    }
}