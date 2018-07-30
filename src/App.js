import React, { Component } from 'react';
import StatusBar from "./components/layout/StatusBar";
import TabBar from './components/layout/TabBar';
import Main from './router';
import './style/main.scss';

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

