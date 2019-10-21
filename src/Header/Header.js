import React, { useState } from "react";
import styles from "./Header.module.scss";
import { post } from "axios";
import SearchSongName from "../SearchSongName/SearchSongName";

function Header(props) {
  const [textInput, setTextInput] = useState("");
  const [songNames, setSongNames] = useState([]);
  const onInput = async event => {
    const value = event.target.value;
    setTextInput(value);
    if (value.length === 0) {
      setSongNames([]);
      return;
    }
    const response = await post("/api/songName", {
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
            return <SearchSongName key={name.id} song={name} />;
          })}
        </div>
      );
    }
  };

  return (
    <header className={styles["App-header"]}>
      <img
        height="32"
        width="32"
        src="https://unpkg.com/@icon/open-iconic/icons/magnifying-glass.svg"
      />
      <div className={styles["dropdown"]}>
        <input
          type="text"
          defaultValue={textInput}
          className={styles["search-box"]}
          onInput={onInput}
        />
        {getSongNames()}
      </div>
    </header>
  );
}

export default Header;
