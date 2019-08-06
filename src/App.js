import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Song from './Song';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header header={'Header'}/>
        <Song songs={['moo', 'moo2']} />
      </div>
    );
  }
}

export default App;
