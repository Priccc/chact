// import {INIT,CHANGE_ENV,MODIFY_PROPS} from 'actions/test'

const dateToFormatStr = date => {
  const Y = date.getFullYear() + '';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  return Y + M + D;
};

export default (state = Immutable.Map(), action) => {
    switch (action.type) {
        // case INIT: {
        //     return state.merge(Immutable.fromJS({
        //         time: [dateToFormatStr(new Date())],
        //         env: 'online',
        //         err_id: '200000'
        //     }))
        // }
        // case MODIFY_PROPS: {
        //     const {query} = action;
        //     return state.merge(Immutable.fromJS(query))
        // }
        default: {
            return state;
        }
    }
}
