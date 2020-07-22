import { CURRENT_USER_ACTIONS } from "../constants";

export const userDataReducer = (
  state = { user: { accounts: [] }, token: "" },
  action
) => {
  switch (action.type) {
    case CURRENT_USER_ACTIONS.SET_CURRENT_USER:
      return { user: action.user, token: state.token };
    case CURRENT_USER_ACTIONS.SET_CURRENT_USER_TOKEN:
      return { user: state.user, token: action.token };
    case CURRENT_USER_ACTIONS.SET_CURRENT_USER_DATA:
      return action.userData;
    case CURRENT_USER_ACTIONS.UNSET_CURRENT_USER:
      return { user: { accounts: [] }, token: "" };
    case CURRENT_USER_ACTIONS.ADD_TO_CURRENT_USER_ACCOUNT:
      const newAccounts = state.user.accounts.map((account) =>
        account._id === action.accountId
          ? {
              ...account,
              amount: parseFloat(account.amount) + parseFloat(action.amount),
            }
          : account
      );
      return { ...state, user: { ...state.user, accounts: newAccounts } };
    default:
      return state;
  }
};
