import React, { Component } from 'react';
import TouchBar from '@/layouts/TouchBar';
import { isShowTouchBar } from '@/utils';
class ReplyBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      is_collect: props.is_collect
    };
  }

  // 回复
  handleReplyClick = () => {
    this.props.onReplyInputVisible();
  }

  handleScrollToReply = () => {
    this.props.onScrollToReplyList();
  }

  // 是否收藏
  handleTopicCollect = () => {
    this.setState({
      is_collect: !this.state.is_collect
    });
  }

  render() {
    const topic = this.props;
    return (
      <div className="cnd-reply-bar" style={{ 'visibility': this.props.visible ? 'visible' : 'hidden' }}>
        <div className="cnd-reply-bar__inner borderTop1px flex flex-pack-justify">
          <div className="flex-1 cnd-reply-bar__tags">
            <span className="cnd-reply-bar__tag" onClick={this.handleTopicCollect}>
              <i className={this.state.is_collect ? 'iconfont cnd-reply__tag-collect icon-collected' : 'iconfont cnd-reply__tag-collect icon-zan'}></i>
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
