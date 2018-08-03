import React, { Component } from 'react';
import { NavBar, Icon, ActionSheet } from 'antd-mobile';
import request from '@/http';
class Discover extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.fnGetTopicDetail();
  }


  async fnGetTopicDetail() {
    try {
      const params = {
        accesstoken: ''
      };
      const result = await request.get(`/topic/${this.props.match.params.id}`, params);
      console.log(result.data);
    } catch (error) {
      throw new Error(error);
    }
  }


  // 点击弹出分享选项
  handleShareIconClick() {
    this.showShareActionSheetMulpitleLine();
  }
  dataList = [
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  showShareActionSheetMulpitleLine = () => {
    const data = [[...this.dataList]];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: '分享',
    },
    (buttonIndex, rowIndex) => {
      this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
      // 点击分享回调

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
