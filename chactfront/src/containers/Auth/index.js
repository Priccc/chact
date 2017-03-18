import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style'

class Auth extends Component {
    // componentWillMount() {
    //     this.props.test();
    // }
    render() {
        return (
            <div className='container'>
                {this.props.children}
            </div>
        );
    }
}
// export default Auth;
export default Auth