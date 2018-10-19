import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import { StatusBar, AsyncStorage } from "react-native";
import { MenuContext } from "react-native-popup-menu";

import { DrawerNavigator } from 'react-navigation';

import { AppStyles } from "./src/utils/styles";

import * as Screens from "./src/screens";
import { TabBar } from "./src/components/TabBar";

import { PrimaryColor } from "./src/utils/constants";
import Service from "./src/utils/service";

export default class App extends Component {
  state = {
    loggedIn: false
  };

  login = status => {
    this.setState({ loggedIn: status });
  };

  stackedScreens = screens => ({
    screen: StackNavigator(screens, {
      navigationOptions: {
        headerTintColor: PrimaryColor,
        headerStyle: {
          backgroundColor: "#343434"
        }
      }
    })
  });

  render() {
    // All screen to be shown when user is Admin
    let screens = {
     Tasks: this.stackedScreens({ root: { screen: Screens.Tasks } }),
     Account: this.stackedScreens({ root: { screen: Screens.Account } }),
     Trip: this.stackedScreens({ root: { screen: Screens.Trip } })
    };

    // All screens when user is non-Admin
    if (!Service.isAdmin())
      screens = {
       Tasks: this.stackedScreens({ root: { screen: Screens.Tasks } }),
       Trip: this.stackedScreens({ root: { screen: Screens.Trip } }),
       Behaviour: this.stackedScreens({ root: { screen: Screens.Behaviour } }),
       Account: this.stackedScreens({ root: { screen: Screens.Account } })
      };
    let AppStack = TabNavigator(screens, {
      tabBarComponent: TabBar,
      tabBarPosition: "bottom",
      swipeEnabled: false,
      animationEnabled: false,
       headerMode: 'none'
    });

    return (
      <MenuContext style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#444444" />
        {(() =>
          !this.state.loggedIn
            ? <Screens.Login onLogin={this.login} />
            : <AppStack />)()}
      </MenuContext>
    );
  }
}
