import React, { Component } from 'react';
import TabBar from '@/layouts/TabBar';

class MePage extends Component {
  render() {
    return (
      <div className="cnd-me">
        me
        <TabBar selected="Me" />
      </div>
    );
  }
}

export default MePage;
