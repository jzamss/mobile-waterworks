import { SET_USER, RESET_USER } from "../actions/auth";

import User from "../../models/User";

const initialState = {
  authenticated: false,
  user: new User(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user, authenticated: true };
      break;

    case RESET_USER:
      return { ...state, user: null, authenticated: false };
      break;

    default:
      return state;
  }
};
