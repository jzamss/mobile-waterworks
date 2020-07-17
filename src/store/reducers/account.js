import { SET_ACCOUNTS, SET_ACCOUNT, SET_GEO_LOCATION } from "../actions/account";

const initialState = {
  accounts: [],
  account: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return { ...state, accounts: action.accounts };
      break;

    case SET_ACCOUNT:
      console.log("SET_ACCOUNT")
      const acctIdx = state.accounts.findIndex(acct => acct.objid === action.account.objid);
      const updatedAccounts = [...state.accounts];
      updatedAccounts[acctIdx] = action.account;
      return { accounts: updatedAccounts, account: action.account };
      break;
    
    default:
      return state;
  }
};
