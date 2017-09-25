import * as ActionTypes from '../constants/actiontypes';
import fetchRequest from 'utils/fetchrequest';

export const initProductList = query => dispatch => {
    dispatch({
        type: ActionTypes.PRODUCT_LIST_FETCH,
        payload: {
            isFetching: true
        }
    });

    query = query || {};

    fetchRequest.get('/api/commodity/listProduct', {
        start: query.start || 0,
        length: query.length || 100,
        type: query.type || 0
    }).then(res => {
        if (res.code != 0) 
            return dispatch({
                type: ActionTypes.PRODUCT_LIST_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.PRODUCT_LIST_INIT,
            payload: {
                isFetching: false,
                data: {
                    total: res.data.total,
                    list: res.data.productList
                }
            }
        });
    }).catch(err => {
        dispatch({
            type: ActionTypes.PRODUCT_LIST_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidate: true,
                message: err
            }
        });
    });
}

export const deleteProductList = productIds => dispatch => {
    dispatch({
        type: ActionTypes.PRODUCT_LIST_FETCH,
        payload: {
            isFetching: true
        }
    });

    fetchRequest.post('/api/commodity/deleteProduct', {
        ids: Array.isArray(productIds) ? productIds : [productIds]
    }).then(res => {
        if (res.code !== 0)
            return dispatch({
                type: ActionTypes.PRODUCT_LIST_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.PRODUCT_LIST_DELETE,
            payload: {
                isFetching: false,
                deleteSuccessful: true,
                message: res.message || '删除成功！'
            }
        })
    }).catch(err => {
        dispatch({
            type: ActionTypes.PRODUCT_LIST_FAILURE,
            payload: {
                isFetching: false,
                message: err
            }
        })
    })
}

export const clearProductListNotify = () => {
    return {
        type: ActionTypes.PRODUCT_LIST_NOTIDY_CLEAR,
        payload: {
            isFetching: false,
            invalidate: false,
            deleteSuccessful: false,
            message: ''
        }
    }
}

// 添加 产品页面
export const saveProduct = data => dispatch => {
    dispatch({
        type: ActionTypes.PRODUCT_ADDITION_FETCH,
        payload: {
            isFetching: true
        }
    });

    fetchRequest.post('/api/commodity/createProduct', {
        data
    }).then(res => {
        if (res.code !== 0)
            return dispatch({
                type: ActionTypes.PRODUCT_ADDITION_FETCH_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: res.message
                }
            });
        dispatch({
            type: ActionTypes.PRODUCT_ADDITION_SAVE,
            payload: {
                isFetching: false,
                saveSuccessful: true,
                message: res.message || '添加成功！'
            }
        })
    }).catch(er => {
        dispatch({
            type: ActionTypes.PRODUCT_ADDITION_FETCH_FAILURE,
            payload: {
                isFetching: false,
                invalidata: true,
                message: true
            }
        })
    })
}

export const clearProductAdditionNotify = () => {
    return {
        type: ActionTypes.PRODUCT_ADDITION_NOTIFY_CLEAR,
        payload: {
            isFetching: false,
            saveSuccessful: false,
            invalidate: false,
            message: ''
        }
    }
}