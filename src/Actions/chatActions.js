/** @format */

import axios from "axios";
import { baseUrl } from "./baseURL";
import { SEND_MESSAGE } from "./types";
import { toastr } from "react-redux-toastr";
/** @format */
export const tokenConfig = (getState) => {
  //Get token from Local Storage
  let token = getState().auth.token;
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token , add to headers

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
export const newMessage = (body) => (dispatch, getState) => {
  axios
    .post(`${baseUrl}/api/v1/chat/message/send`, body, tokenConfig(getState))
    .then((response) => {
      dispatch({ type: SEND_MESSAGE, payload: response.data.data });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.message) {
          toastr.error(error.response.data.message);
        }
        if (error.response.data.error) {
          toastr.error(error.response.data.error.message);
        }
      }
    });
};
