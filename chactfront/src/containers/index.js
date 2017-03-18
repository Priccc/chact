import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './style'
class App extends Component {
    render() {
        return (
            <div styleName='root'>
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles))


