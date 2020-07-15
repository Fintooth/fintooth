import { ACTIVITY_ACTIONS } from "../constants";

const activityReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIVITY_ACTIONS.GET_ACTIVITIES:
      return [...state, ...action.activities];
    case ACTIVITY_ACTIONS.ADD_ACTIVITY:
      return [...state, { ...action.activity }];
    case ACTIVITY_ACTIONS.DELETE_ACTIVITY:
      return state.filter((activity) => activity.id !== action.activityId);
    case ACTIVITY_ACTIONS.EDIT_ACTIVITY:
      return state.map((activity) =>
        activity.id !== action.activity.id ? activity : action.activity
      );
    default:
      return state;
  }
};

export default activityReducer;
