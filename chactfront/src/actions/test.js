export const REQUEST = Symbol.for('发送请求');
export const REQUEST_SUCCESS = Symbol.for('请求成功');
export const REQUEST_FRAILURE = Symbol.for('请求失败');
export const INIT = Symbol.for('query初始化');
export const MODIFY_PROPS = Symbol.for('更改属性');

export function queryInit() {
    return {
        type: INIT
    }
}
// export function query() {
//     return (dispatch, getState) => {
//         const date = getState().getIn(['query', 'time']).toJS();
        
//         async function requestTime() {
//             for (let i = 0; i < date.length; i++) {
//                 await dispatch({
//                     types: [REQUEST, REQUEST_SUCCESS, REQUEST_FRAILURE],
//                     api: action => action(date[i]),
//                     date: date[i],
//                     index:i
//                 })

//             }
//         }
//         requestTime();
//     }
// }
export function modifyProps(query) {
    return {
        type: MODIFY_PROPS,
        query
    }
}


export function test(query) {
    return (dispatch, getState) => {
        return dispatch({
            types: [REQUEST, REQUEST_SUCCESS, REQUEST_FRAILURE],
            api: action => action('user','get',{}),
    })
    }
    
}