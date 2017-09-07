import * as ActionTypes from '../constants/actiontypes';
import * as msgConstants from '../constants/message';
import fetchRequest from 'utils/fetchrequest';

export const initClassify = () => dispatch => {
    dispatch({
        type: ActionTypes.CLASSIFY_FETCH,
        payload: {
            isFetching: true
        }
    })
    fetch('/api/commodity/listClassify', {credentials: 'include'})
        .then(response => response.json())
        .then(json => {
            if(json.code != 0) 
                return dispatch({
                    type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            dispatch({
                type: ActionTypes.CLASSIFY_INIT,
                payload: {
                    isFetching: false,
                    data: json.data
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: msgConstants.networkErr
                }
            })
        })
}

export const addClassify = () => {
    return {
        type: ActionTypes.CLASSIFY_ADD,
        payload: {
            isEdit: true,
            changeId: -1
        }
    }
}

export const editClassify = index => {
    return {
        type: ActionTypes.CLASSIFY_EDIT,
        payload: {
            isEdit: true,
            changeId: index
        }
    }
}

export const saveClassify = data => dispatch => {
    dispatch({
        type: ActionTypes.CLASSIFY_FETCH,
        payload: {
            isFetching: true
        }
    });

    data.id === -1 ? fetchRequest.post('/api/commodity/classify', data).then(res => {
        if (res.code != 0) {
            dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            })
        }
        debugger
        dispatch({
            type: ActionTypes.CLASSIFY_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                data: res.data,
                message: res.message
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.CLASSIFY_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message,
            }
        })
    }) : fetchRequest.patch(`/api/commodity/classify/${data.id}`, data).then(res => {
        if (res.code != 0) {
            dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            })
        }
        dispatch({
            type: ActionTypes.CLASSIFY_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                messsage: res.data
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.CLASSIFY_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message,
            }
        })
    });
}

export const deleteClassify = (ids) => dispatch => {
    dispatch({
        type: ActionTypes.CLASSIFY_FETCH,
        payload: {
            isFetching: true
        }
    });
    ids = Array.isArray(ids) ? ids : [ids];
    fetchRequest.delete('/api/commodity/classify', {
        ids
    }).then(res => {
        if (res.code !== 0)
            dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.CLASSIFY_DELETE,
            payload: {
                isFetching: false,
                data: ids
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.CLASSIFY_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err.message
            }
        })
    });
}

export const cancelClassifyModal = () => {
    return {
        type: ActionTypes.CLASSIFY_MODAL_CANCEL,
        payload: {
            isEdit: false
        }
    }
}

export const clearClassifyNotify = () => {
    return {
        type: ActionTypes.CLASSIFY_NOTIFY_CLEAR,
        payload: {
            saveSuccessful: false,
            invalidate: false,
            message: ''
        }
    }
}