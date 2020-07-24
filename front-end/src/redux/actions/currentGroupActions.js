import { CURRENT_GROUP_ACTIONS } from "../constants";

export const loadCurrentGroup = (group) => {
  return { type: CURRENT_GROUP_ACTIONS.LOAD_CURRENT_GROUP, group };
};

export const unloadCurrentGroup = () => {
  return { type: CURRENT_GROUP_ACTIONS.UNLOAD_CURRENT_GROUP };
};

export const addToCurrentGroupAccount = (amount, accountId) => {
  return {
    type: CURRENT_GROUP_ACTIONS.ADD_TO_CURRENT_GROUP_ACCOUNT,
    accountId,
    amount,
  };
};

export const currentGroupAddAccount = (account) => {
  return { type: CURRENT_GROUP_ACTIONS.ADD_CURRENT_GROUP_ACCOUNT, account };
};

export const currentGroupDeleteAccount = (accountId) => {
  return {
    type: CURRENT_GROUP_ACTIONS.REMOVE_CURRENT_GROUP_ACCOUNT,
    accountId,
  };
};

export const currentGroupAddUser = (user) => {
  return { type: CURRENT_GROUP_ACTIONS.ADD_CURRENT_GROUP_USER, user };
};

export const currentGroupRemoveUser = (userId) => {
  return { type: CURRENT_GROUP_ACTIONS.REMOVE_CURRENT_GROUP_USER, userId };
};
