import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Song from "./pages/Song/Song";
import "./index.css";
import ArtistDetailsPage from "./pages/ArtistDetails/ArtistDetailsPage";
import SearchResultPage from "./pages/SearchResultsPage/SearchResultsPage";
import * as serviceWorker from "./serviceWorker";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route element={<Song />} path="song/:songId" />
        <Route path="search/" element={<SearchResultPage />} />
        <Route path="artist/" element={<ArtistDetailsPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
