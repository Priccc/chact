import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './style'
class App extends Component {
    render() {
        return (
            <div className='root'>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const app = state.get('app');
    return {
        app
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)