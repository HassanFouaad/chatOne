/** @format */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row } from "reactstrap";
import { newMessage } from "../Actions/chatActions";
import axios from "axios";
import { setCurrentProfile } from "../Actions/authActions";
import { connectToSocket } from "../Actions/socketActions";
import store from "../store";
export const tokenConfig = (token) => {
  //Get token from Local Storage
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
export const HomePage = ({
  profiles,
  newMessage,
  token,
  currentProfile,
  setCurrentProfile,
  socket,
}) => {
  useEffect(() => {
    store.dispatch(connectToSocket());
  }, []);

  const handleClick = () => {

    socket.emit("sendBySocket", { recieverId: 4, message: "Hey There" });
  };

  return ( 
    <Container>
      <div className="row">
        {profiles &&
          profiles.length &&
          profiles.map((p, i) => {
            return (
              <Button
                className="col"
                key={i}
                onClick={() => setCurrentProfile(p.id)}
              >
                {p.id}
              </Button>
            );
          })}
      </div>
      <Button onClick={handleClick}></Button>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  profiles: state.auth.profiles,
  currentProfile: state.auth.currentProfile,
  socket: state.socket.socket,
});

const mapDispatchToProps = { newMessage, setCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
