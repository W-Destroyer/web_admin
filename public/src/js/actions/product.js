import * as ActionTypes from '../constants/actiontypes';

export const initProductList = () => dispatch => {
    dispatch({
        type: ActionTypes.INITPRODUCTLIST,
        payload: {
            isFetching: true
        }
    });
    fetch(`/api/commodity/listProduct?start=0&length=100&type=0`)
        .then(response => response.json())
        .then(json => {
            if(json.code != 0) 
                return dispatch({
                    type: ActionTypes.INITPRODUCTLIST_FAILURE,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            dispatch({
                type: ActionTypes.INITPRODUCTLIST_SUCCESS,
                payload: {
                    isFetching: false,
                    data: {
                        list: json.data.productList,
                        total: json.data.total
                    }
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.INITPRODUCTLIST_FAILURE,
                payload: {
                    invalidate: true,
                    message: err
                }
            })
        })
}

export const addProduct = data => dispatch => {
    dispatch({
        type: ActionTypes.ADDPRODUCT,
        payload: {
            isFetching: true
        }
    });
    var productData = data;
    
    fetch('/api/commodity/addProduct', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(productData)
    }).then(response => response.json())
        .then(json => {
            if (json.code != 0)
                return dispatch({
                    type: ActionTypes.ADDPRODUCT_SUCCESS,
                    payload: {
                        isFetching: false,
                        invalidate: false,
                        invalidate: true,
                        message: json.message
                    }
                });
            dispatch({
                type: ActionTypes.ADDPRODUCT_SUCCESS,
                payload: {
                    isFetching: false,
                    saveSuccessful: true,
                    data: productData
                }
            });
        }).catch(err => {
            dispatch({
                type: ActionTypes.ADDPRODUCT_SUCCESS,
                payload: {
                    isFetching: false,
                    saveSuccessful: false,
                    invalidate: true,
                    message: err,
                }
            });
        })
}

export const addProductFinished = () => {
    return {
        type: ActionTypes.ADDPRODUCTFINISHED,
        payload: {
            isFetching: false,
            saveSuccessful: false
        }
    }
}

export const deleteProduct = productIds => dispatch => {
    dispatch({
        type: ActionTypes.DELETEPRODUCT,
        payload: {
            isFetching: true,
        }
    });

    fetch('/api/commodity/deleteProduct', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'applicationi/json'
        }),
        body: JSON.stringify(Array.isArray(productIds) ? productIds : [productIds])
    }).then(response => response.json())
        .then(json => {
            if (json.code != 0) {
                return dispatch({
                    type: ActionTypes.DELETEPRODUCT_FAILURE,
                    payload: {
                        isFetching: false,
                        invalidate: true,
                        message: json.message
                    }
                })
            }
            dispatch({
                type: ActionTypes.DELETEPRODUCT_SUCCESS,
                payload: {
                    isFetchinig: false,
                    deleteSuccessful: true
                }
            })
        }).catch(err => {
            dispatch({
                type: ActionTypes.DELETEPRODUCT_FAILURE,
                payload: {
                    isFetching: false,
                    invalidate: true,
                    message: err
                }
            })
        })
}