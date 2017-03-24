import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style'

class Auth extends Component {
    render() {
        return (
            <div className='container'>
                {this.props.children}
            </div>
        );
    }
}
export default Auth