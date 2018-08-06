import React, { Component } from 'react';
import TouchBar from '@/layouts/TouchBar';
// import {  Toast } from 'antd-mobile';
import request from '@/http';
import { isShowTouchBar } from '@/utils';
let is_collect = null;
class ReplyBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      is_collect: null
    };
  }

  componentDidMount = () => {

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps);
    console.log(nextState);
    // this.state.is_collect = nextProps.topic.is_collect;
    // this.setState({
    //   is_collect: nextProps.topic.is_collect
    // });
    return true;
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevState);
    console.log(prevProps);

  };



  // 回复
  handleReplyClick = () => {
    this.props.onReplyInputVisible();
  }

  handleScrollToReply = () => {
    this.props.onScrollToReplyList();
  }

  // 是否收藏
  handleTopicCollect = () => {

    if (!this.props.accesstoken) {
      this.props.history.push('/login');
      return;
    }

    if (is_collect) {
      this.fnTopicDeleteCollect();
    } else {
      this.fnTopicCollect();
    }
  }

  // 收藏
  async fnTopicCollect() {
    try {
      const params = {
        accesstoken: this.props.accesstoken,
        topic_id: this.props.id
      };

      const result = await request.post('/topic_collect/collect ', params);
      if (result.success) {
        this.setState({
          is_collect: true
        });
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  // 删除收藏
  async fnTopicDeleteCollect() {
    try {
      const params = {
        accesstoken: this.props.accesstoken,
        topic_id: this.props.id
      };

      const result = await request.post('/topic_collect/de_collect ', params);
      if (result.success) {
        this.setState({
          is_collect: false
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  render() {
    const topic = this.props || {};
    is_collect = this.state.is_collect !== null ? this.state.is_collect : topic.is_collect;
    return (
      <div className="cnd-reply-bar" style={{ 'visibility': this.props.visible ? 'visible' : 'hidden' }}>
        <div className="cnd-reply-bar__inner borderTop1px flex flex-pack-justify">
          <div className="flex-1 cnd-reply-bar__tags">
            <span className="cnd-reply-bar__tag" onClick={this.handleTopicCollect}>
              <i className={is_collect ? 'iconfont cnd-reply__tag-collect icon-collected' : 'iconfont cnd-reply__tag-collect icon-zan'}></i>
            </span>
            <span className="cnd-reply-bar__tag" onClick={this.handleReplyClick}>
              <i className="iconfont icon-comment"></i>
            </span>
          </div>
          <div className="flex-1 cnd-reply-bar__count">
            {topic.visit_count ? <span>查看&nbsp;<em>{topic.visit_count}</em>&nbsp;&nbsp;·&nbsp;&nbsp;</span> : ''}
            {topic.reply_count ? <span onClick={this.handleScrollToReply}>评论&nbsp;<em>{topic.reply_count}</em></span> : ''}
          </div>
        </div>
        <TouchBar touchBarShow={isShowTouchBar()} />
      </div>
    );
  }
}

export default ReplyBar;
