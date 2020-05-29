import { USER_ACTIONS } from "../constants";

export function addUser(user) {
  return { type: USER_ACTIONS.ADD_USER, user };
}

export function removeUser(userId) {
  return { type: USER_ACTIONS.REMOVE_USER, userId };
}

export function modifyUser(user) {
  return { type: USER_ACTIONS.MODIFY_USER, user };
}
