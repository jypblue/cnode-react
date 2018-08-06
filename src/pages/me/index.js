import React, { Component } from 'react';
import { NavBar, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
// import request from '@/http';
import TabBar from '@/layouts/TabBar';
import './me.scss';
const Item = List.Item;

class MePage extends Component {

  constructor(props) {
    super(props);
    const cnodeUser = window.localStorage.getItem('cnode_user');
    const user = JSON.parse(cnodeUser) || {};
    this.state = {
      user
    };
  }

  render() {
    return (
      <div className="cnd-me">
        <NavBar
          mode="dark"
        >个人主页</NavBar>
        <List>
          <Item
            thumb={<i className="iconfont icon-xiaoxi1 cnd-icon__me-notice"></i>}
            arrow="horizontal"
            onClick={() => { this.props.history.push('/notice') }}>我的消息</Item>
          <Item
            thumb={<i className="iconfont icon-xiaoxi1 cnd-icon__me-notice"></i>}
            arrow="horizontal" onClick={() => {}}>我创建的话题</Item>
          <Item
            thumb={<i className="iconfont icon-xiaoxi1 cnd-icon__me-notice"></i>}
            arrow="horizontal" onClick={() => {}}>我参与的话题</Item>
        </List>
        <TabBar selected="Me" />
      </div>
    );
  }
}

export default withRouter(MePage);
