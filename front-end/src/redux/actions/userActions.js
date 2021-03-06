import { USER_ACTIONS } from "../constants";

export function addUser(user) {
  return { type: USER_ACTIONS.ADD_USER, user };
}

export function removeUser(userId) {
  return { type: USER_ACTIONS.REMOVE_USER, userId };
}

export function changeUserPassword(user) {
  return { type: USER_ACTIONS.CHANGE_PASSWORD, user };
}

export function modifyUser(user) {
  return { type: USER_ACTIONS.MODIFY_USER, user };
}

export function addAccount(user) {
  return { type: USER_ACTIONS.ADD_ACCOUNT, user };
}

export function deleteAccount(accountId, user) {
  return { type: USER_ACTIONS.DELETE_ACCOUNT, user };
}
