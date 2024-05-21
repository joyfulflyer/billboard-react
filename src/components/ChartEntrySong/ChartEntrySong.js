import React from "react";

function ChartEntrySong(props) {
  return (
    <div>
      <a href={props.songId}>
        {`#${props.rank} '${props.name}' by ${props.artist}`}
      </a>
    </div>
  );
}

export default ChartEntrySong;
