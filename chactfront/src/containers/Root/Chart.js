import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu,Icon ,Input ,Modal} from 'antd';
import {getGroup} from 'actions/user';
import './style.scss'
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

class Chart extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.settingShow = this.settingShow.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          condition:'message',
          showSetting: false,
          themeChange:false,
          theme:1
        };
    }
    componentWillMount() {
      const {auth,getGroup} = this.props;
      // console.log(localStorage.getItem('uid'));
      // localStorage.removeItem('uid');
      // console.log(localStorage.getItem('uid'));

      getGroup(auth.get('username'));
    }
    settingShow(){
      const that = this;
      this.setState({
        showSetting:true
      })
      document.onclick = function () {
        that.setState({
          showSetting: false
        })
      }
    }
    changeTheme(val){
      this.setState({
        theme:val
      })
    }
    closeModal(val){
      this.setState({
        [val]:false
      })
    }
    showModal(val){
      this.setState({
        [val]:true
      })
    }
    handleChange(val){
      this.setState({condition:val});
    }
    handleClick(e){
 //     console.log('click ', e);
    }
    render() {
      const { condition, showSetting, theme, themeChange} = this.state;
      const img = require('source/photo.jpg');
      return (
        <div className={`chart theme${theme}`}>
          <div className='aside'>
            <img src={img} className='photo' />
            <Icon type="message" className={`iconfont${condition == 'message' ? ' active' : ''}`}
              onClick={this.handleChange.bind(this, 'message')} />
            <Icon type="solution" className={`iconfont${condition == 'solution' ? ' active' : ''}`}
              onClick={this.handleChange.bind(this, 'solution')} />
          </div>
          <div className='left'>
            <div className='left-title'>
              CHACT <Icon type="ellipsis" className='iconfont' onClick={this.settingShow} />
              {
                showSetting && <div className='setting'>
                  <div className='setItem'>
                    <Icon type="user-add" style={{ color: '#f1a52f' }} />添加好友
                  </div>
                  <div className='setItem'>
                    <Icon type="usergroup-add" style={{ color: '#5788d9' }} />添加群聊
                  </div>
                  <div className='setItem' onClick={this.showModal.bind(this,'themeChange')}>
                    <Icon type="skin" style={{ color: '#70cc29' }} />更换主题
                  </div>
                  <div className='setItem'>
                    <Icon type="setting" style={{ color: '#a645dc' }} />信息编辑
                  </div>
                  <div className='setItem'>
                    <Icon type="export" style={{ color: '#ff435a' }} />退出
                  </div>
                </div>
              }
            </div>
            <div className='search'>
              <Search placeholder="搜索" style={{ width: 230 }} onSearch={value => console.log(value)} />
            </div>
            {
              condition == 'message' ?
                <div className='list'>
                  <Menu className='friend-list'
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['group']}
                    mode="inline"
                  >
                    <SubMenu key="group" title={<span>我的群聊</span>}>
                      <Menu.Item key="9" className='item'>Option 9</Menu.Item>
                      <Menu.Item key="10" className='item'>Option 10</Menu.Item>
                      <Menu.Item key="11" className='item'>Option 11</Menu.Item>
                      <Menu.Item key="12" className='item'>Option 12</Menu.Item>
                    </SubMenu>
                  </Menu>
                </div> :
                <div className='list'>
                  <Menu className='friend-list'
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                  >
                    <SubMenu key="sub1" title={<span>我的好友</span>}>
                      <Menu.Item key="5" className='item'>
                          <img src={img} className='item-img' />
                          <p>admin</p>
                      </Menu.Item>
                      <Menu.Item key="6"  className='item'>
                          <img src={img} className='item-img' />
                          <p>admin</p>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span>我的群聊</span>}>
                      <Menu.Item key="9" className='item'>Option 9</Menu.Item>
                      <Menu.Item key="10" className='item'>Option 10</Menu.Item>
                      <Menu.Item key="11" className='item'>Option 11</Menu.Item>
                      <Menu.Item key="12" className='item'>Option 12</Menu.Item>
                    </SubMenu>
                  </Menu>
                </div>
            }
          </div>
          <div className='center'></div>
          <Modal visible={themeChange} width={455} closable footer={null} className='changeTheme'
            onCancel={this.closeModal.bind(this, 'themeChange')}>
            <p className='title'>主题</p>
            <div className='themeBox'>
              <span className={`themeItem${theme == 1 ? ' activeTheme' : ''}`} style={{ background: '#E3E7EF' }}
                onClick={this.changeTheme.bind(this, 1)}>清凉蓝</span>
              <span className={`themeItem${theme == 2 ? ' activeTheme' : ''}`} style={{ background: '#FFEFE9' }}
                onClick={this.changeTheme.bind(this, 2)}>护眼橙</span>
              <span className={`themeItem${theme == 3 ? ' activeTheme' : ''}`} style={{ background: '#E1D6E9' }}
                onClick={this.changeTheme.bind(this, 3)}>浪漫紫</span>
              <span className={`themeItem${theme == 4 ? ' activeTheme' : ''}`} style={{ background: '#D4E8D4' }}
                onClick={this.changeTheme.bind(this, 4)}>清新绿</span>
              <span className={`themeItem${theme == 5 ? ' activeTheme' : ''}`} style={{ background: '#4D6778' }}
                onClick={this.changeTheme.bind(this, 5)}>深沉绿</span>
              <span className={`themeItem${theme == 6 ? ' activeTheme' : ''}`} style={{ background: '#292A39' }}
                onClick={this.changeTheme.bind(this, 6)}>高调黑</span>
            </div>
          </Modal>
        </div>
      );
    }
}
function mapStateToProps(state) {
  const app = state.get('app');
  const auth = state.get('auth');
  return {
    app,
    auth
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroup
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
