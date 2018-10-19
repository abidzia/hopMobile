import React from "react";
import { Text, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";

import { PrimaryColor } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 3
  },
  label: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default (Button = ({ type, ...props }) => {
  let backgroundColor = PrimaryColor;
  let labelColor = "white";
  let elevation = 2;
  let background = Touchable.SelectableBackground();

  if (type == "primary") {
    backgroundColor = PrimaryColor;
    labelColor = "white";
    background = Touchable.Ripple("#AA4600");
  } else if (type == "submit") {
    backgroundColor = "#148E1E";
    labelColor = "white";
    background = Touchable.Ripple("#005409");
  } else if (type == "flat") {
    backgroundColor = "white";
    labelColor = PrimaryColor;
    elevation = 0;
  } else {
    throw new Error("Invalid button type", type);
  }

  if (props.backgroundColor) backgroundColor = props.backgroundColor;
  if (props.elevation) elevation = parseInt(props.elevation);

  return (
    <Touchable
      style={[styles.container, { backgroundColor, elevation }]}
      background={background}
      onPress={props.onPress}
    >
      <Text style={[styles.label, { color: labelColor }, props.style]}>
        {props.title.toUpperCase()}
      </Text>
    </Touchable>
  );
});

Button.defaultProps = { type: "flat" };
