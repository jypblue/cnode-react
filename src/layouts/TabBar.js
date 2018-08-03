import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import TouchBar from './TouchBar';
import './TabBar.scss';

const barArr = [{
  icon: 'iconfont icon-home',
  selectedIcon: '',
  title: '阅读',
  name: 'Home',
  url: '/',
}, {
  icon: 'iconfont icon-search',
  selectedIcon: '',
  title: '发现',
  name: 'Discover',
  url: '/discover',
},
{
  icon: 'iconfont icon-publish',
  selectedIcon: '',
  title: '发布',
  name: 'Publish',
  url: '/publish',
}, {
  icon: 'iconfont icon-notice',
  selectedIcon: '',
  title: '消息',
  name: 'Notice',
  url: '/notice',
}, {
  icon: 'iconfont icon-me',
  selectedIcon: '',
  title: '我',
  name: 'Me',
  url: '/me',
}
];



class App extends Component {
  constructor(props) {
    super(props);
    console.log('tabbarProps', props);
    this.state = {
      selectedTab: 'Home',
      hidden: props.hidden,
    };
  }

  handleTabBarClick(item) {
    this.setState({
      selectedTab: item.name,
    });
    this.props.history.push(item.url);
  }

  render() {
    return (
      <div className="cnd-tab-bar">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {barArr.map((item, i) =>
            <TabBar.Item
              title={item.title}
              key={i}
              icon={<div className={item.icon} />
              }
              selectedIcon={<div className={item.icon} />
              }
              selected={this.state.selectedTab === item.name}
              onPress={this.handleTabBarClick.bind(this, item)}
            >
            </TabBar.Item>
          )}
        </TabBar>
        <TouchBar />
      </div>
    );
  }
}

export default withRouter(App);

