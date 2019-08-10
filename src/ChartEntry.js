import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import ChartEntrySong from './ChartEntrySong';

class ChartEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: props.open ? props.open : false,
            songs: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            open: !this.state.open,
            songs: [
                { rank: 1, name: "hooey", artist: "prince" },
                { rank: 2, name: "sdf", artist: "pri565nce" },
                { rank: 3, name: "vvv", artist: "btt785" },
            ]
        })
    }

    componentDidMount() {

    }

    render() {
        const standardItems = (
            <ListItemText inset={true}>
                {`${this.props.date} ${this.props.name}`}
            </ListItemText>
        )
        if (!this.state.open) {
            return (
                <ListItem button onClick={this.handleClick}>
                    {standardItems}
                </ListItem>
            )
        } else {
            return (
                <div>
                    <ListItem button onClick={this.handleClick}>
                        {standardItems}
                    </ListItem>
                    <List>
                        {this.state.songs.map(song => (
                            <ChartEntrySong rank={song.rank} name={song.name} artist={song.artist} />
                        ))}
                    </List>
                </div>
            )
        }
    }
}

export default ChartEntry
