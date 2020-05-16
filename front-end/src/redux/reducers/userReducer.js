import { USER_ACTIONS } from "../constants";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ACTIONS.ADD_USER:
      return [...state, { ...action.user }];
    case USER_ACTIONS.REMOVE_USER:
      return state.filter(user => user.email !== action.user.id);
    case USER_ACTIONS.MODIFY_USER:
      const toModifyIndex = state.findIndex(
        user => user.email === action.user.email
      );
      return [
        ...state.slice(0, toModifyIndex),
        action.user,
        ...state.slice(toModifyIndex + 1, state.length)
      ];
    default:
      return state;
  }
};

export default userReducer;
