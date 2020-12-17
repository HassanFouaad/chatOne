/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

export const Message = () => {
  return (
    <div>
      <Button>Send Message</Button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
