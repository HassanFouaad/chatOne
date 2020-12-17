/** @format */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { FiLogIn } from "react-icons/fi";
import { FaKey, FaMobile, FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Form, FormGroup, Input, Button, Container, Row } from "reactstrap";
import {
  login,
} from "../Actions/authActions";
export const Login = ({
  isAuthenticated,
  login,
  history,
}) => {
  const [formData, setFormData] = useState({
    loginType: "",
    loginData: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { loginType, loginData, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { loginType, loginData, password };
    login(newUser);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Form onSubmit={(e) => onSubmit(e)} className="col-sm-4 signup-form">
          <FormGroup>
            <Row className="justify-content-center">
              <div className="col-sm-4 text-center">
                <span
                  className="text-title text-center"
                  style={{ fontSize: "30px" }}
                >
                  Login
                </span>
              </div>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row className="justify-content-center">
              <FiLogIn className="col-sm text-label" size="30" />
              <Input
                type="select"
                name="loginType"
                className="col-sm-8"
                onChange={(e) => onChange(e)}
              >
                <option defaultValue="Email" selected>
                  Email
                </option>
                <option value="Mobile">Mobile</option>
                <option value="Username">Username</option>
              </Input>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row className="justify-content-center">
              {(loginType.length === 0 || loginType === "Email") && (
                <AiOutlineMail className="col-sm text-label" size="30" />
              )}
              {loginType === "Mobile" && (
                <FaMobile className="col-sm text-label" size="30" />
              )}
              {loginType === "Username" && (
                <FaUser className="col-sm text-label" size="30" />
              )}
              <Input
                type="text"
                name="loginData"
                className="col-sm-8"
                value={loginData}
                onChange={(e) => onChange(e)}
              ></Input>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row className="justify-content-center">
              <FaKey className="col-sm text-label" size="30" />
              <Input
                type="password"
                placeholder="password"
                name="password"
                className="col-sm-8 "
                value={password}
                onChange={(e) => onChange(e)}
              ></Input>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row className="justify-content-center">
              <div className="text-right col-sm-8">
                <Button
                  id="subbtn"
                  className="btn main-btn col-sm-8 text-center"
                >
                  Login
                </Button>
              </div>
            </Row>
          </FormGroup>
        </Form>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
