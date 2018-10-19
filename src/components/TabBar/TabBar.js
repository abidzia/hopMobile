import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import TabBarItem from "./TabBarItem";

export default props => {
  const styles = {};
  const { jumpToIndex, navigation, renderIcon, screenProps } = props;
  const { routes } = navigation.state;
  //   const { index } = props.navigationState;
  //   const { routes } = props.navigation.state;

  return (
    <View
      style={[
        styles.tabBar,
        {
          //flex:1,
          flexDirection: "row",
          justifyContent: "center",
          //elevation: 2,
          borderTopColor: "#ccc",
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: "white"
        }
      ]}
    >
      {/* <View style={{position: "absolute", left: 0, right: 0, top: 0, height: 5, elevation: 5, backgroundColor: 'red'}} /> */}
      {routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const scene = { route, index, focused };
        const label = props.getLabel({ ...scene });
        const icon = props.renderIcon({
          route,
          index,
          focused
        });

        return (
          <TabBarItem
            key={route.key}
            onPress={() => jumpToIndex(index)}
            focused={focused}
            icon={icon}
            title={label}
          />
        );
      })}
    </View>
  );
};
