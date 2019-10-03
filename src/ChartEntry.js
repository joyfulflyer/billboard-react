import React from "react";
import ChartEntrySong from "./ChartEntrySong";
import { get } from "axios";

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
    console.log(`id`, this.props.id);
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
      <li inset={true}>
        {`on ${this.props.date}, ${this.props.name} was at ${this.props.place}`}
      </li>
    );
    if (!this.state.open) {
      return (
        <li button onClick={this.handleClick}>
          {standardItems}
        </li>
      );
    } else {
      return (
        <div>
          <li button onClick={this.handleClick}>
            {standardItems}
          </li>
          <ul>
            {this.state.songs.map(song => (
              <ChartEntrySong
                rank={song.place}
                {...song}
              />
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ChartEntry;
