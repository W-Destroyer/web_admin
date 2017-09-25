import * as ActionTypes from '../constants/actiontypes';
// import _ from 'lodash';
import cloneDeep from '../utils/cloneDeep';

const initialState = {
    classify: {
        isFetching: false,
        invalidate: false,
        saveSuccessful: false,
        deleteSuccessful: false,
        message: '',
        isEdit: false,
        changeData: {
            id: -1
        },
        data: []
    },

    productList: {
        isFetching: false,
        invalidate: false,
        message: '',
        data: {
            list: [],
            total: 0
        }
    },
    
    productAddition: {
        isFetching: false,
        invalidate: false,
        message: '',
        saveSuccessful: false,
        data: {}
    },
}

export default function commodity(state = initialState, action) {
    var newState = cloneDeep(state);
    var cloneAction = cloneDeep(action);

    newState.classify = classifyReducer(state.classify, cloneAction);
    newState.productList = productListReducer(state.productList, cloneAction);
    newState.productAddition = productAdditionReducer(state.productAddition, cloneAction);

    return newState;
}

function classifyReducer(state, action) {
    switch(action.type) {
        // 发送异步请求
        case ActionTypes.CLASSIFYFETCH:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 异步请求失败
        case ActionTypes.CLASSIFYFETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 初始化产品分类列表
        case ActionTypes.CLASSIFY_INIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 添加产品分类
        case ActionTypes.CLASSIFY_ADD:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 编辑产品分类
        case ActionTypes.CLASSIFY_EDIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 保存产品分类
        case ActionTypes.CLASSIFY_SAVE:
            return Object.assign({}, state, {
                ...action.payload
            });
            // var cloneState = cloneDeep(state);

            // var changeData = cloneState.data.find(item => {
            //     if (item['t_id'] !== action.payload.data['t_id'])
            //         return false;
            //     Object.assign(item, action.payload.data);
            //     return true;
            // });
            // if (!changeData)
            //     cloneState.data.push(action.payload.data);
            // Object.keys(action.payload).forEach(key => {
            //     if (key === 'data')
            //         return;
            //     cloneState[key] = action.payload[key];
            // });
            // return cloneState;

        // 删除产品分类
        case ActionTypes.CLASSIFY_DELETE:
            return Object.assign({}, state, {
                ...action.payload
            });
            // var classifyData = state.data.filter(item => {
            //     return action.payload.ids.indexOf(item['t_id']) < 0
            // });
            
            // delete action.payload.ids;

            // return Object.assign({}, state, {
            //     data: classifyData,
            //     ...action.payload
            // });

        // 关闭产品分类Modal
        case ActionTypes.CLASSIFY_MODAL_CANCEL: 
            return Object.assign({}, state, {
                ...action.payload
            });
            
        // 清除message等信息
        case ActionTypes.CLASSIFY_NOTIFY_CLEAR: 
            return Object.assign({}, state, {
                ...action.payload
            })

        default:
            return state;
    }
}

function productListReducer(state, action) {
    switch(action.type) {
        case ActionTypes.PRODUCT_LIST_FETCH:
            return Object.assign({}, state, {
                ...action.payload
            });
        
        case ActionTypes.PRODUCT_LIST_FETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.PRODUCT_LIST_INIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.PRODUCT_LIST_DELETE: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.PRODUCT_LIST_NOTIDY_CLEAR:
            return Object.assign({}, state, {
                ...action.payload
            });

        default: 
            return state;
    }
}

function productAdditionReducer(state, action) {
    switch(action.type) {
        case ActionTypes.PRODUCT_ADDITION_FETCH:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.PRODUCT_ADDITION_FETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
            
        case ActionTypes.PRODUCT_ADDITION_SAVE:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.PRODUCT_ADDITION_NOTIFY_CLEAR:
            return Object.assign({}, state, {
                ...action.payload
            });

        default:
            return state;
    }
}