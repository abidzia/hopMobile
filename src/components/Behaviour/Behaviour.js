import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Service from "../../utils/service";

/**
 * The AccountInfo component of the application.
 * This component is used to show AccountInfo block in Accounts Screen.
 */

export default class Behaviour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, // To show/hide loading overlay on screen
      name: "", // AccountInfo Name
      phone_numbers: "", // Phone Number of the Sharebite representative
      fax: "", // Fax number
      email: "", // email
      street: "" // Address
    };
  }

  /**
  * Method will call to fetch all the Accounts Information.
  */
  fetchAccountInfo = () => {
    //this.setState({ isLoading: true });
    /*Service.fetchAccountInfo()
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: false,
          name: response.name,
          phone_numbers: response.phone_numbers,
          fax: response.fax,
          email: response.email,
          street: response.street
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });*/
  };

  componentDidMount() {
    //this.fetchAccountInfo();
  }

  /**
  * Method to render Accounts Information block in Accounts.
  */

  render() {
    // const { item } = this.props;
    return (
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          flexDirection: "row",
          borderBottomColor: "#ccc",
          backgroundColor: "#F5F5F5",
          paddingBottom: 15,
          paddingTop: 10,
          flex: 1,
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      >
        <View style={{ flex: 0.5, flexDirection: "column" }}>
          <Text style={styles.sectionHeader}> Map Info </Text>
          <Text style={[styles.title, { fontWeight: "normal", fontSize: 22 }]}>
            {this.state.name}
          </Text>
          <Text style={styles.normalText}>
            {this.state.street}{" "}
          </Text>
          {/*<Text style={styles.normalText}>New York, NY 01234 </Text>*/}
        </View>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
          >
            <Text style={styles.title}>New York, NY 01234</Text>
            <Text style={styles.normalText}>Phone - (800) 527 - 9005</Text>
            <Text style={[styles.title, { marginTop: 15 }]}>
              Email
            </Text>
            <Text style={styles.normalText}>uni@company.uk</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: "#FF872C",
    fontSize: 23,
    fontWeight: "400"
  },
  title: {
    color: "#606060",
    fontSize: 16,
    fontWeight: "normal"
  },
  normalText: {
    fontSize: 16,
    color: "#989898",
    marginTop: 5
  }
});
