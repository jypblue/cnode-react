import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { formatDateCount } from '@/utils';
import request from '@/http';

class ReplyList extends Component {

  constructor(props) {
    super(props);
    // const replyList = this.props.topic ? this.props.topic.replies : [];
    this.state = {
      id: props.user.id,
    };
  }

  componentDidMount = () => {

  }


  handleUpsClick(reply_id) {
    console.log('点赞');
    if (this.props.accesstoken) {
      this.fnGiveThumbsUps(reply_id);
    } else {
      // 跳转登录
      this.props.history.push('/login');
    }

  }

  fnIncludeSelfId({ ups }) {
    const id = this.props.user.id;
    const index = ups.indexOf(id);
    if (index > -1) {
      return 'color-green';
    }
    return '';
  }

  handleReplyClick(loginname) {
    console.log('回复');
    if (this.props.accesstoken) {
      this.props.onReplyInputVisible(loginname);
    } else {
      // 跳转登录
      this.props.history.push('/login');
    }
  }

  async fnGiveThumbsUps(id) {
    try {
      const accesstoken = this.props.accesstoken;
      const params = {
        accesstoken
      };

      const result = await request.post(`/reply/${id}/ups`, params);
      if (result.success) {
        this.props.onRefreshTopicDetail();
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    const replyList = this.props.topic ? this.props.topic.replies : [];
    const count = this.props.topic ? this.props.topic.reply_count : 0;

    const ListItem = ({ i = 0, item }) => {
      console.log(this.props.user.id || '');
      const replyContent = () => {
        return { __html: item.content };
      };
      return (
        <div className="cnd-reply-item borderBottom1px">
          <img src={item.author.avatar_url} className="cnd-reply-item__avatar cnd-topic-reply__avatar" alt="" />
          <div className="cnd-reply-item__main">
            <Link to={`/user/${item.author.loginname}`} className="cnd-reply-item__name">
              {item.author.loginname}
            </Link>
            <div className="cnd-reply-item__content break" dangerouslySetInnerHTML={replyContent()}>
            </div>
            <div className="cnd-reply-item__mark">
              <span
                className={item.ups.indexOf(this.props.user.id || '') > -1 ? 'color-green' : ''}
                onClick={this.handleUpsClick.bind(this, item.id)}><i className="iconfont icon-zan-up"></i>
                {item.ups.length ? <em>{item.ups.length}</em> : '赞'}
              </span>&nbsp;·&nbsp;
              <span onClick={this.handleReplyClick.bind(this, item.author.loginname)}>回复</span>&nbsp;·&nbsp;
              <span>{formatDateCount(item.create_at)}</span>
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
              return <ListItem key={i} {...{ i, item }} />;
            })
          }
        </div>

      </div>
    );
  }
}

export default withRouter(ReplyList);
