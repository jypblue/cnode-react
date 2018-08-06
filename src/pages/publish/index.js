import React, { Component } from 'react';
import { NavBar, List, TextareaItem, ActionSheet, Toast } from 'antd-mobile';
import TabBar from '@/layouts/TabBar';
import request from '@/http';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class PublishPage extends Component {
  constructor(props) {
    super(props);
    const accesstoken = window.localStorage.getItem('cnode_accesstoken') || '';
    const cnodeUser = window.localStorage.getItem('cnode_user');
    const user = JSON.parse(cnodeUser) || {};
    this.state = {
      title: '',
      topic: '',
      content: '',
      accesstoken,
      user
    };
  }
  componentDidMount = () => {
    this.autoFocusInst.focus();
  }

  // 标题变化
  handleTitleChange = (val) => {
    this.setState({
      title: val
    });
  }

  // 内容变化
  handleContentChange = (val) => {
    this.setState({
      content: val
    });
  }

  // 发布主题
  handlePublishIconClick=() => {
    console.log('publish');
    if (this.state.accesstoken) {
      this.fnPublishTopics();
    } else {
      this.props.history.push('/login');
    }
  }

  async fnPublishTopics() {
    try {
      const params = {
        accesstoken: this.state.accesstoken,
        title: this.state.title,
        tab: this.state.topic,
        content: this.state.content,
      };

      const result = await request.post(`/topics`, params);
      if (result.success) {
        console.log(result);
        Toast.info('发布成功', 2);
        this.setState({
          title: '',
          topic: '',
          content: '',
        });
      } else {
        Toast.info('发布失败', 2);
      }


    } catch (error) {
      throw new Error(error);
    }
  }


  showActionSheet = () => {
    const BUTTONS = ['问答', '分享', '招聘', '开发', '取消'];
    const BUTTONS_VALUE = ['ask', 'share', 'job', 'dev', ''];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      // title: '主题',
      message: '请选择归类主题',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ topic: BUTTONS_VALUE[buttonIndex] });
    });
  }
  render() {
    return (
      <div className="cnd-publish">
        <NavBar
          mode="dark"
          rightContent={[
            <i key="0" className="iconfont icon-publish cnd-icon-publish" onClick={this.handlePublishIconClick} ></i>,
          ]}
        >主题发布</NavBar>
        <List>
          <TextareaItem
            title="标题"
            placeholder="请输入标题"
            data-seed="logId"
            ref={el => { this.autoFocusInst = el }}
            autoHeight
            onChange={this.handleTitleChange}
          />
          <TextareaItem
            title="主题"
            placeholder="请选择主题"
            data-seed="logId"
            autoHeight
            editable={false}
            onClick={this.showActionSheet}
            value={this.state.topic}
          />
          <TextareaItem
            placeholder="内容..."
            rows={5}
            count={500}
            onChange={this.handleContentChange}
          />
        </List>

        <TabBar selected="Publish" />
      </div>
    );
  }
}

export default PublishPage;
