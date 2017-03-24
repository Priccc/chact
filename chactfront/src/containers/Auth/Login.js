import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button ,Input ,Icon ,Message} from 'antd';
import {requestLogin} from 'actions/auth'
import './style'
import {push} from 'react-router-redux'

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(){
        this.props.requestLogin({
            username:this.refs.username.refs.input.value,
            password:this.refs.password.refs.input.value
        }).then(()=>{
            this.props.push('/')
        }).catch(()=>{
            Message.error('登录失败')
        })
    }
    render() {
        return (
            <div className='login formCon'>
                <h1 className='formTitle'>Login Form</h1>
                <div className='formInfo'>
                    <Icon type="user" className='iconfont' />
                    <div className='formInfoR'>
                        <Input type="text" placeholder="Username" ref="username" className='formInput' />
                    </div>
                </div>
                <div className='formInfo'>
                    <Icon type="lock" className='iconfont' />
                    <div className='formInfoR'>
                        <Input type="password" placeholder="Password" ref="password" className='formInput' />
                    </div>
                </div>
                <Button className='submitBtn' onClick={this.login}>Login</Button>
                <div className='link'>
                    <a href="#">Lost password</a>
                    <a href="http://localhost:8087/#/auth/register">Register</a>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return { app }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestLogin,push}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)