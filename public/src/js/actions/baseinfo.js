import * as ActionTypes from '../constants/actiontypes';

export function getBaseinfo(data) {

    return {
        type: ActionTypes.BASEINFO,
        data
    }
}
// 公司名称相关Action
export const initCompanyName = () => dispatch => {

    fetch('/api/sysconfig/getCompanyName')
        .then(response => response.json())
        .then(json => {
            if(json.code !== 0) {
                dispatch({
                    type: ActionTypes.INITCOMPANYNAME_FAILUER,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            } else {
                dispatch({
                    type: ActionTypes.INITCOMPANYNAME_SUCCESS,
                    payload: {
                        isFetching: false,
                        data: json.data['s_value']
                    }
                });
            }
        }).catch(err => {
            dispatch({
                type: ActionTypes.INITCOMPANYNAME_FAILUER,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: err
                }
            });
        });
}
    
export const editCompanyName = bool => {
    return {
        type: ActionTypes.EDITCOMPANYNAME,
        payload: {
            isEdit: bool
        }
    }
}

export const saveCompanyName = data => dispatch => {
    dispatch({
        type: ActionTypes.SAVECOMPANYNAME,
        payload: {
            isFetching: true,
            invalidate: false,
            message: ''
        }
    });

    fetch('/api/sysconfig/setCompanyName', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            companyName: data
        })
    }).then(response => response.json())
        .then(json => {
            if (json.code !== 0) {
                dispatch({
                    type: ActionTypes.SAVECOMPANYNAME_FAILUER,
                    payload: {
                        isEdit: true,
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            } else {
                dispatch({
                    type: ActionTypes.SAVECOMPANYNAME_SUCCESS,
                    payload: {
                        isEdit: false,
                        isFetching: false,
                        invalidate: false,
                        data: data
                    }
                });
            }
            
        }).catch(err => {
            dispatch({
                type: ActionTypes.SAVECOMPANYNAME_FAILUER,
                payload: {
                    isEdit: true,
                    isFetching: false,
                    invalidate: true,
                    message: err
                }
            })
        });
}

// 友情链接相关Action
export const initFriendLink = () => dispatch => {
    fetch('/api/sysconfig/listFriendLink')
        .then(res => res.json())
        .then(json => {
            dispatch({
                type: ActionTypes.INITFRIENDLINK_SUCCESS,
                payload: {
                    data: json.data
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.INITFRIENDLINK_FAILURE,
                payload: {
                    err: err
                },
            })
        })
}

export const addFriendLink = () => {
    return {
        type: ActionTypes.ADDFRIENDLINK,
        payload: {
            isEdit: true,
            changeId: -1
        }
    }
}

export const editFriendLink = (bool, index) => {
    return {
        type: ActionTypes.EDITFRIENDLINK,
        payload: {
            isEdit: bool,
            changeId: index === undefined ? -1 : index
        }
    }
}

export const saveFriendLink = (oldData, data) => dispatch => {
    console.log(oldData)
    dispatch({
        type: ActionTypes.SAVEFRIENDLINK,
        payload: {
            isFetching: true,
        }
    })
    fetch('/api/sysconfig/saveFriendLink', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id: !!oldData ? oldData['s_id'] : -1, 
            ...data
        })
    }).then(res => res.json())
        .then(json => {
            dispatch({
                type: ActionTypes.SAVEFRIENDLINK_SUCCESS,
                payload: {
                    isEdit: false,
                    isFetching: false,
                    data: json.data
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.SAVEFRIENDLINK_FAILURE,
                payload: {
                    isEdit: false,
                    isFetching: false,
                    err: err
                }
            })
        })
}

export const delFriendLink = (index, data) => dispatch => {
    dispatch({
        type: ActionTypes.DELFRIENDLINK,
        payload: {
            isFetching: true
        }
    });
    fetch(`/api/sysconfig/delFriendLink`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id: data['s_id']
        })
    }).then(res => res.json())
        .then(json => {
            if (json.code !== 0) 
                return dispatch({
                    type: ActionTypes.DELFRIENDLINK_FAILURE,
                    payload: {
                        isFetching: false,
                        validate: true,
                        err: json.message
                    }
                })
            dispatch({
                type: ActionTypes.DELFRIENDLINK_SUCCESS,
                payload: {
                    isFetching: false,
                    id: index
                }
            });
        }).catch(err => {
            dispatch({
                type: ActionTypes.DELFRIENDLINK_FAILURE,
                payload: {
                    isFetching: false,
                    validate: true,
                    err: json.message
                }
            });
        })
}