import { combineReducers } from 'redux-immutable'
import routing from './route';
import app from './app';
import query from './query';
import uid from './uid';
export default combineReducers({
    routing,
    app,
    query,
    uid
})