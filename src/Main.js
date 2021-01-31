/** @format */

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import { loadUser, getAllProfiles } from "./Actions/authActions";
import { connectToSocket } from "./Actions/socketActions";
import ReduxToastr from "react-redux-toastr";
import HomePage from "./Components/HomePage";
export const Main = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      ></ReduxToastr>

      <BrowserRouter>
        <Route component={Login} exact path="/login"></Route>
        <Route component={HomePage} exact path="/"></Route>
      </BrowserRouter>
    </Provider>
  );
};

export default Main;
