import React, { Component } from 'react';
import AppChild from './AppChild';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <p>Welcome!</p>
       <AppChild/>
       
      </div>
    );
  }
}

export default App;
