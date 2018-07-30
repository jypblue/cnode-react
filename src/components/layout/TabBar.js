import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { TabBar } from 'antd-mobile';
import TouchBar from './TouchBar';

const barArr = [{
    icon: '',
    selectedIcon:'',
    title: '阅读',
    name: 'Home',
    url: '/',
  },{
    icon: '',
    selectedIcon:'',
    title: '发现',
    name: 'Discover',
    url: '/discover',
  },
  {
    icon: '',
    selectedIcon:'',
    title: '发布',
    name: 'Publish',
    url: '/publish',
  },{
    icon: '',
    selectedIcon:'',
    title: '消息',
    name: 'Notice',
    url: '/notice',
  },{
    icon: '',
    selectedIcon:'',
    title: '我',
    name: 'Me',
    url: '/me',
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      hidden: false,
    }
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
          { barArr.map((item, i) =>
            <TabBar.Item
              title={item.title}
              key={i}
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === item.name}
              onPress={ this.handleTabBarClick.bind(this, item) }
            >
            </TabBar.Item>
          )}
        </TabBar>
        <TouchBar/>
      </div>
    );
  }
}

export default withRouter(App);

