import React, { Component } from "react";
import ChartEntry from "./ChartEntry";
import { get } from "axios";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [],
      entries: [],
      name: `Song Name`,
      artist: `Artist`
    };
  }

  componentDidMount() {
    const { songId } = this.props;
    get(`/api/song/${songId}`)
      .then(({ data }) => {
        this.setState({
          name: data.name,
          entries: data.charts,
          artist: data.artist
        });
        console.log(data);
        console.log(data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1> {this.state.name} </h1>
        <h2> {this.state.artist} </h2>
        <ul class="nav">
          <div class="subheader">Songs</div>
          {this.state.entries.map(chart => (
            <ChartEntry
              date={chart.date}
              name={chart.chartName}
              key={chart.chartId}
              id={chart.chartId}
              place={chart.place}
            />
          ))}

        </ul>
      </div>
    );
  }
}

export default Song;
