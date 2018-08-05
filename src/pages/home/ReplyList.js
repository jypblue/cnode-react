import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { formatDateCount } from '@/utils';
import request from '@/http';

class ReplyList extends Component {


  handleUpsClick(reply_id) {
    console.log('点赞');

    if (this.props.accesstoken) {
      this.fnGiveThumbsUps(reply_id);
    } else {
      // 跳转登录
      this.props.history.push('/login');
    }

  }

  handleReplyClick() {
    console.log(22222);
  }

  async fnGiveThumbsUps(reply_id) {
    try {
      const accesstoken = this.props.accesstoken;
      const params = {
        accesstoken
      };

      const result = await request.post(`/reply/${reply_id}/ups`, params);
      if (result.success) {
        console.log(result.data);
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    const replyList = this.props.topic ? this.props.topic.replies : [];
    const count = this.props.topic ? this.props.topic.reply_count : 0;
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
              <span onClick={this.handleUpsClick.bind(this, reply.reply_id)}><i className="iconfont icon-zan-up"></i>
                {reply.ups.length ? <em className="color-green">{reply.ups.length}</em> : '赞'}
              </span>&nbsp;·&nbsp;
              <span onClick={this.handleReplyClick.bind(this)}>回复</span>&nbsp;·&nbsp;
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
