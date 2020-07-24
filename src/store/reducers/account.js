import { SET_ACCOUNTS, SET_ACCOUNT, SET_PAGE } from "../actions/account";

const initialState = {
  accounts: [],
  page: 0,
  account: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return { ...state, accounts: action.accounts };
      break;

    case SET_ACCOUNT:
      const acctIdx = state.accounts.findIndex(acct => acct.objid === action.account.objid);
      const updatedAccounts = [...state.accounts];
      updatedAccounts[acctIdx] = action.account;
      return { accounts: updatedAccounts, account: action.account };      
      break;

    case SET_PAGE:
      return {...state, page: action.page};      
      break;

    default:
      return state;
  }
};
