import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ChartEntry from "./ChartEntry";
import { get } from "axios";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [],
      entries: [],
      name: ``,
      artist: ``
    };
  }

  componentDidMount() {
    const { id } = this.props;
    get(`/api/song/${id}`)
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
        <List
          component="nav"
          subheader={<ListSubheader component="div">Songs</ListSubheader>}
        >
          {this.state.entries.map(chart => (
            <ChartEntry
              date={chart.date}
              name={chart.chartName}
              key={chart.chartId}
              id={chart.chartId}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default Song;
