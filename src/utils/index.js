export const formatTopicTab = (tab) => {
  switch (tab) {
    case 'ask':
      return '问答';
    case 'share':
      return '分享';
    case 'job':
      return '招聘';
    default:
      return tab;
  }
};

export const formatDate = (val) => {
  if (!val) {
    return val;
  }

  const date = new Date(val);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  h = h > 9 ? h : '0' + h;
  m = m > 9 ? m : '0' + m;
  s = s > 9 ? s : '0' + s;
  return `${year}.${month}.${day} ${h}:${m}:${s}`;
};

export const formatDateCount = (str) => {
  if (!str) return '';
  let date = new Date(str);
  let time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if ((time / 1000 < 30)) {
    return '刚刚';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000), 10) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000), 10) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000, 10) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000, 10) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000, 10) + '月前';
  } else {
    return parseInt(time / 31536000000, 10) + '年前';
  }
};


export const isIPhoneX = () => {
  return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375);
};

export const isWeixinBrowser = () => {
  return /micromessenger/.test(navigator.userAgent.toLowerCase());
};

export const isShowTouchBar = () => {
  if (isIPhoneX() && isWeixinBrowser()) {
    let startx;
    let starty;
    // 手指接触屏幕
    document.addEventListener('touchstart', function(e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    }, false);

    // 手指离开屏幕
    document.addEventListener('touchend', function(e) {
      const endx = e.changedTouches[0].pageX;
      const endy = e.changedTouches[0].pageY;
      const direction = getDirection(startx, starty, endx, endy);

      if (direction === 1) {
        console.log(2);
        return true;
      } else {
        console.log(3);
        return false;
      }
      // switch (direction) {
      //   case 0:
      //     alert('未滑动！');
      //     break;
      //   case 1:
      //     alert('向上！');
      //     break;
      //   case 2:
      //     alert('向下！');
      //     break;
      //   case 3:
      //     alert('向左！');
      //     break;
      //   case 4:
      //     alert('向右！');
      //     break;
      //   default:
      // }
    }, false);
  }
};


// 获得角度
function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
}

// 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
export function getDirection(startx, starty, endx, endy) {
  let angx = endx - startx;
  let angy = endy - starty;
  let result = 0;

  // 如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  let angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }

  return result;
}

