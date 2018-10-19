import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";

import CheckBox from 'react-native-check-box';

import { Button } from "../Button";
import Service from "../../utils/service";

const t = require("tcomb-form-native");
let Form = t.form.Form;

// Move to stylesheet
var _ = require("lodash");

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 0.5;
stylesheet.textboxView.normal.borderColor = "#CCD1D1";
stylesheet.textboxView.error.borderBottomWidth = 0.5;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.normal.paddingLeft = 10;
stylesheet.textbox.normal.paddingRight = 10;
stylesheet.textbox.error.marginLeft = 0;
stylesheet.textbox.normal.marginLeft = 0;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.marginTop = 10;
stylesheet.textbox.error.marginTop = 10;
stylesheet.controlLabel.normal.color = "grey";
stylesheet.controlLabel.normal.fontWeight = "normal";

var options = {
  auto: "placeholders",
  fields: {
    current_password: {
      placeholder: "Current Password",
      password: true,
      secureTextEntry: true
    },
    new_password: {
      placeholder: "New Password",
      password: true,
      secureTextEntry: true
    },
    confirm_password: {
      placeholder: "Confirm Password",
      password: true,
      secureTextEntry: true
    }
  },
  stylesheet: stylesheet
};

// Create Update Account form
var accountForm = t.struct({
  current_password: t.String,
  new_password: t.String,
  confirm_password: t.String
});

/**
 * AccountInfo compnent will be used to show Account Info
 */

export default class AccountInfo extends Component {
  _clearForm = () => {
    this.setState({
      value: "",
      isLoading: false
    });
  };

  /**
  * Method will call on Save button pressed to update record
  */

  _updateInfo = () => {
    let employee = this.refs.form.getValue();
  };

  getInitialState() {
    return {
      value: {
        current_password: "",
        new_password: "",
        confirm_password: ""
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: false , morning: false,lunch:false,evening:false };
  }

  render() {
    return (
      <View>
          <View style={{ flex: 1 }} />
          <View style={styles.modalContent}>
            {/*<View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={styles.headerText}>Change Password</Text>
              <View style={{ flex: 1 }} />
            </View>*/}
            <View style={styles.container}>
              <Form
                ref="form"
                type={accountForm}
                options={options}
                value={this.state.value}
                onChange={value => {
                  this.setState({ value: value });
                }}
              />
            </View>
            <View style={{ paddingBottom: 5 }}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.morning
                  })
                }}
                isChecked={this.state.morning}
                leftText={"Morning"}
            />
            </View>
            <View style={{ paddingBottom: 5 }}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.lunch
                  })
                }}
                isChecked={this.state.lunch}
                leftText={"Lunch"}
            />
            </View>
            <View style={{ paddingBottom: 5 }}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.evening
                  })
                }}
                isChecked={this.state.evening}
                leftText={"Evening"}
            />
            </View>
            <View style={styles.buttonView}>
              <View style={{ flex: 1 , backgroundColor:"white"}} />
              <View style={{ flex: 2, flexDirection: "row" ,backgroundColor:"white"}}>
                <Button type="flat" title="Cancel" onPress={() => {
                    this._clearForm();
                  }}/>
                <Button
                  type="flat"
                  title="Save"
                  onPress={() => {
                    this._updateInfo();
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "400",
    fontSize: 20,
    color: "#0C090A",
    paddingLeft: 10,
    paddingBottom: 5,
    fontFamily: "Roboto"
  },
  checkboxStyle: { width: 17, height: 17 },
  checkboxLabelStyle: { fontSize: 17 },
  container: {
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#ffffff"
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  }
});
