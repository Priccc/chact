import socket from 'store/socket';
export const REQUEST_SIGNUP = Symbol.for('注册请求');
export const REQUEST_SIGNUP_SUCCESS = Symbol.for('注册请求成功');
export const REQUEST_SIGNUP_FAIL = Symbol.for('注册请求失败');
export const REQUEST_FINDBYNAME = Symbol.for('查找用户名');
export const REQUEST_FINDBYNAME_SUCCESS = Symbol.for('查找用户名成功');
export const REQUEST_FINDBYNAME_FAIL = Symbol.for('查找用户名失败');
export const REQUEST_LOGIN = Symbol.for('登录请求');
export const REQUEST_LOGIN_SUCCESS = Symbol.for('登录请求成功');
export const REQUEST_LOGIN_FAIL = Symbol.for('登录请求失败');


export function storageAuth(uid) {
    localStorage.setItem('uid', JSON.stringify(uid));
}

export function requestSignup(query){
    return (dispatch,getState) =>{
        const promise = dispatch({
            types:[REQUEST_SIGNUP,REQUEST_SIGNUP_SUCCESS,REQUEST_SIGNUP_FAIL],
            api: action => action('/signup', 'post', query),
        })
        return promise;
    }
}
export function requestFindByName(query){
    return (dispatch,getState) =>{
        const promise = dispatch({
            types:[REQUEST_FINDBYNAME,REQUEST_FINDBYNAME_SUCCESS,REQUEST_FINDBYNAME_FAIL],
            api: action => action('/findByName', 'post', query),
        })
        return promise;
    }
}
export function requestLogin(query){
    return (dispatch,getState) =>{
        const promise = dispatch({
            types:[REQUEST_LOGIN,REQUEST_LOGIN_SUCCESS,REQUEST_LOGIN_FAIL],
            api: action => action('/login', 'post', query),
        })
        promise.then(result=>{
            const uid = result.uid;
            storageAuth(uid);
            socket.emit('login',()=>{
                console.log('登录成功')
            })
        })
        return promise;
    }
}