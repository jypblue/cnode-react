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