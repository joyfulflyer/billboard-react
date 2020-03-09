import React, { useState, useCallback, useEffect } from "react";
import styles from "./MultiSong.module.scss";
import LineChart from "../LineChart/LineChart";
import { get } from "axios";

/**
 * Display mutiple songs on a single line chart
 * @param {} props
 */
function MultiSong(props) {
  const { entries: songs } = props;
  const [hydratedEntries, setHydratedEntries] = useState([]);

  // async nature means this doesn't work I think
  // new api?
  useEffect(() => {
    const getSongs =
      songs &&
      songs.map(async song => {
        try {
          const result = await get(`/api/song/${song.id}`);
          const { data } = result;
          return data;
        } catch (err) {
          console.log(err);
        }
      });
    Promise.all(getSongs).then(r => {
      console.log(r);
      setHydratedEntries(
        r
          .map(song => {
            return [song.charts, null];
          })
          .flat()
      );
    });
  }, [songs]);

  return (
    <div>
      {hydratedEntries.length > 0 && <LineChart entries={hydratedEntries} />}
    </div>
  );
}
export default MultiSong;
