import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import withNavigationOptions from "./helpers/withNavigationOptions";
import {
  Tasks
} from "../components/Tasks";

class TasksScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "stretch"
        }}
      >
        <ScrollView style={styles.itemsScrollView}>
          <View style={styles.container}>
            <View style={{ backgroundColor: "#F5F5F5" }}>
              <Tasks />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemsScrollView: {
    borderTopColor: "#ccc",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  container: {
    width: "100%",
    alignSelf: "center"
  }
});
export default withNavigationOptions(TasksScreen, {
  title: "Daily Tasks",
  tabBarIcon: "group-work"
});
