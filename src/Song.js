import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';


class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: [],
            entries: props.songs
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">Songs</ListSubheader>}
            >
                {this.state.entries.map(song => (
                    <ListItem chart>
                        <ListItemText inset primary={song} />
                    </ListItem>
                ))}

            </List>
        );
    }
}

export default Song;
