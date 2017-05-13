import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { requestAuthInit } from 'actions/auth';
import './style.scss'

class Root extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        const { push, requestAuthInit } = this.props;
        let auth = sessionStorage.getItem('auth');
        auth = auth && JSON.parse(auth);
        if (!auth) {
            push('/auth/login');
            return false;
        }
        requestAuthInit();
    }
    render() {
        return (
            <div className='container'>
                {this.props.children}
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
        push,
        requestAuthInit
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
