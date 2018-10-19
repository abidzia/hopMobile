import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import withNavigationOptions from "./helpers/withNavigationOptions";
import MapNavigation from "../components/Trip/MapNavigation";

class TripScreen extends Component {
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
              <MapNavigation />
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
export default withNavigationOptions(TripScreen, {
  title: "Tracking",
  tabBarIcon: "group-work"
});
