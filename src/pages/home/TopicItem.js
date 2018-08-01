import React, { Component } from 'react';
import {
  formatDate,
  formatTopicTab
} from '@/utils';

class TopicItem extends Component {
  constructor(props) {
    super(props);
    // console.log(props.data.tab);
    this.state = {
    };
    console.log(props.data);
  }

  render() {
    const item = this.props.data;
    return (
      <div className="cnd-topic-item flex">
        <div className="cnd-topic-item__author">
          <img src={item.author.avatar_url} className="cnd-topic-item__avatar" alt="" />
          <div className="cnd-topic-item__name">
            {item.author.loginname}
          </div>
        </div>
        <div className="cnd-topic-item__content flex-1">
          <div className="cnd-topic-item__title">
            {item.title}
          </div>
          <div className="cnd-topic-item__info">
            <ul className="flex ">
              <li className="flex-1">
                <span className="cnd-tag ">
                  {formatTopicTab(item.tab)}
                </span>
                <span className="cnd-tag ">
                  {item.good ? '精' : ''}
                </span>
                <span className="cnd-tag ">
                  {item.top ? '顶' : ''}
                </span>
              </li>
              <li className="flex-1">
                <span>{item.reply_count}/{item.visit_count}</span>
              </li>
              <li className="flex-2">
                {formatDate(item.last_reply_at)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TopicItem;
