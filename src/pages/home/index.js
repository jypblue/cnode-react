import React, { Component } from 'react';
import {
  getTopics
} from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicParams: {
        page: 1,
        tab: 'ask',
        limit: 10,
        mdrender: true,
      },
      topicArr: []
    };
  }

  componentDidMount() {
    this.fnGetTopics();
  }

  async fnGetTopics() {
    try {
      const params = {
        ...this.state.topicParams
      };
      const result = await getTopics(params);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <div className="cnd-home">
        home
      </div>
    );
  }
}

export default App;
