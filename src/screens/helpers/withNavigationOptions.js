import React from "react";

export default function withNavigationOptions(
  WrappedComponent,
  navigationOptions
) {
  return class Screen extends React.Component {
    static navigationOptions = navigationOptions;

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
