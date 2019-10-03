import React from "react";

class ChartEntrySong extends React.Component {
  render() {
    return (
      <li><a href={this.props.songId}>
        {`#${this.props.rank} '${this.props.name}' by ${this.props.artist}`}
        </a>
      </li>
    );
  }
}

export default ChartEntrySong;
