import { GROUP_ACTIONS } from "../constants";

export function addGroup(group) {
  return { type: GROUP_ACTIONS.ADD_GROUP, group };
}

export function removeGroup(groupId) {
  return { type: GROUP_ACTIONS.REMOVE_GROUP, groupId };
}

export function modifyGroup(group) {
  return { type: GROUP_ACTIONS.MODIFY_GROUP, group };
}
export function addAccount(group) {
  return { type: GROUP_ACTIONS.ADD_ACCOUNT, group };
}

export function addUser(group) {
  return { type: GROUP_ACTIONS.ADD_USER, group };
}

export function removeUser(userId, group) {
  return { type: GROUP_ACTIONS.REMOVE_USER, group };
}
