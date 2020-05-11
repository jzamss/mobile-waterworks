import { SET_RATES } from "../actions/rate";

const initialState = {
  rates: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RATES:
      return { ...state, rates: action.rates};
      break;

    default:
      return state;
  }
};
