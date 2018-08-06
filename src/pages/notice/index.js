import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import TabBar from '@/layouts/TabBar';
import request from '@/http';
import './notice.scss';

class NoticePage extends Component {


  componentDidMount = () => {
    this.fnGetMessage();
  }

  async fnGetMessage() {
    try {
      const accesstoken = window.localStorage.getItem('cnode_accesstoken') || '';
      const params = {
        accesstoken: accesstoken
      };
      const result = await request.get('/messages', params);
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async fnMarkAllMessage() {
    try {
      const accesstoken = window.localStorage.getItem('cnode_accesstoken') || '';
      const params = {
        accesstoken: accesstoken
      };
      const result = await request.post('/message/mark_all', params);
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async fnMarkOneMessage() {
    try {
      const accesstoken = window.localStorage.getItem('cnode_accesstoken') || '';
      const params = {
        accesstoken: accesstoken
      };
      const result = await request.get('/message/mark_one/:msg_id ', params);
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }



  render() {
    return (
      <div className="cnd-notice">
        <NavBar
          mode="dark"
          icon={<Icon type="left" size="lg" />}
          onLeftClick={() => this.props.history.goBack()}
        >消息</NavBar>


        <TabBar selected="Notice" />
      </div>
    );
  }
}

export default NoticePage;
