import React from "react";
import styles from "./SearchSongName.module.scss";

function SearchSongName(props) {
  const { song } = props;

  return (
    <div className={styles["song-link"]}>
      <a href={`/song/${song.id}`}>
        {song.name} - {song.artist}
      </a>
    </div>
  );
}

export default SearchSongName;
