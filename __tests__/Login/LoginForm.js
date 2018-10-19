import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import LoginForm from "../../src/components/Login/LoginForm";

it("renders correctly", () => {
  const tree = renderer.create(<LoginForm state={{ isErrorVisible: true }} />);
  expect(tree).toMatchSnapshot();
});
