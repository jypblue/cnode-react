import React, { Component } from 'react';
import StatusBar from "./layouts/StatusBar";
import TabBar from './layouts/TabBar';
import Main from './router';
import './styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      hidden: false,
    }
  }
  render() {
    return (
      <div className="cnd-app">
        <StatusBar />
        <Main/>
        <TabBar/>
      </div>
    );
  }
}

export default App;

