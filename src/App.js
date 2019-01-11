import React, { Component } from 'react';
import TimeMachine from './TimeMachine';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="mobile-cont">
          <TimeMachine />
        </div>
      </div>
    );
  }
}

export default App;
