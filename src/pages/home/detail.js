import React, { Component } from 'react';
import { NavBar, Icon, ActionSheet, SearchBar, InputItem, Toast } from 'antd-mobile';
import request from '@/http';
import ReplyBar from './ReplyBar';
import ReplyList from './ReplyList';
import { formatDateCount,  formatTopicTab } from '@/utils';
import './home-detail.scss';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const accesstoken = window.localStorage.getItem('cnode_accesstoken') || '';
    const cnodeUser = window.localStorage.getItem('cnode_user');
    const user = JSON.parse(cnodeUser) || {};
    console.log('accesstoken', accesstoken);
    this.state = {
      topic: null,
      replyValue: '',
      visible: false,
      accesstoken,
      user,
      loginname: '',
      reply_id: '',
      clicked: 'cancel',
    };
  }

  componentDidMount() {
    this.fnGetTopicDetail();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.visible) {
      this.autoFocusInst.focus();
    }
  }

  handleRefreshTopicDetail = () => {
    this.fnGetTopicDetail();
  }

  // 获取主题详情
  async fnGetTopicDetail() {
    try {
      Toast.loading('Loading...', 0);
      const params = {
        accesstoken: this.state.accesstoken
      };
      const result = await request.get(`/topic/${this.props.match.params.id}`, params);
      // console.log(result.data);
      if (result.success) {
        this.setState({
          topic: result.data,
          replyValue: '',
          visible: false,
          loginname: '',
          reply_id: '',
        });
      }
      Toast.hide();
    } catch (error) {
      Toast.hide();
      throw new Error(error);
    }
  }

  // 评论
  handleInputItemClick = () => {
    if (this.state.accesstoken) {
      this.handleReplyInputVisible(true);
    } else {
      this.props.history.push('/login');
    }

  }

  // 评论或者回复
  handleReplyInputClick = (item) => {
    if (this.state.accesstoken) {
      this.handleReplyInputVisible(true, item && item.author.loginname, item && item.id);
    } else {
      this.props.history.push('/login');
    }

  }

  handleReplyInputVisible = (visible, loginname = '', reply_id = '') => {
    this.setState({
      visible: visible,
      loginname: loginname,
      reply_id: reply_id
    });
  }

  // 滚动到评论区
  handleScrollToReply() {
    // console.log(this.InputItemEl);
    // const top = this.inputItem.scrollHeight;
    // window.setTimeout(() => {
    //   document.body.scrollTop = top;
    // }, 0);

  }

  // 取消评论
  handleSearchBarCancel = () => {
    this.handleReplyInputVisible(false);
  }

  // 提交评论
  handleSearchBarSubmit = () => {
    this.fnReplyTopic();
  }

  // 评论语变化
  handleSearchBarChange = (value) => {
    this.setState({ replyValue: value });
  };

  async fnReplyTopic() {
    try {
      const topic_id = this.state.topic.id;
      Toast.loading('Loa ding...', 0);
      let params = {
        accesstoken: this.state.accesstoken,
        content: this.state.replyValue,
        reply_id: this.state.reply_id,
      };
      if (this.state.reply_id) {
        params.content = `[@${this.state.loginname}](/user/${this.state.loginname}) ${this.state.replyValue}`;
      }
      const result = await request.post(`/topic/${topic_id}/replies`, params);
      Toast.hide();
      if (result.success) {
        console.log(result);
        Toast.info('发表评论成功', 2);
        this.fnGetTopicDetail();
      } else {
        Toast.info('发表评论失败', 2);
      }

    } catch (error) {
      Toast.hide();
      throw new Error(error);
    }
  }

  // 点击弹出分享选项
  handleShareIconClick() {
    this.showShareActionSheetMulpitleLine();
  }
  dataList = [
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '朋友圈' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
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
      this.setState({ clicked: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
      // 点击分享回调

    });
  };

  render() {
    const BackInfo = (state) => {
      const topic = state.topic;
      if (topic) {
        return (
          <div className="cnd-topic-detail__author ellipsis" >
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
              {topic.top ? <span className="cnd-topic-detail__tag">热</span> : ''}
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
          editable={false}
          onClick={this.handleInputItemClick}
          ref={el => { this.InputItemEl = el }}
        >
          <img src={this.state.user && this.state.user.avatar_url} className="cnd-topic-reply__avatar" alt="" />
        </InputItem>
        {/* 评论列表 */}
        <ReplyList {...this.state} onReplyInputVisible={this.handleReplyInputClick}
          onRefreshTopicDetail={this.handleRefreshTopicDetail}
        />
        {/* 评论bar */}
        <ReplyBar {...this.state.topic} visible={!this.state.visible}
          onReplyInputVisible={this.handleReplyInputClick}
          onScrollToReplyList={this.handleScrollToReply}
        />
        {/* 实际评论输入框 */}
        <div
          style={{ 'visibility': this.state.visible ? 'visible' : 'hidden' }}
          className="cnd-topic-reply__box-input"
        >
          <SearchBar
            value={this.state.replyValue}
            ref={el => { this.autoFocusInst = el }}
            placeholder={this.state.loginname ? `@${this.state.loginname}` : '说说你的想法...'}
            onSubmit={this.handleSearchBarSubmit}
            onClear={value => console.log(value, 'onClear')}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={this.handleSearchBarCancel}
            showCancelButton
            onChange={this.handleSearchBarChange}
          />
        </div>

      </div>
    );
  }
}

export default DetailPage;
