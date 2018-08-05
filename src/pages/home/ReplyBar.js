import React, { Component } from 'react';
import TouchBar from '@/layouts/TouchBar';
import { isShowTouchBar } from '@/utils';
class ReplyBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const topic = this.props;
    return (
      <div className="cnd-reply-bar">
        <div className="cnd-reply-bar__inner borderTop1px flex flex-pack-justify">
          <div className="flex-1 cnd-reply-bar__tags">
            <span className="cnd-reply-bar__tag">
              <i className="iconfont icon-zan cnd-reply__tag-collect"></i>
            </span>
            <span className="cnd-reply-bar__tag">
              <i className="iconfont icon-comment"></i>
            </span>
          </div>
          <div className="flex-1 cnd-reply-bar__count">
            {topic.visit_count ? <span>查看&nbsp;<em>{topic.visit_count}</em>&nbsp;&nbsp;·&nbsp;&nbsp;</span> : ''}
            {topic.reply_count ? <span>评论&nbsp;<em>{topic.reply_count}</em></span> : ''}
          </div>
        </div>
        <TouchBar touchBarShow={isShowTouchBar()} />
      </div>
    );
  }
}

export default ReplyBar;
