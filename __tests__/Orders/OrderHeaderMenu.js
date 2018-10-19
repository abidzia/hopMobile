import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { MenuContext } from "react-native-popup-menu";

import OrderHeaderMenu from "../../src/components/Orders/OrderHeaderMenu";

it("renders correctly", () => {
  navigation = { state: { params: { mode: "pending" } } };
  const tree = renderer.create(
    <MenuContext>
      <OrderHeaderMenu navigation={navigation} />
    </MenuContext>
  );
  expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
  navigation = { state: { params: null } };
  const tree = renderer.create(
    <MenuContext>
      <OrderHeaderMenu navigation={navigation} />
    </MenuContext>
  );
  expect(tree).toMatchSnapshot();
});
