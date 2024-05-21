import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Song from "./Song/Song";
import Header from "./Header/Header";
import styles from "./App.module.scss";


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
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
