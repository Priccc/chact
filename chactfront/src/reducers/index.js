import { combineReducers } from 'redux-immutable'
import routing from './route';
import app from './app'
import query from './query'
export default combineReducers({
    routing,
    app,
    query
})