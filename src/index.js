import React from "react";
import "./index.css";
import { createRoot } from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "@reach/router";
import Song from "./Song/Song";
import SearchResultPage from "./SearchResultsPage/SearchResultsPage";

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <Router>
    <App path="/">
      <Song path="song/:songId" />
      <SearchResultPage path = "search/" />
    </App>
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
