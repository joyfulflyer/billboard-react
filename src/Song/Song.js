import React, { Component } from "react";
import { get } from "axios";
import SongList from "../SongList/SongList";
import LineChart from "../LineChart/LineChart";

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
        {this.state.entries.length > 0 && (
          <LineChart entries={this.state.entries} />
        )}
        <SongList entries={this.state.entries} />
      </div>
    );
  }
}

export default Song;
