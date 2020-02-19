import React from "react";
import ReactDOM from "react-dom";
import SearchComponent from "./SearchComponent";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
