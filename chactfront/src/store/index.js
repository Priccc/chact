import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import {
    hashHistory
} from 'react-router'
import {
    routerMiddleware
} from 'react-router-redux'
import requestMiddleWare from 'utils/middleware/requestMiddleWare'
import reducer from 'reducers';
export default initialState => {
    return createStore(reducer, initialState, compose(
        applyMiddleware(requestMiddleWare(), routerMiddleware(hashHistory)),
        window.devToolsExtension ? window.devToolsExtension({}) : f => f
    ));
}