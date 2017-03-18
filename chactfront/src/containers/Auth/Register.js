import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Radio, DatePicker } from 'antd';
import './style';
const RadioGroup = Radio.Group;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sex: '男',
            verify:false,
            usernameError:{state:false,msg:''},
            passwordError:{state:false,msg:''},
            confirmPassError:{state:false,msg:''},
            emailError:{state:false,msg:''},
        }
        this.onChange = this.onChange.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPass = this.checkConfirmPass.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.check=this.check.bind(this);
    }
    onChange(e) {
        this.setState({
            sex: e.target.value,
        });
    }
    disabledDate(date) {
        return date && date.valueOf() > Date.now();
    }
    checkUsername(){
        const username = this.refs['username'].refs.input.value;
        if (!username || /^[ ]+$/.test( username )) {
			return this.setState({
                usernameError:{
                    state:true,
                    msg:'用户名不可为空'
                }
            });
            
		} else if (username && !/^[A-Za-z\u4e00-\u9fa5\0-9]{6,12}$/.test(username)) {
            return this.setState({
                usernameError:{
                    state:true,
                    msg:'用户名只支持填写6-12位数字和中英文字符'
                }
            });
        }else{
            return this.setState({
                usernameError:{
                    state:false,
                    msg:''
                }
            });
        }
    }
    checkPassword(){
        const password = this.refs['password'].refs.input.value;
        if (!password || /^[ ]+$/.test( password )) {
			return this.setState({
                passwordError:{
                    state:true,
                    msg:'密码不可为空'
                }
            });
		} else if (password && !/^[A-Z|a-z|0-9]{6,12}$/.test(password)) {
            return this.setState({
                passwordError:{
                    state:true,
                    msg:'密码只支持填写6-12位数字和英文字母'
                }
            });
        }else{
            return this.setState({
                passwordError:{
                    state:false,
                    msg:''
                }
            });
        }
    }
    checkConfirmPass(){
        const password = this.refs['password'].refs.input.value;
        const confirmPass = this.refs['confirmPass'].refs.input.value;
        if (password && confirmPass && password !== confirmPass) {
			return this.setState({
                confirmPassError:{
                    state:true,
                    msg:'两次密码输入不一致'
                }
            });
        }else{
            return this.setState({
                confirmPassError:{
                    state:false,
                    msg:''
                }
            });
        }
    }
    checkEmail(){
        const email = this.refs['email'].refs.input.value;
        if (email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            return this.setState({
                emailError:{
                    state:true,
                    msg:'电子邮件格式不正确'
                }
            });
        }else{
            return this.setState({
                emailError:{
                    state:false,
                    msg:''
                }
            });
        }
    }
    check(){
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const confirmPass = this.refs.confirmPass.value;
        const email = this.refs.email.value;
        // if(!username || !password || !)

    }
    render() {
        const {sex,verify,usernameError} = this.state;
        return (
            <div className='register'>
                <form action="" className='formCon'>
                    <h1 className='formTitle'>Register</h1>
                    <div className='formInfo'>
                        <span className='necessary'>*</span>
                        <label>用户名</label>
                        <div className={`formInfoR${usernameError.state ? ' onerror' : ''}`}>
                            <Input type="text" placeholder="Username" ref="username" className='formInput' onBlur={this.checkUsername}/>
                        </div>
                    </div>
                    {usernameError.state ? <p>{usernameError.msg}</p> : ''}
                    <div className='formInfo'>
                        <span className='necessary'>*</span>
                        <label>密码</label>
                        <div className='formInfoR'>
                            <Input type="password" placeholder="Password" ref="password" className='formInput' />
                        </div>
                    </div>
                    <div className='formInfo'>
                        <span className='necessary'>*</span>
                        <label>确认密码</label>
                        <div className='formInfoR'>
                            <Input type="password" placeholder="Password" ref="confirmPass" className='formInput' />
                        </div>
                    </div>
                    <div className='formInfo'>
                        <label>性别</label>
                        <div className='formInfoR'>
                            <RadioGroup onChange={this.onChange} value={sex}>
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='formInfo'>
                        <label>出生日期</label>
                        <div className='formInfoR'>
                            <DatePicker defaultValue={moment().locale('en').utcOffset(0)} allowClear={false}
                                disabledDate={this.disabledDate} format='YYYY-MM-DD' />
                        </div>
                    </div>
                    <div className='formInfo'>
                        <label>邮箱</label>
                        <div className='formInfoR'>
                            <Input type="email" placeholder="Email" ref="email" className='formInput' />
                        </div>
                    </div>
                    <div className='formInfo'>
                        <label>地址</label>
                        <div className='formInfoR'>
                            <Input type="text" placeholder="Address" ref="address" className='formInput' />
                        </div>
                    </div>
                    <Button className='submitBtn' onClick={this.check}>提交</Button>
                </form>
                <div>
                    <a href="#"></a>
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)