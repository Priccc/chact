import {REQUEST_SUCCESS} from 'actions/test';
export default (state = Immutable.Map(), action) => {
    switch (action.type) {
        case REQUEST_SUCCESS: {
            const { index, date, result: { body } } = action;
            if (index == 0) {
                state = Immutable.fromJS({})
            }

            return state.mergeWith((prev, next, key) => {
                if (key === 'count') {
                    return next + prev;
                } else {

                    return prev.concat(next);
                }
            }, Immutable.fromJS({
                count: body.count,
                data: body.data.map((value, index) => {
                    return JSON.parse(value);
                }),
                dateinfo: [[date,body.count]]
            }))

        }
        default: {
            return state;
        }
    }
}