/** @format */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Row } from "reactstrap";
import { newMessage } from "../Actions/chatActions";
import axios from "axios";
import { baseUrl } from "../Actions/baseURL";
export const HomePage = ({ profiles, newMessage, token }) => {
  const handleClick = () => {
    const data = {
      senderProfileId: profiles[0].profile.id,
      recieverProfileId: profiles[1].profile.id,
      message: "Teseeatstat",
    };
    newMessage(data);
  };

  return (
    <Container>
      <Button onClick={handleClick}></Button>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  profiles: state.auth.profiles,
});

const mapDispatchToProps = { newMessage };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
