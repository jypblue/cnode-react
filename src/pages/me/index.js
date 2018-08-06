import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import TabBar from '@/layouts/TabBar';

class MePage extends Component {
  render() {
    return (
      <div className="cnd-me">
        <NavBar
          mode="dark"
        >个人主页</NavBar>
        me
        <TabBar selected="Me" />
      </div>
    );
  }
}

export default MePage;
