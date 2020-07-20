import {
  UPDATE_CONNECTION,
  SET_CONNECTION,
  SET_PRINTER,
} from "../actions/settings";

import Connection from "../../models/Connection";

const initialState = {
  connection: new Connection(),
  printer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, connection: action.connection };
      break;

    case UPDATE_CONNECTION:
      return { ...state, connection: action.connection };
      break;

    case SET_PRINTER:
      return { ...state, printer: action.printer };
      break;

    default:
      return state;
  }
};
