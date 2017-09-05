import * as ActionTypes from '../constants/actiontypes';

const initialState = {
    classify: {
        isFetching: false,
        invalidate: false,
        message: '',
        isEdit: false,
        changeId: -1,
        data: []
    },

    product: {
        isFetching: false,
        invalidate: false,
        message: '',
        data: {
            list: [],
            total: 0
        }
    },
    
    addProduct: {
        isFetching: false,
        invalidate: false,
        message: '',
        saveSuccessful: false,
        data: {}
    },
    
    deleteProduct: {
        isFetching: false,
        invalidate: false,
        message: '',
        deleteSuccessful: false
    }
}

// function initState() {
//     return {
//         isFetching: false,
//         invalidate: false,
//         message: '',
//     }
// }

export default function commodity(state = initialState, action) {
    var newState = Object.assign({}, state);

    newState.classify = classifyReducer(state.classify, action);
    newState.product = productReducer(state.product, action);
    newState.addProduct = addProductReducer(state.addProduct, action);

    return newState;
}

function classifyReducer(state, action) {
    switch(action.type) {
        case ActionTypes.INITCLASSIFY:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITCLASSIFY_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITCLASSIFY_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.ADDCLASSIFY: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.EDITCLASSIFY:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.SAVECLASSIFY: 
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.SAVECLASSIFY_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.SAVECLASSIFY_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.DELETECLASSIFY:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.DELETECLASSIFY_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.DELETECLASSIFY_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.CANCELCLASSIFYMODAL: 
            return Object.assign({}, state, {
                ...action.payload
            });
            
        default:
            return state;
    }
}

function productReducer(state, action) {
    switch(action.type) {
        case ActionTypes.INITPRODUCTLIST:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITPRODUCTLIST_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITPRODUCTLIST_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}

function addProductReducer(state, action) {
    switch(action.type) {
        case ActionTypes.ADDPRODUCT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.ADDPRODUCT_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.ADDPRODUCT_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.ADDPRODUCTFINISHED:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}