import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import OrderDetailInfo from "../../src/components/Orders/OrderDetailInfo";

it("renders correctly", () => {
  order = {
    order: "123456",
    order_type: "Delivery",
    delivery_address: "Address",
    user_apartment: "user_apartment",
    user_cross_street: "user_cross_street",
    user_phone: "123456789",
    time: "12:00pm",
    confirmation_code: "123456",
    instructions: "instructions",
    customer_name: "customer_name"
  };
  const tree = renderer.create(<OrderDetailInfo order={order} />);
  expect(tree).toMatchSnapshot();
});
