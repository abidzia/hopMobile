import React, { Component, PropTypes } from "react";
import {
  AppRegistry,
  sheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

import Modal from "react-native-modal";

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    alignSelf: "flex-end",
    marginBottom: 10,
    width: 100,
    //alignSelf: 'stretch',
    justifyContent: "center",
    marginRight: 5
  }
});

export default props =>
  <Modal
    isVisible={props.isVisible}
    style={{
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <View style={{ backgroundColor: "white", height: 100, width: 500 }}>
      <View style={{ marginBottom: 5 }}>
        <Text style={{ fontSize: 20 }}> Delete</Text>
      </View>

      <View>
        <Text style={{ fontSize: 15 }}> Do you want to delete This?</Text>
      </View>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 5
      }}
    >
      <TouchableHighlight
        style={[styles.button, { backgroundColor: "orange" }]}
        onPress={() => props.onHideModalPress()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={this.onSaveClick}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  </Modal>;
