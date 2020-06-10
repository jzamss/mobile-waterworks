import {
  UPDATE_CONNECTION,
  SET_CONNECTION
} from "../actions/settings";

import Connection from "../../models/Connection";

const initialState = {
  connection: new Connection("localhost", "8070"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, connection: action.connection };
      break;

    case UPDATE_CONNECTION:
      return { ...state, connection: action.connection };
      break;

    default:
      return state;
  }
};
