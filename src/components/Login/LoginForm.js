import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { Button } from "../Button";
import Service from "../../utils/service";

/**
 * The LoginForm component of the application.
 * This component is used to show Login Form
 */
export default class LoginForm extends Component {
  state = {
    isLoading: false,
    isAlreadyLoggedIn: false,
    isErrorVisible: false,
    isUserIdError: false,
    isPasswordError: false,
    userId: null,
    password: null
  };

  /**
 * This Methiod is used to Validate login form fields
 */
  validateFields() {
    userId = this.state.userId;
    password = this.state.password;
    userIdValid = true;
    passwordValid = true;
    if (userId == "" || userId == null || userId.length == 0) {
      userIdValid = false;
    }

    if (password == "" || password == null || password.length == 0) {
      passwordValid = false;
    }

    this.setState({
      isUserIdError: !userIdValid,
      isPasswordError: !passwordValid
    });

    return userIdValid && passwordValid;
  }

  /**
   * This Methiod is used to authenticate a user from Services
   */
  authenticate(userId, password) {
    this.setState({ isLoading: true });
    // Calling the Login
    Service.login(userId, password)
      .then(response => {
        if(response.status == "1"){
          this.props.onLogin(true);
          this.setState({ isErrorVisible: false, isLoading: false });
        }
        else{
          this.setState({ isErrorVisible: true, isLoading: false });
          this.props.onLogin(false);
        }
      })
      .catch(error => {
        this.setState({ isErrorVisible: true, isLoading: false });
        this.props.onLogin(false);
      });
  }

  /**
   * This Methiod is called when user clicks on login button
   */
  loginPressed = () => {
    this.setState({ isErrorVisible: false });
    var validation = this.validateFields();
    if (validation) this.authenticate(this.state.userId, this.state.password);
  };

  /**
   * This Methiod is used to get Current login status.
   */
  getLoginStatus() {
    this.setState({ isAlreadyLoggedIn: true });
    Service.getLoginStatus()
      .then(response => {
        this.props.onLogin(true);
        this.setState({ isAlreadyLoggedIn: false });
      })
      .catch(error => {
        this.setState({ isAlreadyLoggedIn: false });
        this.props.onLogin(false);
      });
  }
  // User Validation check
  renderEmptyUserIdError() {
    if (this.state.isUserIdError) {
      return (
        <View style={{ margin: 5 }}>
          <Text style={{ color: "red", fontSize: 16 }}>Field Required</Text>
        </View>
      );
    }
  }
  // Password validation check
  renderEmptyPasswordError() {
    if (this.state.isPasswordError) {
      return (
        <View style={{ margin: 5 }}>
          <Text style={{ color: "red", fontSize: 16 }}>Field Required</Text>
        </View>
      );
    }
  }

  // Show any validation error on login form
  renderAuthenticationError() {
    if (this.state.isErrorVisible) {
      return (
        <View style={{ margin: 20 }}>
          <Text style={{ color: "red", fontSize: 16 }}>
            Invalid User ID or Password
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
        <View style={styles.mainContainer}>
           <Image source={require('../../images/bg.jpg')} style={styles.backgroundImage}/>
            {/*<View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                margin: 10
              }}
            >
              <Image source={require("../../images/logo.medium.png")} />
            </View>*/}
            <View style={styles.container}>
              <TextInput
                style={styles.textInput}
                onChangeText={userId => this.setState({ userId })}
                value={this.state.userId}
                placeholder="User ID"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
              />
              {this.renderEmptyUserIdError()}
              <TextInput
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
              />
              {this.renderEmptyPasswordError()}
              {this.renderAuthenticationError()}
                <View style={styles.buttonView}>
                  <View>
                    <Button
                      title="Login"
                      type="primary"
                      elevation="0"
                      onPress={this.loginPressed}
                    />
                  </View>
              </View>
          </View>
          {this.state.isLoading &&
            <ActivityIndicator style={styles.loading} size="large" />}
          {this.state.isAlreadyLoggedIn &&
            <ActivityIndicator style={styles.opaqueLoading} size="large" />}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: undefined,
    height: undefined   
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "black",
    fontSize: 16,
    margin: 10
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  opaqueLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});
