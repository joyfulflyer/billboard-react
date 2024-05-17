import React, { useState } from "react";
import styles from "./Header.module.scss";
import axios from "axios";
import SearchSongName from "../SearchSongName/SearchSongName";
import { navigate } from "@reach/router";

function Header() {
  const [songName, setNameField] = useState("");
  const [songNames, setSongNames] = useState([]);
  const onInput = async event => {
    const value = event.target.value;
    setNameField(value);
    if (value.length === 0) {
      setSongNames([]);
      return;
    }
    const response = await axios.post("/api/songName", {
      input: value
    });
    const songNames = response.data;
    setSongNames(songNames);
  };

  const getSongNames = () => {
    if (Array.isArray(songNames) && songNames.length > 0) {
      return (
        <div className={styles["search-result"]}>
          {songNames.map(name => {
            return (<SearchSongName key={name.id} song={name} />);
          })}
        </div>
      );
    }
  };

  const onClickSearch = () => {
    var url = '/search?'
    if (songName) {
        url = url.concat(`name=${songName}`)
    }

    if (artist) {
        if (songName) {
            url = url.concat('&')
        }
        url = url.concat(`artist=${artist}`)
    }

    navigate(url)
  }

  return (
    <header className={styles["App-header"]}>
      <nav className={styles['navbar']}>
        <form className={styles["form"]}>
              <div className={styles["dropdown"]}>
                <input
                  type="search"
                  placeholder={`search songs`}
                  className={styles["search-box"]}
                  onInput={onInput}
                />
                {getSongNames()}
              </div>
              <button 
              type="submit" 
              className={styles["header-search-submit"]}
              onClick={onClickSearch}
              >Search</button>
              <a href="/search">Advanced Search</a>
        </form>
      </nav>
    </header>
  );
}

export default Header;
