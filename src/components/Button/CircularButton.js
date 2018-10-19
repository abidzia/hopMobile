import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";

export default class CircularButton extends Component {
  render() {
    const { onPress } = this.props;
    const { text } = this.props;

    return (
      <Touchable style={styles.circle} onPress={onPress}>
        <Text style={styles.text}>
          {text}
        </Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "orange"
  },
  text: {
    fontSize: 25,
    color: "white",
    paddingBottom: 3
  }
});
