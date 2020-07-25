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
  return {
    type: CURRENT_USER_ACTIONS.ADD_TO_CURRENT_USER_ACCOUNT,
    accountId,
    amount,
  };
};

export const currentUserAddAccount = (account) => {
  return { type: CURRENT_USER_ACTIONS.CURRENT_USER_ADD_ACCOUNT, account };
};

export const currentUserDeleteAccount = (accountId) => {
  return { type: CURRENT_USER_ACTIONS.CURRENT_USER_DELETE_ACCOUNT, accountId };
};

export const leaveGroup = (groupId) => {
  return { type: CURRENT_USER_ACTIONS.LEAVE_GROUP, groupId };
};

export const joinGroup = (groupId) => {
  return { type: CURRENT_USER_ACTIONS.JOIN_GROUP, groupId };
};
