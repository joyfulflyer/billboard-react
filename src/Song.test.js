import React from "react";
import ReactDOM from "react-dom";
import Song from "./Song";

xit("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Song />, div);
  ReactDOM.unmountComponentAtNode(div);
});
