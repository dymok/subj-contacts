import React, { Component } from 'react';
import './App.css';

import ListContainer from './components/Contacts/ListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListContainer />
      </div>
    );
  }
}

export default App;
