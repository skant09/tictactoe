import React from 'react';
import { default as GameParams } from './gameParams';
import { default as Game } from './game';
import { default as Turns } from './turns';
import './App.css';
import { Provider } from 'react-redux'
import store from './store';
import Peer from './peer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Mega</h1>
        </header>
        <GameParams />
        <Peer />
        <Turns/>
        <Game />
      </div>
    </Provider>
  );
}

export default App;
