import React, { Component } from 'react';
import { NavBar, Icon, ActionSheet } from 'antd-mobile';

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleShareIconClick() {
    console.log('right icon');
    this.showShareActionSheetMulpitleLine();
  }
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  showShareActionSheetMulpitleLine = () => {
    const data = [[...this.dataList], [this.dataList[3], this.dataList[2]]];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: '分享',
    },
    (buttonIndex, rowIndex) => {
      this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
    });
  };

  render() {
    return (
      <div className="cnd-discover">
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { this.props.history.goBack() }}
          rightContent={[
            <i key="0" className="iconfont icon-share-bold" onClick={this.handleShareIconClick.bind(this)} ></i>,
          ]}
        >主题详情</NavBar>
        topic detail
      </div>
    );
  }
}

export default Discover;
