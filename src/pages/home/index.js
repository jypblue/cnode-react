import React, { Component } from 'react';
import { Tabs, NavBar, ActivityIndicator } from 'antd-mobile';
import TabBar from '@/layouts/TabBar';
import TopicList from './TopicList';
import './home.scss';

class TopicHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTabIndex: 0,
      topicTabs: [
        {
          title: '全部',
          sub: 0,
          tab: ''
        },
        {
          title: '精华',
          sub: 1,
          tab: 'good'
        },
        {
          title: '问答',
          sub: 2,
          tab: 'ask'
        },
        {
          title: '分享',
          sub: 3,
          tab: 'share'
        },
        {
          title: '招聘',
          sub: 4,
          tab: 'job'
        },
      ],
      curTopic: null,
      isTabLoading: false
    };

    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleIsTabLoading = this.handleIsTabLoading.bind(this);
  }

  handleTabsChange(tab, index) {
    this.setState({
      curTopic: tab,
      curTabIndex: index,
      isTabLoading: false
    });
  }

  handleIsTabLoading(isTabLoading) {
    this.setState({
      isTabLoading
    });
  }

  render() {
    return (
      <div className="cnd-home">
        <NavBar mode="dark"

          rightContent={
            [<ActivityIndicator key={0} animating={this.state.isTabLoading} />]
          }
        >主题</NavBar>
        <Tabs tabs={this.state.topicTabs}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          initialPage={this.state.curTabIndex}
          onChange={this.handleTabsChange}
        >
          {
            (tab) => {
              return (
                <TopicList data={tab} onIsTabLoading={this.handleIsTabLoading} />
              );
            }
          }
        </Tabs>
        <TabBar selected="Home" />
      </div>
    );
  }
}

export default TopicHome;
