/** @format */

import {
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  GET_ALL_PROFILES,
  SET_CURRENT_PROFILE,
} from "../Actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null,
  isNewlyRegged: false,
  error: false,
  editSucess: false,
  profiles: [],
  currentProfile: null,
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: JSON.parse(action.payload.token),
        user: JSON.parse(action.payload.user),
        profiles: JSON.parse(action.payload.profiles),
      };
    case GET_ALL_PROFILES:
      localStorage.setItem("profiles", JSON.stringify(action.payload));
      return {
        ...state,
        profiles: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        token: action.payload.token,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
