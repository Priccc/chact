import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Immutable from 'immutable'
import 'moment/locale/zh-cn';
import configureStore from './store';
import route from './routes';
moment.locale('zh-cn');

const store = configureStore(Immutable.Map());
const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState(state) {
        return state.get('routing').toJS();
    }
});
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router routes={route} history={history}>
                </Router>
            </Provider >
        )
    }
}
render(<App />, document.getElementById('app'));
