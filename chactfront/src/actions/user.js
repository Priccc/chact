import socket from 'store/socket';
export const REQUEST_GETGROUP = Symbol.for('REQUEST_GETGROUP');
export const REQUEST_GETGROUP_SUCCESS = Symbol.for('REQUEST_GETGROUP_SUCCESS');
export const REQUEST_GETGROUP_FRAILURE = Symbol.for('REQUEST_GETGROUP_FRAILURE');

export function getGroup(username) {
    return (dispatch, getState) => {
        return dispatch({
            types: [REQUEST_GETGROUP, REQUEST_GETGROUP_SUCCESS, REQUEST_GETGROUP_FRAILURE],
            api: action => action('/getGroup','post',{username:username}),
        })
    }

}
