import { combineReducers } from 'redux-immutable'
import routing from './route';
import app from './app';
import query from './query';
import auth from './auth';
export default combineReducers({
    routing,
    app,
    query,
    auth
})
