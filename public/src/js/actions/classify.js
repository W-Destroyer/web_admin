import * as ActionTypes from '../constants/actiontypes';
import * as msgConstants from '../constants/message';
import fetchRequest from 'utils/fetchrequest';

export const initClassify = () => dispatch => {
    dispatch({
        type: ActionTypes.CLASSIFY_FETCH,
        payload: {
            isFetching: true
        }
    });
    fetchRequest.get('/api/commodity/listClassify').then(res => {
        if (res.code != 0)
            return dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            })
        dispatch({
            type: ActionTypes.CLASSIFY_INIT,
            payload: {
                isFetching: false,
                data: res.data
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
    });
}

export const addClassify = () => {
    return {
        type: ActionTypes.CLASSIFY_ADD,
        payload: {
            isEdit: true,
            changeData: {id: -1}
        }
    }
}

export const editClassify = data => {
    return {
        type: ActionTypes.CLASSIFY_EDIT,
        payload: {
            isEdit: true,
            changeData: data
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

    fetchRequest.post(data.id === -1 ? '/api/commodity/createClassify' : '/api/commodity/updateClassify', data).then(res => {
        if (res.code !== 0)
            return dispatch({
                type: ActionTypes.CLASSIFY_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.CLASSIFY_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                // data: res.data,
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
    fetchRequest.post('/api/commodity/deleteClassify', {
        data: ids
    }).then(res => {
        if (res.code !== 0)
            return dispatch({
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
                deleteSuccessful: true,
                ids: ids,
                message: res.message || '删除成功！'
            }
        });
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
            deleteSuccessful: false,
            invalidate: false,
            message: ''
        }
    }
}