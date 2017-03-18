import { LOCATION_CHANGE } from 'react-router-redux'
import Immutable from 'immutable';
const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});
export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return state.merge({
                locationBeforeTransitions: action.payload
            });
        }
        default: {
            return state
        }
    }
}