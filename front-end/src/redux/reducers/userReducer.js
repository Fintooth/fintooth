import { USER_ACTIONS } from "../constants";
import { modifyUser } from "../actions/userActions";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ACTIONS.ADD_USER:
      return [...action.user];
    case USER_ACTIONS.REMOVE_USER:
      return state.filter((user) => user.id !== action.userId);
    case USER_ACTIONS.MODIFY_USER:
      const toModifyIndex = state.findIndex(
        (user) => user.email === action.user.email
      );
      return [
        ...state.slice(0, toModifyIndex),
        action.user,
        ...state.slice(toModifyIndex + 1, state.length),
      ];
    case USER_ACTIONS.ADD_ACCOUNT:
      const toModifyIndex1 = state.findIndex(
        (user) => user.email === action.user.email
      );
      return [
        ...state.slice(0, toModifyIndex1),
        action.user,
        ...state.slice(toModifyIndex1 + 1, state.length),
      ];
    case USER_ACTIONS.DELETE_ACCOUNT:
      const toModifyIndex2 = state.findIndex(
        (user) => user.email === action.user.email
      );
      return [
        ...state.slice(0, toModifyIndex2),
        action.user,
        ...state.slice(toModifyIndex2 + 1, state.length),
      ];
    case USER_ACTIONS.CHANGE_PASSWORD:
      const toModifyIndex3 = state.findIndex(
        (user) => user.email === action.user.email
      );
      return [
        ...state.slice(0, toModifyIndex3),
        action.user,
        ...state.slice(toModifyIndex3 + 1, state.length),
      ];
    default:
      return state;
  }
};

export default userReducer;
