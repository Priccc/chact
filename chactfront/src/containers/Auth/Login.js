import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon,Button } from 'antd';
import styles from './style'

class Login extends Component {
    // componentWillMount() {
    //     this.props.test();
    // }
    render() {
        return (
            <div styleName='login'>
                <form action="" styleName='loginForm'>
                    <h1 styleName='formTitle'>Login Form</h1>
                        <div styleName='user'>
                            <Icon type="user" />
                            <input type="text" placeholder="Username" required="" ref="username" />
                        </div>
                        <div styleName='password'>
                            <Icon type="lock" />
                            <input type="password" placeholder="Password" required="" ref="password" />
                        </div>
                        <div>
                            <Button>Login</Button>
                            <a href="#">Lost your password?</a>
                            <a href="#">Register</a>
                        </div>
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
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Login, styles))
// export default Help;