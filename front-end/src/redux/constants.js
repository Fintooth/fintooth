export const REQUEST_ACTIONS = Object.freeze({
  REQUEST_START: "REQUEST_START",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR"
});

export const USER_ACTIONS = Object.freeze({
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  MODIFY_USER: "MODIFY_USER",
  GET_USERS: "GET_USERS"
});

export const SAGA_USER_ACTIONS = Object.freeze({
  ADD_USER_ASYNC: "ADD_USER_ASYNC",
  REMOVE_USER_ASYNC: "REMOVE_USER_ASYNC",
  MODIFY_USER_ASYNC: "MODIFY_USER_ASYNC",
  GET_USERS_ASYNC: "GET_USERS_ASYNC"
});

export const GROUP_ACTIONS = Object.freeze({
  ADD_GROUP: "ADD_GROUP",
  REMOVE_GROUP: "REMOVE_GROUP",
  MODIFY_GROUP: "MODIFY_GROUP",
  GET_GROUPS: "GET_GROUPS"
});

export const SAGA_GROUP_ACTIONS = Object.freeze({
  ADD_GROUP_ASYNC: "ADD_GROUP_ASYNC",
  REMOVE_GROUP_ASYNC: "REMOVE_GROUP_ASYNC",
  MODIFY_GROUP_ASYNC: "MODIFY_GROUP_ASYNC",
  GET_GROUPS_ASYNC: "GET_GROUPS_ASYNC"
});

export const CURRENT_USER_ACTIONS = Object.freeze({
  SET_CURRENT_USER: "SET_CURRENT_USER",
  UNSET_CURRENT_USER: "UNSET_CURRENT_USER"
});

export const URL = "http://localhost:3001";
