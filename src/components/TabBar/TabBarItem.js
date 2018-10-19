import React from "react";
import { View, Text } from "react-native";
import Touchable from "react-native-platform-touchable";

import Icon from "react-native-vector-icons/MaterialIcons";

import _ from "lodash";

import { PrimaryColor } from "../../utils/constants";

const DEFAULT_ICON_SIZE = 16;
const DEFAULT_LABEL_SIZE = 10;
const ZOOM_FACTOR = 1;

const styles = {
  tabButton: {
    width: 100,
    height: 60,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default class TabBarItem extends React.Component {
  constructor() {
    super();
    this.state = this.getUiState({ focused: false });
  }

  getUiState({ focused }) {
    const zoom = focused ? ZOOM_FACTOR : 1;
    return {
      iconSize: DEFAULT_ICON_SIZE * zoom,
      labelSize: DEFAULT_LABEL_SIZE * zoom,
      fontColor: focused ? PrimaryColor : "#555"
    };
  }

  componentDidMount() {
    this.updateUiState({ focused: this.props.focused });
  }

  updateUiState({ focused }) {
    const state = this.getUiState({ focused });
    this.setState(state);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focused != nextProps.focused) {
      this.updateUiState({ focused: nextProps.focused });
    }
  }

  render() {
    var iconStyle = {
      fontSize: this.state.iconSize,
      color: this.state.fontColor
    };
    var labelStyle = {
      fontSize: this.state.labelSize,
      color: this.state.fontColor
    };

    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.tabButton}>
          <Icon name={this.props.icon} style={iconStyle} />
          <Text style={labelStyle}>
            {this.props.title}
          </Text>
        </View>
      </Touchable>
    );
  }
}
