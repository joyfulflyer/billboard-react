import React from "react";
import ChartEntrySong from "./ChartEntrySong";
import { get } from "axios";
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
      get(`/api/chart/${this.props.id}`)
        .then(({ data }) => {
          console.log(data);
          this.setState({
            songs: data
          });
        })
        .catch(err => {
          console.log(err);
        });
  }

  render() {
    const standardItems = (
      <div>
        {`Was at #${this.props.place} on ${this.props.date} on the ${this.props.name} chart`}
      </div>
    );
    return (
      <div className={styles.chartEntry}>
        <div onClick={this.handleClick}>{standardItems}</div>
        {this.state.open &&
          this.state.songs &&
          this.state.songs.map(song => (
            <ChartEntrySong rank={song.place} {...song} />
          ))}
      </div>
    );
  }
}

export default ChartEntry;
