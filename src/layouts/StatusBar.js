
import React from 'react';

const StatusBar = (props) => {
  //const statusBarShow = props.statusBarShow;
  const statusHeight = props.statusHeight || '40';
  const statusBarColor = props.statusBarColor || '#fff';
  return (
    <div
      className="cnd-status-bar"
      style={{'height': statusHeight, 'backgroundColor': statusBarColor}}
    ></div>
  )
}

export default StatusBar;