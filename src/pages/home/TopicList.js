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
      isLoading: false
    };

  }


  componentDidMount() {
    this.fnGetTopics();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.fnGetTopics();
  }

  handleIsLoading(isLoading) {
    this.props.onIsLoading(isLoading);
  }

  async fnGetTopics() {
    try {
      this.handleIsLoading(true);
      const params = {
        ...this.state.topicParams
      };
      const result = await request.get('/topics', params);
      console.log('topics:', result.data);
      if (result.success) {
        this.setState({ topicArr: result.data });
        this.handleIsLoading(false);
      }
    } catch (error) {
      this.handleIsLoading(false);
      throw new Error(error);
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
