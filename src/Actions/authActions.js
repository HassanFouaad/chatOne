/** @format */

import axios from "axios";
import { toastr } from "react-redux-toastr";
import { baseUrl } from "./baseURL";

import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  GET_ALL_PROFILES,
  SET_CURRENT_PROFILE,
} from "./types";

export const userLodaing = () => ({
  type: USER_LOADING,
});

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch(userLodaing());
  if (typeof window !== undefined) {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const profiles = localStorage.getItem("profiles");
      const data = { token, user, profiles };
      return dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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

export const setCurrentProfile = (profileId) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_PROFILE,
    payload: profileId,
  });
  let io = getState().socket.socket;
  io.emit("changeProfile", JSON.stringify(profileId));
};

export const login = (dataForLogin) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { loginType, loginData, password } = dataForLogin;

  let body = {};
  if (loginType === "") {
    body = { password, loginData: loginData };
  }
  if (loginType === "Mobile") {
    body = { password, loginData: loginData };
  }
  if (loginType === "Email") {
    body = { password, loginData: loginData };
  }
  if (loginType === "Username") {
    body = { password, loginData: loginData };
  }

  axios
    .post(`${baseUrl}/api/v1/login`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
      dispatch(loadUser());
      toastr.success("Welcome Back!", "You have successfully logged in");
      axios
        .get(`${baseUrl}/api/v1/users/my-profiles`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data.data,
          });
        })
        .catch((error) => {
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
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        if (error.response.data.error) {
          toastr.error(error.response.data.error.message);
        }
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => {
  toastr.success("See you later", "You have successfully logged out");
  return {
    type: LOGOUT_SUCCESS,
  };
};
