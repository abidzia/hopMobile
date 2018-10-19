import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Service from "../utils/service";

export default class HeaderOrderStatus extends Component {
  state = {
    restaurant_status: false,
    delivery: false,
    pickup: false,
    donations_count: 0
  };

  componentWillMount() {
    this.updateRestaurantStatus = status => {
      this.setState(status);
    };

    Service.addRestaurantStatusListener(this.updateRestaurantStatus);
  }

  componentWillUnmount() {
    Service.removeRestaurantStatusListener(this.updateRestaurantStatus);
  }

  render() {
    property = this.props;
    var status = null;
    if (this.state.delivery && this.state.pickup) status = "ACCEPTING ORDERS";
    else if (this.state.delivery) status = "ACCEPTING DELIVERY ORDERS";
    else if (this.state.pickup) status = "ACCEPTING PICKUP ORDERS";
    else status = "CLOSED";

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor:
              this.state.delivery && this.state.pickup
                ? "#2EA840"
                : this.state.delivery || this.state.pickup ? "orange" : "red",
            borderRadius: 20,
            width: 15,
            height: 15
          }}
        />
        <Text style={{ color: "white", marginLeft: 10 }}>
          {status}
        </Text>
        <Text
          style={{
            backgroundColor: "#FF872C",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 10,
            textAlign: "center",
            marginRight: 30,
            marginTop: 2,
            paddingVertical: 2,
            paddingHorizontal: 6,
            color: "white",
            fontSize: 10
          }}
        >
          {this.state.donations_count}
        </Text>
        <Icon
          style={{
            alignSelf: "center",
            marginTop: 5,
            marginRight: 20,
            fontSize: 25
          }}
          name="exit-to-app"
          color="white"
          onPress={() => {
            Service.logout()
              .then(response => {
                property.onLogin(false);
              })
              .catch(error => {});
          }}
        />
      </View>
    );
  }
}
