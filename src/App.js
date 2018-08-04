import React, { Component } from 'react';
import StatusBar from './layouts/StatusBar';
import Main from './router';
import 'github-markdown-css';
import './assets/fonts/iconfont.css';
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className="cnd-app">
        <StatusBar />
        <Main />
      </div>
    );
  }
}

export default App;

