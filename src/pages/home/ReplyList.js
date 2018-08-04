import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { formatDateCount } from '@/utils';

class ReplyList extends Component {
  constructor(props) {
    super(props);
    this.handleUpsClick = this.handleUpsClick.bind(this);
    this.handleReplyClick = this.handleReplyClick.bind(this);
  }

  handleUpsClick() {
    console.log(111111);
  }

  handleReplyClick() {
    console.log(22222);
  }
  render() {
    const replyList = this.props.replies || [];
    const count = this.props.reply_count || 0;
    console.log(this.props);
    console.log(replyList);
    const ListItem = (reply) => {
      const replyContent = () => {
        return { __html: reply.content };
      };
      return (
        <div className="cnd-reply-item borderBottom1px">
          <img src={reply.author.avatar_url} className="cnd-reply-item__avatar cnd-topic-reply__avatar" alt="" />
          <div className="cnd-reply-item__main">
            <Link to={`/user/${reply.author.loginname}`} className="cnd-reply-item__name">
              {reply.author.loginname}
            </Link>
            <div className="cnd-reply-item__content break" dangerouslySetInnerHTML={replyContent()}>
            </div>
            <div className="cnd-reply-item__mark">
              <span onClick={this.handleUpsClick}><i className="iconfont icon-zan-up"></i>
                {reply.ups.length ? <em className="color-green">{reply.ups.length}</em> : '赞'}
              </span>&nbsp;·&nbsp;
              <span onClick={this.handleReplyClick}>回复</span>&nbsp;·&nbsp;
              <span>{formatDateCount(reply.create_at)}</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="cnd-reply-list">
        {
          count ?
            <div className="cnd-reply-list__title borderBottom1px">
              {count} 条评论
            </div> : ''
        }
        <div className="cnd-reply-box">
          {
            replyList.map((item, i) => {
              return <ListItem key={i} {...item} />;
            })
          }
        </div>

      </div>
    );
  }
}

export default withRouter(ReplyList);
