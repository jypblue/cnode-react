import React, { Component } from 'react';
import { debounce } from 'lodash';
import request from '@/http';
import { PullToRefresh, ListView } from 'antd-mobile';
import TopicItem from './TopicItem';
// const data = [];
let pageIndex = 1;
let topicArr = [];
class TopicList extends Component {
  constructor(props) {
    super(props);
    // console.log(props.data.tab);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight - 72,
      useBodyScroll: false,
    };

  }


  componentDidMount() {
    pageIndex = 1;
    this.fnInitGetTopics();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  // 下拉刷新
  async fnReGetCurTopic(pageIndex) {
    try {
      const params = {
        page: pageIndex,
        tab: this.props.data.tab,
        limit: 10,
        mdrender: false,
      };
      const result = await request.get('/topics', params);
      console.log('topics:', result.data);
      if (result.success) {
        const data = result.data;
        topicArr = [].concat(topicArr, data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(topicArr),
          refreshing: false,
          isLoading: false,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    window.setTimeout(() => {
      this.fnReGetCurTopic();
    }, 1500);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.fnReGetCurTopic(++pageIndex);
  };

  handleEndReached = debounce(() => {
    this.onEndReached();
  }, 300);

  // 初始赋值
  async fnInitGetTopics() {
    try {
      this.handleIsTabLoading(true);
      const params = {
        page: 1,
        tab: this.props.data.tab,
        limit: 10,
        mdrender: false,
      };
      const result = await request.get('/topics', params);
      console.log('topics:', result.data);
      this.handleIsTabLoading(false);
      if (result.success) {
        const data = result.data;
        topicArr = [].concat(data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(topicArr),
          refreshing: false,
          isLoading: false,
        });

      }
    } catch (error) {
      this.handleIsTabLoading(false);
      throw new Error(error);
    }
  }

  handleIsTabLoading(isTabLoading) {
    this.props.onIsTabLoading(isTabLoading);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 10,
          borderTop: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <TopicItem key={rowID} data={rowData} />
      );
    };


    return (
      <div className="cnd-topic-list">
        <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => { this.lv = el }}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={this.state.useBodyScroll}
          style={this.state.useBodyScroll ? {} : {
            height: this.state.height,
          }}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.handleEndReached}
        />

      </div>
    );
  }
}

export default TopicList;
