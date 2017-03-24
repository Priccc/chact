import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Icon} from 'antd';
import './style.scss'

class Chart extends Component {
    // componentWillMount() {
    //     this.props.test();
    // }
    render() {
        const img = require('source/photo.jpg');
        return (
            <div className='chart'>
                <div className='aside'>
                    <img src={img} className='photo'/>
                    <Icon type="message" className='iconfont'/>
                    <Icon type="solution" className='iconfont'/>
                </div>
                <div className='left'></div>
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