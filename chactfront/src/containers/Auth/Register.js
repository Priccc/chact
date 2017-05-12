import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Radio, DatePicker, message } from 'antd';
import './style';
import { requestSignup, requestFindByName } from 'actions/auth';
import { push } from 'react-router-redux'
const RadioGroup = Radio.Group;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            sex: '男',
            birthday: '',
            email: '',
            address: '',
            usernameError: { state: false, msg: '' },
            passwordError: { state: false, msg: '' },
            confirmPassError: { state: false, msg: '' },
            emailError: { state: false, msg: '' },
        }
        this.disabledDate = this.disabledDate.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPass = this.checkConfirmPass.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.check = this.check.bind(this);

    }
    disabledDate(date) {
        return date && date.valueOf() > Date.now();
    }
    checkUsername() {
        const username = this.state.username;
        if (!username || /^[ ]+$/.test(username)) {
            return this.setState({
                usernameError: {
                    state: true,
                    msg: '用户名不可为空'
                }
            });

        } else if (username && !/^[A-Za-z\u4e00-\u9fa5\0-9]{6,12}$/.test(username)) {
            return this.setState({
                usernameError: {
                    state: true,
                    msg: '用户名只支持填写6-12位数字和中英文字符'
                }
            });
        }
        this.props.requestFindByName({ username }).then((result) => {
            result.isExit ? this.setState({
                usernameError: {
                    state: true,
                    msg: '该用户名已存在'
                }
            }) : this.setState({
                usernameError: {
                    state: false,
                    msg: ''
                }
            });
        })
    }
    checkPassword() {
        const password = this.state.password;
        if (!password || /^[ ]+$/.test(password)) {
            return this.setState({
                passwordError: {
                    state: true,
                    msg: '密码不可为空'
                }
            });
        } else if (password && !/^[A-Z|a-z|0-9]{6,12}$/.test(password)) {
            return this.setState({
                passwordError: {
                    state: true,
                    msg: '密码只支持填写6-12位数字和英文字母'
                }
            });
        } else {
            return this.setState({
                passwordError: {
                    state: false,
                    msg: ''
                }
            });
        }
    }
    checkConfirmPass() {
        const password = this.state.confirmPass;
        const confirmPass = this.refs['confirmPass'].refs.input.value;
        if (password && confirmPass && password !== confirmPass) {
            return this.setState({
                confirmPassError: {
                    state: true,
                    msg: '两次密码输入不一致'
                }
            });
        } else {
            return this.setState({
                confirmPassError: {
                    state: false,
                    msg: ''
                }
            });
        }
    }
    checkEmail() {
        const email = this.state.email;
        if (email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return this.setState({
                emailError: {
                    state: true,
                    msg: '电子邮件格式不正确'
                }
            });
        } else {
            return this.setState({
                emailError: {
                    state: false,
                    msg: ''
                }
            });
        }
    }
    check() {
        const {
          username, password, confirmPass, sex, birthday, email, address,
            usernameError, passwordError, confirmPassError, emailError
        } = this.state;
        if (usernameError.state || passwordError.state || confirmPassError.state || emailError.state) {
            message.error('您提交的信息中有错误，请检查');
            return;
        } else {
            this.props.requestSignup({ username, password, sex, birthday, email, address })
            .then(()=>{
                message.success('注册成功，将会帮您跳转到登录页面');
                setTimeout(() => {
                    this.props.push('/auth/login');
                }, 2000);
            }).catch((err)=>{
                message.error('注册失败')
            })
        }
    }
    render() {
        const { sex, verify, usernameError, passwordError, confirmPassError, emailError } = this.state;
        return (
            <div className='register formCon'>
                <h1 className='formTitle'>Register</h1>
                <div className='formInfo'>
                    <span className='necessary'>*</span>
                    <label>用户名</label>
                    <div className={`formInfoR${usernameError.state ? ' onerror' : ''}`}>
                        <Input type="text" placeholder="Username" ref="username" className='formInput'
                            onChange={(e) => { this.setState({ username: e.target.value }) }} onBlur={this.checkUsername} />
                    </div>
                </div>
                {usernameError.state ? <p className='errorP'>{usernameError.msg}</p> : ''}
                <div className='formInfo'>
                    <span className='necessary'>*</span>
                    <label>密码</label>
                    <div className={`formInfoR${passwordError.state ? ' onerror' : ''}`}>
                        <Input type="password" placeholder="Password" ref="password" className='formInput'
                            onChange={(e) => { this.setState({ password: e.target.value }) }} onBlur={this.checkPassword} />
                    </div>
                </div>
                {passwordError.state ? <p className='errorP'>{passwordError.msg}</p> : ''}
                <div className='formInfo'>
                    <span className='necessary'>*</span>
                    <label>确认密码</label>
                    <div className={`formInfoR${confirmPassError.state ? ' onerror' : ''}`}>
                        <Input type="password" placeholder="Password" ref="confirmPass" className='formInput'
                            onChange={(e) => { this.setState({ confirmPass: e.target.value }) }} onBlur={this.checkConfirmPass} />
                    </div>
                </div>
                {confirmPassError.state ? <p className='errorP'>{confirmPassError.msg}</p> : ''}
                <div className='formInfo'>
                    <label>性别</label>
                    <div className='formInfoR'>
                        <RadioGroup onChange={(e) => { this.setState({ sex: e.target.value }) }} value={sex}>
                            <Radio value='男'>男</Radio>
                            <Radio value='女'>女</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div className='formInfo'>
                    <label>出生日期</label>
                    <div className='formInfoR'>
                        <DatePicker onChange={(date) => { this.setState({ birthday: date.format('YYYY-MM-DD') }) }}
                            allowClear={false} disabledDate={this.disabledDate} format='YYYY-MM-DD' />
                    </div>
                </div>
                <div className='formInfo'>
                    <label>邮箱</label>
                    <div className={`formInfoR${emailError.state ? ' onerror' : ''}`}>
                        <Input type="email" placeholder="Email" ref="email" className='formInput'
                            onChange={(e) => { this.setState({ email: e.target.value }) }} onBlur={this.checkEmail} />
                    </div>
                </div>
                {emailError.state ? <p className='errorP'>{emailError.msg}</p> : ''}
                <div className='formInfo'>
                    <label>地址</label>
                    <div className='formInfoR'>
                        <Input type="text" placeholder="Address" ref="address" className='formInput'
                            onChange={(e) => { this.setState({ address: e.target.value }) }} />
                    </div>
                </div>
                <Button className='submitBtn' onClick={this.check}>提交</Button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return { app }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestSignup,
        requestFindByName,
        push
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
