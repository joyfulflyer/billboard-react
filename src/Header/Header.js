import React, { useState } from "react";
import styles from "./Header.module.scss";

function Header(props) {
  const [textInput, setTextInput] = useState("");
  const [songNames, setSongNames] = useState([]);
  const onInput = async event => {
    setTextInput(event.target.value);
  };

  const getSongNames = () => {
    return <div className={styles["search-result"]}>{textInput}</div>;
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
