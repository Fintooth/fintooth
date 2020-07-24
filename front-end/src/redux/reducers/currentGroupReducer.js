import { CURRENT_GROUP_ACTIONS } from "../constants";

const currentGroupReducer = (
  state = { members: [], accounts: [], id: "" },
  action
) => {
  switch (action.type) {
    case CURRENT_GROUP_ACTIONS.LOAD_CURRENT_GROUP:
      return { ...state, ...action.group };
    case CURRENT_GROUP_ACTIONS.UNLOAD_CURRENT_GROUP:
      return { members: [], accounts: [], id: "" };
    case CURRENT_GROUP_ACTIONS.ADD_TO_CURRENT_GROUP_ACCOUNT:
      const newAccounts = state.accounts.map((account) =>
        account._id === action.accountId
          ? {
              ...account,
              amount: parseFloat(account.amount) + parseFloat(action.amount),
            }
          : account
      );
      return { ...state, accounts: newAccounts };
    case CURRENT_GROUP_ACTIONS.ADD_CURRENT_GROUP_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, { ...action.account }],
      };
    case CURRENT_GROUP_ACTIONS.REMOVE_CURRENT_GROUP_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((acc) => acc._id !== action.accountId),
      };
    case CURRENT_GROUP_ACTIONS.ADD_CURRENT_GROUP_USER:
      return {
        ...state,
        members: [...state.members, { ...action.user }],
      };
    case CURRENT_GROUP_ACTIONS.REMOVE_CURRENT_GROUP_USER:
      return {
        ...state,
        members: state.members.filter((mem) => mem.id !== action.userId),
      };
    default:
      return state;
  }
};

export default currentGroupReducer;
