import React, { Component } from 'react';
import { NavBar, Icon, WingBlank, Button, Toast } from 'antd-mobile';
// import cnodeIcon from '@/assets/svg/cnodejs.svg';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/assets/svg', false, /\.svg$/);
requireAll(req);

import request from '@/http';
import './login.scss';
class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.setState({
      loading: true
    });
    this.login();
  }

  async login() {
    try {
      const params = {
        accesstoken: this.loginInput.value
      };

      const result = await request.post('/accesstoken', params);
      console.log(result);
      if (result.success) {
        window.localStorage.setItem('cnode_user', JSON.stringify(result.data));
        window.localStorage.setItem('cnode_accesstoken', this.loginInput.value);
      } else {
        Toast.info('登录失败', 1);
      }
      this.setState({
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false
      });
      throw new Error(error);

    }
  }

  render() {
    const CnodeIcon = ({ type = '#icon-cnodejs', className = '', size = 'md', ...restProps }) => (
      <svg
        className={`am-icon am-icon-cnode am-icon-${size} ${className}`}
        {...restProps}
      >
        <use xlinkHref={type} />
      </svg>
    );
    return (
      <div className="cnd-login">
        <NavBar
          mode="light"
          icon={<Icon type="left" size="lg" />}
          onLeftClick={() => this.props.history.goBack()}
        ></NavBar>
        <CnodeIcon className="cnd-logo" />
        <div className="cnd-login-accessToken borderTop1px borderBottom1px">
          <input type="text" className="cnd-login-input " ref={el => { this.loginInput = el }}
            placeholder="请输入AccessToken"
          />
        </div>

        <WingBlank>
          <Button type="primary" loading={this.state.loading} onClick={this.handleLoginClick}>登录</Button>
        </WingBlank>
      </div>
    );
  }
}

export default LoginPage;
