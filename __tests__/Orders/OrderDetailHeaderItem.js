import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import OrderDetailHeaderItem from "../../src/components/Orders/OrderDetailHeaderItem";

it("renders correctly", () => {
  const tree = renderer.create(<OrderDetailHeaderItem />);
  expect(tree).toMatchSnapshot();
});
