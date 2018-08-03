import React, { Component } from 'react';
import { NavBar, Icon, ActionSheet } from 'antd-mobile';
import request from '@/http';
import ReplyBar from './ReplyBar';

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      topic: null
    };
  }

  componentDidMount() {
    this.fnGetTopicDetail();
  }


  async fnGetTopicDetail() {
    try {
      const params = {
        accesstoken: ''
      };
      const result = await request.get(`/topic/${this.props.match.params.id}`, params);
      // console.log(result.data);
      if (result.success) {
        this.setState({
          topic: result.data
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  // 点击弹出分享选项
  handleShareIconClick() {
    this.showShareActionSheetMulpitleLine();
  }
  dataList = [
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  showShareActionSheetMulpitleLine = () => {
    const data = [[...this.dataList]];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: '分享',
    },
    (buttonIndex, rowIndex) => {
      this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
      // 点击分享回调

    });
  };

  render() {
    // const { topic } = this.state;

    const BackInfo = (state) => {
      const topic = state.topic;
      console.log(state);
      if (topic) {
        console.log(topic);
        return (
          <div className="cnd-topic-detail__author" >
            <img src={topic.author.avatar_url} className="cnd-topic-item__avatar" alt="" />
            <span className="cnd-topic-item__name">
              {topic.author.loginname}
            </span>
          </div>
        );
      } else {
        return (<div> 返回</div>);
      }
    };

    return (
      <div className="cnd-topic-detail">
        <NavBar mode="dark"
          leftContent={[
            <Icon key="0" type="left" size="lg" />,
            <BackInfo key="1" {...this.state} />
          ]}
          onLeftClick={() => { this.props.history.goBack() }}
          rightContent={[
            <i key="0" className="iconfont icon-share-bold cnd-icon-share" onClick={this.handleShareIconClick.bind(this)} ></i>,
          ]}
        ></NavBar>
        <div>
        </div>
        <ReplyBar />
      </div>
    );
  }
}

export default TopicDetail;
