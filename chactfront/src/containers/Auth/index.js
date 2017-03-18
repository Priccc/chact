import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './style'

class Auth extends Component {
    // componentWillMount() {
    //     this.props.test();
    // }
    render() {
        return (
            <div styleName='container'>
                {this.props.children}
            </div>
        );
    }
}
// export default Auth;
export default connect()(CSSModules(Auth, styles))