import React, { Component } from 'react';
import Main from './router';
import 'github-markdown-css';
import './assets/fonts/iconfont.css';
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className="cnd-app">
        <Main />
      </div>
    );
  }
}

export default App;

