import * as ActionTypes from '../constants/actiontypes';
import * as msgConstants from '../constants/message';
import fetchRequest from 'utils/fetchrequest';

export const initClassify = () => dispatch => {
    dispatch({
        type: ActionTypes.INITCLASSIFY,
        payload: {
            isFetching: true
        }
    })
    fetch('/api/commodity/listClassify', {credentials: 'include'})
        .then(response => response.json())
        .then(json => {
            if(json.code != 0) 
                return dispatch({
                    type: ActionTypes.INITCLASSIFY_FAILURE,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            dispatch({
                type: ActionTypes.INITCLASSIFY_SUCCESS,
                payload: {
                    isFetching: false,
                    data: json.data
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.INITCLASSIFY_FAILURE,
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
        type: ActionTypes.ADDCLASSIFY,
        payload: {
            isEdit: true,
            changeId: -1
        }
    }
}

export const editClassify = index => {
    return {
        type: ActionTypes.EDITCLASSIFY,
        payload: {
            isEdit: true,
            changeId: index
        }
    }
}

export const saveClassify = (data) => dispatch => {
    dispatch({
        type: ActionTypes.SAVECLASSIFY,
        payload: {
            isFetching: true
        }
    });

    if (data.id === -1)
        return fetchRequest.post('/api/commodity/classify').then(body => {
            if (res.code != 0) {
                dispatch({
                    type: ActionTypes.SAVECLASSIFY_FAILURE,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: res.message
                    }
                })
            }
            dispatch({
                type: ActionTypes.SAVECLASSIFY_SUCCESS,
                payload: {
                    isFetching: false,
                    saveSuccessful: true,
                    data: res.data
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.SAVECLASSIFY_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: err.message,
                }
            })
        });
    fetchRequest.patch(`/api/commodity/classify/${data.id}`).then(body => {
        if (res.code != 0) {
            dispatch({
                type: ActionTypes.SAVECLASSIFY_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            })
        }
        dispatch({
            type: ActionTypes.SAVECLASSIFY_SUCCESS,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                data: res.data
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.SAVECLASSIFY_FAILURE,
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
        type: ActionTypes.DELETECLASSIFY,
        payload: {
            isFetching: true
        }
    });
    ids = Array.isArray(ids) ? ids : [ids];
    fetchRequest.delete('/api/commodity/classify', {
        ids
    }).then(body => {
        if (body.code !== 0)
            dispatch({
                type: ActionTypes.DELETECLASSIFY_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: body.message
                }
            });
        dispatch({
            type: ActionTypes.DELETECLASSIFY_SUCCESS,
            payload: {
                isFetching: false,
                data: ids
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.DELETECLASSIFY_FAILURE,
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
        type: ActionTypes.CANCELCLASSIFYMODAL,
        payload: {
            isEdit: false
        }
    }
}

export const clearClassifyNotify = () => {
    return {
        type: ActionTypes.CLEARCLASSIFYNOTIFY,
        payload: {
            saveSuccessful: false,
            invalidate: false,
            message: ''
        }
    }
}