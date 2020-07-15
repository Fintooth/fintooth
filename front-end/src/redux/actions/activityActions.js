import { ACTIVITY_ACTIONS } from "../constants";

export function getActivities(activities) {
  return { type: ACTIVITY_ACTIONS.GET_ACTIVITIES, activities };
}

export function addActivity(activity) {
  return { type: ACTIVITY_ACTIONS.ADD_ACTIVITY, activity };
}

export function deleteActivity(activityId) {
  return { type: ACTIVITY_ACTIONS.DELETE_ACTIVITY, activityId };
}

export function editActivity(activity) {
  return { type: ACTIVITY_ACTIONS.EDIT_ACTIVITY, activity };
}
