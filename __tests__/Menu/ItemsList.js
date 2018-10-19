import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import ItemsList from "../../src/components/Menu/ItemsList";

it("renders ItemList correctly", () => {
  const tree = renderer.create(<ItemsList />);
  expect(tree).toMatchSnapshot();
});
