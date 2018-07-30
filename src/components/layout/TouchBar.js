
import React from 'react';

export const TouchBar = (props) => {
  const touchBarShow = props.touchBarShow;
  const statusHeight = props.statusHeight || '68';
  const statusBarColor = props.statusBarColor || '#fff';
  return (
    <div
      className="cnd-touch-bar"
      style={{'height': statusHeight, 'backgroundColor': statusBarColor}}
    ></div>
  )
}

export default TouchBar;