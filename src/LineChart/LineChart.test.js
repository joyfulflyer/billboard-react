import React from "react";
import LineChart from "./LineChart";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const chart = shallow(<LineChart />);
  expect(chart).toBeDefined();
});
