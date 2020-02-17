import React, { useEffect, useState } from "react";
import { get } from "axios";
import SongList from "../SongList/SongList";
import LineChart from "../LineChart/LineChart";
import styles from "./Song.module.scss";

function Song(props) {
  const [entries, setEntries] = useState([]);
  const [open, setOpenEntries] = useState([]);
  const [name, setName] = useState(`Song Name`);
  const [artist, setArtist] = useState(`Artist`);
  const { songId } = props;
  console.log(songId);

  useEffect(() => {
    console.log(`getting ${songId}`);
    get(`/api/song/${songId}/more`)
      .then(({ data }) => {
        setName(data.name);
        setEntries(data.charts);
        setArtist(data.artist);
      })
      .catch(err => {
        console.log(err);
      });
  }, [songId]);
  return (
    <div>
      <h1 className={styles.songName}> {name} </h1>
      <h2 className={styles.songArtist}> {artist} </h2>
      {entries.length > 0 && <LineChart entries={entries} />}
      <SongList entries={entries} />
    </div>
  );
}

export default Song;
