import * as ActionTypes from '../constants/actiontypes';

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
                    invalidate: true,
                    message: err
                }
            })
        })
}