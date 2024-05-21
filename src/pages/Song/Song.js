import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../../components/LineChart/LineChart";
import SongList from "../../components/SongList/SongList";
import styles from "./Song.module.scss";

function Song(props) {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState(`Song Name`);
  const [artist, setArtist] = useState(`Artist`);
  const { songId } = useParams();

  useEffect(() => {
    axios.get(`/api/song/${songId}`)
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
      {entries.length > 0 && (
        <LineChart entries={entries} />
      )}
      <SongList entries={entries} />
    </div>
  );
}

export default Song;
