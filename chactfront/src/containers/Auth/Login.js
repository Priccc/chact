import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button ,Input ,Icon} from 'antd';
import './style'

class Login extends Component {
    render() {
        return (
            <div className='login'>
                <form action="" className='formCon'>
                    <h1 className='formTitle'>Login Form</h1>
                    <div className='formInfo'>
                        <Icon type="user" className='iconfont'/>
                        <div className='formInfoR'>
                            <Input type="text" placeholder="Username" ref="username" className='formInput' />
                        </div>
                    </div>
                    <div className='formInfo'>
                        <Icon type="lock" className='iconfont'/>
                        <div className='formInfoR'>
                            <Input type="password" placeholder="Password" ref="password" className='formInput' />
                        </div>
                    </div>
                    <Button className='submitBtn'>Login</Button>
                    <div className='link'>
                        <a href="#">Lost password</a>
                        <a href="#">Register</a>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return { app }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)