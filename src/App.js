import React, { Component } from 'react';
import AppChild from './AppChild';
import './App.css';
import config from './config/config';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h3>{config.text.welcomeMessage.content}</h3>
       <p>Welcome!</p>
       <AppChild/>
       
      </div>
    );
  }
}

export default App;
