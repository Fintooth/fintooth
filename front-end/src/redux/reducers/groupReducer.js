import { GROUP_ACTIONS } from "../constants";

const groupReducer = (state = [], action) => {
  switch (action.type) {
    case GROUP_ACTIONS.ADD_GROUP:
      return [...state, ...action.group];
    case GROUP_ACTIONS.REMOVE_GROUP:
      return state.filter((group) => group.id !== action.groupId);
    case GROUP_ACTIONS.MODIFY_group:
      const toModifyIndex = state.findIndex(
        (group) => group.groupId === action.group.groupId
      );
      return [
        ...state.slice(0, toModifyIndex),
        action.group,
        ...state.slice(toModifyIndex + 1, state.length),
      ];
    case GROUP_ACTIONS.ADD_ACCOUNT:
      const toModifyIndex1 = state.findIndex(
        (group) => group.groupId === action.group.groupId
      );
      return [
        ...state.slice(0, toModifyIndex1),
        action.group,
        ...state.slice(toModifyIndex1 + 1, state.length),
      ];
    case GROUP_ACTIONS.ADD_USER:
      const toModifyIndex2 = state.findIndex(
        (group) => group.groupId === action.group.groupId
      );
      return [
        ...state.slice(0, toModifyIndex2),
        action.group,
        ...state.slice(toModifyIndex2 + 1, state.length),
      ];
    default:
      return state;
  }
};

export default groupReducer;
