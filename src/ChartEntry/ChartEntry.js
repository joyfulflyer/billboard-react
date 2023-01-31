import React from "react";
import ChartEntrySong from "../ChartEntrySong/ChartEntrySong";
import axios from "axios";
import styles from "./ChartEntry.module.scss";

class ChartEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open ? props.open : false,
      songs: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    this.props.id &&
      axios.get(`/api/chart/${this.props.id}`)
        .then(({ data }) => {
          this.setState({
            songs: data
          });
        })
        .catch(err => {
          console.log(err);
        });
  }

  getSongContainer(open, songs) {
    if (open) {
      return (
        <div className={styles.songContainer}>
          {songs &&
            songs.map(song => (
              <ChartEntrySong id={song.songId} rank={song.place} {...song} />
            ))}
        </div>
      );
    }
    return null;
  }

  getChartEntryHeader(name, place, date) {
    return (
      <div className={styles.chartEntryHeader} onClick={this.handleClick}>
        {`#${place} on the ${name} chart on ${date}`}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.chartEntry}>
        {this.getChartEntryHeader(
          this.props.name,
          this.props.place,
          this.props.date
        )}
        {this.getSongContainer(this.state.open, this.state.songs)}
      </div>
    );
  }
}

export default ChartEntry;
