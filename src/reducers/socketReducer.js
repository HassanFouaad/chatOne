/** @format */

import { socketConstants } from "../constants/socketCOnstants";

export default function socket(state = {}, action) {
  switch (action.type) {
    case socketConstants.CONNECT:
      return {
        ...state,
        socket: action.payload,
      };

    default:
      return state;
  }
}
