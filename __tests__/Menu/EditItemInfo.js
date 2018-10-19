import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import EditItemInfo from "../../src/components/Menu/EditItemInfo";

it("renders correctly", () => {
  item = {
    name: "item name",
    description: "description",
    price: 50.0,
    serving: 1,
    minimum_serving: 1
  };
  const tree = renderer.create(<EditItemInfo item={item} newItem={false} />);
  expect(tree).toMatchSnapshot();
});
