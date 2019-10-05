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
        {`on ${this.props.date}, ${this.props.name} was at ${this.props.place}`}
      </div>
    );
    if (!this.state.open) {
      return <div onClick={this.handleClick}>{standardItems}</div>;
    } else {
      return (
        <div>
          <div button onClick={this.handleClick}>
            {standardItems}
          </div>
          <div>
            {this.state.songs.map(song => (
              <ChartEntrySong rank={song.place} {...song} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default ChartEntry;
