import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import './style.scss'

class Root extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        const { push, replace, saveAuth, requestGsv001 } = this.props;
        let uid = localStorage.getItem('uid');
        uid = uid && JSON.parse(uid);

        if (!uid) {
        push('/auth/login');
        }
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
        push
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)