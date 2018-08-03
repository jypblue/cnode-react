import React, { Component } from 'react';

class ReplyBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    // const topic = this.props.topic;
    return (
      <div className="cnd-reply-bar">
        <div className="cnd-reply-bar__inner borderTop1px flex flex-pack-justify">
          <div className="flex-1">

          </div>
          <div className="flex-1">

          </div>
        </div>
      </div>
    );
  }
}

export default ReplyBar;
