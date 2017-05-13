import { REQUEST_AUTH_INIT } from 'actions/auth';
export default (state = Immutable.Map(), action) => {
    switch (action.type) {
        case REQUEST_AUTH_INIT: {
            const auth = sessionStorage.getItem('auth');
            return state.merge(Immutable.fromJS(JSON.parse(auth)));
        }
        default: {
            return state;
        }
    }
}
