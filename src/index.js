import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./Header/Header";
import Song from "./Song/Song";
import "./index.css";
import { createRoot } from 'react-dom/client';
import * as serviceWorker from "./serviceWorker";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route element={<Song />} path="song/:songId" />
      </Routes>
    </div>
  </BrowserRouter>
import { Router } from "@reach/router";
import Song from "./Song/Song";
import SearchResultPage from "./pages/SearchResultsPage/SearchResultsPage";
import ArtistDetailsPage from "./pages/ArtistDetails/ArtistDetailsPage";

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <Router>
    <App path="/">
      <Song path="song/:songId" />
      <SearchResultPage path="search/" />
      <ArtistDetailsPage path="artist/" />
    </App>
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
