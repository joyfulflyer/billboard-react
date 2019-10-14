import React from "react";
import ReactDOM from "react-dom";
import ChartEntry from "./ChartEntry";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChartEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
