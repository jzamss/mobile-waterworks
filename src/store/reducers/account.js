import { SET_ACCOUNT  } from "../actions/account";

const initialState = {
  account: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { account: action.account };
      break;
    
    default:
      return state;
  }
};
