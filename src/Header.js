import React from 'react'

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header className="App-header">
                {this.props.header}
            </header>
        )
    }
}

export default Header;