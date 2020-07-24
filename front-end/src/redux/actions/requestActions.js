import { REQUEST_ACTIONS } from "../constants";

export const startRequest = () => {
  return { type: REQUEST_ACTIONS.REQUEST_START, data: null, error: null };
};

export const successRequest = (data) => {
  return { type: REQUEST_ACTIONS.REQUEST_SUCCESS, data, error: null };
};

export const errorRequest = (errorMessage) => {
  return {
    type: REQUEST_ACTIONS.REQUEST_ERROR,
    data: null,
    error: errorMessage,
  };
};
