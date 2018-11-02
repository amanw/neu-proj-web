import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import DevTools from './containers/devTools';
import logo from './logo.svg';
import './App.css';

let store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <DevTools/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </Provider>
    );
  }
}

export default App;
