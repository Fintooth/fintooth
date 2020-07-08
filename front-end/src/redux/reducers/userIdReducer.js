import { CURRENT_USER_ACTIONS } from "../constants";

export const userDataReducer = (state = { userId: "", token: "" }, action) => {
  switch (action.type) {
    case CURRENT_USER_ACTIONS.SET_CURRENT_USER:
      return action.userData;
    case CURRENT_USER_ACTIONS.UNSET_CURRENT_USER:
      return { userId: "", token: "" };
    default:
      return state;
  }
};