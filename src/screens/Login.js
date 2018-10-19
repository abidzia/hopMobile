import React, { Component } from "react";

import { LoginForm } from "../components/Login";

export default class LoginScreen extends Component {
  login = status => {
    this.props.onLogin(status);
  };

  render() {
    return <LoginForm onLogin={this.login} />;
  }
}
