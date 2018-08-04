import React, { Component } from 'react';
import TabBar from '@/layouts/TabBar';

class NoticePage extends Component {
  render() {
    return (
      <div className="cnd-home">
        notice
        <TabBar selected="Notice" />
      </div>
    );
  }
}

export default NoticePage;
