import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
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
      curTopic: null
    };
  }

  handleTabsChange(tab, index) {
    this.setState({
      curTopic: tab,
      curTabIndex: index
    });
  }

  render() {
    return (
      <div className="cnd-home">
        <Tabs tabs={this.state.topicTabs}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          initialPage={this.state.curTabIndex}
          onChange={this.handleTabsChange.bind(this)}
        >
          {
            (tab) => {
              return (
                <TopicList data={tab} />
              );
            }
          }
        </Tabs>
      </div>
    );
  }
}

export default TopicHome;
