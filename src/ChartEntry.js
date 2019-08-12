import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
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
      <ListItemText inset={true}>
        {`${this.props.date} ${this.props.name}`}
      </ListItemText>
    );
    if (!this.state.open) {
      return (
        <ListItem button onClick={this.handleClick}>
          {standardItems}
        </ListItem>
      );
    } else {
      return (
        <div>
          <ListItem button onClick={this.handleClick}>
            {standardItems}
          </ListItem>
          <List>
            {this.state.songs.map(song => (
              <ChartEntrySong
                rank={song.place}
                name={song.name}
                artist={song.artist}
              />
            ))}
          </List>
        </div>
      );
    }
  }
}

export default ChartEntry;
