import React, { useState } from "react";
import styles from "./Header.module.scss";
import axios from "axios";
import axios from "axios";
import SearchSongName from "../SearchSongName/SearchSongName";

function Header() {
  const [, setTextInput] = useState("");
  const [songNames, setSongNames] = useState([]);
  const onInput = async event => {
    const value = event.target.value;
    setTextInput(value);
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

  return (
    <header className={styles["App-header"]}>
      <nav className={styles['navbar']}>
        <form className={styles["form"]}>
          <div class="form-row">
            <div class="col">
              {/* <div className={styles["dropdown"]}> */}
                <input
                  type="text"
                  placeholder={`search songs`}
                  className={styles["search-box"]}
                  onInput={onInput}
                />
                {getSongNames()}
              {/* </div> */}
            </div>
            <div class="col">
              <input type="text" className={styles["artist-box"]} placeholder={`Artist`} />
            </div>
            <div class="col">
              <button type="submit" className={styles["header-search-submit"]}>Search</button>
            </div>
          </div>
        </form>
      </nav>
    </header>
  );
}

export default Header;
