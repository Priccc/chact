export const REQUEST_SIGNUP = Symbol.for('REQUEST_SIGNUP');
export const REQUEST_SIGNUP_SUCCESS = Symbol.for('REQUEST_SIGNUP_SUCCESS');
export const REQUEST_SIGNUP_FAIL = Symbol.for('REQUEST_SIGNUP_FAIL');

export function requestSignup(query){
    return (dispatch,getState) =>{
        const promise = dispatch({
            types:[REQUEST_SIGNUP,REQUEST_SIGNUP_SUCCESS,REQUEST_SIGNUP_FAIL],
            // api: action => action('/user', 'get', query),
            api: action => action('/user/signup', 'post', query),
        })
        return promise;
    }
}