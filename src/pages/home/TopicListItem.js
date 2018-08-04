import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import {
  formatTopicTab
} from '@/utils';

class TopicItem extends Component {
  constructor(props) {
    super(props);
    // console.log(props.data.tab);
    this.state = {
    };
    console.log(props.data);
    this.handleTopicItemClick = this.handleTopicItemClick.bind(this);
  }

  // 跳转到详情页
  handleTopicItemClick() {
    const item = this.props.data;
    console.log('topicItem:', item);
    const url = `topic/${item.id}`;
    this.props.history.push(url);
  }
  render() {
    const item = this.props.data;
    return (
      <div className="cnd-topic-item" onClick={this.handleTopicItemClick}>
        <div className="cnd-topic-item__head flex flex-pack-justify">
          <div className="cnd-topic-item__author">
            <img src={item.author.avatar_url} className="cnd-topic-item__avatar" alt="" />
            <span className="cnd-topic-item__name">
              {item.author.loginname}
            </span>
          </div>
          <div className="cnd-topic-item__tags">
            <span className="cnd-tag ">
              {formatTopicTab(item.tab)} {item.good ? '/ 精' : ''} {item.top ? '/ 热' : ''}
            </span>
          </div>
        </div>
        <div className="cnd-topic-item__body">
          <div className="cnd-topic-item__title">
            {item.title}
          </div>
          <div className="cnd-topic-item__content">
            <Truncate lines={3} ellipsis={'...'}>
              {item.content}
            </Truncate>
          </div>
        </div>
        <div className="cnd-topic-item__foot">
          <div className="cnd-topic-item__count">
            <span className="cnd-topic-item__reply-count">
              <i className="iconfont icon-visit cnd-topic-item__count-icon "></i> {item.visit_count}
            </span>
            <span className="cnd-topic-item__visit-count">
              <i className="iconfont icon-reply cnd-topic-item__count-icon"></i> {item.reply_count}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopicItem);
