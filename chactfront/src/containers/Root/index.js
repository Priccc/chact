import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss'

class Root extends Component {
//     componentWillMount() {
//         const { push, replace, saveAuth, requestGsv001 } = this.props;

//         let uid = localStorage.getItem('uid');
//         uid = uid && JSON.parse(uid);
//     // this.context.router.replace('/');
//     if (!auth) {
//       logout('url');
//       return;
//     } else {
//       requestGsv001 && requestGsv001();
//       saveAuth && saveAuth(auth);
//     }

//     let pathName = this.props.location.pathname;
//     let routerObj = this.getCurRootRouter(pathName);
//     let { nextItem, curTitleIndex, index } = routerObj;

//     if (nextItem) {
//       this.changeNavTitle(curTitleIndex, nextItem, index, true);
//     } else {
//       this.context.router.push('/' + (defaultObj.link || ''));
//     }
//   }
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)