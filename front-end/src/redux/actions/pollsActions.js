import { POLLS_ACTIONS } from "../constants";

export function getPolls(polls) {
  return { type: POLLS_ACTIONS.GET_POLLS, polls };
}

export function addPoll(poll) {
  return { type: POLLS_ACTIONS.ADD_POLL, poll };
}

export function deletePoll(pollId) {
  return { type: POLLS_ACTIONS.DELETE_POLL, pollId };
}

export function editPoll(poll) {
  return { type: POLLS_ACTIONS.EDIT_POLL, poll };
}
