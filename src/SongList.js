import React, { useState } from "react";
import styles from './SongList.module.scss'
import ChartEntry from './ChartEntry'

function SongList(props) {
  return (
    <div className={styles.songList}>
      <div className={styles.subheader}>Songs</div>      
      {props.entries.map(chart => (
        <ChartEntry
          date={chart.date}
          name={chart.chartName}
          key={chart.chartId}
          id={chart.chartId}
          place={chart.place}
        />
      ))}
    </div>
  );
}

export default SongList