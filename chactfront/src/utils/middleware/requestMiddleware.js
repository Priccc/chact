/**
 *
 * api请求中件间
 *
 * 返回结果格式{
 *      success: true|false //请求是否成功
 *      msg: '', // 信息
 *      loading: true|false // 是否loading
 *      data:{} 服务返回数据
 * }
 *
 */
import apiClient from '../apiClient'
export default () => {
    return ({
        dispatch,
        getState
    }) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {
                api,
                types
            } = action; // eslint-disable-line no-redeclare
            if (!api) {
                return next(action);
            }
            const [REQUEST, SUCCESS, FAILURE] = types;
            next(Object.assign(action, {
                type: REQUEST,
         //       query,
                result: {
                    loading: true,
                    success: false
                }
            }));
            const resolveFn = (result, resolve) => {
                Object.assign(result, {
                    success: true,
                    loading: false
                })
                next(Object.assign(action, {
                    result,
                    type: SUCCESS
                }));
                resolve(result)
            };

            const rejectFn = (result, reject) => {
                Object.assign(result, {
                    success: false,
                    loading: false,
                    msg: (result.error && result.error_str) ? result.error_str : '网络错误'
                })
                next(Object.assign(action, {
                    result,
                    type: FAILURE
                }));
                reject(result);
            };
            return new Promise((resolve, reject) => {
                api((path,type,query) => {
                     query = query || {}
                    // const {time,env,err_id} = getState().get('query').toJS();
                    // const query = {
                    //     env,
                    //     need_type: 0,
                    //     condition: JSON.stringify({
                    //         "log_source": "6",
                    //         "error_id":err_id
                    //     })
                    // };
                //    apiClient(Object.assign(query,{tname:`nginx_api_log_${date}`})).then(result => {
                    apiClient(path,type,query).then(result => {
                        resolveFn(result, resolve)
                    }).catch(result => {
                        rejectFn(result, reject)
                    });
                })
            })
        };
    };
}