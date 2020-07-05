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
