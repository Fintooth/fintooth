import { CURRENT_USER_ACTIONS } from "../constants";

export const setCurrentUser = (user) => {
  return { type: CURRENT_USER_ACTIONS.SET_CURRENT_USER, user };
};

export const setCurrentUserData = (userData) => {
  return { type: CURRENT_USER_ACTIONS.SET_CURRENT_USER_DATA, userData };
};

export const unsetCurrentUser = () => {
  return { type: CURRENT_USER_ACTIONS.UNSET_CURRENT_USER };
};

export const addToCurrentUserAccount = (amount, accountId) => {
  return { type: CURRENT_USER_ACTIONS.ADD_TO_ACCOUNT, accountId, amount };
};
