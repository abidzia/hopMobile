import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Touchable from "react-native-platform-touchable";
import { Button } from "../Button";
import Service from "../../utils/service";

/**
 * The DailyTaskItem component of the application.
 * This component is used to show each Employee , this component will be created from EmployeeList.
 */

export default class DailyTaskItem extends Component {
  /**
   * This method is used to render Daily Tasks grid data
   * it will recieve item (DailyTask) from DailyTasksList
   */
  render() {
    const { item } = this.props; //Daily Tasks
    const type = item.type;
    return (
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          paddingVertical: 15,
          flexDirection: "column",
          borderBottomColor: "#ccc",
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "#292929" }}>
              {item.activity}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#808080" }}>
              {item.timeSlotes}{': '}{item.room}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "400",
    fontSize: 25,
    color: "black",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
