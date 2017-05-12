 import * as user from 'actions/user';
export default (state = Immutable.Map(), action) => {
    switch (action.type) {
        case user.REQUEST_GETGROUP_SUCCESS: {
            const { result } = action;
            return state.merge(Immutable.fromJS({
              allGroup:result
            }))

        }
        default: {
            return state;
        }
    }
}
