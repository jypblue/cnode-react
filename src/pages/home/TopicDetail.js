import React, { Component } from 'react';
import { NavBar, Icon, ActionSheet, InputItem, SearchBar } from 'antd-mobile';
import request from '@/http';
import ReplyBar from './ReplyBar';
import ReplyList from './ReplyList';
import { formatDateCount,  formatTopicTab } from '@/utils';

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      topic: null,
      replyValue: '',
      visible: false,
    };
  }

  componentDidMount() {
    this.fnGetTopicDetail();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
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
          topic: result.data,
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
    const BackInfo = (state) => {
      const topic = state.topic;
      if (topic) {
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

    const DetailMain = (state) => {
      const topic = state.topic;
      console.log(topic);
      if (topic) {
        const detailContent = () => {
          return { __html: topic.content };
        };

        return (
          <div className="cnd-topic-detail__main borderBottom1px">
            <div className="cnd-topic-detail__title">
              {topic.title}
            </div>
            <div className="cnd-topic-detail__create">
              创建时间：<span className="create-time">{formatDateCount(topic.create_at)}</span>
            </div>
            <div className="cnd-topic-detail__content break" dangerouslySetInnerHTML={detailContent()}>
            </div>
            <div className="cnd-topic-detail__main-tags">
              <span className="cnd-topic-detail__tag"> {formatTopicTab(topic.tab)}</span>
              {topic.good ? <span className="cnd-topic-detail__tag">精</span> : ''}
              {topic.top ? <span className="cnd-topic-detail__tag">顶</span> : ''}
            </div>
            <div className="cnd-topic-detail__main-reply">
              <span>阅读：{topic.visit_count}</span>&nbsp;·&nbsp;
              <span>评论：{topic.reply_count}</span>
            </div>
          </div>
        );
      } else {
        return null;
      }
    };

    return (
      <div className="cnd-topic-detail">
        <NavBar
          className="cnd-topic-detail__navbar"
          mode="dark"
          leftContent={[
            <Icon key="0" type="left" size="lg" />,
            <BackInfo key="1" {...this.state} />
          ]}
          onLeftClick={() => { this.props.history.goBack() }}
          rightContent={[
            <i key="0" className="iconfont icon-share-bold cnd-icon-share" onClick={this.handleShareIconClick.bind(this)} ></i>,
          ]}
        />
        <DetailMain {...this.state} />

        {/* 回复输入框 */}
        <InputItem
          className="cnd-topic-reply__input-item"
          placeholder="说说你的想法..."
        >
          <img src="" className="cnd-topic-reply__avatar" alt="" />
        </InputItem>
        {/* 评论列表 */}
        <ReplyList {...this.state} />
        {/* 评论bar */}
        <ReplyBar {...this.state} />
        {/* 实际评论输入框 */}
        <SearchBar
          style={{ 'display': this.state.visible ? 'block' : 'none' }}
          className=""
          value={this.state.replyValue}
          placeholder="Search"
          onSubmit={value => console.log(value, 'onSubmit')}
          onClear={value => console.log(value, 'onClear')}
          onFocus={() => console.log('onFocus')}
          onBlur={() => console.log('onBlur')}
          onCancel={() => console.log('onCancel')}
          showCancelButton
          onChange={this.onChange}
        />
      </div>
    );
  }
}
// <DetailMain {...this.state} />
export default TopicDetail;
