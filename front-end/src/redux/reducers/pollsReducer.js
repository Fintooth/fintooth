import { POLLS_ACTIONS } from "../constants";

const pollsReducer = (state = [], action) => {
  switch (action.type) {
    case POLLS_ACTIONS.GET_POLLS:
      return [...state, ...action.polls];
    case POLLS_ACTIONS.ADD_POLL:
      return [{ ...action.poll }, ...state];
    case POLLS_ACTIONS.DELETE_POLL:
      return state.filter(poll => poll.id !== action.pollId);
    case POLLS_ACTIONS.EDIT_POLL:
      return state.map(poll =>
        poll.id !== action.poll.id ? poll : action.poll
      );
    default:
      return state;
  }
};

export default pollsReducer;
