
import React from 'react';

export const TouchBar = (props) => {
  const touchBarShow = props.touchBarShow;
  const statusHeight = props.statusHeight || '34px';
  const statusBarColor = props.statusBarColor || '#fff';

  return (
    <div
      className={touchBarShow ? 'cnd-touch-bar' : 'cnd-touch-bar is-hide'}
      style={{ 'height': statusHeight, 'backgroundColor': statusBarColor }}
    ></div>
  );
};

export default TouchBar;