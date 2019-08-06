import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ChartEntry from './ChartEntry';


class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: [],
            entries: props.charts
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <h1> {this.props.name} </h1>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Songs</ListSubheader>}
                >
                    {this.state.entries.map(chart => (
                        <ChartEntry date={chart.date} name={chart.name} />
                    ))}

                </List>
            </>
        );
    }
}

export default Song;
