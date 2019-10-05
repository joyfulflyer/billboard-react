import React from "react";

class ChartEntrySong extends React.Component {
  render() {
    return (
      <div><a href={this.props.songId}>
        {`#${this.props.rank} '${this.props.name}' by ${this.props.artist}`}
        </a>
      </div>
    );
  }
}

export default ChartEntrySong;
