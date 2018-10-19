import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Touchable from "react-native-platform-touchable";
import { Button } from "../Button";
import DailyTaskItem from "./DailyTaskItem";

import Service from "../../utils/service";

/**
 * The AccountList component of the application.
 * This component is used to show Discounts List in Accounts tab
 */

export default class AccountList extends Component {
  renderItem = (item, i) => {
    const { onPressItem } = this.props;
    return (
      <Touchable>
        <DailyTaskItem {...item} />
      </Touchable>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      promotions: null, // Employees List
      isLoading: true // show/hide Loading
    };
  }

  componentDidMount() {
    // Initialize discounts grid in Accounts
    this._fetchDiscounts();
  }

  /**
  * Method will call to load all the discounts
  */
  _fetchDiscounts = () => {

   let data = {
    "name":"John",
    "email":"a@gmail.com",
    "activities": [
        { "activity":"Daily Activity 1", "timeSlotes":"9:00 AM to 9:30 AM","room":"Room 1" },
        { "activity":"Daily Activity 2", "timeSlotes":"10:15 AM to 10:30 AM","room":"Room 2" },
        { "activity":"Daily Activity 3", "timeSlotes":"11:00 AM to 12:00 AM","room":"Room 3" }
    ]
    };

    this.setState({ isLoading: false , tasks: data.activities});

    /*Service.fetchDiscounts()
      .then(response => {
        this.setState({
          isLoading: false,
          promotions: response
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });*/
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.9, flexDirection: "row" }}>
          <FlatList
            style={{
              backgroundColor: "white"
            }}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderItem}
            data={this.state.tasks}
          />
        </View>
        {this.state.isLoading &&
          <ActivityIndicator style={styles.loading} size="large" />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  sectionHeader: {
    color: "#FF872C",
    fontSize: 17,
    fontWeight: "400",
    backgroundColor: "white",
    flex: 1
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
