import React, { Component } from "react";
import styles from "./App.module.scss";
import Song from "./Song";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Header header={"Header"} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
