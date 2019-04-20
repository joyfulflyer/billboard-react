import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';


class Song extends Component {
    constructor() {
        super();
        this.state = {
            open: [],
            entries: []
        };
    }

    componentDidMount() {
        axios.get()

    }

    render() {
        return (
            <List 
                component="nav"
                classname={this.props.root}
                subheader={<ListSubheader component="div">Songs</ListSubheader>}
            >                
            {this.state.entries.map(song => (
                    <ListItem chart>
                        <ListItemText inset primary={song}/>
                    </ListItem>
                ))}

            </List>

        );
    }
}

export default Song;
