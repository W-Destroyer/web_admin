import * as ActionTypes from '../constants/actiontypes';
import fetchRequest from 'utils/fetchRequest';

// 公司名称相关Action
export const initCompanyName = () => dispatch => {

    fetchRequest.get('/api/sysconfig/getCompanyName').then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.COMPANYNAME_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.COMPANYNAME_INIT,
            payload: {
                isFetching: false,
                data: res.data
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.COMPANYNAME_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    });
}

export const editCompanyName = () => {
    return {
        type: ActionTypes.COMPANYNAME_EDIT,
        payload: {
            isEdit: true
        }
    }
}

export const saveCompanyName =  data => dispatch => {
    dispatch({
        type: ActionTypes.COMPANYNAME_FETCH,
        payload: {
            isFetching: true
        }
    });

    fetchRequest.post('/api/sysconfig/setCompanyName', {data: data}).then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.COMPANYNAME_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.COMPANYNAME_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                message: res.message
            }
        });
    }).catch(err => {
        dispatch({
            type: ActionTypes.COMPANYNAME_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    })
}

export const cancelCompanyNameEdit = () => {
    return {
        type: ActionTypes.COMPANYNAME_EDIT_CANCLE,
        payload: {
            isEdit: false
        }
    }
}

export const clearCompanyNameNotify = () => {
    return {
        type: ActionTypes.COMPANYNAME_NOTIFY_CLEAR,
        payload: {
            isFetching: false,
            saveSuccessful: false,
            invalidate: false,
            message: ''
        }
    }
}

// 友情链接相关Action
export const initFriendLink = () => dispatch => {
    dispatch({
        type: ActionTypes.FRIENDLINK_FETCH,
        payload: {
            isFetching: true
        }
    });

    fetchRequest.get('/api/sysconfig/listFriendLink').then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.FRIENDLINK_INIT,
            payload: {
                isFetching: false,
                data: res.data
            }
        });
    }).catch(err => {
        dispatch({
            type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    })
}

export const addFriendLink = () => {
    return {
        type: ActionTypes.FRIENDLINK_ADD,
        payload: {
            isEdit: true,
            changeData: {id: -1}
        }
    }
}

export const editFriendLink = data => {
    return {
        type: ActionTypes.FRIENDLINK_EDIT,
        payload: {
            isEdit: true,
            changeData: data
        }
    }
}

export const saveFriendLink = data => dispatch => {
    dispatch({
        type: ActionTypes.FRIENDLINK_FETCH,
        payload: {
            isFetching: true
        }
    });

    fetchRequest.post('/api/sysconfig/saveFriendLink', {data: data}).then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.FRIENDLINK_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                message: res.message
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    })
}

export const delFriendLink = data => dispatch => {
    dispatch({
        type: ActionTypes.FRIENDLINK_FETCH,
        payload: {
            isFetching: true,
        }
    });
    var id = data.id;
    fetchRequest.post('/api/sysconfig/delFriendLink', {id}).then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            })
        dispatch({
            type: ActionTypes.FRIENDLINK_DELETE,
            payload: {
                isFetching: false,
                deleteSuccessful: true,
                message: res.message
            }
        });
    }).catch(err => {
        dispatch({
            type: ActionTypes.FRIENDLINK_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    })
}

export const cancelFriendLinkModal = () => {
    return {
        type: ActionTypes.FRIENDLINK_MODAL_CANCEL,
        payload: {
            isEdit: false
        }
    }
}

export const clearFriendLinkNotify = () => {
    return {
        type: ActionTypes.FRIENDLINK_NOTIFY_CLEAR,
        payload: {
            isFetching: false,
            invalidate: false,
            saveSuccessful: false,
            deleteSuccessful: false,
            message: ''
        }
    }
}