import React, { Component } from 'react';
import StatusBar from './layouts/StatusBar';
import TabBar from './layouts/TabBar';
import Main from './router';
import 'github-markdown-css';
import './assets/fonts/iconfont.css';
import './styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      hidden: false,
    };
    this.handleTabBarHidden = this.handleTabBarHidden.bind(this);
  }

  handleTabBarHidden(hidden) {
    this.setState({
      hidden: hidden
    });
  }

  render() {
    return (
      <div className="cnd-app">
        <StatusBar />
        <Main onTabBarHidden={this.handleTabBarHidden} />
        <TabBar hidden={this.state.hidden} />
      </div>
    );
  }
}

export default App;

