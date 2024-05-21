import React, { useState, useEffect } from "react";
import axios from "axios";
import SongList from "../SongList/SongList";
import LineChart from "../LineChart/LineChart";
import styles from "./Song.module.scss";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";


function Song(props) {

  const [open, setOpen] = useState([]);
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
      {/* <Header /> */}
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
