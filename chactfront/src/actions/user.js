import socket from 'store/socket';

export const REQUEST_GETGROUP = 'REQUEST_GETGROUP';
export const REQUEST_GETGROUP_SUCCESS = 'REQUEST_GETGROUP_SUCCESS';
export const REQUEST_GETGROUP_FAIL = 'REQUEST_GETGROUP_FAIL';

export function getGroup(username){
    return (dispatch,getState) =>{
        const promise = dispatch({
            types:[REQUEST_GETGROUP,REQUEST_GETGROUP_SUCCESS,REQUEST_GETGROUP_FAIL],
            api: action => action('/getGroup', 'post', {username:username}),
        })
        return promise;
    }
}
