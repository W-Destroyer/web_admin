import * as ActionTypes from '../constants/actiontypes';

export function getBaseinfo(data) {

    return {
        type: ActionTypes.BASEINFO,
        data
    }
}

export const initCompanyName = () => dispatch => {
    // dispatch({
    //     type: ActionTypes.INITCOMPANYNAME,
    //     payload: {
    //         isFetching: true,
    //     }
    // });

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
                        data: json.data
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

var key = 100;

export const addFriendLink = data => dispatch => {
    dispatch(asyncAddFriendLink(data));
    return fetch('/api/admin/')
        .then(response => response.json())
        .then(json => {
            dispatch(asyncAddFriendLink(json));
        }).catch(err => {
            dispatch(asyncAddFriendLink(err));
        })
}

export const asyncAddFriendLink = data => {
    key++;
    data.key = key;
    return {
        type: ActionTypes.ADDFRIENDLINK,
        changeId: -1,
        showModal: false,
        data: data
    }
}

export const editFriendLink = (index, data) => {
    key++;
    data.key = key;
    return {
        type: ActionTypes.EDITFRIENDLINK,
        changeId: index,
        showModal: false,
        data: data
    }
}


export function showModal(data) {

    return {
        type: ActionTypes.SHOWMODAL,
        showModal: true,
        changeId: data === undefined ? -1 : data
    }
}

export function hideModal(data) {
    return {
        type: ActionTypes.HIDEMODAL,
        showModal: false,
        changeId: -1,
    }
}