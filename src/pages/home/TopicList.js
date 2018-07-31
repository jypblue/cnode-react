import React, { Component } from 'react';
import request from '@/http';
import TopicItem from './TopicItem';

class TopicList extends Component {
  constructor(props) {
    super(props);
    // console.log(props.data.tab);
    this.state = {
      topicArr: [],
      topicParams: {
        page: 1,
        tab: props.data.tab,
        limit: 10,
        mdrender: false,
      },
    };

  }


  componentDidMount() {
    this.fnGetTopics();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.fnGetTopics();
  }

  async fnGetTopics() {
    try {
      const params = {
        ...this.state.topicParams
      };
      const result = await request.get('/topics', params);
      console.log('topics:', result.data);
      if (result.success) {
        this.setState({ topicArr: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { topicArr } = this.state;
    return (
      <div className="cnd-topic-list">
        {
          topicArr.map((item, i) => <TopicItem key={i} data={item} />)
        }
      </div>
    );
  }
}

export default TopicList;
