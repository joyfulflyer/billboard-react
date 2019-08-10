import React, { Component } from 'react';
import './App.css';
import Song from './Song';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header header={'Header'}/>
        <Song id={`43913`}/>
      </div>
    );
  }
}

export default App;
