/** @format */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import { chat } from "./chatReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
export default combineReducers({
  auth: authReducer,
  toastr: toastrReducer,
  socket: socketReducer,
  chat: chat,
});
