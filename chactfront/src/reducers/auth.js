import {REQUEST_LOGIN_SUCCESS} from 'actions/auth';
export default (state = Immutable.Map(), action) => {
    switch (action.type) {
        case REQUEST_LOGIN_SUCCESS: {
            const { result: { uid ,username} } = action;
            return state.merge(Immutable.fromJS({
              uid,
              username
            }));
        }
        default: {
            return state;
        }
    }
}
