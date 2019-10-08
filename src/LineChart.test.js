import React from "react";
import ReactDOM from "react-dom";
import LineChart from "./LineChart";

xit("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LineChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});
