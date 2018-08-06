import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import TabBar from '@/layouts/TabBar';

class NoticePage extends Component {
  render() {
    return (
      <div className="cnd-notice">
        <NavBar
          mode="dark"
        >消息</NavBar>
        notice
        <TabBar selected="Notice" />
      </div>
    );
  }
}

export default NoticePage;
