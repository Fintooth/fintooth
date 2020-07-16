import { CURRENT_USER_ACTIONS } from "../constants";

export const setCurrentUser = (userData) => {
  return { type: CURRENT_USER_ACTIONS.SET_CURRENT_USER, userData };
};

export const unsetCurrentUser = () => {
  return { type: CURRENT_USER_ACTIONS.UNSET_CURRENT_USER };
};

export const addToCurrentUserAccount = (amount, accountId) => {
  return { type: CURRENT_USER_ACTIONS.ADD_TO_ACCOUNT, accountId, amount };
};
