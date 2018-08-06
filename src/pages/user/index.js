import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import request from '@/http';

class UserPage extends Component {

  componentDidMount() {
    console.log(this.props);
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const result = await request.get(`/user/${this.props.match.params.name}`);
      if (result.success) {
        console.log(result);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    return (
      <div className="cnd-user">
        <NavBar
          mode="dark"
          icon={<Icon type="left" size="lg" />}
          onLeftClick={() => this.props.history.goBack()}
        >个人信息</NavBar>

      </div>
    );
  }
}

export default UserPage;
