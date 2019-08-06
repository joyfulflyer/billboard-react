import React from 'react'
import { ListItemText } from '@material-ui/core';

class ChartEntrySong extends React.Component {


    render() {
        return (
            <ListItemText>
                {this.props.rank} {this.props.name} {this.props.artist}
            </ListItemText>
        )
    }
}

export default ChartEntrySong