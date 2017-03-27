import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Icon ,Input} from 'antd';
import './style.scss'
const Search = Input.Search;

class Chart extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          condition:'message'
        };
    }
    // componentWillMount() {
    //     this.props.test();
    // }
    handleChange(val){
      this.setState({condition:val});
    }
    render() {
      const {condition} = this.state;
        const img = require('source/photo.jpg');
        return (
            <div className='chart'>
                <div className='aside'>
                    <img src={img} className='photo'/>
                    <Icon type="message" className={`iconfont${condition=='message'?' active': ''}`}
                      onClick={this.handleChange.bind(this,'message')}/>
                    <Icon type="solution" className={`iconfont${condition=='solution'?' active': ''}`}
                      onClick={this.handleChange.bind(this,'solution')}/>
                </div>
                <div className='left'>
                  {
                    condition=='message' ?
                    <div className='message'>
                      <header className='header'>
                        <Search placeholder="搜索" style={{width: 200}}
                          onSearch={value => console.log(value)}/>
                        <Icon type="plus-square-o" className='iconfont'/>
                      </header>
                    </div>:
                    <div className='solution'>
                      <header className='header'>
                        <Search placeholder="搜索" style={{width: 200}}
                          onSearch={value => console.log(value)}/>
                      </header>
                    </div>
                  }
                </div>
                <div className='center'></div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return { app }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
